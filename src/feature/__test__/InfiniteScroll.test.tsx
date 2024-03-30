import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import InfiniteScroll from "../InfiniteScroll";

describe("InfiniteScroller component", () => {
  test("renders loading indicator and fetches data", async () => {
    render(<InfiniteScroll />);
    // Check if loading indicator is rendered initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    // Wait for data to be fetched
    await waitFor(() => {
      expect(screen.getByText("Infinite Scroll")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    // Check if items are rendered after data is fetched
    await waitFor(() => {
      // // Assuming the default data fetches 10 items
      expect(screen.getAllByRole("listitem")).toHaveLength(10);
    });
  });
});
