## todo in this project

> create register app , after registering successfull it redirect to login page
> create login page redirect to dashboard
> prevent user from accessing login and register page after login , user only go to login or register page after logout
>
> fixed sidebar in top and fixed navbar in top
> footer color change
> make responsive

## frontend Setup

npm create vite@latest frontend -- --template react
npm install tailwindcss @tailwindcss/vite
// add this in App.css
@import "tailwindcss";
// add this in main.js
import "./App.css";

add this in vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
plugins: [react() ,tailwindcss()],
})

npm install react-router-dom
npm install react-redux
npm install axios
npm install @reduxjs/toolkit react-redux
npm install jwt-decode
npm install @tanstack/react-query
npm install react-icons
npm install react-toastify

## folder map

my-app/
├── public/
├── src/
│ ├── api/ # Axios base and API logic
│ │ └── api.js
│ ├── app/ # Redux store config
│ │ └── store.js
│ ├── context/ # Global Context
│ │ └── ApiProvider.jsx
│ ├── features/ # Redux slices
│ │ └── user/userSlice.js
│ ├── pages/
│ │ └── Home.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css

## guide

Agar user ko call karna hai toh

import { logout } from "../features/auth/authSlice";

const { user } = useSelector((state) => state.auth);

h2>Welcome, {user.name}</h2>

<p>Email: {user.email}</p>

## Light / dark

| Section                       | Light     | Dark      | Usage                                      |
| ----------------------------- | --------- | --------- | ------------------------------------------ |
| **Main Background**           | `#FFFFFF` | '#121212' | Full page container (body/html)            |
| **Main Content Section**      | `#FDFDFD` | `#1E1E1E` | Sub-sections, cards                        |
| \*main layout Background ok   | `#F9FAFB` | `#1F2937` |
| **Navbar / Sidebar**          | `#E5E7EB` | `#374151` | Topbar or sidebar background               |
| **Text (Default)**            | `#1F2937` | `#F9FAFB` | All primary readable text                  |
| **Primary Button (Save/Add)** | `#3B82F6` | `#60A5FA  | CTA buttons                                |
| **Primary Hover**             | `#2563EB` | `#3B82F6` | CTA on hover                               |
| **Delete Button**             | `#EF4444` | `#F87171` | For destructive actions                    |
| **Delete Hover**              | `#DC2626` | `#EF4444` | Destructive action hover                   |
| **Button Text/Icon**          | `#FFFFFF` | `#FFFFFF` | Icon/text inside colored buttons           |
| **Modals / Popups**           | `#FFFFFF` | `#2C3E50` | Dialog background                          |
| **Inner Pages**               | `#F3F4F6` | `#253447` | Side pages / card content                  |
| **Links/Icons (Normal)**      | `#4F46E5` | `#A78BFA` | Interactive icons or hyperlinks            |
| **Links/Icons (Hover)**       | `#4338CA` | `#8B5CF6` | Hover state                                |
| **Neutral Icons**             | `#6B7280` | `#9CA3AF` | Secondary icons, labels, status indicators |

## todo in this project
