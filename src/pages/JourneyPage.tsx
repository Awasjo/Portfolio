import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

// Import modular components
import Scene from "../components/journey/Scene";
import JourneyControls from "../components/journey/JourneyControls";

// Custom hook for mobile detection
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent =
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
      setIsMobile(mobile);
    };

    checkIfMobile();
  }, []);
  
  return isMobile;
}

export default function JourneyPage() {
  // State to track if the scene is still loading
  const [isLoading, setIsLoading] = useState(true);

  // State to track progress along the journey (0-1)
  const [progress, setProgress] = useState(0);

  // State to track which milestone is currently active
  const [activeMilestone, setActiveMilestone] = useState(-1);

  // State to track if user is on a mobile device
  const isMobile = useIsMobile();

  // Ref to the container div for adding event listeners
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse wheel events to move along the journey
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY) * 0.005; // Scroll down = forward, scroll up = backward
    setProgress((p) => Math.max(0, Math.min(1, p + delta)));
  };

  // Set up event listeners and handle loading state
  useEffect(() => {
    // Show loading screen for 1.5 seconds then set isLoading to false
    const timer = setTimeout(() => setIsLoading(false), 1500);

    // Add event listeners to handle scroll only for desktop
    const container = containerRef.current;
    if (container && !isMobile) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    // Clean up event listeners when component unmounts
    return () => {
      clearTimeout(timer);
      if (container && !isMobile) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isMobile]);

  // Check if journey is complete (reached the end)
  const isJourneyComplete = progress >= 0.98;

  return (
    // Main container for the entire journey page
    <div
      ref={containerRef}
      className="h-screen w-full overflow-hidden bg-dark-green relative select-none"
    >
      {isLoading ? (
        // LOADING SCREEN
        <div className="h-full w-full flex-center flex-col">
          <div className="car-silhouette animate-bounce text-5xl">🚗</div>
          <p className="text-amber-50 mt-4 text-lg">
            Preparing your journey...
          </p>
        </div>
      ) : isMobile ? (
        // MOBILE WARNING
        <div className="h-full w-full flex-center flex-col p-6">
          <div className="bg-primary text-primary p-6 rounded-xl max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">
              Desktop Experience Recommended
            </h2>
            <p className="mb-6">
              This interactive journey experience works best on a desktop device
              with a mouse or trackpad.
            </p>
            <Link to="/" className="button-primary">
              Return to Portfolio
            </Link>
          </div>
        </div>
      ) : (
        // MAIN JOURNEY VIEW - DESKTOP ONLY
        <div className="journey-view h-full w-full relative">
          {/* Journey UI Controls */}
          <JourneyControls progress={progress} isComplete={isJourneyComplete} />
          <p className="absolute top-4 left-4 text-white">Active Milestone: {activeMilestone}</p>

          {/* Three.js canvas - this is where all the 3D content appears */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 1.5, 3], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <Scene
                  progress={progress}
                  setActiveMilestone={setActiveMilestone}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>
      )}
    </div>
  );
}
