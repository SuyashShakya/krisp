import { useState, useRef, useEffect } from "react";

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
  const [items, setItems] = useState<
    { body: string; id: number; title: string; userId: number }[]
  >([]);
  const [filteredItems, setFilteredItems] = useState<typeof items>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pageRef = useRef<number>(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageRef?.current}&_limit=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      setItems((prevItems) => [...prevItems, ...data]);
      setFilteredItems((prevItems) => [...prevItems, ...data]);
      setLoading(false);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      loadMoreItems();
    }
  };

  const loadMoreItems = async () => {
    if (!loading) {
      pageRef.current++;
      fetchData();
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Filter items based on search query
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="flex flex-col gap-8">
      <p className="text-3xl font-medium">Infinite Scroll</p>
      <div>
        <input
          className="border-none focus:outline-none"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      {error && <p className="text-xl font-bold">Error: {error}</p>}
      {filteredItems?.length === 0 && (
        <p className="text-xl font-bold">No Items</p>
      )}
      {filteredItems?.map((item, index) => (
        <div role="listitem" key={`${item?.id}-${index}`}>
          <ItemsCardComponent
            id={item?.id}
            title={item?.title}
            body={item?.body}
          />
        </div>
      ))}
      {loading && <p className="text-xl font-bold">Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
