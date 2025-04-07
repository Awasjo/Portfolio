import React from "react";

interface ProjectCardProps {
  image: string;
  title: string;
  link: string;
  description?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  image, 
  title, 
  link, 
  description 
}) => {
  return (
    <div className="card-bordered hover-transition">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-center flex-col"
      >
        <img
          src={image}
          alt={title}
          className="mb-2 max-w-[75%] object-contain"
        />
        <h3 className="font-bold text-center">{title}</h3>
        {description && <p className="text-sm text-center mt-2">{description}</p>}
      </a>
    </div>
  );
};

export default ProjectCard;
