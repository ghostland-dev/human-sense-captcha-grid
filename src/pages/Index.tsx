
import React, { useState } from 'react';
import CaptchaContainer from '@/components/captcha/CaptchaContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleCaptchaSuccess = () => {
    setCaptchaVerified(true);
    toast({
      title: "CAPTCHA vérifié",
      description: "Votre statut humain a été confirmé.",
    });
  };

  const handleSubmit = () => {
    if (captchaVerified) {
      toast({
        title: "Formulaire soumis",
        description: "Merci pour votre soumission.",
      });
      // Reset the state
      setCaptchaVerified(false);
      setShowCaptcha(false);
    } else {
      setShowCaptcha(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-captcha-softPurple to-white p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            CAPTCHA d'Intuition Humaine
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un système innovant basé sur l'interprétation émotionnelle et culturelle humaine
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Qu'est-ce que c'est?</CardTitle>
              <CardDescription>Un nouveau paradigme de vérification</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Notre CAPTCHA exploite les capacités uniques d'interprétation émotionnelle 
                et contextuelle humaines. Contrairement aux systèmes traditionnels, il s'appuie 
                sur des réponses subjectives sans solution unique.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Comment ça fonctionne</CardTitle>
              <CardDescription>La puissance de l'intuition humaine</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Le système analyse votre interprétation des images et votre comportement 
                d'interaction. Les humains et les IA réagissent différemment face à 
                l'ambiguïté émotionnelle et aux contextes culturels.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">Démonstration</h2>
            <p className="text-gray-600">
              Essayez notre système de vérification d'intuition humaine
            </p>
          </div>

          {showCaptcha ? (
            <CaptchaContainer 
              onSuccess={handleCaptchaSuccess}
              className="mb-6"
            />
          ) : (
            <div className="text-center mb-6">
              <Button 
                onClick={() => setShowCaptcha(true)}
                className="bg-captcha-purple hover:bg-captcha-darkPurple"
              >
                Afficher le CAPTCHA
              </Button>
            </div>
          )}

          <div className="flex justify-center">
            <Button 
              onClick={handleSubmit}
              disabled={showCaptcha && !captchaVerified}
              className="px-8 py-2"
            >
              {captchaVerified ? "Soumettre le formulaire" : "Continuer"}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Avantages du système</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-md bg-captcha-softBlue">
              <h3 className="font-medium text-lg mb-2">Résistant à l'IA</h3>
              <p className="text-sm">
                Exploite la compréhension contextuelle et émotionnelle, difficile à simuler par l'IA
              </p>
            </div>
            
            <div className="p-4 border rounded-md bg-captcha-softPurple">
              <h3 className="font-medium text-lg mb-2">Accessible</h3>
              <p className="text-sm">
                Alternatives disponibles pour les utilisateurs malvoyants ou ayant d'autres besoins
              </p>
            </div>
            
            <div className="p-4 border rounded-md bg-captcha-softGray">
              <h3 className="font-medium text-lg mb-2">Adaptable</h3>
              <p className="text-sm">
                Système évolutif qui s'adapte aux nouvelles tentatives d'exploitation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
