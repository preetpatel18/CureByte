import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const { GoogleGenerativeAI } = require("@google/generative-ai");
// Fine tune Model
const genAI = new GoogleGenerativeAI("AIzaSyCZxmq7HqGr85ob0hAgYs9SdzcGAwlftSg"); // Fine-Tuned API Key - LLM 1
const model = genAI.getGenerativeModel({ model: "tunedModels/curebyte-9443utsnaamd"}); 

// Second Gimini Model
const LLM2 = new GoogleGenerativeAI("AIzaSyCLFNE-TvuSVPrK9jiwszmp99hnw7B0_nY");
const model2 = LLM2.getGenerativeModel({model: "gemini-1.5-flash"});
const options = ['Onset', 'Site', 'Duration', 'Radiation', 'Frequency', 'Quality and Character', 'Progression', 'Severity', 'Aggravating and Relieving Factors', 'Associated Symptoms', 'S.O.B. - Exertion', 'S.O.B. - while flat', 'S.O.B at right', 'Palpitations', 'Ankle Swelling', 'Transient Loss of Consciousness', 'Intermittent Claudication', 'Fever, Fatigue', 'Smoking', 'Hypertension', 'DM', 'F.M. of CAD', 'Previous History of CAD', 'Hyperlipedemia', 'Obesity & Physical Inactivity'];
const savedRatings = localStorage.getItem('teacherRatings');
const rating = JSON.parse(savedRatings);

function StudentPage() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  let aiComments = "";
  // Load saved input from local storage when the component mounts
  useEffect(() => {
    const savedInput = localStorage.getItem('studentInput');
    const savedOutput = localStorage.getItem('studentOutput');
    if (savedInput) {
      setInputText(savedInput); 
    }
    if (savedOutput) {
      setOutputText(savedOutput); 
    }
  }, []);

// Generating Contents through GEN AI FINE TUNED MODEL
async function generateContent() {
  const prompt = "Give a feedback on this students prompt: \n" + inputText;

  try {
    const AICommentary = await model.generateContent(prompt);
    localStorage.setItem('AICommentary', AICommentary.response.text());
    console.log(AICommentary.response.text()); // Output the resul
  } catch (error) {
    console.log("Error generating content:", error);
  }
};

// Function to handle form submission
  async function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission
  localStorage.setItem('studentInput', inputText); // Save input to local storage
  setInputText(''); // Clear the input after submission

  // Create Fine Tuned Content and Add it to the AICommentary const.
  await generateContent();
  console.log(localStorage.getItem('AICommentary'));
  await handleStudentFromTeacher();
};

async function handleStudentFromTeacher(){
  const myArr = JSON.parse(localStorage.getItem('teacherRatings'));
  for(let i = 0; i < myArr.length; i++){
    // Add code to handle each item in opt
    if(myArr[i] >= 2){
      await promptEngineering(i);
    }
  }
  setOutputText(aiComments);
};
  async function promptEngineering(i){
    const prompt = "Did the feedback include " + options[i]+ ", explicitly or implicitly. This is how much weight you should be giving "+  rating[i] + "\nThe Feedback: " + localStorage.getItem('AICommentary');
    console.log(prompt);
    try {
      const AICommentary = await model2.generateContent(prompt);
      aiComments += AICommentary.response.text();
      console.log(AICommentary.response.text()); // Output the result
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <div className="student-page">
      <header className="student-page-header">
        <img src="/logo.png" alt="Logo" className="logo" />

        <h1 className="title">Welcome, Student!</h1>
        <p className="description">This is the student’s dashboard.</p>

        <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '75px', justifyContent: 'center' }}>
            <div style={{ flex: 1, minWidth: '45%', textAlign: 'center' }}>
              <label
                htmlFor="inputText"
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  textAlign: 'left', 
                  paddingLeft: '2px' // Adjust padding to align with textarea
                }}
              >
                Please input medical notes
              </label>
              <textarea
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here"
                required 
                className="input-text"
                style={{ width: '100%', paddingLeft: '2px' }} // Matching padding for alignment
              />
            </div>
            <div style={{ flex: 1, minWidth: '45%', textAlign: 'center' }}>
              <label
                htmlFor="outputText"
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  textAlign: 'left', 
                  paddingLeft: '2px' // Adjust padding to align with textarea
                }}
              >
                Personalized Feedback
              </label>
              <textarea
                id="outputText"
                value={outputText}
                readOnly
                placeholder="Read-only text"
                className="input-text"
                style={{ width: '100%', paddingLeft: '2px' }} // Matching padding for alignment
              />
            </div>
          </div>
          <div className="button-container" style={{ marginTop: '10px' }}>
            <button type="submit" className="button">Save</button>
            <button type="button" className="button" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default StudentPage;