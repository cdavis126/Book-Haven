# 📚 Book Haven - GraphQL Book Search Engine

## 🌍 Live Demo  
Deployed App: [Click here to view](https://book-haven-d92y.onrender.com)  

---

## 📖 Description  
**Book Haven** is a **MERN stack application** that allows users to search for books using the **Google Books API** and save their favorite books to their personal library.  

This project was originally built using **RESTful APIs** but has been **refactored to use Apollo Server and GraphQL** for enhanced performance and flexibility.

### **Motivation:**  
This project was built to practice **GraphQL API implementation**, authentication, and database integration using **MongoDB Atlas**.

### **Why Build This Project?**  
- To learn **Apollo Server** and **GraphQL Queries & Mutations**  
- To improve **React front-end performance** with Apollo Client  
- To implement **MongoDB Atlas for cloud-based data storage**  

### **Problems Solved:**  
- Migrated from **RESTful API to GraphQL**, improving query efficiency.  
- Implemented **JWT Authentication** for secure user logins.  
- Allowed users to **search for books, save them, and manage their collection**.  

### **What I Learned:**  
✅ **Apollo Server & GraphQL Mutations**  
✅ **Using Apollo Client for state management**  
✅ **Connecting MongoDB Atlas to a cloud-deployed backend**  
✅ **JWT Authentication in a GraphQL environment**  

---

## 📌 Table of Contents  
- [Installation](#installation)  
- [Usage](#usage)  
- [Features](#features)  
- [Contributing](#contributing)  
- [License](#license)  
- [Tests](#tests)  
- [Questions](#questions)  

---

## 🔧 Installation  
To install and run **Book Haven** locally, follow these steps:

### **1️⃣ Clone the Repository & Install Dependencies**  
bash
git clone https://github.com/CDavis126/book-haven.git
cd book-haven
npm install


# ### **2️⃣ Set Up Environment Variables**

Create a `.env` file in the `server/` directory and add:
.env
 
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@yourCluster.mongodb.net/bookhaven?retryWrites=true&w=majority
JWT_SECRET_KEY=yourKEY

### **3️⃣ Start the Server & Client**

Run the backend and frontend concurrently: npm run develop
The app will be available at `http://localhost:3001/`.

## 📖 ** Usage**


### **1️⃣ Search for Books**

-   Enter a **search term** in the input field.
-   View a list of books from the **Google Books API**.

### **2️⃣ Login / Signup**

-   Create an account or log in to save books.
-   Authentication is handled using **JWT tokens**.

### **3️⃣ Save Books to Your Account**

-   Click **"Save This Book"** to store books in your personal collection.
-   View your saved books under **"My Library"**.

### **4️⃣ Remove Books**

-   Click **"Remove"** on any book to delete it from your library.

## 🚀 Features

✅ **GraphQL API using Apollo Server**  
✅ **MongoDB Atlas for cloud-based storage**  
✅ **JWT Authentication for secure logins**  
✅ **React + Apollo Client for state management**  
✅ **Google Books API Integration**  
✅ **Responsive UI with Bootstrap**

# 🤝 Contributing

This project was built using:

-   **React (Vite) + Apollo Client** for the front-end
-   **Express + Apollo Server + MongoDB** for the back-end
-   **GraphQL Mutations & Queries** to replace RESTful API
-   **JWT Authentication** for secure logins

### **Additional resources used:**

💡 **GraphQL Docs** – Apollo Client & Server Integration  
🔍 **MongoDB Atlas** – Database management  
⚡ **Render Deployment Docs** – Hosting and cloud integration

## 📜 License

This project is licensed under the **MIT License**.

## 🛠 Tests

✔️ Manual testing with **GraphQL Playground**  
✔️ Debugging in **Chrome DevTools & VS Code**  
✔️ Ensured mobile responsiveness

## ❓ Questions

📌 **GitHub:** [CDavis126](https://github.com/CDavis126)  
📌 **Email:** [CherieDavis126@gmail.com](mailto:CherieDavis126@gmail.com)