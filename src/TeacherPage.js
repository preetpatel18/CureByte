import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherPage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [ratings, setRatings] = useState(Array(25).fill(null));

  const options = [
    'Onset', 'Site', 'Duration', 'Radiation', 'Frequency', 'Quality and Character',
    'Progression', 'Severity', 'Aggravating and Relieving Factors', 'Associated Symptoms',
    'S.O.B. - Exertion', 'S.O.B. - while flat', 'S.O.B at right', 'Palpitations', 'Ankle Swelling',
    'Transient Loss of Consciousness', 'Intermittent Claudication', 'Fever, Fatigue', 'Smoking',
    'Hypertension', 'DM', 'F.M. of CAD', 'Previous History of CAD', 'Hyperlipidemia',
    'Obesity & Physical Inactivity'
  ];

  useEffect(() => {
    const savedOption = localStorage.getItem('teacherSelection');
    const savedRatings = localStorage.getItem('teacherRatings');
    
    if (savedOption) setSelectedOption(savedOption);
    if (savedRatings) setRatings(JSON.parse(savedRatings));
  }, []);

  const handleDropdownSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('teacherSelection', selectedOption);
    alert(`Saved selection: ${selectedOption}`);
  };

  const handleRatingChange = (index, value) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = value;
    setRatings(updatedRatings);
  };

  const handleRatingSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('teacherRatings', JSON.stringify(ratings));
    alert(`Saved ratings: ${ratings.join(', ')}`);
  };

  return (
    <div className="teacher-page-container">
      <div className="teacher-page">
        {/* Image at the top with 150px margin below */}
        <img src="/logo.png" alt="Header" className="logo" />

        <header className="teacher-page-header">
          <h1>Welcome, Teacher!</h1>
          <p>This is the teacher's dashboard.</p>

          {/* Dropdown selection form */}
          <form onSubmit={handleDropdownSubmit}>
            <label htmlFor="options">Choose Grading Interests and Values</label>
            <select
              id="options"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              required
            >
              <option value="" disabled>Select OSCE Type</option>
              <option value="Abdominal Pain">Abdominal Pain</option>
              <option value="Chest Pain">Chest Pain</option>
              <option value="Cough Fever">Cough Fever</option>
              <option value="GI History">GI History</option>
              <option value="Hematemesis">Hematemesis</option>
              <option value="Hemoptysis">Hemoptysis</option>
              <option value="Shortness of Breath">Shortness of Breath</option>
            </select>
            <button type="submit" className="button">Save</button>
          </form>

          <p>1. Analysis of Chest Pain</p>

          <form onSubmit={handleRatingSubmit}>
            <h2>Rate Each Option:</h2>
            <div className="scale-labels">
              <span className="spacer"></span> {/* Spacer */}
              <span>0 (Not at all)</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4 (Significantly)</span>
            </div>

            {/* Rating Table */}
            <div className="rating-table">
              {options.map((option, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <div className="rating-cell rating-label">{option}</div>
                  {[0, 1, 2, 3, 4].map((value) => (
                    <div key={value} className="rating-cell">
                      <input
                        type="radio"
                        name={`rating-${rowIndex}`}
                        value={value}
                        checked={ratings[rowIndex] === value}
                        onChange={() => handleRatingChange(rowIndex, value)}
                        required
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <button type="submit" className="button">Submit Ratings</button>
          </form>
          <button className="button" onClick={() => navigate('/')}>Back to Home</button>
        </header>
      </div>
    </div>
  );
}

export default TeacherPage;

