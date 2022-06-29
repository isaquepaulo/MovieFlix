import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "./assets/styles/custom.scss";
import Rota from "routes";

function App() {
  return (
    <>
      <Rota />
      <ToastContainer />
    </>
  );
}

export default App;
