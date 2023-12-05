import { Route, Routes } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import Settings from "./pages/Settings/Settings";
import Write from "./pages/Write/Write";
import Home from "./pages/Home/Home";
import Single from "./pages/Single/Single";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
      {user ? <Topbar /> : null}
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </div>
  );
}

export default App;
