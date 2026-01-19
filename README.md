# Flow — Intelligent Task Management

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

**Flow** is a modern, high-performance Kanban board engineered for speed and fluidity. Built with a mobile-first approach, it features a highly optimized drag-and-drop engine and local state persistence, ensuring a seamless user experience without server latency.

---

## ⚡ Key Features

* **Smooth Drag & Drop:** Powered by `@dnd-kit` for 60fps interaction on desktop and touch devices.
* **Local Persistence:** Data is automatically synced with `localStorage`. No login required, zero latency.
* **Dynamic UI:**
    * Context-aware tag styling (Bug, Feature, Design).
    * Glassmorphism effects & backdrop blurs.
    * Micro-interactions and hover states.
* **Dark Mode Native:** Designed strictly for dark environments using a Zinc/Slate palette.

## 🛠 Tech Stack

* **Core:** React 18+ (Vite)
* **Styling:** Tailwind CSS (Custom Design System)
* **State Management:** React Context API + Reducers
* **Interactions:** @dnd-kit (Core, Sortable, Utilities)
* **Icons:** Lucide React

## 🚀 Quick Start

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/flow-kanban.git](https://github.com/your-username/flow-kanban.git)
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run development server**
    ```bash
    npm run dev
    ```

---

## 🎨 Design Philosophy

The UI follows "Linear-style" principles:
* **Information Density:** Compact but breathable layout.
* **Visual Hierarchy:** Typography and spacing dictate importance, not heavy borders.
* **Performance:** No unnecessary re-renders.

---

*Designed & Developed by [Anton]*