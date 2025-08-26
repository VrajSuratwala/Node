const nodemailer = require('nodemailer');

function makeTransporter(env) {
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT || 587),
    secure: false,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
  });
}

async function sendWelcomeEmail(env, to, { name, empId, password }) {
  const transporter = makeTransporter(env);
  const info = await transporter.sendMail({
    from: env.FROM_EMAIL,
    to,
    subject: `Welcome to the company, ${name}!`,
    html: `
      <h3>Hi ${name},</h3>
      <p>Your employee account has been created.</p>
      <p><b>Employee ID:</b> ${empId}<br/>
         <b>Temporary Password:</b> ${password}</p>
      <p>Please login and change your password.</p>
      <p>Regards,<br/>HR</p>
    `
  });
  return info.messageId;
}

module.exports = { sendWelcomeEmail };
