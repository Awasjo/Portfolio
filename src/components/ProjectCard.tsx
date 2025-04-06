import React from "react";

interface ProjectCardProps {
  image: string;
  title: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, link }) => {
  return (
    <div className="border card flex flex-col justify-center">
      <a
        href={link}
        className="flex-center flex-col"
      >
        <img
          src={image}
          alt={title}
          className="mb-2 max-w-[75%] object-contain"
        />
        <h3 className="font-bold text-center">{title}</h3>
      </a>
    </div>
  );
};

export default ProjectCard;
