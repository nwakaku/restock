/* eslint-disable no-control-regex */
/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate-list", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://api.sambanova.ai/v1/chat/completions",
      {
        stream: false,
        model: "Meta-Llama-3.1-8B-Instruct",
        messages: [
          {
            role: "system",
            content:
              "( no additional text ) You are a shopping assistant that helps create grocery lists. Return responses in JSON format with an array of items containing id, name, price, quantity, unit, and category only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SAMBANOVA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Sanitize the response data
    const sanitizedData = JSON.stringify(response.data).replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
    res.json(JSON.parse(sanitizedData));

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate list" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
