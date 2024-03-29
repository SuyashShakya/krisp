import "./App.css";
import InfiniteScroll from "./feature/InfiniteScroll";

function App() {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col p-4 md:px-20 md:py-8 gap-36 max-w-screen-2xl">
        <InfiniteScroll />
      </div>
    </main>
  );
}

export default App;
