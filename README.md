# AI_Powered_Email_Generator
App link https://ai-powered-email-generator-frontend-9nzpk4c2t.vercel.app/

git clone https://github.com/Happyyadav007/Ai_Powered_email_generator_app.git
cd Ai_Powered_email_generator_app.git


cd email-generator
npm install

cd  server
npm install

Create a .env file in the backend directory and configure the following:

PORT = 4000
MONGODB_URL = "your_Mongodb_url"

GEMINI_API_KEY = "your_gemini_api_key"

MAIL_HOST = smtp.gmail.com
MAIL_USER = 'your_email'
MAIL_PASS = 'your_app_password'


cd email-generator
npm start

cd  server
node index.js
