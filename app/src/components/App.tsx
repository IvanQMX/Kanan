import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import ReportCase from "./ReportCase/Form";
import Login from "./Login";

function App() {
  const [session, setSession] = useState(sessionStorage.getItem("studentID"));

  useEffect(() => {
    const key = "studentID";
    if (session) {
      sessionStorage.setItem(key, session);
    } else {
      sessionStorage.removeItem(key);
    }
  }, [session]);

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar sessionState={[session, setSession]} />
        <Routes>
          <Route path="/" element={<Home />} />
          {session ? <Route path="reportar-caso/*" element={<ReportCase />} /> : <></>}
          <Route path="iniciar-sesion/*" element={<Login sessionState={[session, setSession]} />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
