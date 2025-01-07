'use client';
import { useEffect, useState } from 'react';
import GalleryForm from './UploadsfileForm';
import Image from 'next/image';
import { supabase } from "@/utils/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'; // Correct import for router

export interface uploadsfileItem {
  id: number;
  name: string;
  position: string;
  role: string;
  imageUrl: string;
  created_at: string;
  updated_at: string;
}

export default function uploadsfilePage() {
  const [uploadsfileItems, setUploadsfileItems] = useState<uploadsfileItem[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    async function fetchUploads() {
      try {
        const response = await fetch('/api/uploads'); // Ensure correct endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        if (result.success) {
          setUploadsfileItems(result.data);
        } else {
          setError('Failed to load gallery items');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error occurred');
        }
      } 
    }
    fetchUploads();
  }, []);

  const handleAddGallery = async (data: { name: string; position: string; imageUrl: string, role: string }) => {
    try {
      const response = await fetch('/api/uploads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add gallery item');
      }
  
      const result = await response.json();
      setUploadsfileItems((prev) => [result.data, ...prev]);
      setShowForm(false); // Close the form after adding successfully
      toast.success('Gallery item added successfully!');
    } catch (err) {
      toast.error('Failed to add gallery item. Please try again.');
      console.error(err);
    }
  };
  

  const deleteGallery = async (id: number) => {
    const prevItems = [...uploadsfileItems]; // Save previous state for rollback
    setUploadsfileItems((prev) => prev.filter((item) => item.id !== id)); // Optimistic update

    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) {
        throw error;
      }
      toast.success("News deleted successfully!");
    } catch (err) {
      console.error("Error deleting news:", err);
      setUploadsfileItems(prevItems); // Revert to previous state
      toast.error("Failed to delete news. Please try again.");
    }
  };

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">ภาพบุคลากร</h1>

      {/* Button to show form */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        เพิ่มรูปภาพ
      </button>

      <button
        onClick={() => router.back()} // Use router.back() to navigate back
        className="cursor-pointer bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 mb-4"
      >
        กลับหน้าก่อนหน้า
      </button>

      {/* Form to add gallery item */}
      {showForm && (
        <GalleryForm
          onSubmit={handleAddGallery}
          onClose={() => setShowForm(false)} // Close form on cancel
        />
      )}

      {/* Display gallery items in cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {uploadsfileItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={800}
              height={600}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600">
                {item.position.length > 300 ? (
                  <>
                    {item.position.slice(0, 300)}...
                    <a
                      href={`/uploads/${item.id}`}
                      className="text-blue-500 hover:underline ml-1"
                    >
                      อ่านเพิ่มเติม
                    </a>
                  </>
                ) : (
                  item.position
                )}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Added on: {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => deleteGallery(item.id)}
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
