"use client";
import { useEffect, useState } from "react";
import NewslistsForm from "./NewslistsForm";
import Image from "next/image";
import { supabase } from "@/utils/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'; // Correct import for router

export interface NewslistsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function NewslistsPage() {
  const [newslistsItems, setNewslistsItems] = useState<NewslistsItem[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    async function fetchNewslists() {
      try {
        const response = await fetch("/api/newslists"); // ตรวจสอบให้แน่ใจว่า endpoint ถูกต้อง
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        if (result.success) {
          setNewslistsItems(result.data);
        } else {
          setError("Failed to load items");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Accessing `message` safely
        } else {
          setError("Unknown error occurred"); // Fallback for non-Error objects
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNewslists();
  }, []);

  const handleAddNewslists = async (data: {
    title: string;
    description: string;
    imageUrl: string;
  }) => {
    const response = await fetch("/api/newslists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const newNewslists = await response.json();
      setNewslistsItems((prev) => [newNewslists.data, ...prev]);
      setShowForm(false); // ปิดฟอร์มหลังจากเพิ่มสำเร็จ
    }
  };

  // Corrected deleteNewslists function
  const deleteNewslists = async (id: number) => {
    const prevItems = [...newslistsItems]; // Save previous state for rollback
    setNewslistsItems((prev) => prev.filter((item) => item.id !== id)); // Optimistic update

    try {
      // Correct the table to 'newslists' for deleting items
      const { error } = await supabase.from("newslists").delete().eq("id", id);
      if (error) {
        throw error;
      }
      toast.success("News deleted successfully!");
    } catch (err) {
      console.error("Error deleting news:", err);
      setNewslistsItems(prevItems); // Revert to previous state
      toast.error("Failed to delete news. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ข่าวสาร</h1>

      {/* ปุ่มแสดงฟอร์ม */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        เพิ่มข่าวสาร
      </button>

      <button
        onClick={() => router.back()} // Use router.back() to navigate back
        className="cursor-pointer bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 mb-4"
      >
        กลับหน้าก่อนหน้า
      </button>

      {/* ฟอร์มสำหรับเพิ่มข้อมูล */}
      {showForm && (
        <NewslistsForm
          onSubmit={handleAddNewslists}
          onClose={() => setShowForm(false)} // ฟังก์ชันปิดฟอร์ม
        />
      )}

      {/* แสดงข้อมูลในรูปแบบการ์ด */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newslistsItems.map((item) => (
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

            {/* Delete button */}
            <button
              onClick={() => deleteNewslists(item.id)} // Corrected function call
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
