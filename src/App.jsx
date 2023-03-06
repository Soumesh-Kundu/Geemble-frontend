import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useDailogAtom } from "./store/DailogStore";
import {
  CreatePost,
  EditProfile,
  ForgetPassword,
  Home,
  Login,
  NewPassword,
  Post,
  Register,
  Search,
  UserProfile,
  Verify,
  Feed,
} from "./pages";
import ConfirmationDailog from "./components/ConfirmationDailog";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  const [{ isNotConfirmed }] = useDailogAtom();

  return (
    <div id="supreme">
      <Router>
        <ScrollToTop>
          <div className="App overflow-x-hidden w-screen h-screen primary-gradient font-mukta">
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="" element={<Feed />}/>
                <Route path="profile/:username" element={<UserProfile />}/>
                <Route path="profile/verify" element={<Verify />} />
                <Route path="editprofile/:username" element={<EditProfile />} />
                <Route path="search" element={<Search />} />
                <Route path="*" element={<div>404 not found</div>} />
              </Route>
              <Route path="*" element={<div>404 not found</div>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/newpassword" element={<NewPassword />} />
            </Routes>
          </div>
        </ScrollToTop>
      </Router>
      {isNotConfirmed && <ConfirmationDailog />}
    </div>
  );
}

export default App;
