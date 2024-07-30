import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfServices from "./pages/TermsOfServices";
import Auth from "./components/Auth";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import MyProjects from "./pages/MyProjects";
import Members from "./pages/Members";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import Trash from "./pages/Trash";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Project from "./pages/Project";
import AllTasks from "./pages/AllTasks";
import Task from "./pages/Task";
import Info from "./ui/Info";
import Assets from "./ui/Assets";
import TaskMembers from "./ui/TaskMembers";
import Comments from "./ui/Comments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-projects" element={<MyProjects />} />
          <Route path="my-projects/:projectId" element={<Project />} />
          <Route path="project/:pid/all-tasks" element={<AllTasks />} />
          <Route path="project/:pid/task/:tid" element={<Task />}>
            <Route path="info" element={<Info />} />
            <Route path="assets" element={<Assets />} />
            <Route path="task-members" element={<TaskMembers />} />
            <Route path="comments" element={<Comments />} />
          </Route>
          <Route path="members" element={<Members />} />
          <Route path="projects" element={<Projects />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="trash" element={<Trash />} />
          <Route path="profile" element={<Profile />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="reset-password/:reset-token"
            element={<ResetPassword />}
          />
        </Route>

        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-services" element={<TermsOfServices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
