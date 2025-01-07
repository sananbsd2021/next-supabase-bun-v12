'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const images = [
    'https://res.cloudinary.com/dja3yvewr/image/upload/v1735830000/slider_images/marwnjvd0gvqgpwr0slg.jpg',
    'https://res.cloudinary.com/dja3yvewr/image/upload/v1735830001/slider_images/bzd0v9guv2lj64ce1iq0.jpg',
    'https://res.cloudinary.com/dja3yvewr/image/upload/v1735830001/slider_images/a4txlcksahkl5nugdm0y.jpg',
    'https://res.cloudinary.com/dja3yvewr/image/upload/v1735830001/slider_images/wqtgdyvdwgrek7dal8kv.jpg',
    'https://res.cloudinary.com/dja3yvewr/image/upload/v1735830001/slider_images/gclgdwpoaoxta2walak4.jpg',
  ];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 6 วินาที

    return () => clearInterval(interval); // เคลียร์ interval เมื่อ component ถูก unmount
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-96 sm:h-96">
      <Image
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        width={1200}
        height={960}
        className="w-full h-full object-cover rounded-lg"
      />
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
      >
        &#10094;
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
      >
        &#10095;
      </button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
