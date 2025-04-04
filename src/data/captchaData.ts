
// Sample data for the CAPTCHA system
// In a production environment, this would be much more extensive and possibly stored server-side

// List of emotional and contextual concepts
export const emotionalConcepts = [
  "nostalgie",
  "sérénité",
  "mélancolie",
  "joie",
  "solitude",
  "liberté",
  "curiosité",
  "espoir",
  "anxiété",
  "confusion",
  "émerveillement",
  "tristesse",
  "confort",
  "inquiétude",
  "optimisme",
  "tendresse",
  "vulnérabilité",
  "détermination",
  "contemplation",
  "mystère"
];

// User interaction patterns typically associated with human behavior
export const humanInteractionPatterns = {
  // Time ranges in milliseconds
  responseTime: {
    min: 5000,  // 5 seconds
    max: 45000  // 45 seconds
  },
  
  // Mouse movement patterns
  mouseMovement: {
    // Average distance between consecutive points 
    // (humans typically have more varied movement)
    averageDistance: {
      min: 5,
      max: 50
    },
    
    // Direction changes per second
    // (humans often have pauses and irregular movements)
    directionChanges: {
      min: 0.5,
      max: 5
    }
  },
  
  // Hover patterns before selection
  hoverPatterns: {
    // Time spent hovering on elements before selecting
    duration: {
      min: 500,   // 0.5 seconds
      max: 5000   // 5 seconds
    },
    
    // Multiple hovers on same element (consideration)
    revisits: {
      min: 0,
      max: 3
    }
  }
};

// Analysis rules for verifying human nature
export const verificationRules = {
  // Number of images selected should feel natural
  selectionCount: {
    min: 1,
    max: 4
  },
  
  // Time thresholds for suspicious behavior
  timing: {
    tooFast: 3000,      // 3 seconds - suspiciously fast
    tooConsistent: 500, // 500ms variance - too robotic
  },
  
  // Mouse movement analysis thresholds
  mouseAnalysis: {
    minimumMovements: 10,       // Should have more than 10 recorded movements
    suspiciouslyLinear: 0.9,    // Linear correlation above 0.9 is suspicious
  }
};
