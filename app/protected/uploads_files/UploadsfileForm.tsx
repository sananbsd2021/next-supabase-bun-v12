import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface UploadsfileFormProps {
  onSubmit: (data: {
    name: string;
    position: string;
    role: string;
    imageUrl: string;
  }) => void;
  onClose: () => void;
}

export default function UploadsfileForm({ onSubmit, onClose }: UploadsfileFormProps) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [hostedUrl, setHostedUrl] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, position, role,imageUrl }); // ส่งข้อมูลไปยัง `onSubmit`
    setName("");
    setPosition("");
    setRole("");
    setImageUrl("");
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-lg font-bold mb-4">เพิ่มบุคลากร</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">ชื่อ :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">ตำแหน่ง :</label>

          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >

            <option value="">เลือกหมวดหมู่</option>
            <option value="director">ผู้อำนวยการ</option>
            <option value="teacher1">ครูผู้สอน ป.1</option>
            <option value="teacher2">ครูผู้สอน ป.2</option>
            <option value="teacher3">ครูผู้สอน ป.3</option>
            <option value="teacher4">ครูผู้สอน ป.4</option>
            <option value="teacher5">ครูผู้สอน ป.5</option>
            <option value="teacher6">ครูผู้สอน ป.6</option>
            <option value="teacher7">ครูผู้สอน อนุบาล 1</option>
            <option value="teacher8">ครูผู้สอน อนุบาล 2</option>
            <option value="teacher9">ครูผู้สอน อนุบาล 3</option>
            <option value="teacher10">ธุรการ</option>
            <option value="staff">ภารโรง</option>
          </select>
          
{/*           
          <textarea
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          /> */}
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
