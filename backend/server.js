require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: "GET,POST",
  allowedHeaders: "Content-Type",
};
app.use(cors(corsOptions));
app.use(express.json());

// Ensure MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error("⚠️ Error: MONGO_URI is not defined in the .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Define Contact Schema
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String },
    consent: { type: Boolean, required: true },
  },
  { timestamps: true }
);
const Contact = mongoose.model("Contact", contactSchema);

// API Route to handle form submission
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message, consent } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !consent) {
      return res.status(400).json({ success: false, message: "All required fields must be filled." });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, phone, message, consent });
    await newContact.save();

    res.status(201).json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
