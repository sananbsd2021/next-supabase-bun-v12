"use client";

import { useEffect, useState } from "react";
import NewsForm from "./NewsForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function ContentPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch news items
  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(`${API_BASE_URL}/post`);
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const result = await response.json();
        setNewsItems(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [API_BASE_URL]);

  // Add news
  const handleAddNews = async (data: { title: string; content: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to add news");
      }
      const newNews = await response.json();
      setNewsItems((prev) => [newNews.data, ...prev]);
      setShowForm(false);
      toast.success("News added successfully!");
    } catch (err) {
      toast.error("Failed to add news. Please try again.");
    }
  };

  // Delete news
  const handleDeleteNews = async (id: number) => {
    const prevItems = [...newsItems];
    setNewsItems((prev) => prev.filter((item) => item.id !== id));

    try {
      const response = await fetch(`${API_BASE_URL}/post/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete news");
      }
      toast.success("News deleted successfully!");
    } catch (err) {
      setNewsItems(prevItems); // Rollback state
      toast.error("Failed to delete news. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-4">Loading news...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">News Management</h1>

      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add News
      </button>

      {showForm && (
        <NewsForm
          onSubmit={handleAddNews}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsItems.length === 0 && (
          <p className="text-gray-500">No news available</p>
        )}
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
          >
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600">
              {item.content.length > 150 ? (
                <>
                  {item.content.slice(0, 150)}...
                  <a
                    href={`/news/${item.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </a>
                </>
              ) : (
                item.content
              )}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Added on: {new Date(item.createdAt).toLocaleDateString()}
            </p>
            <button
              onClick={() => handleDeleteNews(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
