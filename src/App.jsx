import BootstrapLoveCard from "./components/BootstrapLoveCard";
import DoLove from "./components/DoLove";
import MessagePage from "./components/MessagePage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
       
          <Route path="/" element={<MessagePage />} />
          <Route path="/card" element={<BootstrapLoveCard />} />
          <Route path="/doLove" element={<DoLove />} />
     
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App