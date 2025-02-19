const Draft = require("../models/Draft");


exports.saveDraft = async (req, res) => {
    try {
        const { userEmail, to, subject, text } = req.body;
        const attachments = req.files?.map((file) => ({
            filename: file.originalname,
            path: file.path,
        })) || [];

        const draft = await Draft.create({ userEmail, to, subject, text, attachments });

        res.status(201).json({ success: true, message: "Draft saved successfully!", draft });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error saving draft", error: error.message });
    }
};

// exports.getUserDrafts = async (req, res) => {
//     try {
//         const { userEmail } = req.params;
//         const drafts = await Draft.find({ userEmail });

//         res.status(200).json({ success: true, drafts });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error fetching drafts", error: error.message });
//     }
// };
