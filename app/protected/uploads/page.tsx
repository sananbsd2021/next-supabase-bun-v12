'use client';

import { useState } from 'react';

export default function ImageSliderUploadForm() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadMessage, setUploadMessage] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>(''); // สำหรับเก็บชื่อโฟลเดอร์ที่ผู้ใช้ป้อน

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files)); // Convert FileList to Array
    }
  };

  const handleFolderNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value); // อัปเดตชื่อโฟลเดอร์
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadMessage('กรุณาเลือกรูปภาพก่อนอัปโหลด');
      return;
    }

    if (!folderName) {
      setUploadMessage('กรุณาระบุชื่อโฟลเดอร์');
      return;
    }

    setLoading(true);
    setUploadMessage('');
    setUploadedImages([]);

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append(
          'upload_preset',
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
        ); // Replace with your Cloudinary upload preset
        formData.append('folder', folderName); // ใช้ชื่อโฟลเดอร์ที่ผู้ใช้ป้อน

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`, // Replace with your Cloudinary cloud name
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error?.message || 'Upload failed');
        }

        return data.secure_url; // Return the uploaded image URL
      });

      const imageUrls = await Promise.all(uploadPromises);
      setUploadedImages(imageUrls);
      setUploadMessage('อัปโหลดสำเร็จ!');
    } catch (error) {
      setUploadMessage((error as Error).message || 'เกิดข้อผิดพลาดในการอัปโหลด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">ฟอร์มอัปโหลดรูปภาพสไลด์</h1>

      <div className="max-w-lg mx-auto p-4 border rounded shadow">
        <div className="mb-4">
          <label htmlFor="folder" className="block text-gray-700 font-bold mb-2">
            ชื่อโฟลเดอร์:
          </label>
          <input
            type="text"
            id="folder"
            value={folderName}
            onChange={handleFolderNameChange}
            className="block w-full text-gray-700 border rounded p-2"
            placeholder="ป้อนชื่อโฟลเดอร์"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            เลือกรูปภาพ:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="block w-full text-gray-700 border rounded p-2"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full px-4 py-2 rounded ${
            loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'กำลังอัปโหลด...' : 'อัปโหลด'}
        </button>
      </div>

      {uploadMessage && (
        <p className="text-center mt-4 text-gray-700">{uploadMessage}</p>
      )}

      {uploadedImages.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">รูปภาพที่อัปโหลด:</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">รูปภาพ</th>
                <th className="px-4 py-2 border-b">URL</th>
              </tr>
            </thead>
            <tbody>
              {uploadedImages.map((url, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 text-center">
                    <img
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
