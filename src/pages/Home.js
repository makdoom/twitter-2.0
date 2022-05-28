import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <main className="bg-primaryBackground  min-h-screen max-w-[1500px] flex mx-auto">
      <Sidebar />

      {/* Feed */}
      <Feed />

      {/* Widget */}
      {/* <Widget /> */}

      {/* Modal */}
    </main>
  );
};
export default Home;
