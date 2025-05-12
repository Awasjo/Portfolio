import { Link } from "react-router-dom";

interface JourneyControlsProps {
  progress: number;
  isComplete: boolean;
}

export default function JourneyControls({
  progress,
  isComplete,
}: JourneyControlsProps) {
  return (
    <>
      {/* Back button to return home */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="button-primary flex items-center gap-2 px-4 py-2"
        >
          <span>←</span> Back to Home
        </Link>
      </div>

      {/* Journey title at the top */}
      <div className="text-center pt-6 pb-2 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-50">
          My Journey
        </h1>
        <p className="text-amber-50 mt-2">Scroll through my experiences</p>
      </div>

      {/* Progress bar showing how far along the journey we are */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 max-w-md z-40">
        <div className="h-2 bg-amber-50 bg-opacity-30 rounded-full overflow-hidden">
          <div
            className="h-full bg-burnt-amber"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Journey completion message */}
      {isComplete && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary p-6 rounded-xl z-50 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Journey Complete!</h2>
          <p className="mb-6">
            Thank you for traveling through the key milestones of my career. The
            road continues as I keep growing and learning!
          </p>
          <Link to="/" className="button-primary">
            Return to Portfolio
          </Link>
        </div>
      )}

      {/* Instructions overlay */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-center text-amber-50 text-sm z-40">
        <p>Use scroll wheel to go through the journey</p>
      </div>
    </>
  );
}
