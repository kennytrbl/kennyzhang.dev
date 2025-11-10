import React from "react";

interface PressItem {
  type: "youtube" | "article";
  url: string;
  title?: string;
  description?: string;
}

interface PressProps {
  items: PressItem[];
}

const Press: React.FC<PressProps> = ({ items }) => {
  return (
    <div className="flex flex-row flex-wrap gap-6 w-[1/2]">
      {items.map((item, idx) => {
        if (item.type === "youtube") {
          return (
            <div key={idx} className="flex justify-center">
              <div className="aspect-16/10 lg:w-[300px] max-w-full">
                <iframe
                  src={item.url}
                  title={item.title || "YouTube video"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg w-full h-full"
                ></iframe>
              </div>
            </div>
          );
        }
        if (item.type === "article") {
          return (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1ce0e0] text-lg font-semibold hover:underline"
            >
              <div className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                {item.title || item.url}
                {item.description && <p className="text-gray-300 text-base mt-1">{item.description}</p>}
              </div>
            </a>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Press;
