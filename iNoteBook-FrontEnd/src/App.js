import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(()=>{
      setAlert(null)
    }, 2000)
  };

  return (
    <NoteState>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Layout alert={alert} />}>
              <Route index element={<Home showAlert={showAlert} />} />
              <Route path="/home" element={<Home showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
