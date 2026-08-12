// Email utility for sending emails
// You can integrate with EmailJS or your backend service

export const sendEmail = async (formData) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

export const sendVerificationEmail = async (email, userName) => {
  return sendEmail({
    to: email,
    subject: 'ACE - Email Verification',
    template: 'verification',
    userName,
  });
};

export const sendPasswordResetEmail = async (email) => {
  return sendEmail({
    to: email,
    subject: 'ACE - Password Reset',
    template: 'password-reset',
  });
};

export const sendContactFormEmail = async (name, email, message) => {
  return sendEmail({
    to: 'HELP.ACE@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    template: 'contact-form',
    replyTo: email,
    name,
    message,
  });
};
