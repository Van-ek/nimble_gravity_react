# Nimble Gravity React Challenge

A frontend mini-application developed in React to manage job applications. This project was built as a solution to a technical challenge, focusing on code quality, user experience (UX), and robust HTTP request handling.

## 📋 Features

- **Candidate Search:** Allows the user to enter their email to retrieve their information (UUID and Candidate ID).
- **Job Listings:** Dynamically fetches and renders open positions from the API.
- **Agile Application:** Each job offer features an independent form to submit the GitHub repository URL.
- **State Management:** Clear visual feedback for the user during `loading`, success, and error states.
- **Validations:** Basic validation for valid GitHub URLs before submitting the request.

## 🛠️ Technologies Used

- **React:** Core library for building the UI.
- **Vite + SWC:** Ultra-fast development environment and bundler.
- **JavaScript (ES6+):** Application logic and promise handling (async/await).
- **Pure CSS:** Clean and responsive styles without external dependencies.

## 🏗️ Architecture & Technical Decisions

To adhere to best practices and SOLID principles, the project was structured as follows:

1. **Single Responsibility Principle (SRP):** Network logic and `fetch` requests are isolated in `src/services/api.js`. React components don't know how data is fetched; they only consume it.
2. **Componentization:** The `JobItem.jsx` component was created to encapsulate the logic of each individual application. This ensures that if one request fails, the error is handled locally without affecting the rest of the job list.
3. **Error Handling:** Implementation of `try/catch` blocks for both global network errors (e.g., API down) and local application errors, always providing clear feedback to the user on the interface.
