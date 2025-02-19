import { useState } from "react";

const EmailGenerator = () => {
    const [feedback, setFeedback] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [attachments, setAttachments] = useState([]);


    const handleFileChange = (event) => {
        setAttachments([...event.target.files]); 
    };
    

    const generateEmail = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:4000/api/v1/generate-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedback }),
            });
            const data = await response.json();
            // console.log(data);
    
            setSubject(data.subject || "Generated Subject");
            setBody(data.body || "Generated Email Content");
        } catch (error) {
            console.error("Error:", error);
        }
        setLoading(false);
    };

    const sendEmail = async () => {
        //alert(`Email Sent to: ${email}\nSubject: ${subject}\nBody: ${body}`);
            if (!email || !subject || !body) {
                alert("Please fill in all email details before sending.");
                return;
            }
          
    const formData = new FormData();
    formData.append("to", email);
    formData.append("subject", subject);
    formData.append("text", body);

    // Append multiple files
     if (attachments.length > 0) {
         for (let i = 0; i < attachments.length; i++) {
           formData.append("attachments", attachments[i]);
    }
}


    console.log("Sending email with data:", {
        to: email,
        subject: subject,
        text: body,
        attachments: attachments,
    });
            try {
                const response = await fetch("http://localhost:4000/api/v1/send-email", {
                    method: "POST",
                    //headers: { "Content-Type": "application/json" },
                    //body: JSON.stringify({ email, subject, body }),
                    body: formData,
                });
        
                const data = await response.json();
                console.log("Send Email Response:", data);
        
                if (response.ok) {
                    alert("Email sent successfully!");
                } else {
                    alert(`Failed to send email: ${data.message || "Unknown error"}`);
                }
            } catch (error) {
                console.error("Error sending email:", error);
                alert("An error occurred while sending the email. Please try again.");
            }
        };

        const saveDraft = async () => {
            if (!email) {
                alert("Please enter at least a recipient email before saving the draft.");
                return;
            }
        
            const formData = new FormData();
            formData.append("userEmail", email);
            formData.append("to", email);
            formData.append("subject", subject);
            formData.append("text", body);
        
            if (attachments.length > 0) {
                attachments.forEach((file) => formData.append("attachments", file));
            }
        
            try {
                const response = await fetch("http://localhost:4000/api/v1/save-draft", {
                    method: "POST",
                    body: formData,
                });
        
                const data = await response.json();
                if (data.success) {
                    alert("Draft saved successfully!");
                } else {
                    alert(`Failed to save draft: ${data.message}`);
                }
            } catch (error) {
                console.error("Error saving draft:", error);
                alert("An error occurred while saving the draft.");
            }
        };
        

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-pink-500 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600">AI-Powered Email Generator</h2>

                {/* Feedback Input */}
                <textarea 
                    className="w-full border border-blue-300 rounded-lg p-3 mt-4 focus:ring focus:ring-blue-300 outline-none"
                    value={feedback} 
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter feedback for email..."
                />

                <button 
                    onClick={generateEmail} 
                    disabled={loading}
                    className={`w-full mt-4 py-2 rounded-lg text-white font-semibold transition duration-300 
                        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {loading ? "Generating..." : "Generate Email"}
                </button>

                {/* Email Editing Section */}
                {(subject || body) && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-pink-600">Edit & Send Email</h3>

                        {/* Email Input */}
                        <label className="block mt-2 text-gray-600 font-semibold">To:</label>
                        <input 
                            type="email"
                            className="w-full border border-pink-300 rounded-lg p-2 focus:ring focus:ring-pink-300 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter recipient email"
                        />

                        {/* Subject Input */}
                        <label className="block mt-2 text-gray-600 font-semibold">Subject:</label>
                        <input 
                            type="text"
                            className="w-full border border-pink-300 rounded-lg p-2 focus:ring focus:ring-pink-300 outline-none"
                            value={subject} 
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter email subject"
                        />

                        {/* Body Input */}
                        <label className="block mt-2 text-gray-600 font-semibold">Body:</label>
                        <textarea 
                            className="w-full border border-pink-300 rounded-lg p-3 mt-2 focus:ring focus:ring-pink-300 outline-none"
                            value={body} 
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter email body"
                            rows="5"
                        />
                         <label className="block mt-2 text-gray-600 font-semibold">Attachments:</label>
                        <input
                            type="file"
                            multiple
                            className="w-full border border-pink-300 rounded-lg p-2 focus:ring focus:ring-pink-300 outline-none"
                            onChange={handleFileChange}
/>

                        <button 
                            onClick={sendEmail} 
                            className="w-full mt-4 py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition duration-300"
                        >
                            Send Email
                        </button>
                        <button 
                            onClick={saveDraft} 
                            className="w-full mt-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition duration-300"
                        >
                             Save Draft
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailGenerator;
