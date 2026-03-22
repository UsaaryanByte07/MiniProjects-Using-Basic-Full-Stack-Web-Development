const validator = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../../utils/email-util");
const crypto = require("crypto");
const {passwordValidator, confirmPasswordValidator} =  require('../../utils/validator-util')

const getResetPassword = (req, res, next) => {
  const { token, email } = req.query;
  res.status(200).json({success: true, token, email });
};

const postResetPassword = [
  passwordValidator,
  async (req, res, next) => {
    const { email, token, password, confirmPassword} = req.body;
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array(), email, token });
    }

    try {
      const user = await User.findOne({ email });
      if(!user) {
        return res.status(404).json({ success: false, message: "User not found", email, token });
      }
      if(!user.resetToken || user.resetToken !== token) {
        return res.status(400).json({ success: false, message: "Invalid reset token", email, token });
      }
      if (user.resetTokenExpiry <= Date.now()) {
        return res.status(400).json({ success: false, message: "Reset token has expired", email, token });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      user.resetToken = "";
      await user.save();
      return res.json({ success: true, message: "Password has been reset successfully"});
      }catch (err) {
      return res.status(500).json({ success: false, message: "An error occurred while resetting the password. Please try again later.", email, token });
    }
  },
];

const postForgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found", email });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendEmail(
      email,
      "Reset Your Airbnb Password",
      `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #0f172a; margin: 0; padding: 40px 20px; background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center;}
        .wrapper { max-width: 600px; width: 100%; margin: 0 auto; }
        .container { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
        .header { background: transparent; color: #0f172a; padding: 40px 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 800; color: #ff385c; }
        .content { padding: 20px 40px 40px; }
        .content h2 { color: #0f172a; margin-bottom: 20px; font-size: 22px; font-weight: 800;}
        .content p { margin-bottom: 15px; font-size: 16px; line-height: 1.6; color: #1e293b; font-weight: 500;}
        .button-container { text-align: center; margin: 35px 0; }
        .reset-button { display: inline-block; background: #ff385c; color: white !important; padding: 16px 36px; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 16px; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(255, 56, 92, 0.3); border: 1px solid rgba(255, 255, 255, 0.2); }
        .reset-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255, 56, 92, 0.4); }
        .security-notice { background-color: rgba(255, 255, 255, 0.6); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 12px; padding: 15px; margin: 25px 0; color: #0f172a; font-weight: 600; text-align: center;}
        .footer { background-color: transparent; padding: 30px; text-align: center; font-size: 14px; color: #475569; border-top: 1px solid rgba(255, 255, 255, 0.4); }
        .logo { font-size: 32px; font-weight: 900; margin-bottom: 10px; color: #ff385c; letter-spacing: -1px;}
        .divider { height: 1px; background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1), transparent); margin: 30px 0; }
        .link-box { word-break: break-all; background-color: rgba(255, 255, 255, 0.5); border: 1px solid rgba(255, 255, 255, 0.3); color: #475569; padding: 12px; border-radius: 10px; font-family: monospace; font-size: 13px; font-weight: 600;}
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <div class="logo">🏠 Airbnb</div>
                <h1>Password Reset Request</h1>
            </div>
            
            <div class="content">
                <h2>Hello! 👋</h2>
                
                <p>We received a request to reset the password for your Airbnb account associated with <strong style="color: #ff385c;">${email}</strong>.</p>
                
                <p>To create a new password, simply click the button below:</p>
                
                <div class="button-container">
                    <a href="http://localhost:5173/reset-password?token=${token}&email=${email}" class="reset-button">
                        Reset My Password
                    </a>
                </div>
                
                <div class="security-notice">
                    <strong>⚠️ Security Notice:</strong> This link will expire in <strong>5 minutes</strong> for your account security.
                </div>
                
                <div class="divider"></div>
                
                <p><strong>Didn't request a password reset?</strong></p>
                <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged and your account is secure.</p>
                
                <p>If you're having trouble clicking the button above, copy and paste the following link into your browser:</p>
                <div class="link-box">
                    http://localhost:5173/reset-password?token=${token}&email=${email}
                </div>
            </div>
            
            <div class="footer">
                <p><strong style="color:#0f172a;">Best regards,</strong><br>
                <em>The Airbnb Team</em></p>
                <p style="font-size: 12px; color: #64748b; margin-top: 15px;">This is an automated message. Please do not reply to this email.</p>
            </div>
        </div>
    </div>
</body>
</html>`,
    );

    res.status(200).json({ success: true, message: "Password reset email sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
};

module.exports = {
    postForgotPassword,
    postResetPassword,
    getResetPassword,
};