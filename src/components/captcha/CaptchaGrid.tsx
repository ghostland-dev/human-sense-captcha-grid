
import React, { useState, useEffect } from "react";
import CaptchaImage from "./CaptchaImage";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";
import { emotionalConcepts } from "@/data/captchaData";
import { cn } from "@/lib/utils";

// Sample images from Unsplash using IDs from mock data
// In production, this would be fetched from the Unsplash API
const sampleImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    alt: "Ocean waves",
    placeholderColor: "bg-blue-100"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
    alt: "Desert sand",
    placeholderColor: "bg-amber-100"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    alt: "Herd of sheep",
    placeholderColor: "bg-green-100"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
    alt: "Camels on field",
    placeholderColor: "bg-yellow-100"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    alt: "Mosque buildings",
    placeholderColor: "bg-indigo-100"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    alt: "Foggy mountain",
    placeholderColor: "bg-gray-100"
  }
];

interface CaptchaGridProps {
  onVerify: (success: boolean) => void;
  className?: string;
}

const CaptchaGrid: React.FC<CaptchaGridProps> = ({ onVerify, className }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [mouseMovements, setMouseMovements] = useState<{x: number, y: number, time: number}[]>([]);
  const [concept, setConcept] = useState("");
  const { toast } = useToast();

  // Track mouse movements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (startTime) {
        setMouseMovements(prev => [
          ...prev,
          { 
            x: e.clientX, 
            y: e.clientY, 
            time: Date.now() - startTime 
          }
        ]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [startTime]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
      setStartTime(Date.now());
      
      // Select a random emotional concept for the challenge
      const randomConcept = emotionalConcepts[Math.floor(Math.random() * emotionalConcepts.length)];
      setConcept(randomConcept);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev => {
      if (prev.includes(id)) {
        return prev.filter(imageId => imageId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleVerify = () => {
    // In a real implementation this would involve server-side validation
    // Here we're simulating the verification process
    
    if (selectedImages.length === 0) {
      toast({
        title: "Veuillez sélectionner au moins une image",
        variant: "destructive"
      });
      return;
    }
    
    const endTime = Date.now();
    const responseTime = startTime ? (endTime - startTime) / 1000 : 0;
    
    // Complex verification would happen here, analyzing:
    // - Selected images against the concept
    // - Response time (5-45s is typical for humans)
    // - Mouse movement patterns
    
    // For this demo, we'll use a simple validation:
    // - Time between 3s and 60s
    // - At least one image selected
    const isHuman = responseTime > 3 && responseTime < 60 && selectedImages.length > 0;
    
    if (isHuman) {
      toast({
        title: "Vérification réussie",
        description: "Vous avez passé le test CAPTCHA avec succès.",
      });
    } else {
      toast({
        title: "Vérification échouée",
        description: "Veuillez réessayer.",
        variant: "destructive"
      });
    }
    
    onVerify(isHuman);
    
    console.log({
      responseTime,
      selectedImages,
      mouseMovementsCount: mouseMovements.length,
      // In a real implementation, this data would be sent to the server for analysis
    });
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-4", className)}>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Vérification humaine</h2>
        
        {loading ? (
          <p className="text-gray-600 animate-pulse flex items-center justify-center">
            <Loader className="animate-spin mr-2" size={16} />
            Chargement du défi...
          </p>
        ) : (
          <p className="text-gray-600">
            Sélectionnez toutes les images qui évoquent le sentiment de <span className="font-semibold text-captcha-purple">{concept}</span>
          </p>
        )}
      </div>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-md"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sampleImages.map((image) => (
            <CaptchaImage
              key={image.id}
              id={image.id}
              url={image.url}
              alt={image.alt}
              selected={selectedImages.includes(image.id)}
              placeholderColor={image.placeholderColor}
              onSelect={toggleImageSelection}
            />
          ))}
        </div>
      )}
      
      <div className="mt-6 flex justify-center">
        <button 
          onClick={handleVerify}
          disabled={loading}
          className={cn(
            "px-6 py-2 rounded-md font-medium transition-all duration-300",
            loading 
              ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
              : "bg-captcha-purple text-white hover:bg-captcha-darkPurple"
          )}
        >
          Vérifier
        </button>
      </div>
    </div>
  );
};

export default CaptchaGrid;
