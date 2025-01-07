"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function ShowNewsOutPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // หน้าปัจจุบัน
  const itemsPerPage = 4; // จำนวนข่าวต่อหน้า

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        if (result.success) {
          setNewsItems(result.data);
        } else {
          setError("Failed to load gallery items");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Unknown error occurred");
        } else {
          setError("Unknown error occurred");
        }
      }
    }
    fetchNews();
  }, []);

  const totalPages = Math.ceil(newsItems.length / itemsPerPage); // จำนวนหน้าทั้งหมด

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (error) {
    return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
  }

  const displayedItems = newsItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <h1
        className="text-2xl text-white font-bold p-2 mb-1 
      bg-gradient-to-r from-blue-700 to-white"
      >
        ข่าวสารทั่วไป
      </h1>

      {/* Empty State */}
      {newsItems.length === 0 && (
        <p className="text-gray-500 text-center">ไม่มีข่าวสารขณะนี้</p>
      )}

      {/* Table Layout for Gallery Items */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <tbody>
            {displayedItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">
                  <Image
                    src={item.imageUrl}
                    alt={item.title || "Gallery Image"}
                    width={120}
                    height={120}
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="https://archive.org/download/placeholder-image/placeholder-image.jpg"
                  />
                </td>
                <td className="px-4 py-2">
                  {item.description.length > 50 ? (
                    <>
                      {item.description.slice(0, 50)}...
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
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          } rounded`}
        >
          ก่อนหน้า
        </button>
        <span className="px-4 py-2 text-gray-700">
          หน้า {currentPage} จาก {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-2 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          } rounded`}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
