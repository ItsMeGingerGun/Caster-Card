'use client';
import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  color: string;
}

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  const resizeCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size to match its display size
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }, []);

  const createParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor((width * height) / 10000)); // Responsive particle count
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        color: `hsla(${Math.random() * 60 + 200}, 70%, 60%, ${Math.random() * 0.3 + 0.1})`, // Blue/purple hues
      });
    }
    
    return particles;
  }, []);

  const animate = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Bounce off edges
      if (particle.x <= 0 || particle.x >= width) {
        particle.speedX *= -1;
        particle.x = Math.max(0, Math.min(width, particle.x));
      }
      if (particle.y <= 0 || particle.y >= height) {
        particle.speedY *= -1;
        particle.y = Math.max(0, Math.min(height, particle.y));
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    resizeCanvas();
    
    const rect = canvas.getBoundingClientRect();
    particlesRef.current = createParticles(rect.width, rect.height);

    // Start animation
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      const newRect = canvas.getBoundingClientRect();
      particlesRef.current = createParticles(newRect.width, newRect.height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [resizeCanvas, createParticles, animate]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default Particles;
