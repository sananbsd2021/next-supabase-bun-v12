"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export interface NewslistsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function ShowNewslistOutPage() {
  const [newslistsItems, setNewslistsItems] = useState<NewslistsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // หน้าปัจจุบัน
  const [isLoading, setIsLoading] = useState<boolean>(true); // สถานะกำลังโหลด
  const itemsPerPage = 4; // จำนวนข่าวต่อหน้า

  useEffect(() => {
    async function fetchNewslists() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/newslists");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        if (result.success) {
          setNewslistsItems(result.data);
        } else {
          setError("Failed to load items");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Unknown error occurred");
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchNewslists();
  }, []);

  const totalPages = Math.ceil(newslistsItems.length / itemsPerPage); // จำนวนหน้าทั้งหมด

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

  if (isLoading) {
    return <div className="p-4 text-center">กำลังโหลด...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
  }

  const displayedItems = newslistsItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <h1
        className="text-2xl text-white font-bold p-2 mb-1 
      bg-gradient-to-r from-blue-700 to-white"
      >
        ข่าวประชาสัมพันธ์
      </h1>

      {/* Empty State */}
      {newslistsItems.length === 0 && (
        <p className="text-gray-500 text-center">ไม่มีข่าวประชาสัมพันธ์ในขณะนี้</p>
      )}

      {/* Table Layout for News Items */}
      {newslistsItems.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <tbody>
              {displayedItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">
                    <Image
                      src={item.imageUrl}
                      alt={`รูปภาพของ ${item.title}`}
                      width={120}
                      height={120}
                      className="object-cover rounded-md"
                      placeholder="blur"
                      blurDataURL="/placeholder-image.jpg"
                    />
                  </td>
                  <td className="px-4 py-2">
                    {/* <h2 className="font-bold text-lg">{item.title}</h2> */}
                    {item.description.length > 50 ? (
                      <>
                        {item.description.slice(0, 50)}...
                        <a
                          href={`/newslists/${item.id}`}
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
      )}

      {/* Pagination Controls */}
      {newslistsItems.length > itemsPerPage && (
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
      )}
    </div>
  );
}
