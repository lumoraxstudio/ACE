// Import required packages
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');

// Load environment variables
dotenv.config();

const app = express();

// ============ SECURITY MIDDLEWARE ============

// 1. Helmet for security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            fontSrc: ["'self'", 'https:'],
            connectSrc: ["'self'", 'https:'],
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    permissionsPolicy: {
        camera: [],
        microphone: [],
        geolocation: []
    }
}));

// 2. CORS configuration
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://auracoresports.com'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// 3. Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.ip === process.env.ADMIN_IP
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // 5 login attempts
    message: 'Too many login attempts, please try again later.',
    skipSuccessfulRequests: true
});

app.use(limiter);

// 4. Data sanitization
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks

// 5. Compression
app.use(compression());

// 6. Body parser
app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// ============ LOGGING & MONITORING ============

const requestLogger = (req, res, next) => {
    const requestId = uuidv4();
    const timestamp = new Date().toISOString();
    
    req.id = requestId;
    
    console.log(`[${timestamp}] [${requestId}] ${req.method} ${req.path} from ${req.ip}`);
    
    // Log response
    const originalSend = res.send;
    res.send = function(data) {
        console.log(`[${timestamp}] [${requestId}] Response: ${res.statusCode}`);
        res.send = originalSend;
        return res.send(data);
    };
    
    next();
};

app.use(requestLogger);

// ============ DATABASE CONNECTION ============

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
            retryWrites: true,
            w: 'majority'
        });
        console.log('MongoDB connected securely');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

connectDB();

// ============ DATABASE SCHEMAS ============

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: () => uuidv4(),
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: 'Invalid email format'
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
        match: /^[a-zA-Z0-9_-]+$/
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 60
    },
    twoFactorSecret: String,
    twoFactorEnabled: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'player', 'admin'],
        default: 'user'
    },
    lastLogin: Date,
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: Date,
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    deletedAt: Date,
    ipAddresses: [String],
    userAgent: [String]
}, { timestamps: true });

const teamMemberSchema = new mongoose.Schema({
    memberId: {
        type: String,
        default: () => uuidv4(),
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    gameTitle: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    stats: {
        wins: Number,
        losses: Number,
        rating: Number
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const newsSchema = new mongoose.Schema({
    newsId: {
        type: String,
        default: () => uuidv4(),
        unique: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 200
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['tournament', 'roster', 'update', 'announcement'],
        required: true
    },
    authorId: String,
    tags: [String],
    published: {
        type: Boolean,
        default: false
    },
    publishedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
const News = mongoose.model('News', newsSchema);

// ============ AUTHENTICATION UTILITIES ============

class AuthService {
    static async hashPassword(password) {
        if (!this.validatePassword(password)) {
            throw new Error('Password does not meet security requirements');
        }
        const salt = await bcrypt.genSalt(12);
        return bcrypt.hash(password, salt);
    }

    static async comparePasswords(password, hash) {
        return bcrypt.compare(password, hash);
    }

    static validatePassword(password) {
        // Minimum 12 characters, uppercase, lowercase, number, special char
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        return regex.test(password);
    }

    static generateJWT(userId, expiresIn = '1h') {
        return jwt.sign(
            { userId, iat: Date.now() },
            process.env.JWT_SECRET,
            { expiresIn, algorithm: 'HS256' }
        );
    }

    static verifyJWT(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET, {
                algorithms: ['HS256']
            });
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    static generateRefreshToken(userId) {
        return jwt.sign(
            { userId, type: 'refresh' },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );
    }
}

// ============ MIDDLEWARE ============

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const decoded = AuthService.verifyJWT(token);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

const adminOnly = (req, res, next) => {
    // Verify user is admin before proceeding
    User.findOne({ userId: req.userId }).then(user => {
        if (user?.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        next();
    }).catch(() => res.status(500).json({ error: 'Server error' }));
};

const validateInput = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        });

        if (error) {
            const messages = error.details.map(d => d.message);
            return res.status(400).json({ errors: messages });
        }

        req.body = value;
        next();
    };
};

// ============ ROUTES ============

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Registration
app.post('/api/auth/register', authLimiter, async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        if (!/^[a-zA-Z0-9_-]{3,30}$/.test(username)) {
            return res.status(400).json({ error: 'Invalid username format' });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const passwordHash = await AuthService.hashPassword(password);

        const newUser = new User({
            email,
            username,
            passwordHash,
            ipAddresses: [req.ip],
            userAgent: [req.get('user-agent')]
        });

        await newUser.save();

        const token = AuthService.generateJWT(newUser.userId);
        const refreshToken = AuthService.generateRefreshToken(newUser.userId);

        res.status(201).json({
            userId: newUser.userId,
            token,
            refreshToken,
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login
app.post('/api/auth/login', authLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if account is locked
        if (user.lockUntil && user.lockUntil > new Date()) {
            return res.status(429).json({ error: 'Account temporarily locked' });
        }

        const passwordMatch = await AuthService.comparePasswords(password, user.passwordHash);

        if (!passwordMatch) {
            user.loginAttempts += 1;

            if (user.loginAttempts >= 5) {
                user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 min
            }

            await user.save();
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Reset login attempts
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        user.lastLogin = new Date();
        user.ipAddresses = [...new Set([...user.ipAddresses, req.ip])];
        user.userAgent = [...new Set([...user.userAgent, req.get('user-agent')])];

        await user.save();

        const token = AuthService.generateJWT(user.userId);
        const refreshToken = AuthService.generateRefreshToken(user.userId);

        res.json({
            userId: user.userId,
            username: user.username,
            token,
            refreshToken,
            twoFactorEnabled: user.twoFactorEnabled
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Refresh token
app.post('/api/auth/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token required' });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const newToken = AuthService.generateJWT(decoded.userId);

        res.json({ token: newToken });
    } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
});

// Protected route example - Get user profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.userId }).select('-passwordHash');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Update user profile
app.put('/api/user/profile', authenticateToken, async (req, res) => {
    try {
        const { username } = req.body;

        if (username && !/^[a-zA-Z0-9_-]{3,30}$/.test(username)) {
            return res.status(400).json({ error: 'Invalid username format' });
        }

        const user = await User.findOneAndUpdate(
            { userId: req.userId },
            { username, updatedAt: new Date() },
            { new: true }
        ).select('-passwordHash');

        res.json({ message: 'Profile updated', user });
    } catch (error) {
        res.status(500).json({ error: 'Profile update failed' });
    }
});

// Change password
app.post('/api/user/change-password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findOne({ userId: req.userId });

        const passwordMatch = await AuthService.comparePasswords(
            currentPassword,
            user.passwordHash
        );

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        user.passwordHash = await AuthService.hashPassword(newPassword);
        user.updatedAt = new Date();

        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Password change failed' });
    }
});

// Get news (public)
app.get('/api/news', async (req, res) => {
    try {
        const news = await News.find({ published: true })
            .sort({ publishedAt: -1 })
            .limit(10);

        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Create news (admin only)
app.post('/api/news', authenticateToken, adminOnly, async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;

        const news = new News({
            title,
            content,
            category,
            tags,
            authorId: req.userId
        });

        await news.save();

        res.status(201).json({ message: 'News created', news });
    } catch (error) {
        res.status(500).json({ error: 'News creation failed' });
    }
});

// ============ ERROR HANDLING ============

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

// ============ SSL/TLS CONFIGURATION ============

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
    const key = fs.readFileSync(process.env.SSL_KEY_PATH);
    const cert = fs.readFileSync(process.env.SSL_CERT_PATH);

    https.createServer({ key, cert }, app).listen(PORT, () => {
        console.log(`🔐 Secure server running on port ${PORT}`);
    });
} else {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;