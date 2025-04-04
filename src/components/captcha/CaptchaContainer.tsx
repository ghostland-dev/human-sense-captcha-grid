
import React, { useState } from 'react';
import CaptchaGrid from './CaptchaGrid';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CaptchaContainerProps {
  onSuccess: () => void;
  className?: string;
}

const CaptchaContainer: React.FC<CaptchaContainerProps> = ({ 
  onSuccess,
  className
}) => {
  const [verified, setVerified] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleVerify = (success: boolean) => {
    if (success) {
      setVerified(true);
      onSuccess();
    } else {
      setAttempts(prev => prev + 1);
    }
  };

  const handleRetry = () => {
    setAttempts(0);
    setVerified(false);
  };

  return (
    <div className={cn("w-full bg-white shadow-lg rounded-lg overflow-hidden", className)}>
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center">
          <span className="w-3 h-3 bg-captcha-purple rounded-full inline-block mr-2"></span>
          CAPTCHA d'Intuition Humaine
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Basé sur la perception humaine des émotions et du contexte
        </p>
      </div>
      
      {verified ? (
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-1">Vérification réussie</h3>
          <p className="text-gray-600 mb-4">
            Vous avez démontré des caractéristiques d'interprétation humaine.
          </p>
          <Button 
            onClick={handleRetry} 
            variant="outline"
          >
            Réessayer
          </Button>
        </div>
      ) : (
        <CaptchaGrid onVerify={handleVerify} />
      )}
      
      {attempts > 0 && !verified && (
        <div className="px-4 py-3 bg-captcha-softPurple text-captcha-darkPurple text-sm">
          Tentative {attempts} : Réessayez avec une nouvelle approche d'interprétation.
        </div>
      )}
      
      <div className="p-3 bg-gray-50 text-xs text-gray-500 text-center border-t">
        Ce CAPTCHA analyse l'interprétation intuitive humaine des émotions et du contexte
      </div>
    </div>
  );
};

export default CaptchaContainer;
