
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CaptchaImageProps {
  id: string;
  url: string;
  alt: string;
  selected: boolean;
  onSelect: (id: string) => void;
  placeholderColor?: string;
}

const CaptchaImage: React.FC<CaptchaImageProps> = ({
  id,
  url,
  alt,
  selected,
  onSelect,
  placeholderColor = 'bg-gray-100'
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const handleClick = () => {
    onSelect(id);
  };

  return (
    <div 
      className={cn(
        'captcha-image aspect-square relative animate-fade-in',
        selected && 'selected'
      )}
      onClick={handleClick}
      data-testid={`captcha-image-${id}`}
    >
      <div className={cn('blur-load aspect-square', loaded && 'loaded')}>
        <div className={cn('placeholder', placeholderColor)} />
        <img
          src={url}
          alt={alt}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
            !loaded && 'opacity-0'
          )}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      </div>
      
      {selected && (
        <div className="absolute top-2 right-2 bg-captcha-purple text-white rounded-full p-1 z-10 animate-fade-in">
          <Check size={16} />
        </div>
      )}
    </div>
  );
};

export default CaptchaImage;
