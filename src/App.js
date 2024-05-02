import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice";
import { statusSelector } from "./features/selectors";
//import { userSelector } from "./features/selectors";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  console.log(user, token);

  return (
    <div className="dark">
      <Routes>
        <Route
          exact
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
