import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Homepage from "./Homepage"; // Ensure you have this component created
import Homepage from "./pages/homepage";
import Register from "./pages/register";
import NavBar from "./components/navBar";
// Dummy components for demonstration
// const Navbar = () => (
//   <nav style={{ backgroundColor: "#f0f0f0", padding: "10px 0" }}>
//     <ul
//       style={{
//         listStyleType: "none",
//         margin: 0,
//         padding: 0,
//         overflow: "hidden",
//       }}
//     >
//       <li style={{ float: "left" }}>
//         <Link to="/">Home</Link>
//       </li>
//       {/* Add more navigation links here */}
//     </ul>
//   </nav>
// );

const Sidebar = () => (
  <aside style={{ width: "20%", float: "right" }}>
    <div>Sidebar content</div>
    {/* Sidebar content goes here */}
  </aside>
);

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <div style={{ display: "flex" }}>
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/register" element={<Register />} />
              {/* New route for the Register page */}
              {/* Define more routes here */}
            </Routes>
          </main>
          <Sidebar />
        </div>
      </div>
    </Router>
  );
};

export default App;
