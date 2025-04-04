
import React, { useState } from 'react';
import CaptchaContainer from '@/components/captcha/CaptchaContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Demo = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleCaptchaSuccess = () => {
    setCaptchaVerified(true);
    toast({
      title: "Vérification réussie",
      description: "Vous avez passé le test CAPTCHA avec succès.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaVerified) {
      toast({
        title: "Vérification requise",
        description: "Veuillez compléter le CAPTCHA avant de soumettre le formulaire.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Formulaire soumis",
      description: "Merci pour votre inscription.",
    });
    
    // Reset form
    setEmail('');
    setName('');
    setCaptchaVerified(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-captcha-softPurple to-white p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="mb-8">
          <Link to="/" className="flex items-center text-gray-600 hover:text-captcha-purple transition-colors">
            <ArrowLeft className="mr-2" size={16} />
            Retour à l'accueil
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Démonstration du CAPTCHA
          </h1>
          <p className="text-gray-600 mt-2">
            Inscrivez-vous pour tester notre système de vérification
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <h2 className="text-xl font-semibold">Inscription à la Newsletter</h2>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                  placeholder="Votre nom"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  placeholder="votre@email.com"
                />
              </div>
              
              <div className="pt-4 pb-2">
                <CaptchaContainer onSuccess={handleCaptchaSuccess} />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-captcha-purple hover:bg-captcha-darkPurple"
                disabled={!captchaVerified}
              >
                S'inscrire
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center text-xs text-gray-500">
            Vos données ne sont pas réellement collectées dans cette démonstration
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Demo;
