import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </div>
  );
}
export default App;
