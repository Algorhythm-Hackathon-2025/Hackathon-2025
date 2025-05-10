import { lazy } from "react";
import { Route, Routes } from "react-router";
import NotFound from "./routes/not-found";

const Home = lazy(() => import("./routes/home"));
const About = lazy(() => import("./routes/post"));
const Contact = lazy(() => import("./routes/contact"));
const DefaultLayout = lazy(() => import("./routes/layout"));
const Login = lazy(() => import("./routes/login"));
const Register = lazy(() => import("./routes/register"));

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
