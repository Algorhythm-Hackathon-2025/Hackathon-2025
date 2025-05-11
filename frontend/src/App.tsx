import { lazy } from "react";
import { Route, Routes } from "react-router";
import NotFound from "./routes/not-found";
import { useUser } from "./providers/user-provider";
import { Spin } from "antd";

const Home = lazy(() => import("./routes/home"));
const About = lazy(() => import("./routes/post"));
const Contact = lazy(() => import("./routes/contact"));
const DefaultLayout = lazy(() => import("./routes/layout"));
const Login = lazy(() => import("./routes/login"));
const Register = lazy(() => import("./routes/register"));
const Map = lazy(() => import("./routes/map"));
const Profile = lazy(() => import("./routes/profile"));
const Jobs = lazy(() => import("./routes/jobs"));
const Report = lazy(() => import("./routes/report"));



const AdminHome = lazy(() => import("./routes/admin/Home"));
const AdminList = lazy(() => import("./routes/admin/List"));


function App() {
  const { user, loading } = useUser();

  if (loading) {
    return <Spin size="large" />;
  }
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        {!user?.isAdmin ? (
          <>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/map" element={<Map />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs" element={<Jobs />} />
              <Route path="/report" element={<Report />} />
          </>
        ) : (
          <>
            <Route index element={<AdminHome />} />
            <Route path="/admin" element={<AdminList />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
