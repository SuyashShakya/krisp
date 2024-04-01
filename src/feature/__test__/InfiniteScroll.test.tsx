import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import InfiniteScroll from "../InfiniteScroll";

describe("InfiniteScroll Component", () => {
  test("renders InfiniteScroll component", () => {
    render(<InfiniteScroll />);
    expect(screen.getByText("Infinite Scroll")).toBeInTheDocument();
  });

  test("renders loading state", () => {
    render(<InfiniteScroll />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", async () => {
    // Mock fetch function to return an error
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));

    render(<InfiniteScroll />);

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText("Error: Network Error")).toBeInTheDocument();
    });
  });

  test("renders items after successful data fetch", async () => {
    // Mock fetch function to return some data
    const mockData = [
      { id: 1, title: "Title 1", body: "Body 1" },
      { id: 2, title: "Title 2", body: "Body 2" },
    ];
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    render(<InfiniteScroll />);

    // Wait for items to appear
    await waitFor(() => {
      expect(screen.getByText("Title 1")).toBeInTheDocument();
      // expect(screen.getByText("Title 2")).toBeInTheDocument();
    });
  });
});
