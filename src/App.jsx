import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Agendamento from "./pages/Agendamento";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/agendamento" element={<Agendamento />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
