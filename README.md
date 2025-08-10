# Estate

A modern real estate application built with React and Vite, providing a fast, responsive, and visually appealing property browsing experience.

## Project Setup and Features Added

- Created React app with **Vite** for fast development and hot module replacement (HMR)
- Configured **Tailwind CSS** for styling
- Implemented **Header** component
  - Logo and navigation menu
  - Smooth scrolling to page sections (Home, About, Contact)
- Integrated **Swiper.js** for interactive sliders
  - Property showcase carousel
  - Responsive breakpoints
  - Autoplay and navigation controls
- Added **About** section with responsive design
- Added **Contact** section with form
  - Integrated API call for form submission
  - Access key stored in `.env` file for security
- Created **Footer** with:
  - Company information
  - Smooth scroll links
  - Newsletter subscription input
- Added responsive design
  - Mobile-first approach
  - Tailwind breakpoints for tablet & desktop
- Enhanced UI/UX
  - Smooth scroll behavior
  - Hover effects
  - Tailwind utility classes for quick styling
- Optimized asset management in `assets` folder

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/abedin-ansari/Estate-React-tailwind-Project.git
   cd estate
   ```

2. Install dependencies

npm install

3. Set up environment variables

Create a .env file in the root directory:

VITE_ACCESS_KEY=your_api_access_key_here

4. Start the development server

npm run dev

5. Open in your browser

Go to: http://localhost:5173

📦 Tech Stack

-> React 18

-> Vite

-> Tailwind CSS

-> Swiper.js

-> JavaScript (ES6+)

📂 Project Structure

estate/
│
├── public/ # Static assets served directly
│
├── src/
│ ├── assets/ # Images, icons, and static files
│ │ └── assets.js # Centralized asset exports
│ │
│ ├── components/ # Reusable UI components
│ │ ├── Header.jsx
│ │ ├── Hero.jsx
│ │ ├── About.jsx
│ │ ├── Contact.jsx
│ │ ├── Footer.jsx
│ │ └── PropertySlider.jsx
│ │
│ ├── App.jsx # Root component
│ ├── main.jsx # Entry point
│ ├── index.css # Global styles (Tailwind base styles)
│ └── ...
│
├── .env # Environment variables (not committed)
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
