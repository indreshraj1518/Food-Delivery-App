import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CardProvider } from "./components/contextReducer.jsx";

import Home from "./screens/Home";
import Login from "./screens/Login";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./screens/SignUp.jsx";
import Myorder from "./screens/Myorder.jsx";
function App() {
  return (
    <CardProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<SignUp />} />
            <Route exact path="/myOrder" element={<Myorder />} />
          </Routes>
        </div>
      </Router>
    </CardProvider>
  );
}

export default App;
