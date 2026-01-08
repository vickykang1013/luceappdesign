import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-[#FFFEF7] via-[#FFF8E8] to-[#FFFEF7]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
