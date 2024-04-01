import { useState, useRef, useEffect } from "react";
import useIntersectionObserver from "./hook/useIntersectionObserver";
import debounce from "./functions/debounce";

const ItemsCardComponent = (props: {
  id: number;
  title: string;
  body: string;
}) => {
  const { id, title, body } = props;
  return (
    <div className="p-4 border rounded-lg">
      <p>
        {id}. {title}
      </p>
      <p>{body}</p>
    </div>
  );
};

const InfiniteScroll = () => {
  // State variables
  const [items, setItems] = useState<
    { body: string; id: number; title: string; userId: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const pageRef = useRef<number>(1);

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageRef?.current}&_limit=10`
      );
      const data = await response.json();
      if (pageRef.current === 10) {
        setHasNextPage(false);
      }
      setLoading(false);
      setError(null);
      return data;
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData().then(setItems);
  }, []);

  // Function to load more data
  const secondLastItemRef = useIntersectionObserver<HTMLDivElement>(() => {
    pageRef.current++;
    void fetchData().then((newItems) =>
      setItems((items) => [...items, ...newItems])
    );
  }, [!loading, hasNextPage]);

  // Filter items based on search query
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const filteredItems = items?.filter((item) =>
    item?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <p className="text-3xl font-medium">Infinite Scroll</p>
      <div>
        <input
          className="border-none focus:outline-none"
          type="text"
          placeholder="Search..."
          onChange={debounce(handleSearchInputChange, 800)}
        />
      </div>
      {error && <p className="text-xl font-bold">Error: {error}</p>}
      {filteredItems?.length === 0 ? (
        <p className="text-xl font-bold">No Items</p>
      ) : (
        filteredItems?.map((item, index, items) => (
          <div
            role="listitem"
            key={item?.id}
            ref={items?.length - 2 === index ? secondLastItemRef : null}
          >
            <ItemsCardComponent
              id={item?.id}
              title={item?.title}
              body={item?.body}
            />
          </div>
        ))
      )}
      {loading && <p className="text-xl font-bold">Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
