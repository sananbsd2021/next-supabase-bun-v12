'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

export interface EdunewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function ShowEdunewsOutPage() {
  const [edunewsItems, setEdunewsItems] = useState<EdunewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  useEffect(() => {
    async function fetchEdunews() {
      try {
        const response = await fetch("/api/edunews");
        const result = await response.json();
        if (response.ok) {
          setEdunewsItems(result.data);
        } else {
          setError(result.error || "Failed to load data");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Unknown error occurred");
        } else {
          setError("Unknown error occurred");
        }
      }
    }

    fetchEdunews();
  }, []);

  // Calculate items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = edunewsItems.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(edunewsItems.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold p-2 mb-1 bg-gradient-to-r from-blue-700 to-white">
        ข่าวการศึกษา
      </h1>

      {/* Empty State */}
      {edunewsItems.length === 0 && (
        <p className="text-gray-500 text-center">ไม่มีข่าวการศึกษาในขณะนี้</p>
      )}

      {/* Table Layout for Edunews Items */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">
                  <Image
                    src={item.imageUrl}
                    alt={item.title || "Edunews Image"}
                    width={120}
                    height={120}
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="/placeholder-image.jpg"
                  />
                </td>
                <td className="px-4 py-2">
                  {item.description.length > 50 ? (
                    <>
                      {item.description.slice(0, 50)}...
                      <a
                        href={`/edunews/${item.id}`}
                        className="text-blue-500 hover:underline ml-1"
                      >
                        อ่านเพิ่มเติม
                      </a>
                    </>
                  ) : (
                    item.description
                  )}
                </td>
                <td className="px-4 py-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
