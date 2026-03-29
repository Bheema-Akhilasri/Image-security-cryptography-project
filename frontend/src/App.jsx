import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Encrypt from "./pages/Encrypt";
import Decrypt from "./pages/Decrypt";
import Workflow from "./pages/Workflow";
import Metrics from "./pages/Metrics";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/encrypt" element={<Encrypt />} />
        <Route path="/decrypt" element={<Decrypt />} />
        <Route path="/workflow" element={<Workflow />} />
        <Route path="/metrics" element={<Metrics />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
