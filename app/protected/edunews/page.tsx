"use client";
import { useEffect, useState } from "react";
import EdunewsForm from "./EdunewsForm";
import Image from "next/image";
import { supabase } from "@/utils/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export interface EdunewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function EdunewsPage() {
  const [edunewsItems, setEdunewsItems] = useState<EdunewsItem[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchEdunews() {
      try {
        const response = await fetch("/api/edunews");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        if (result.success) {
          setEdunewsItems(result.data);
        } else {
          setError("Failed to load items");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchEdunews();
  }, []);

  const handleAddEdunews = async (data: {
    title: string;
    description: string;
    imageUrl: string;
  }) => {
    const response = await fetch("/api/edunews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const newEdunews = await response.json();
      setEdunewsItems((prev) => [newEdunews.data, ...prev]);
      setShowForm(false); // Close the form after successfully adding
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  const deleteNews = async (id: number) => {
    const prevItems = [...edunewsItems]; // Save previous state for rollback
    setEdunewsItems((prev) => prev.filter((item) => item.id !== id)); // Optimistic update

    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) {
        throw error;
      }
      toast.success("News deleted successfully!");
    } catch (err) {
      console.error("Error deleting news:", err);
      setEdunewsItems(prevItems); // Revert to previous state
      toast.error("Failed to delete news. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">ข่าวการศึกษา</h1>

      {/* Button to show the form */}
      <button
        onClick={() => setShowForm(true)}
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 px-4"
      >
        เพิ่มข่าวการศึกษา
      </button>

      <button
        onClick={() => router.back()}
        className="cursor-pointer bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 mb-4"
      >
        กลับหน้าก่อนหน้า
      </button>

      {/* Form for adding news */}
      {showForm && (
        <EdunewsForm
          onSubmit={handleAddEdunews}
          onClose={() => setShowForm(false)} // Close the form
        />
      )}

      {/* Display news items in cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {edunewsItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={800}
              height={600}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600">
                {item.description.length > 300 ? (
                  <>
                    {item.description.slice(0, 300)}...
                    <a
                      href={`/news/${item.id}`}
                      className="text-blue-500 hover:underline ml-1"
                    >
                      อ่านเพิ่มเติม
                    </a>
                  </>
                ) : (
                  item.description
                )}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Added on: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => deleteNews(item.id)}
              className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600 m-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
