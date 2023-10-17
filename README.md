Socket Chat App Socket Chat App is a real-time chat application built using React.js and Socket.io. It allows users to join chat rooms, send messages, and engage in conversations in real-time. The project is bootstrapped with Create React App and utilizes Socket.io for real-time communication.

Project Structure src/App.js: Main component responsible for rendering the chat interface. Handles user input, room joining, and renders the Chat component. src/Chat.js: Component responsible for displaying chat messages, sending messages, and handling real-time communication with the server using Socket.io. src/App.css: Styles for the main application including the login page and chat interface. src/Chat.css: Styles specific to the chat interface. public/ranger-4df6c1b6.png: Background image used in the application. Prerequisites Before you begin, ensure you have Node.js and npm installed on your system.

Installation Clone the repository:

bash Copy code git clone Navigate to the project directory:

bash Copy code cd socket-chat-app Install dependencies:

bash Copy code npm install Running the Application Start the development server:

bash Copy code npm start This will run the app in development mode. Open http://localhost:3000 to view it in your browser.

Usage Login Page: Enter your username and the desired room name. The username must be at least 6 characters long. Chat Interface: Once logged in, you can send messages in real-time. Messages are displayed with the sender's name and a timestamp. Styling The application uses custom CSS styles to create an engaging and user-friendly interface. Fonts are imported from Google Fonts for a modern and aesthetic look. Additional Information Socket.io: Real-time communication is achieved using Socket.io, enabling seamless and instant message delivery. React Scroll To Bottom: The chat interface features automatic scrolling to the latest messages using the react-scroll-to-bottom library.
