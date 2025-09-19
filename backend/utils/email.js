import nodemailer from "nodemailer";

// Create a transporter using Ethereal
export const createTransporter = async () => {
  const testAccount = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `"Survey Department" <${transporter.options.auth.user}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent! Message ID:", info.messageId);

    // Preview URL in browser
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
