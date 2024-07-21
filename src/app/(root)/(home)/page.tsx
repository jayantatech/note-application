import NotesList from "@/components/NotesList";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <NotesList />
      </div>
    </div>
  );
};

export default Home;
