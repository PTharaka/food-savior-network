
import React, { useEffect, useRef } from 'react';

const EcoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create leaf objects
    const leaves: Leaf[] = [];
    const leafColors = [
      '#4CAF50', '#8BC34A', '#CDDC39', '#C5E1A5', '#AED581', '#9CCC65'
    ];
    
    class Leaf {
      x: number;
      y: number;
      size: number;
      color: string;
      rotation: number;
      speed: number;
      oscillationSpeed: number;
      oscillationDistance: number;
      baseX: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.size = Math.random() * 15 + 5;
        this.color = leafColors[Math.floor(Math.random() * leafColors.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.5 + 0.1;
        this.oscillationSpeed = Math.random() * 0.02 + 0.001;
        this.oscillationDistance = Math.random() * 40 + 10;
      }
      
      update() {
        this.y += this.speed;
        this.x = this.baseX + Math.sin(this.y * this.oscillationSpeed) * this.oscillationDistance;
        this.rotation += 0.01;
        
        if (this.y > canvas.height) {
          this.y = -this.size;
          this.baseX = Math.random() * canvas.width;
        }
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw a simple leaf shape
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(0, -this.size/2);
        ctx.bezierCurveTo(
          this.size/2, -this.size/4,
          this.size/2, this.size/4,
          0, this.size/2
        );
        ctx.bezierCurveTo(
          -this.size/2, this.size/4,
          -this.size/2, -this.size/4,
          0, -this.size/2
        );
        ctx.fill();
        
        // Draw leaf vein
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1;
        ctx.moveTo(0, -this.size/2);
        ctx.lineTo(0, this.size/2);
        ctx.stroke();
        
        ctx.restore();
      }
    }
    
    // Create leaves
    for (let i = 0; i < 30; i++) {
      leaves.push(new Leaf());
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      leaves.forEach(leaf => {
        leaf.update();
        leaf.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default EcoBackground;
