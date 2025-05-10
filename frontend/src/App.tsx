import { lazy } from "react";
import { Route, Routes } from "react-router";
import NotFound from "./routes/not-found";
import { useUser } from "./providers/user-provider";
import { Spin } from "antd";

const Home = lazy(() => import("./routes/home"));
const About = lazy(() => import("./routes/post"));
// const Contact = lazy(() => import("./routes/contact"));
const DefaultLayout = lazy(() => import("./routes/layout"));
const Login = lazy(() => import("./routes/login"));
const Register = lazy(() => import("./routes/register"));

const AdminHome = lazy(() => import("./routes/admin/Home"));

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
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <Route index element={<AdminHome />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
