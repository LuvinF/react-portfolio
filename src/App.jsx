import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageLoader from "./components/shared/PageLoader";

const App = () => {
  return (
    <div className="relative min-h-screen bg-primary">
      <Navbar />

      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;
