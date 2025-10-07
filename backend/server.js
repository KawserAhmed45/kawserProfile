const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  // Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your Gmail
      pass: process.env.EMAIL_PASS  // app password (see below)
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // your Gmail
    subject: `New message from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
