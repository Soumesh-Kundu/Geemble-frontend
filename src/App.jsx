import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDailogAtom } from "./store/DailogStore";
import {
  EditProfile,
  ForgetPassword,
  Home,
  Login,
  NewPassword,
  Register,
  Search,
  UserProfile,
  Verify,
  Feed,
  NotFound,
} from "./pages";
import ConfirmationDailog from "./components/ConfirmationDailog";
import ScrollToTop from "./components/ScrollToTop";
import Alert from "./components/Alert";
import { useEffect } from "react";
import { useAlertAtom, ACTIONS } from "./store/AlertStore";
function App() {
  const [{ isNotConfirmed }] = useDailogAtom();
  const [, setAlert] = useAlertAtom();
  useEffect(() => {
    setAlert({
      type: ACTIONS.SET_ALERT,
      payload: {
        messege: "hello world",
        alertType: "success",
      },
    });
  }, []);
  return (
    <div  >
      <Router>
        <ScrollToTop>
          <div className="App overflow-x-hidden w-screen h-screen primary-gradient font-mukta" id='scrollableDiv' >
            <Routes>
              <Route path="/" element={<Home />}>
                <Route index element={<Feed />} />
                <Route
                  path="profile/:username"
                  element={<UserProfile />}
                ></Route>
                <Route path="editprofile/:username" element={<EditProfile />} />
                <Route path="search" element={<Search />} />
              </Route>
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify/user" element={<Verify />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/newpassword" element={<NewPassword />} />
            </Routes>
          </div>
        </ScrollToTop>
      </Router>
      {isNotConfirmed && <ConfirmationDailog />}
      <Alert />
    </div>
  );
}

export default App;
