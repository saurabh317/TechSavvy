import { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./components/auth/Login";
import DashBoard from "./components/homePage/DashBoard";
import { useTheme } from "./config/themeProvider";

function App() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const { darkMode } = useTheme();

  // Handling login in status in the initial load
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) SetIsLoggedIn(true);
  }, []);


  // toggle theme
  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#4b5563";
    } else {
      document.body.style.backgroundColor = "rgb(226, 223, 223)";
    }
  }, [darkMode]);

  return (
    <div className="App">
      {isLoggedIn ? (
        <DashBoard SetIsLoggedIn={SetIsLoggedIn} />
      ) : (
        <LoginPage SetIsLoggedIn={SetIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
