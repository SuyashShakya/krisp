import "./App.css";
import PasswordGenerator from "./feature/PasswordGenerator";
// import InfiniteScroll from "./feature/InfiniteScroll";

function App() {
  return (
    <main className="flex">
      <div className="flex flex-col p-4 md:px-20 md:py-8 max-w-screen-2xl">
        {/* <InfiniteScroll /> */}
        <PasswordGenerator />
      </div>
    </main>
  );
}

export default App;
