import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <section>
        <div className="grid grid-cols-[19%_auto] gap-5">
          <div className="h-screen overflow-y-auto bg-[#3f4d67]">
            <Sidebar />
          </div>

          <div className="h-screen overflow-y-auto">
            <Header />
            <Outlet />
            <Footer />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainLayout;
