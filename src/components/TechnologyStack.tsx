import { useState, useEffect } from "react";

function TechnologyStack() {
  const [technologies, setTechnologies] = useState<
    { name: string; image: string; link: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("/technologies.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch technologies");
        }
        return response.json();
      })
      .then((data) => {
        setTechnologies(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching technologies:", error);
        setError("Failed to load technologies. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="technologies" className="section-container">
      <h2 className="section-heading">Technologies</h2>
      
      {isLoading && <p className="text-center">Loading technologies...</p>}
      
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!isLoading && !error && (
        <div className="flex flex-wrap justify-center gap-4 max-w-screen-lg mx-auto">
          {technologies.map((tech, index) => (
            <a
              key={index}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center w-24 md:w-32"
            >
              <img className="h-14 mb-2" src={tech.image} alt={tech.name} />
              <p>{tech.name}</p>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export default TechnologyStack;
