import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface GallerysFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    imageUrl: string;
  }) => void;
  onClose: () => void;
}

export default function GallerysForm({ onSubmit, onClose }: GallerysFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [hostedUrl, setHostedUrl] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, imageUrl }); // ส่งข้อมูลไปยัง `onSubmit`
    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-lg font-bold mb-4">เพิ่มรูปภาพใหม่</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          {/* Render the hosted images if any */}
          {hostedUrl?.length > 0 ? (
            hostedUrl.map((url, idx) => (
              <div key={idx} className="mb-4">
                <Image
                  src={url}
                  height={200}
                  width={250}
                  alt={`hosted_image_${idx}`}
                />
                <li>{url}</li>
              </div>
            ))
          ) : (
            <p>No images uploaded yet!</p>
          )}

          {/* Cloudinary Upload Widget */}

          <CldUploadWidget
            uploadPreset="nongberd" // Your Cloudinary upload preset
            onSuccess={(results) => {
              const uploadedImageUrl =
                results &&
                typeof results === "object" &&
                "info" in results &&
                results.info &&
                typeof results.info === "object" &&
                "url" in results.info
                  ? (results.info as { url: string }).url
                  : "";

              if (uploadedImageUrl) {
                setHostedUrl((prevHostedUrl) => [
                  ...prevHostedUrl,
                  uploadedImageUrl,
                ]);
                setImageUrl(uploadedImageUrl);
              } else {
                console.error("Failed to retrieve uploaded image URL.");
              }
            }}
          >
            {({ open }) => (
              <button
                onClick={() => open()}
                className="bg-blue-500 p-2 rounded-md text-white"
              >
                Upload an Image
              </button>
            )}
          </CldUploadWidget>

        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
}
