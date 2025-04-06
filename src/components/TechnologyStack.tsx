import { useState, useEffect } from "react";

function TechnologyStack() {
  const [technologies, setTechnologies] = useState<
    { name: string; image: string; link: string }[]
  >([]);

  useEffect(() => {
    fetch("/technologies.json")
      .then((response) => response.json())
      .then((data) => setTechnologies(data));
  }, []);

  return (
    <section id="technologies" className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Technologies</h2>
      <div className="flex flex-wrap justify-center gap-4 max-w-screen-lg mx-auto">
        {technologies.map((tech, index) => (
          <a
            key={index}
            href={tech.link}
            className="flex flex-col items-center text-center w-24 md:w-32"
          >
            <img className="h-14 mb-2pp" src={tech.image} alt={tech.name} />
            <p>{tech.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export default TechnologyStack;
