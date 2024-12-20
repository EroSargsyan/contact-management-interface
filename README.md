# Contact Management Interface

A modern web application for managing contacts built with **React**, **TanStack Router**, **React Query**, and **Tailwind CSS**.

---

## Features

- **Contact Management**: Create, view, edit, and delete contacts.
- **Dynamic Routing**: Implemented with **TanStack Router** for seamless navigation.
- **React Query Integration**: Optimized data fetching and mutations with caching.
- **Form Validation**: Integrated form validation using **zod** and **@tanstack/react-form**.
- **Responsive Design**: Styled with **Tailwind CSS** for a modern and responsive UI.
- **JSON Server**: Used as a mock backend to simulate a REST API.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+)
- **npm** or **yarn**

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EroSargsyan/contact-management-interface.git
   cd contact-management-interface
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

### Scripts

| **Script**           | **Description**                                   |
|----------------------|---------------------------------------------------|
| `npm run dev`        | Start the development server with **Vite**.       |
| `npm run build`      | Build the application for production.             |
| `npm run lint`       | Run **ESLint** for linting the codebase.          |
| `npm run preview`    | Preview the production build.                     |
| `npm run server`     | Start the mock JSON server at `http://localhost:3001`. |

---

### Usage

1. Start the mock JSON server:

   ```bash
   npm run server
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:

   ```
   http://localhost:5173
   ```

---

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **TanStack Router**: Modern routing library for React applications.
- **React Query**: Data fetching and state management.
- **Zod**: Schema validation for **TypeScript**.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Backend

- **JSON Server**: Mock backend to simulate API requests.

### Development Tools

- **Vite**: Fast development build tool.
- **TypeScript**: Strongly typed JavaScript.
- **ESLint**: Linter for code consistency.
- **PostCSS**: For processing CSS.

---

## Folder Structure

```bash
src/
├── assets/           # Assets folder
├── components/       # Reusable components
├── hooks/            # Custom hooks (e.g., ContactsContext)
├── routes/           # Route definitions
├── services/         # API service functions
├── styles/           # Tailwind and global styles
├── types/            # TypeScript type definitions
└── App.tsx           # Main application entry point
```

---

## API Endpoints (JSON Server)

- **Get All Contacts**: `GET /users`
- **Get Contact Details**: `GET /users/:id`
- **Create Contact**: `POST /users`
- **Update Contact**: `PUT /users/:id`
- **Delete Contact**: `DELETE /users/:id`

---

## Deployment

1. Build the production-ready files:

   ```bash
   npm run build
   ```

2. Serve the files using any static server or deployment platform (e.g., **Vercel**, **Netlify**).

---

## License

This project is licensed under the **MIT License**.

---

## Acknowledgements

- **React**
- **TanStack Router**
- **React Query**
- **Tailwind CSS**
- **JSON Server**

---

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m 'Add some feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

