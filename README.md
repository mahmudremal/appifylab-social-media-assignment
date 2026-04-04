# Selection Task for Full Stack Engineer at Appifylab

This project is a conversion of provided HTML/CSS pages into a full-stack React.js application with a Node.js backend.

## Features Implemented
1. **Authentication & Authorization**
   - Secure JWT-based authentication.
   - User registration (First Name, Last Name, Email, Password).
   - User login and logout.
   - Protected routes for the Feed page.

2. **Feed Page**
   - Create posts with text and image uploads.
   - Display posts with the newest first.
   - Support for Private and Public posts.
   - Like/Unlike system for posts, comments, and replies.
   - Nested comments and replies.
   - Hover state to show who liked a post/comment/reply.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS (for layout/logic), Original CSS (for design fidelity), React Router, Axios.
- **Backend**: Node.js (Express), Prisma ORM.
- **Database**: SQLite (easy to run and verify).
- **Security**: JWT for session management, Bcrypt for password hashing.

## How to Run

### 1. Backend Setup
```bash
cd backend
npm install
npx prisma db push
npm run dev
```
The backend will run on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Design Decisions
- **Design Fidelity**: I used the original CSS files provided in the assets to ensure 100% design fidelity as requested ("Stick to the provided design").
- **Clean Code**: Logic is separated into controllers, routes, and middleware in the backend. In the frontend, I used Context API for state management and atomic components for the UI.
- **Scalability**: The database schema is designed with relations to handle likes, comments, and replies efficiently. Basic pagination is implemented in the backend `getPosts` to demonstrate awareness of large data handling.
- **User Experience**: Immediate UI updates for likes and comments, with error handling and loading states.

## Database Schema
- **User**: Basic profile info.
- **Post**: Content, image, privacy setting.
- **Comment**: Linked to post.
- **Reply**: Linked to comment.
- **Like**: Polymorphic-like structure (linked to postId, commentId, or replyId) to track likes across the platform.
