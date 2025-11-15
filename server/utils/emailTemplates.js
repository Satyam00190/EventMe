export const verificationEmailTemplate = (name, verificationUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #F7F7FF;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #5A43FF 0%, #FF8F00 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          padding: 30px;
        }
        .button {
          display: inline-block;
          padding: 15px 30px;
          background: linear-gradient(135deg, #5A43FF 0%, #8B7FFF 100%);
          color: white;
          text-decoration: none;
          border-radius: 10px;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to EventMe!</h1>
        </div>
        <div class="content">
          <h2>Hi ${name},</h2>
          <p>Thank you for registering with EventMe! We're excited to have you join our community.</p>
          <p>To complete your registration and start booking amazing events, please verify your email address by clicking the button below:</p>
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #5A43FF;">${verificationUrl}</p>
          <p><strong>This link will expire in 24 hours.</strong></p>
          <p>If you didn't create an account with EventMe, please ignore this email.</p>
          <p>Best regards,<br>The EventMe Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} EventMe. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const welcomeEmailTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #F7F7FF;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #5A43FF 0%, #FF8F00 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          padding: 30px;
        }
        .feature {
          margin: 20px 0;
          padding: 15px;
          background-color: #F7F7FF;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎊 Email Verified Successfully!</h1>
        </div>
        <div class="content">
          <h2>Welcome aboard, ${name}!</h2>
          <p>Your email has been verified successfully. You can now enjoy all the features of EventMe:</p>
          
          <div class="feature">
            <h3>🎫 Browse & Book Events</h3>
            <p>Discover amazing events and book tickets instantly</p>
          </div>
          
          <div class="feature">
            <h3>📅 Manage Bookings</h3>
            <p>View and manage all your event bookings in one place</p>
          </div>
          
          <div class="feature">
            <h3>⭐ Leave Reviews</h3>
            <p>Share your experience and help others discover great events</p>
          </div>
          
          <p>Ready to get started? <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/events" style="color: #5A43FF;">Browse Events Now</a></p>
          
          <p>Best regards,<br>The EventMe Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const resetPasswordEmailTemplate = (name, resetUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #F7F7FF;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #5A43FF 0%, #FF8F00 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          padding: 30px;
        }
        .button {
          display: inline-block;
          padding: 15px 30px;
          background: linear-gradient(135deg, #5A43FF 0%, #8B7FFF 100%);
          color: white;
          text-decoration: none;
          border-radius: 10px;
          margin: 20px 0;
          font-weight: bold;
        }
        .warning {
          background-color: #FFF3CD;
          border-left: 4px solid #FF8F00;
          padding: 15px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Reset Your Password</h1>
        </div>
        <div class="content">
          <h2>Hi ${name},</h2>
          <p>We received a request to reset your password for your EventMe account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #5A43FF;">${resetUrl}</p>
          
          <div class="warning">
            <strong>⚠️ Important:</strong>
            <ul>
              <li>This link will expire in 1 hour</li>
              <li>If you didn't request a password reset, please ignore this email</li>
              <li>Your password will remain unchanged</li>
            </ul>
          </div>
          
          <p>Best regards,<br>The EventMe Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const bookingConfirmationEmailTemplate = (name, event, booking) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #F7F7FF;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #5A43FF 0%, #FF8F00 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          padding: 30px;
        }
        .booking-details {
          background-color: #F7F7FF;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
        </div>
        <div class="content">
          <h2>Hi ${name},</h2>
          <p>Your booking has been confirmed! We're excited to see you at the event.</p>
          
          <div class="booking-details">
            <h3>📋 Booking Details</h3>
            <div class="detail-row">
              <strong>Booking Reference:</strong>
              <span>${booking.bookingReference}</span>
            </div>
            <div class="detail-row">
              <strong>Event:</strong>
              <span>${event.title}</span>
            </div>
            <div class="detail-row">
              <strong>Date:</strong>
              <span>${new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <strong>Time:</strong>
              <span>${event.time}</span>
            </div>
            <div class="detail-row">
              <strong>Venue:</strong>
              <span>${event.location.venue}</span>
            </div>
            <div class="detail-row">
              <strong>Total Amount:</strong>
              <span style="color: #5A43FF; font-weight: bold;">$${booking.totalAmount}</span>
            </div>
          </div>
          
          <p><strong>Important:</strong> Please save this email for your records. You may need to show your booking reference at the venue.</p>
          
          <p>View your booking details: <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/my-bookings" style="color: #5A43FF;">My Bookings</a></p>
          
          <p>Best regards,<br>The EventMe Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
