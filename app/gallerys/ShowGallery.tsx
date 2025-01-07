'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function ShowGalleryOutPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const imagesPerPage = 4;

  useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await fetch("/api/galleries");
        if (!response.ok) {
          throw new Error("Failed to fetch gallery data");
        }
        const result = await response.json();
        if (result.success) {
          setGalleryItems(result.data);
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
    fetchGallery();
  }, []);

  // คำนวณข้อมูลที่จะแสดงในแต่ละหน้า
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = galleryItems.slice(indexOfFirstImage, indexOfLastImage);

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(galleryItems.length / imagesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="">
      <h1 className="text-2xl text-white font-bold p-2 mb-1 bg-gradient-to-r from-blue-700 to-white">
        ภาพกิจกรรม
      </h1>

      {/* Empty State */}
      {galleryItems.length === 0 && (
        <p className="text-gray-500 text-center">ไม่มีภาพกิจกรรมในขณะนี้</p>
      )}

      {/* Table Layout for Gallery Items */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <tbody>
            {currentImages.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">
                  <Image
                    src={item.imageUrl}
                    alt={item.title || "Gallery Image"}
                    width={120}
                    height={120}
                    // className="object-cover"
                className="max-w-xs transition duration-300 ease-in-out hover:scale-120"
                    placeholder="blur"
                    blurDataURL="/placeholder-image.jpg"
                  />
                </td>
                <td className="px-4 py-2">
                  {item.description.length > 50 ? (
                    <>
                      {item.description.slice(0, 50)}...
                      <a
                        href={`/gallerys/${item.id}`}
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
