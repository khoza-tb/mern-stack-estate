🏡 PrimePlaceEstate
A modern full-stack real estate web application built with the MERN stack, designed to make property discovery, listing management, and user authentication simple and intuitive.

🌐 Live Demo
https://mern-stack-estate-1-u4na.onrender.com


📌 About The Project
PrimePlaceEstate is a full-stack real estate platform where users can browse properties, create property listings, manage their listings, and securely authenticate using their accounts.
The project was built to demonstrate practical full-stack development skills, including REST APIs, authentication, database management, image uploads, responsive UI development, and deployment.
✨ Features
•	🔐 User registration and authentication
•	🔑 Secure JWT-based authentication
•	👤 User profile management
•	🏠 Create property listings
•	✏️ Update existing listings
•	🗑️ Delete personal listings
•	📋 View personal property listings
•	🔎 Search properties
•	🏷️ Filter properties by:
o	Rent / Sale
o	Price
o	Bedrooms
o	Bathrooms
o	Parking
o	Furnished
o	Special offers
•	🖼️ Cloudinary image uploads
•	📍 Property location and geocoding
•	🛒 Responsive property browsing experience
•	🌙 Modern responsive interface
•	📱 Mobile-friendly design
•	☁️ MongoDB Atlas database
•	🔗 RESTful backend API
🛠️ Tech Stack
Frontend
•	React.js
•	Vite
•	Tailwind CSS
•	React Router
•	Redux Toolkit
•	JavaScript
•	Lucide React
Backend
•	Node.js
•	Express.js
•	MongoDB
•	Mongoose
•	JWT
•	bcryptjs
•	REST API
Services & Tools
•	MongoDB Atlas
•	Cloudinary
•	Git
•	GitHub
•	Vercel
•	Visual Studio Code
🏗️ Project Structure
PrimePlaceEstate/
│
├── api/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── .env
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.jsx
│   │
│   └── ...
│
├── package.json
└── README.md
🔐 Authentication
PrimePlaceEstate uses JWT-based authentication to protect user-specific functionality.
Authenticated users can:
•	Create listings
•	View their own listings
•	Update their listings
•	Delete their listings
•	Manage their profiles
Authentication tokens are handled securely using HTTP-only cookies.
🏠 Property Listings
Each property listing can contain information such as:
•	Property name
•	Description
•	Address
•	Property type
•	Bedrooms
•	Bathrooms
•	Price
•	Discount price
•	Parking availability
•	Furnished status
•	Special offers
•	Property images
•	Geographic coordinates
🖼️ Image Uploads
Property images are uploaded and hosted using Cloudinary, allowing the application to store and display multiple property images without storing large image files directly in MongoDB.
🗄️ Database
The application uses MongoDB Atlas with Mongoose for database management.
The backend provides API endpoints for managing:
•	Users
•	Authentication
•	Property listings
🔌 API Overview
Authentication
POST /api/auth/signup
POST /api/auth/signin
POST /api/auth/google
GET  /api/auth/signout
Listings
POST   /api/listing/create
GET    /api/listing/get
GET    /api/listing/get/:id
GET    /api/listing/my-listings
POST   /api/listing/update/:id
DELETE /api/listing/delete/:id
🚀 Getting Started
1. Clone the repository
git clone https://github.com/khoza-tb/MERN-PLACE-ESTATE.git
2. Navigate into the project
cd MERN-PLACE-ESTATE
3. Install dependencies
npm install
If the frontend and backend have separate dependencies:
cd api
npm install
Then install the frontend dependencies in the frontend directory.
4. Configure environment variables
Create an .env file for the backend and add your required environment variables.
Example:
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=your_verified_sender
For the frontend, configure your Cloudinary variables:
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
5. Start the backend
npm run dev
6. Start the frontend
npm run dev
The application will then be available locally through the Vite development server.
📸 Screenshots
Screenshots of the application will be added here.
🎯 Project Goals
The main goals of PrimePlaceEstate are to:
•	Build a practical full-stack MERN application
•	Implement secure user authentication
•	Work with MongoDB and REST APIs
•	Practice CRUD operations
•	Integrate third-party services
•	Build responsive and modern interfaces
•	Develop real-world software development skills
🔮 Future Improvements
Planned improvements include:
•	💳 Online property booking/payment functionality
•	💬 Property inquiries and messaging
•	❤️ Favorite properties
•	🗺️ Interactive property maps
•	👨💼 Admin dashboard
•	📊 Property analytics
•	📧 Automated email notifications
•	🔔 Real-time notifications
•	⭐ Property reviews and ratings
👨💻 Developer
Tsepo Khoza
Software Developer | IT Support | Cloud Computing
GitHub: https://github.com/khoza-tb
LinkedIn: https://www.linkedin.com/in/khoza-tb/
📄 License
This project is currently developed for educational and portfolio purposes.

