"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Carousel = () => {
  const images = [
    "https://xysaswoufwhmmdoyufwh.supabase.co/storage/v1/object/public/kennytrbl/volunteering.webp",
    "https://xysaswoufwhmmdoyufwh.supabase.co/storage/v1/object/public/kennytrbl/volunteering2.webp",
    "https://xysaswoufwhmmdoyufwh.supabase.co/storage/v1/object/public/kennytrbl/volunteering3.webp",
    "https://xysaswoufwhmmdoyufwh.supabase.co/storage/v1/object/public/kennytrbl/volunteering4.webp",
    "https://xysaswoufwhmmdoyufwh.supabase.co/storage/v1/object/public/kennytrbl/volunteering5.webp",
    "https://xysaswoufwhmmdoyufwh.supabase.co/storage/v1/object/public/kennytrbl/volunteering6.webp",
    "https://xysaswoufwhmmdoyufwh.supabase.co/storage/v1/object/public/kennytrbl/volunteering7.webp",
    "https://xysaswoufwhmmdoyufwh.supabase.co/storage/v1/object/public/kennytrbl/volunteering8.webp",
    "https://xysaswoufwhmmdoyufwh.supabase.co/storage/v1/object/public/kennytrbl/volunteering9.webp",
    "https://xysaswoufwhmmdoyufwh.supabase.co/storage/v1/object/public/kennytrbl/volunteering10.webp",
  ];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div
      className="aspect-[4/3] sm:aspect-[3/2] flex-wrap ml-auto mb-auto max-w-full sm:max-w-[600px] lg:max-w-[720px] relative w-full lg:w-[55%] 2xl:w-[65%]"
      style={{ height: "auto" }}
    >
      {images.map((image, index) => (
        <Image
          alt={`Volunteering image ${index + 1}`}
          src={image}
          height={480}
          width={720}
          key={index}
          className={`absolute duration-500 ease-in-out h-full object-cover sm:object-contain transition-opacity w-full ${
            slideIndex === index ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          quality={100}
        />
      ))}
    </div>
  );
};

export default Carousel;
