import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { getHelloMessage } from './apiService';
import TeacherPage from './TeacherPage';
import StudentPage from './StudentPage';
import './App.css';

function HomePage() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getHelloMessage()
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Select an option"));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src="logo.png" alt="Logo 1" className="logo" />
        </div>
        <h2 className="subtitle">Welcome to CureBYTES!</h2>
        <p className="description">
          Our mission is to enhance learning and improve patient care by providing medical students with AI-driven insights on their clinical documentation. We aim to streamline the grading process and deliver constructive feedback, fostering the development of clinical communication.
        </p>
        <p className="status-message">{message ? message : 'Select an option'}</p>
        <div className="button-container">

          <button className="button" onClick={() => navigate('/teacher')}>🍎 Teacher</button>
          <button className="button" onClick={() => navigate('/student')}>📚 Student</button>

        </div>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}




export default App;