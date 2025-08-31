import React from "react";
import Image from "next/image";

interface ProjectProps {
  project: string;
  link: string;
  description: string;
  image: string;
}

const Project: React.FC<ProjectProps> = ({ project, link, description, image }) => {
  return (
    <div className="inline-block mt-2 mr-2 relative hover:cursor-pointer">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        title={description}
        className="
          relative block
          before:absolute before:inset-0 before:rounded-md
          before:bg-[#202b33]/30 before:opacity-100
          before:transition-opacity before:duration-300
          hover:before:opacity-0
        "
      >
        <Image
          alt={`${project} project preview`}
          src={image}
          height={192}
          width={192}
          className="block object-cover rounded h-58 w-58 transition duration-300"
          loading="lazy"
          quality={100}
        />
        <div
          className="absolute bottom-2 left-2 right-2 z-20
                     rounded bg-black/50 px-2 py-1 text-white"
        >
          {project}
        </div>
      </a>
    </div>
  );
};

export default Project;
