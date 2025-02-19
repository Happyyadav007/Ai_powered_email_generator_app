const axios = require("axios");
require("dotenv").config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.generateEmail = async (req, res) => {
    try {
        const { feedback } = req.body;

        if (!feedback) {
            return res.status(400).json({ error: "Feedback input is required" });
        }

        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ 
                            text: `Generate a professional email based on this input: "${feedback}".
                            Provide the response in pure JSON format without markdown, no backticks, just raw JSON:
                            {
                                "subject": "Your email subject",
                                "body": "Your email body"
                            }`
                        }]
                    }
                ]
            }
        );

        // Extract response text
        let emailText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        // Remove potential Markdown code block formatting
        emailText = emailText.replace(/```json|```/g, "").trim();

        const { subject, body } = JSON.parse(emailText);

        res.json({ subject: subject || "No Subject", body: body || "No Body" });

    } catch (error) {
        console.error("Error generating email:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate email" });
    }
};
