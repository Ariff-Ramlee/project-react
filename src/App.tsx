import { useState } from "react";
import Login from "./components/Login";
import RegisterModal from "./components/RegisterModal";

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <Login onOpenRegister={() => setShowRegister(true)} />

      {showRegister && (
        <RegisterModal onClose={() => setShowRegister(false)} />
      )}
    </>
  );
}

export default App;
