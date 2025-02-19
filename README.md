﻿# AI_Powered_Email_Generator
App link https://ai-powered-email-generator-frontend-9nzpk4c2t.vercel.app/

git clone https://github.com/Happyyadav007/Ai_Powered_email_generator_app.git
cd Ai_Powered_email_generator_app.git


cd email-generator
npm install

cd  server
npm install

Create a .env file in the backend directory and configure the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
EMAIL_SERVICE_API_KEY=your_email_service_api_key


cd email-generator
npm start

cd  server
node index.js
