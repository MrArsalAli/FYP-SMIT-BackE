import nodemailer from "nodemailer";

export const sendMail = async (email, name, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "smitgulshancampus@gmail.com",
      pass: "lmsforsmit010203040506",
    },
  });

  const mailOptions = {
    from: "smitgulshancampus@gmail.com",
    to: email,
    subject: "Welcome to Our App",
    text: `Hi ${name},\n\nYour account has been created successfully!\n\nThank you for joining us!\n\n login with ${email} and ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
