import nodemailer from "nodemailer";

export const sendMail = async (email, name, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Welcome to Our App",
    text: `Hi ${name},\n\nYour account has been created successfully!\n\nThank you for joining us!\n\n login with Email: ${email} and Password: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
