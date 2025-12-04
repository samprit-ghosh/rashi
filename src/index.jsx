

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'  // Make sure to include .jsx extension
import { createRoot } from "react-dom/client";

import "./styles/tailwind.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)