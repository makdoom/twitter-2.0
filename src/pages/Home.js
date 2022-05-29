import { Route, Routes } from "react-router-dom";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";

const Home = () => {
  return (
    <main className="bg-primaryBackground relative min-h-screen  max-w-[1500px] flex mx-auto">
      <Sidebar />
      {/* Feed */}

      <Feed />

      {/* Widget */}
      <Widget />

      {/* Modal */}
    </main>
  );
};
export default Home;
