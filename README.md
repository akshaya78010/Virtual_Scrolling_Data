#Virtual Scrolling Data
# 🚀 Virtual Scrolling Data Grid

A high-performance virtual scrolling data grid built using React and Vite.  
This project efficiently renders and handles large datasets (up to millions of rows) without performance issues.

---

## 📌 Project Overview

Rendering thousands or millions of rows normally causes:

- ❌ Slow performance
- ❌ UI freezing
- ❌ High memory usage

This project solves that using **Virtual Scrolling**, where only visible rows are rendered in the DOM.

---

## ⚙️ Tech Stack

- ⚛️ React
- ⚡ Vite
- 🎨 CSS
- 🐳 Docker (Optional setup)
- 📦 Node.js

---

## 🔥 Key Features

- ✅ Virtualized row rendering
- ✅ Smooth scrolling performance
- ✅ Efficient memory usage
- ✅ Dynamic data generation
- ✅ Clean and responsive UI
- ✅ Docker support for containerized deployment

---

## 📊 How It Works

Instead of rendering all rows at once:

1. Only visible rows inside the viewport are rendered.
2. As the user scrolls, rows are dynamically replaced.
3. This keeps DOM size small and performance high.

---

## 📁 Project Structure


Million-virtual-grid/
│
├── public/
├── src/
│ ├── components/
│ │ └── VirtualGrid.jsx
│ ├── App.jsx
│ └── main.jsx
│
├── scripts/
│ └── generate-data.js
│
├── Dockerfile
├── docker-compose.yml
└── README.md


## 🛠 Installation & Setup

### 1️⃣ Clone the repository

git clone https://github.com/akshaya78010/Virtual-Scrolling-Data.git
cd Virtual-Scrolling-Data


### 2️⃣ Install dependencies

npm install


### 3️⃣ Run development server

npm run dev


Open:
http://localhost:5173


---

## 🐳 Run Using Docker (Optional)

docker-compose up --build


---

## 📈 Performance Optimization Techniques Used

- Virtual DOM optimization
- Scroll position tracking
- Dynamic row calculation
- Lazy rendering
- Efficient state management

---

## 🎯 Learning Outcomes

- Understanding large dataset rendering
- DOM performance optimization
- React component optimization
- Handling scalable frontend architecture

---

## 🚀 Future Improvements

- Add sorting & filtering
- Add pagination toggle
- Add server-side data fetching
- Add column resizing

---

## 👩‍💻 Author

Hari Priya  
CSE Student  

---

## ⭐ If you like this project, give it a star!