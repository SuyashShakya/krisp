import { useState, useRef, useEffect } from "react";
import useIntersectionObserver from "./hook/useIntersectionObserver";

interface Comments {
  id: number;
  body: string;
  postId: number;
  user: { id: number; username: string };
}

interface CommentData {
  comments: Comments[];
  total: number;
}

// Card component for displaying individual items
const ItemsCardComponent = (props: { item: Comments }) => {
  const { item } = props;
  return (
    <div className="p-4 border rounded-lg">
      <p>{item?.id}</p>
      <p>{item?.body}</p>
      <p>{item?.user?.username}</p>
    </div>
  );
};

const InfiniteScroll = () => {
  // State variables
  const [items, setItems] = useState<Comments[]>();
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  // Fetch data from API
  const fetchData = async (skip = 0, limit = 10) => {
    setLoading(true);
    const response = await fetch(
      `https://dummyjson.com/comments?limit=${limit}&skip=${skip}`
    );
    const data = (await response.json()) as CommentData;
    console.log("data", data);
    if (data.total <= skip + limit) setHasNextPage(false);
    setLoading(false);

    return data?.comments;
  };

  useEffect(() => {
    void fetchData().then(setItems);
  }, []);

  const lastCommentRef = useIntersectionObserver<HTMLDivElement>(() => {
    void fetchData(items?.length).then((newComments) =>
      setItems((items) => [...(items as Comments[]), ...newComments])
    );
  }, [hasNextPage, !loading]);

  return (
    <div className="flex flex-col gap-8">
      <p className="text-3xl font-medium">Infinite Scroll</p>
      {items?.length === 0 && <p className="text-xl font-bold">No Items</p>}
      {items?.map((item, index, items) => (
        <div
          role="listitem"
          key={`${item?.id}-${index}`}
          ref={items?.length - 1 === index ? lastCommentRef : null}
        >
          <ItemsCardComponent item={item} />
        </div>
      ))}
      {loading && <p className="text-xl font-bold">Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
