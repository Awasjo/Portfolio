import { useState, useEffect, useRef } from "react";

/**
 * INTERACTIVE TECHNOLOGY SHOWCASE
 * 
 * This component implements a physics-based interactive visualization for technology icons.
 * The physics simulation is built with pure vanilla JavaScript (no external libraries).
 * 
 * Key features:
 * - Icons float around naturally and respond to cursor movement
 * - Collision detection prevents icons from overlapping
 * - Elastic boundary collisions keep icons within the container
 * - Time-based animation ensures consistent motion regardless of frame rate
 * 
 * Implementation highlights:
 * - Uses requestAnimationFrame for smooth animation
 * - Direct DOM manipulation for better performance with many moving elements
 * - Proper cleanup on unmount to prevent memory leaks
 * - Desktop/mobile detection to only enable on appropriate devices
 */

// Interface for technology item
interface Technology {
  name: string;
  image: string;
  link: string;
}

// Interface for the position and physics state of each technology item
interface PhysicsItem extends Technology {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  element?: HTMLElement;
}

function TechnologyStack() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<PhysicsItem[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  const timeRef = useRef(0);

  // Check if user is on desktop
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // Assume desktop if width >= 768px
    };
    
    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);
    
    return () => {
      window.removeEventListener('resize', checkIfDesktop);
    };
  }, []);

  // Fetch technologies data
  useEffect(() => {
    setIsLoading(true);
    fetch("/technologies.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch technologies");
        }
        return response.json();
      })
      .then((data: Technology[]) => {
        setTechnologies(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching technologies:", error);
        setError("Failed to load technologies. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  // Initialize physics for interactive mode
  useEffect(() => {
    if (!isInteractive || !isDesktop || !containerRef.current || technologies.length === 0) {
      return;
    }

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const items: PhysicsItem[] = [];
    
    // Define the radius for each icon
    const iconRadius = 40;
    
    // A function to check if a position is valid (not overlapping with existing items)
    const isPositionValid = (x: number, y: number, radius: number) => {
      for (const item of items) {
        const dx = x - item.x;
        const dy = y - item.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < radius + item.radius) {
          return false;
        }
      }
      return true;
    };
    
    // Create physics items with non-overlapping positions
    technologies.forEach((tech) => {
      let x, y;
      let attempts = 0;
      const maxAttempts = 100;
      
      // Try to find a non-overlapping position
      do {
        x = iconRadius + Math.random() * (containerRect.width - 2 * iconRadius);
        y = iconRadius + Math.random() * (containerRect.height - 2 * iconRadius);
        attempts++;
      } while (!isPositionValid(x, y, iconRadius) && attempts < maxAttempts);
      
      // Create the element
      const element = document.createElement('div');
      element.className = 'absolute flex flex-col items-center text-center w-16 md:w-24';
      element.style.pointerEvents = 'none';
      element.style.zIndex = '10';

      const img = document.createElement('img');
      img.src = tech.image;
      img.alt = tech.name;
      img.className = 'h-12 w-12 md:h-14 md:w-14 object-contain';

      const text = document.createElement('p');
      text.textContent = tech.name;
      text.className = 'text-xs md:text-sm';

      element.appendChild(img);
      element.appendChild(text);
      container.appendChild(element);

      // Add small random initial velocity
      const vx = (Math.random() - 0.5) * 0.5;
      const vy = (Math.random() - 0.5) * 0.5;

      items.push({
        ...tech,
        x,
        y,
        vx,
        vy,
        radius: iconRadius,
        element
      });
    });

    itemsRef.current = items;
    activeRef.current = true;
    timeRef.current = Date.now();

    // Mouse move event listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    // Mouse leave event listener
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }; // Move mouse far away
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation function
    const animate = () => {
      if (!activeRef.current) return;

      const now = Date.now();
      const deltaTime = (now - timeRef.current) / 1000; // Time in seconds
      timeRef.current = now;

      const containerRect = container.getBoundingClientRect();
      
      // Update all items
      itemsRef.current.forEach(item => {
        if (!item.element) return;
        
        // Apply forces:
        
        // 1. Cursor repulsion
        const dx = item.x - mouseRef.current.x;
        const dy = item.y - mouseRef.current.y;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        
        const repulsionRadius = 150;
        if (distanceToMouse < repulsionRadius) {
          const force = 2.0 * (1 - distanceToMouse / repulsionRadius); // Stronger repulsion
          const angle = Math.atan2(dy, dx);
          item.vx += Math.cos(angle) * force * deltaTime * 50;
          item.vy += Math.sin(angle) * force * deltaTime * 50;
        }
        
        // 2. Inter-icon collision response
        itemsRef.current.forEach(otherItem => {
          if (item === otherItem) return;
          
          const dx = item.x - otherItem.x;
          const dy = item.y - otherItem.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDist = item.radius + otherItem.radius;
          
          if (distance < minDist) {
            // Calculate collision response
            const angle = Math.atan2(dy, dx);
            const targetX = otherItem.x + Math.cos(angle) * minDist;
            const targetY = otherItem.y + Math.sin(angle) * minDist;
            
            // Move to prevent overlap
            const ax = (targetX - item.x) * 0.1;
            const ay = (targetY - item.y) * 0.1;
            
            item.vx += ax;
            item.vy += ay;
          }
        });
        
        // 3. Add small random movement to create floating effect
        if (Math.random() < 0.05) {
          item.vx += (Math.random() - 0.5) * 0.2;
          item.vy += (Math.random() - 0.5) * 0.2;
        }
        
        // Apply friction to dampen movement
        item.vx *= 0.98;
        item.vy *= 0.98;
        
        // Update position
        item.x += item.vx;
        item.y += item.vy;
        
        // Bounce off walls with elastic collision
        if (item.x < item.radius) {
          item.x = item.radius;
          item.vx = Math.abs(item.vx) * 0.8;
        } else if (item.x > containerRect.width - item.radius) {
          item.x = containerRect.width - item.radius;
          item.vx = -Math.abs(item.vx) * 0.8;
        }
        
        if (item.y < item.radius) {
          item.y = item.radius;
          item.vy = Math.abs(item.vy) * 0.8;
        } else if (item.y > containerRect.height - item.radius) {
          item.y = containerRect.height - item.radius;
          item.vy = -Math.abs(item.vy) * 0.8;
        }
        
        // Update element position
        item.element.style.transform = `translate(${item.x - item.radius}px, ${item.y - item.radius}px)`;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      activeRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      // Remove all elements
      itemsRef.current.forEach(item => {
        if (item.element && item.element.parentNode) {
          item.element.parentNode.removeChild(item.element);
        }
      });
      
      itemsRef.current = [];
    };
  }, [isInteractive, isDesktop, technologies]);

  // Toggle for interactive mode
  const handleToggleInteractive = () => {
    setIsInteractive(!isInteractive);
  };

  return (
    <section id="technologies" className="section-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-heading mb-0">Technologies</h2>
        
        {isDesktop && (
          <button
            onClick={handleToggleInteractive}
            className={`px-4 py-2 rounded-lg shadow-ring transition-colors ${
              isInteractive ? 'bg-burnt-amber text-white' : 'bg-dark-green text-white'
            }`}
            aria-label={isInteractive ? "Disable interactive mode" : "Enable interactive mode"}
          >
            {isInteractive ? "Standard View" : "Interactive Mode"}
          </button>
        )}
      </div>
      
      {isLoading && <p className="text-center">Loading technologies...</p>}
      
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!isLoading && !error && (
        <>
          {/* Interactive container */}
          {isInteractive && isDesktop && (
            <div 
              ref={containerRef}
              className="relative w-full max-w-screen-lg mx-auto min-h-[300px] border rounded-lg overflow-hidden bg-primary"
              style={{ height: '400px' }}
            ></div>
          )}
          
          {/* Standard view */}
          {(!isInteractive || !isDesktop) && (
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
        </>
      )}
      
      {isInteractive && isDesktop && (
        <p className="text-center text-sm mt-4 italic">
          Move your cursor around to interact with the technology icons!
        </p>
      )}
    </section>
  );
}

export default TechnologyStack;
