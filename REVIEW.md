# Selection Task for Full Stack Engineer - Review

## 🚀 Overview
This project is a full-stack social media feed application built with **React.js** (Frontend) and **Node.js/Express** (Backend). It features secure JWT authentication, a real-time-like feed, and a robust database layer using **Prisma 7**.

## 🛠 Tech Stack
- **Frontend:** React.js, Tailwind CSS v4, Bootstrap (for layout consistency with provided design).
- **Backend:** Node.js, Express.js.
- **ORM:** Prisma 7 with SQLite (local `database.db`).
- **Authentication:** JWT (JSON Web Tokens).
- **Storage:** Local file storage for post images.

## ✨ Implemented Features
1. **Authentication & Authorization:**
   - Secure Login and Registration matching the original HTML designs.
   - Protected routes using a React Context-based `AuthProvider`.
2. **Feed Functionality:**
   - **Post Creation:** Supports both text and image uploads.
   - **Newest First:** Automatic sorting of posts by creation date.
   - **Privacy Control:** Support for Public vs. Private posts (Private posts only visible to author).
3. **Interactions:**
   - **Likes:** Toggle like/unlike for posts, comments, and replies.
   - **Liker Details:** Hovering over the like count shows the names of people who liked the post.
   - **Comments & Nested Replies:** Full support for commenting and replying to comments with identical design to the provided template.
   - **Sharing:** Integration with the native `navigator.share()` API.
4. **Performance & Scale:**
   - **Pagination:** Backend and frontend support for `page`/`limit` to handle millions of records.
   - **Prisma 7:** Utilizes the latest Prisma features with Driver Adapters for optimized SQLite performance.

## 📁 Project Structure
- `/backend`: Express server, Prisma schema, and SQLite database.
- `/frontend`: React application using Vite.
- `TASK.md`: The original task requirements.

## ⚙️ How to Run
### Backend:
1. `cd backend`
2. `npm install`
3. `npx prisma db push` (to sync schema with `database.db`)
4. `npm start` (Runs on port 5000)

### Frontend:
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Runs on port 5173)

## 📝 Key Decisions
- **Prisma 7 & Driver Adapters:** Chose the latest Prisma 7 with `better-sqlite3` adapter to ensure the application is future-proof and follows the newest industry standards.
- **State Management:** Used React Context for Auth to keep the global user state clean and accessible.
- **Pagination:** Implemented a "Load More" strategy to demonstrate scalability for high-volume data.
