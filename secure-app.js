// ============ SECURITY UTILITIES ============

class SecurityManager {
    static sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    static validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    static validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        return regex.test(password);
    }

    static getCSRFToken() {
        return document.querySelector('meta[name="csrf-token"]')?.content || '';
    }

    static hashPassword(password) {
        // Use crypto for client-side password hashing (additional security)
        return new Promise((resolve) => {
            crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
                .then(hash => {
                    const hashArray = Array.from(new Uint8Array(hash));
                    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                    resolve(hashHex);
                });
        });
    }
}

// ============ API SERVICE ============

class APIService {
    static baseURL = 'https://api.auracoresports.com';

    static async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Add JWT token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
                credentials: 'include' // Send cookies for CSRF protection
            });

            if (response.status === 401) {
                // Token expired, refresh it
                const newToken = await this.refreshToken();
                if (newToken) {
                    headers['Authorization'] = `Bearer ${newToken}`;
                    return fetch(url, {
                        ...options,
                        headers,
                        credentials: 'include'
                    }).then(res => res.json());
                } else {
                    AuthManager.logout();
                }
            }

            return response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Network request failed');
        }
    }

    static async refreshToken() {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return null;

        try {
            const response = await fetch(`${this.baseURL}/api/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken })
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                return data.token;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    static register(email, username, password) {
        return this.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, username, password })
        });
    }

    static login(email, password) {
        return this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    static getNews() {
        return this.request('/api/news');
    }

    static getUserProfile() {
        return this.request('/api/user/profile');
    }
}

// ============ AUTH MANAGER ============

class AuthManager {
    static login(email, password) {
        if (!SecurityManager.validateEmail(email)) {
            throw new Error('Invalid email format');
        }

        return APIService.login(email, password)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }

                localStorage.setItem('authToken', response.token);
                localStorage.setItem('refreshToken', response.refreshToken);
                localStorage.setItem('userId', response.userId);
                localStorage.setItem('username', response.username);

                UIManager.updateAuthUI(true);
                UIManager.closeAuthModal();

                return response;
            });
    }

    static register(email, username, password) {
        if (!SecurityManager.validateEmail(email)) {
            throw new Error('Invalid email format');
        }

        if (!SecurityManager.validatePassword(password)) {
            throw new Error('Password does not meet security requirements');
        }

        return APIService.register(email, username, password)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }

                localStorage.setItem('authToken', response.token);
                localStorage.setItem('refreshToken', response.refreshToken);
                localStorage.setItem('userId', response.userId);

                UIManager.updateAuthUI(true);
                UIManager.closeAuthModal();

                return response;
            });
    }

    static logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');

        UIManager.updateAuthUI(false);
    }

    static isAuthenticated() {
        return !!localStorage.getItem('authToken');
    }

    static getToken() {
        return localStorage.getItem('authToken');
    }
}

// ============ UI MANAGER ============

class UIManager {
    static openAuthModal() {
        document.getElementById('authModal').style.display = 'block';
    }

    static closeAuthModal() {
        document.getElementById('authModal').style.display = 'none';
    }

    static updateAuthUI(isAuthenticated) {
        const authMenu = document.getElementById('authMenu');

        if (isAuthenticated) {
            const username = localStorage.getItem('username');
            authMenu.innerHTML = `
                <div class="user-menu">
                    <span>Hello, ${SecurityManager.sanitizeHTML(username)}</span>
                    <button onclick="AuthManager.logout()" class="btn btn-secondary">Logout</button>
                </div>
            `;
        } else {
            authMenu.innerHTML = `<button class="btn btn-primary" onclick="openAuthModal()">Sign In</button>`;
        }
    }

    static showError(message) {
        alert('Error: ' + SecurityManager.sanitizeHTML(message));
    }

    static showSuccess(message) {
        alert(SecurityManager.sanitizeHTML(message));
    }
}

// ============ DATA LOADER ============

class DataLoader {
    static async loadNews() {
        try {
            const news = await APIService.getNews();

            const newsContainer = document.getElementById('newsContainer');
            newsContainer.innerHTML = '';

            news.forEach(item => {
                const article = document.createElement('article');
                article.className = 'news-card';
                article.innerHTML = `
                    <h3>${SecurityManager.sanitizeHTML(item.title)}</h3>
                    <p class="news-date">${new Date(item.createdAt).toLocaleDateString()}</p>
                    <p>${SecurityManager.sanitizeHTML(item.content.substring(0, 150))}...</p>
                `;
                newsContainer.appendChild(article);
            });
        } catch (error) {
            console.error('Failed to load news:', error);
        }
    }
}

// ============ EVENT LISTENERS ============

function openAuthModal() {
    UIManager.openAuthModal();
}

document.getElementById('closeModal')?.addEventListener('click', () => {
    UIManager.closeAuthModal();
});

document.getElementById('toggleRegister')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
});

document.getElementById('toggleLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await AuthManager.login(email, password);
        UIManager.showSuccess('Login successful!');
    } catch (error) {
        UIManager.showError(error.message);
    }
});

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        await AuthManager.register(email, username, password);
        UIManager.showSuccess('Registration successful!');
    } catch (error) {
        UIManager.showError(error.message);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    UIManager.updateAuthUI(AuthManager.isAuthenticated());
    DataLoader.loadNews();
});

console.log('🔐 Secure AuraCoreEsports app loaded');