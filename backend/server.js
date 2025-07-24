const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./user');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:SAFTEYYY", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (email ==="" || password ==="") {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ email, password });
    return res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Please fil in the correct" });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email ==="" || password === "") {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
