"use client";

import React, { useEffect, useState } from "react";

const CloudinaryGallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // ตรวจสอบว่าค่า environment variables ถูกต้อง
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
        const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KET;
        const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

        if (!cloudName || !apiKey || !apiSecret) {
          throw new Error("Environment variables are not set correctly.");
        }

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?type=upload`,
          {
            headers: {
              Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const imageUrls = data.resources.map((resource: any) => resource.secure_url);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Cloudinary image ${index + 1}`}
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
      ))}
    </div>
  );
};

export default CloudinaryGallery;
