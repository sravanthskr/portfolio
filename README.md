# Personal Portfolio

This is a full-stack personal portfolio website showcasing my skills, projects, coding profiles, and contact information as a Java Developer and Computer Science student. The frontend is built with HTML, CSS, and JavaScript, integrated with a Node.js/Express.js backend using MongoDB for dynamic content.

---

## Project Structure

```
index.html             --> Main HTML file for the frontend structure
style.css              --> Custom CSS with variables and responsive design
script.js              --> JavaScript for interactivity

assets/images/         --> Contains favicon, avatar, skill icons, project thumbnails, and coding platform logos

backend/
  ├── server.js        --> Main Express.js server file
  ├── package.json     --> Backend dependencies and scripts
  ├── routes/
  │     ├── contactRoutes.js   --> API routes for contact form submissions
  │     └── projectRoutes.js   --> API routes for project data retrieval
  ├── models/
  │     ├── Contact.js         --> MongoDB schema for contact form data
  │     └── Project.js         --> MongoDB schema for project data
  └── controllers/
        ├── contactController.js   --> Logic for handling contact form submissions
        └── projectController.js   --> Logic for retrieving project data

readme.md              --> Project documentation (this file)
```

---

## Dependencies

### Frontend:
- **Google Fonts**: Poppins (via CDN)
- **Ionicons**: Icons for social links, contact info, and buttons (via CDN)

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **dotenv**
- **cors**

### Tools:
- **VS Code**: Recommended IDE
- **Postman**: For API testing
- **MongoDB Compass**: For database management

---

## Setup Instructions

### Extract or Clone
```bash
Unzip Sravanth_Kumar_Portfolio.zip 
# OR
git clone https://github.com/sravanthskr/portfolio
```

### Download Images
Download and place images (e.g., `favicon.png`, `my-avatar.png`, `project-1.jpg`, etc.) from:  
[GitHub Assets](https://github.com/sravanthskr/portfolio/tree/main/assets/images)  
into:  
`portfolio/assets/images/`

---

### Frontend Setup
```bash
cd portfolio
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.  
Make sure images load correctly.

---

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

> Sign up at [MongoDB Atlas](https://www.mongodb.com/docs/atlas/getting-started/), create a cluster, and get the connection string:
```
mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
```

Run the server:
```bash
node server.js
```

Test APIs with **Postman**:

#### POST Contact Form
```
POST http://localhost:5000/api/contacts
Body (JSON):
{
  "fullname": "Test",
  "email": "test@example.com",
  "message": "Hello"
}
```

#### GET Projects
```
GET http://localhost:5000/api/projects
```

---

## MongoDB Data Sample

Populate your `projects` collection:

```json
[
  {
    "title": "Online Bookstore",
    "category": "Java",
    "image": "assets/images/project-1.jpg",
    "description": "E-commerce platform"
  },
  {
    "title": "Chatbot",
    "category": "AI ML",
    "image": "assets/images/project-3.jpg",
    "description": "AI-powered assistant"
  }
]
```

---

## Features

### Frontend:
- Responsive design (mobile, tablet, desktop)
- Interactive sidebar with toggle
- Project filtering by category (Java, AI ML, Web Development, UI UX, Flutter)
- Contact form with validation and backend submission
- Coding profile links: LeetCode, Coding Ninjas, HackerRank, CodeChef
- Dynamic project loading from backend (GET /api/projects) with static fallback

### Backend:
- RESTful APIs:
  - **POST /api/contacts**: Saves contact form data to MongoDB
  - **GET /api/projects**: Retrieves project data for frontend display
- MongoDB integration for persistent storage

---

## Live Demo

[https://sravanthskr.github.io/portfolio/](https://sravanthskr.github.io/portfolio/)

---

## Testing

### Frontend:
- Verify sidebar toggle, navigation, and project filtering
- Submit the contact form and check for success/error alerts
- Ensure projects load (dynamic or fallback)

### Backend:
- Check MongoDB for saved contact entries after form submission
- Confirm `/api/projects` returns sample data or an empty array

### Tools:
- Use **Postman** to test APIs
- Use **MongoDB Compass** to inspect the portfolio database

---

## 👨‍💻 Author

**Sravanth Kumar**  
📧 Email: [sravanthskr2004@gmail.com](mailto:sravanthskr2004@gmail.com)  
🔗 LinkedIn: [https://www.linkedin.com/in/sravanth-kumar-skr/](https://www.linkedin.com/in/sravanth-kumar-skr/)
