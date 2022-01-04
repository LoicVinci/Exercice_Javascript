import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/style.css";

import HomePage from "./Components/Pages/HomePage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import {Router} from "./Components/Router/Router";

// Improve the header with dynamic HTML generation
Header();

/// Render the Navbar
Navbar();

// Render the HomePage
// HomePage();

// Improve the header with dynamic HTML generation
Footer();

// Call the router
Router();