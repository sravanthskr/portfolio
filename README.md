Sravanth Kumar Full Stack Portfolio
This is a full-stack personal portfolio website showcasing my skills, projects, coding profiles, and contact information as a Java Developer and Computer Science student. The frontend is built with HTML, CSS, and JavaScript, integrated with a Node.js/Express.js backend using MongoDB for dynamic content.
Project Structure

index.html: Main HTML file for the frontend structure.
style.css: Custom CSS with variables and responsive design.
script.js: JavaScript for interactivity (sidebar toggle, navigation, project filtering, form validation, backend integration).
assets/images/: Contains favicon, avatar, skill icons, project thumbnails, and coding platform logos.
backend/:
server.js: Main Express.js server file.
package.json: Backend dependencies and scripts.
routes/:
contactRoutes.js: API routes for contact form submissions.
projectRoutes.js: API routes for project data retrieval.


models/:
Contact.js: MongoDB schema for contact form data.
Project.js: MongoDB schema for project data.


controllers/:
contactController.js: Logic for handling contact form submissions.
projectController.js: Logic for retrieving project data.




readme.md: Project documentation (this file).

Dependencies

Frontend:
Google Fonts: Poppins font (CDN).
Ionicons: Icons for social links, contact info, and buttons (CDN).


Backend:
Node.js: Runtime environment.
Express.js: Web framework for APIs.
MongoDB: NoSQL database.
Mongoose: MongoDB ODM.
dotenv: Environment variable management.
cors: Enables cross-origin requests.


Tools:
VS Code: Recommended IDE.
Postman: For API testing.
MongoDB Compass: For database management.



Setup Instructions

Extract or Clone:
Unzip Sravanth_Kumar_Portfolio.zip or clone from https://github.com/sravanthskr/portfolio.


Download Images:
Copy images (e.g., favicon.png, my-avatar.png, project-1.jpg, project-3.jpg, etc.) from https://github.com/sravanthskr/portfolio/tree/main/assets/images to portfolio/assets/images/.


Frontend Setup:
Navigate to portfolio/:
cd portfolio


Serve using a local server:
python -m http.server 8000


Open http://localhost:8000 in a browser.

Verify images load correctly.



Backend Setup:
Navigate to backend/:
cd backend


Install dependencies:
npm install


Create .env in backend/:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string


Sign up for MongoDB Atlas (https://www.mongodb.com/docs/atlas/getting-started/), create a cluster, and get the connection string (e.g., mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority).


Run the server:
node server.js


Test APIs with Postman:

POST http://localhost:5000/api/contacts with JSON:
{"fullname":"Test","email":"test@example.com","message":"Hello"}


GET http://localhost:5000/api/projects to verify project data.





MongoDB Data:
Populate the projects collection in MongoDB (using MongoDB Compass or Atlas UI) with sample data:
[
  {"title":"Online Bookstore","category":"Java","image":"assets/images/project-1.jpg","description":"E-commerce platform"},
  {"title":"Chatbot","category":"AI ML","image":"assets/images/project-3.jpg","description":"AI-powered assistant"}
]





Features

Frontend:
Responsive design for mobile, tablet, and desktop.
Interactive sidebar with toggle for contact info and social links.
Project filtering by category (Java, AI ML, Web Development, UI UX, Flutter) with optimized JavaScript.
Contact form with validation and backend submission (POST /api/contacts).
Coding profile links to LeetCode, Coding Ninjas, HackerRank, and CodeChef.
Dynamic project loading from backend (GET /api/projects) with static fallback.


Backend:
RESTful APIs:
POST /api/contacts: Saves contact form data to MongoDB.
GET /api/projects: Retrieves project data for frontend display.


MongoDB integration for persistent storage.


Live Demo (Frontend): https://sravanthskr.github.io/portfolio/

Testing

Frontend:
Verify sidebar toggle, navigation, and project filtering.
Submit the contact form and check for success/error alerts.
Ensure projects load (dynamic or fallback).


Backend:
Check MongoDB for saved contact entries after form submission.
Confirm /api/projects returns sample data or an empty array.


Tools:
Use Postman to test APIs.
Use MongoDB Compass to inspect the portfolio database.



Author
Sravanth KumarEmail: sravanthskr2004@gmail.comLinkedIn: https://www.linkedin.com/in/sravanth-kumar-skr/
