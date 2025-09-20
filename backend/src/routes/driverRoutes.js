import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Driver from "../models/Driver.js";

const router = express.Router();

// Register driver
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, carModel, carNumber, area } = req.body;
    const existing = await Driver.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const driver = await Driver.create({ name, email, password: hashed, phone, carModel, carNumber, area });
    res.status(201).json({ message: "Driver registered", driver: { ...driver.toObject(), password: undefined } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login driver
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ email });
    if (!driver) return res.status(400).json({ error: "Invalid credentials" });
    const match = await bcrypt.compare(password, driver.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: driver._id, role: "driver" }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
    res.json({ token, driver: { ...driver.toObject(), password: undefined } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
