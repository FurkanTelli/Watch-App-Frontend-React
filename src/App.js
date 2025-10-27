import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { useSelector } from "react-redux";


function App() {
  const darkTheme = useSelector((state) => state.userStatus.darkTheme)

  return (
    <>
      {darkTheme ? <div className="App dark-theme">
        <AppRoutes />
      </div> : <div className="App">
        <AppRoutes />
      </div>}
    </>


  );
}

export default App;
