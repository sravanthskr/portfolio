Sravanth_Kumar_Portfolio/README.md
# Sravanth Kumar Full Stack Portfolio

This is a full-stack personal portfolio website showcasing my skills, projects, coding profiles, and contact information as a Java Developer and Computer Science student. The frontend is built with HTML, CSS, and JavaScript, while the backend uses Node.js, Express.js, and MongoDB for dynamic content management.

## Project Structure
- **index.html**: Main HTML file for the frontend structure.
- **assets/**:
  - **css/style.css**: Custom CSS with variables and responsive design.
  - **js/script.js**: JavaScript for interactivity (sidebar, navigation, project filtering, form validation, backend integration).
  - **images/**: Contains favicon, skill icons, project thumbnails, and coding platform logos.
- **backend/**:
  - **server.js**: Main Express.js server file.
  - **package.json**: Backend dependencies and scripts.
  - **routes/**:
    - **contactRoutes.js**: API routes for contact form submissions.
    - **projectRoutes.js**: API routes for project data.
  - **models/**:
    - **Contact.js**: MongoDB schema for contact form data.
    - **Project.js**: MongoDB schema for project data.
  - **controllers/**:
    - **contactController.js**: Logic for handling contact form submissions.
    - **projectController.js**: Logic for retrieving project data.

## Dependencies
- **Frontend**:
  - **Google Fonts**: Poppins font (loaded via CDN).
  - **Ionicons**: Icons for social links, contact info, and buttons (loaded via CDN).
- **Backend**:
  - **Node.js**: Runtime environment.
  - **Express.js**: Web framework for API development.
  - **MongoDB**: NoSQL database for storing contacts and projects.
  - **Mongoose**: ODM for MongoDB.
  - **dotenv**: Environment variable management.
  - **cors**: Cross-origin resource sharing for frontend-backend communication.
- **Tools**:
  - **VS Code**: Recommended IDE.
  - **Postman**: For testing API endpoints.
  - **MongoDB Compass**: For managing MongoDB databases.

## Setup Instructions
1. **Clone or Download**:
   - Clone from [https://github.com/sravanthskr/portfolio](https://github.com/sravanthskr/portfolio).
2. **Frontend Setup**:
   - Navigate to the project root.
   - Serve using a local server:
     ```bash
     python -m http.server 8000
     ```
   - Open `http://localhost:8000` in a browser.
   - Verify all images in `assets/images/` are present and load correctly.
3. **Backend Setup**:
   - Navigate to `backend/`:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in `backend/` with:
     ```plaintext
     PORT=5000
     MONGO_URI=your_mongodb_atlas_connection_string
     ```
     - Sign up for MongoDB Atlas, create a cluster, and obtain the connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`).
   - Run the server:
     ```bash
     node server.js
     ```
   - Test API endpoints using Postman (e.g., `POST http://localhost:5000/api/contacts` with JSON: `{"fullname":"Test","email":"test@example.com","message":"Hello"}`).
4. **Fixes**:
   - The GitHub social link in `index.html` (line 135) is updated to `https://github.com/sravanthskr`.
   - The `data-selecct-value` typo in `index.html` (line 251) is fixed to `data-select-value`.
5. **Testing**:
   - Ensure the contact form submits to the backend and shows a success/error message.
   - Verify projects load dynamically from the `/api/projects` endpoint.

## Features
- **Frontend**:
  - **Responsive Design**: Adapts to mobile, tablet, and desktop screens.
  - **Interactive Sidebar**: Toggles on mobile to show contact info and social links.
  - **Project Filtering**: Filters projects by category (Java, AI ML, Web Development, UI UX, Flutter).
  - **Contact Form**: Validates input and submits to the backend API.
  - **Coding Profiles**: Links to LeetCode, Coding Ninjas, HackerRank, and CodeChef.
- **Backend**:
  - **API Endpoints**:
    - `POST /api/contacts`: Saves contact form submissions to MongoDB.
    - `GET /api/projects`: Retrieves project data from MongoDB.
  - **MongoDB Integration**: Stores dynamic data for contacts and projects.
- **Live Demo (Frontend)**: [https://sravanthskr.github.io/portfolio/](https://sravanthskr.github.io/portfolio/)

## Author
Sravanth Kumar  
Email: sravanthskr2004@gmail.com  
LinkedIn: [https://www.linkedin.com/in/sravanth-kumar-skr/](https://www.linkedin.com/in/sravanth-kumar-skr/)
