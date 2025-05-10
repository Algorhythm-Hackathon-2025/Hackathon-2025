import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const Home = lazy(() => import("./routes/home"));
const About = lazy(() => import("./routes/about"));
const Contact = lazy(() => import("./routes/contact"));
const DefaultLayout = lazy(() => import("./routes/layout"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
