const validator = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../../utils/email-util");
const {
  passwordValidator,
  confirmPasswordValidator,
  userTypeValidator,
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  termsValidator,
} = require("../../utils/validator-util");

const postSignup = [
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
  userTypeValidator,
  termsValidator,
  async (req, res, next) => {
    const {
      firstName,
      lastName,
      password,
      email,
      confirmPassword,
      userType,
      terms,
    } = req.body;
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      const otpExpiry = Date.now() + 5 * 60 * 1000;
      const user = User({
        firstName,
        lastName,
        password: hashedPassword,
        email,
        userType,
        otp,
        otpExpiry,
      });
      await user.save();
      await sendEmail(
        email,
        "Welcome to Airbnb - Verify Your Email",
        `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Airbnb</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #0f172a; margin: 0; padding: 40px 20px; background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%); }
        .wrapper { max-width: 600px; margin: 0 auto; }
        .container { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
        .header { background: transparent; color: #0f172a; padding: 40px 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 800; color: #ff385c; }
        .header .subtitle { font-size: 18px; margin-top: 10px; color: #475569; font-weight: 500; }
        .content { padding: 20px 40px 40px; }
        .content h2 { color: #0f172a; margin-bottom: 20px; font-size: 24px; font-weight: 800; }
        .content p { margin-bottom: 15px; font-size: 16px; line-height: 1.6; color: #1e293b; font-weight: 500;}
        .otp-container { background: rgba(255, 255, 255, 0.9); border: 1px solid rgba(255, 255, 255, 0.6); color: #0f172a; padding: 30px; border-radius: 16px; text-align: center; margin: 30px 0; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); }
        .otp-label { font-size: 14px; margin-bottom: 10px; color: #475569; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; }
        .otp-code { font-size: 42px; font-weight: 800; letter-spacing: 12px; font-family: 'Courier New', monospace; margin: 10px 0; color: #ff385c; }
        .expiry-notice { background-color: rgba(255, 255, 255, 0.6); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 12px; padding: 15px; margin: 20px 0; color: #0f172a; text-align: center; font-weight: 600; font-size: 15px;}
        .steps { background-color: rgba(255, 255, 255, 0.5); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 16px; padding: 25px; margin: 25px 0; }
        .steps h3 { margin-top: 0; color: #ff385c; font-size: 18px; font-weight: 800; }
        .steps ol { margin: 0; padding-left: 20px; color: #1e293b; font-weight: 600;}
        .steps li { margin-bottom: 10px; font-size: 15px; }
        .benefits { margin: 25px 0; padding: 25px; background: rgba(255, 255, 255, 0.5); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.3); }
        .benefits h3 { color: #ff385c; font-size: 18px; margin-bottom: 15px; font-weight: 800;}
        .benefits ul { margin: 0; padding-left: 20px; color: #1e293b; font-weight: 600;}
        .benefits li { margin-bottom: 10px; font-size: 15px; }
        .footer { background-color: transparent; padding: 30px; text-align: center; font-size: 14px; color: #475569; border-top: 1px solid rgba(255, 255, 255, 0.4); }
        .logo { font-size: 32px; font-weight: 900; margin-bottom: 8px; color: #ff385c; letter-spacing: -1px; }
        .divider { height: 1px; background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1), transparent); margin: 30px 0; }
        .welcome-icon { font-size: 56px; margin-bottom: 15px; text-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <div class="logo">🏠 Airbnb</div>
                <div class="welcome-icon">🎉</div>
                <h1>Welcome ${firstName}!</h1>
                <div class="subtitle">Thanks for joining our global community</div>
            </div>
            
            <div class="content">
                <h2>Almost there! Let's verify your email</h2>
                
                <p>Hi ${firstName} ${lastName},</p>
                
                <p>We're thrilled to have you join Airbnb! To complete your account setup and ensure the security of your account, please verify your email address using the verification code below:</p>
                
                <div class="otp-container">
                    <div class="otp-label">Your Verification Code</div>
                    <div class="otp-code">${otp}</div>
                </div>
                
                <div class="expiry-notice">
                    <strong>⏰ Important:</strong> This verification code will expire in <strong>5 minutes</strong> for your account security.
                </div>
                
                <div class="steps">
                    <h3>📝 How to verify your email:</h3>
                    <ol>
                        <li>Return to the verification page in your browser</li>
                        <li>Enter the 6-digit code: <strong style="color: #ff385c;">${otp}</strong></li>
                        <li>Click "Verify Email" to complete your registration</li>
                    </ol>
                </div>
                
                <div class="divider"></div>
                
                <div class="benefits">
                    <h3>🌟 Once verified, you'll be able to:</h3>
                    <ul>
                        <li><strong>Browse & Book:</strong> Discover unique accommodations worldwide</li>
                        <li><strong>Host:</strong> Share your space and earn money</li>
                        <li><strong>Connect:</strong> Join our global community of travelers</li>
                        <li><strong>Experience:</strong> Access exclusive local experiences</li>
                    </ul>
                </div>
                
                <div class="divider"></div>
                
                <p><strong>Didn't create an account?</strong></p>
                <p>If you didn't sign up for Airbnb, please ignore this email. No account will be created without verification.</p>
            </div>
            
            <div class="footer">
                <p><strong style="color:#0f172a;">Welcome to the Airbnb family!</strong><br>
                <em>The Airbnb Team</em></p>
                <p style="font-size: 12px; color: #64748b; margin-top: 15px;">This is an automated message. Please do not reply to this email.</p>
            </div>
        </div>
    </div>
</body>
</html>`,
      );
      res.status(200).json({
        success: true,
        message: "Signup successful. Please verify your email.",
        redirectTo: `/verify-otp?email=${email}`,
      });
    } catch (err) {
      console.error("Critical Signup Error:", err);
      if (err.code == 11000) {
        return res.status(422).json({
          success: false,
          message: "Email already exists",
        });
      }
      return res.status(500).json({
        success: false,
        message: "An unexpected server error occurred. Please try again.",
      });
    }
  },
];

module.exports = {
  postSignup,
};
