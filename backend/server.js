/* eslint-disable no-control-regex */
/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const https = require('https');

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
          Authorization: `Bearer 12a3f936-d438-4f11-a081-2642ef81ade2`,
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

app.get("/api/verify-payment/:reference", async (req, res) => {
  try {
    // Validate reference parameter
    if (!req.params.reference) {
      return res.status(400).json({ error: "Payment reference is required" });
    }

    // Store sensitive data in environment variables
    const PAYSTACK_SECRET_KEY =
      "sk_test_cc28b1c75b11d2ac75ed64a1a91aa59fdac8373b";
    const PAYSTACK_API_URL = "api.paystack.co";

    const options = {
      hostname: PAYSTACK_API_URL,
      port: 443,
      path: `/transaction/verify/${encodeURIComponent(req.params.reference)}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    // Create a Promise-based wrapper for the request
    const verificationResult = await new Promise((resolve, reject) => {
      const verificationRequest = https.request(options, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          try {
            const paymentData = JSON.parse(data);
            resolve(paymentData);
          } catch {
            reject(new Error("Failed to parse payment data"));
          }
        });
      });

      verificationRequest.on("error", (error) => {
        reject(error);
      });

      // Set request timeout
      verificationRequest.setTimeout(10000, () => {
        verificationRequest.destroy();
        reject(new Error("Request timeout"));
      });

      verificationRequest.end();
    });

    // Verify the payment status
    if (
      verificationResult.data &&
      verificationResult.data.status === "success"
    ) {
      // You might want to update your database here
      return res.json({
        success: true,
        data: verificationResult.data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
        data: verificationResult.data,
      });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during payment verification",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "An error occurred",
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
