import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Alert from "./Alert";

const Layout = ({alert}) => {
  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: "3.8rem" }}>
        <Alert message={"this is good"} alert={alert} />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
