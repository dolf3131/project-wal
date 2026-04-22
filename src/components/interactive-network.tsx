"use client";

import React, { useEffect, useRef } from "react";

// Authentic Physics Node
interface PhysicsNode {
  id: string;
  label: string;
  group: number;
  mass: number;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const rawNodes = [
  // Physics Category
  { id: "Physics", label: "Physics", mass: 80, radius: 26, group: 1 },
  { id: "Quantum Mechanics", label: "Quantum", mass: 20, radius: 12, group: 1 },
  { id: "Electromagnetics", label: "E&M", mass: 20, radius: 12, group: 1 },
  { id: "Classical Mechanics", label: "Classical", mass: 20, radius: 12, group: 1 },
  
  // Engineering Category
  { id: "Engineering", label: "Engineering", mass: 80, radius: 26, group: 2 },
  { id: "Microelectronics", label: "Microelectronics", mass: 20, radius: 12, group: 2 },
  { id: "Signals & Systems", label: "Signals", mass: 20, radius: 12, group: 2 },
  { id: "Operating Systems", label: "OS", mass: 20, radius: 12, group: 2 },
  { id: "Digital Logic", label: "Logic", mass: 20, radius: 12, group: 2 },
  
  // Programming Category
  { id: "Programming", label: "Programming", mass: 80, radius: 26, group: 3 },
  { id: "Python", label: "Python", mass: 20, radius: 12, group: 3 },
  { id: "C/C++", label: "C/C++", mass: 20, radius: 12, group: 3 },
  { id: "Move", label: "Move", mass: 20, radius: 12, group: 3 },
  { id: "Rust", label: "Rust", mass: 20, radius: 12, group: 3 },
  { id: "LaTeX", label: "LaTeX", mass: 20, radius: 12, group: 3 },
  { id: "Git", label: "Git", mass: 20, radius: 12, group: 3 },
];

export function InteractiveNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 600;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Initialize Authentic N-Body Simulation State
    const nodes: PhysicsNode[] = rawNodes.map((n) => {
      // Start them somewhat scattered with initial organic tangential velocities
      // to form a natural rotating cluster
      const angle = Math.random() * Math.PI * 2;
      const initialRadius = 50 + Math.random() * 150;
      const x = width / 2 + Math.cos(angle) * initialRadius;
      const y = height / 2 + Math.sin(angle) * initialRadius;
      
      // Tangential velocity to prevent immediate central collapse
      const vMagnitude = 1.0 + Math.random() * 1.5;
      const vx = -Math.sin(angle) * vMagnitude;
      const vy = Math.cos(angle) * vMagnitude;

      return {
        ...n, x, y, vx, vy
      };
    });

    let animationId: number;
    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseDown = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      isMouseDown = false;
    };

    const handleMouseDown = () => { isMouseDown = true; };
    const handleMouseUp = () => { isMouseDown = false; };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    
    // Add touch support for dragging
    canvas.addEventListener("touchstart", (e) => {
      isMouseDown = true;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    }, {passive: true});
    canvas.addEventListener("touchmove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    }, {passive: true});
    canvas.addEventListener("touchend", () => { isMouseDown = false; mouseX = -9999; mouseY = -9999; });

    const checkResize = () => {
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0 && (newW !== width || newH !== height)) {
        width = newW;
        height = newH;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
    };

    const runNBodyPhysics = () => {
      const G = 0.8; // Gravitational Constant applied
      const SOFTENING = 50; // Prevents division by zero or infinite force safely
      const DAMPING = 0.998; // Natural space friction to prevent heating
      const BOUNDARY_RESTITUTION = 0.8; // Bounciness against walls

      // 1. Calculate N-Body Gravity
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist > 0) {
            // Newton's Universal Law of Gravitation (Softened)
            const force = (G * nodes[i].mass * nodes[j].mass) / (distSq + SOFTENING);
            
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            // F = ma -> a = F/m
            nodes[i].vx += fx / nodes[i].mass;
            nodes[i].vy += fy / nodes[i].mass;
            nodes[j].vx -= fx / nodes[j].mass;
            nodes[j].vy -= fy / nodes[j].mass;
            
            // 2. Physical Elastic Collisions (So texts don't permanently overlap)
            const minDist = nodes[i].radius + nodes[j].radius + 4; // structural padding
            if (dist < minDist) {
               // Positional correction to prevent sticking
               const overlap = minDist - dist;
               const nx = dx / dist;
               const ny = dy / dist;
               
               const totalMass = nodes[i].mass + nodes[j].mass;
               const correctionI = overlap * (nodes[j].mass / totalMass);
               const correctionJ = overlap * (nodes[i].mass / totalMass);
               
               nodes[i].x -= nx * correctionI;
               nodes[i].y -= ny * correctionI;
               nodes[j].x += nx * correctionJ;
               nodes[j].y += ny * correctionJ;

               // Velocity Momentum Exchange
               const kx = nodes[i].vx - nodes[j].vx;
               const ky = nodes[i].vy - nodes[j].vy;
               // 1D elastic collision equation along normal
               const p = 2.0 * (nx * kx + ny * ky) / totalMass;
               
               const elasticity = 0.7; // slight loss of energy on collision
               nodes[i].vx -= p * nodes[j].mass * nx * elasticity;
               nodes[i].vy -= p * nodes[j].mass * ny * elasticity;
               nodes[j].vx += p * nodes[i].mass * nx * elasticity;
               nodes[j].vy += p * nodes[i].mass * ny * elasticity;
            }
          }
        }
      }

      // 3. User Interaction (Mouse Gravity)
      for (const n of nodes) {
        // If mouse is near, act as a massive blackhole (or repulsive force)
        if (mouseX !== -9999 && mouseY !== -9999) {
          const dx = mouseX - n.x;
          const dy = mouseY - n.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);
          
          if (dist < 150) {
            // Drag nodes dynamically if clicked
            if (isMouseDown) {
               // Attraction
               n.vx += (dx / dist) * 0.5;
               n.vy += (dy / dist) * 0.5;
            } else {
               // Gentle repulsion to make them dodge the mouse naturally
               const avoidForce = (150 - dist) / 150 * 0.2;
               n.vx -= (dx / dist) * avoidForce;
               n.vy -= (dy / dist) * avoidForce;
            }
          }
        }
        
        // Gentle center attraction to simulate a galaxy core and prevent completely flying off
        n.vx += ((width / 2) - n.x) * 0.0003;
        n.vy += ((height / 2) - n.y) * 0.0003;

        // Apply friction and integrate
        n.vx *= DAMPING;
        n.vy *= DAMPING;

        if (isNaN(n.vx)) n.vx = 0;
        if (isNaN(n.vy)) n.vy = 0;

        n.x += n.vx;
        n.y += n.vy;

        // 4. Physical Boundaries (Walls)
        const wallPad = n.radius;
        if (n.x < wallPad) { n.x = wallPad; n.vx *= -BOUNDARY_RESTITUTION; }
        if (n.x > width - wallPad) { n.x = width - wallPad; n.vx *= -BOUNDARY_RESTITUTION; }
        if (n.y < wallPad) { n.y = wallPad; n.vy *= -BOUNDARY_RESTITUTION; }
        if (n.y > height - wallPad) { n.y = height - wallPad; n.vy *= -BOUNDARY_RESTITUTION; }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Clean drawing pass: No edges, no lines, no magnifying lens.
      // Pure physical objects floating dynamically.
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);

        // Minimalist tech styling. Clean and solid.
        ctx.fillStyle = "#020713"; // Pitch dark body
        ctx.strokeStyle = "rgba(0, 200, 255, 0.8)"; // Neon border
        
        // Massive objects have slightly thicker borders
        if (n.mass > 30) {
           ctx.lineWidth = 2.5;
           ctx.shadowBlur = 15;
           ctx.shadowColor = "rgba(0, 150, 255, 0.4)";
        } else {
           ctx.lineWidth = 1.5;
           ctx.shadowBlur = 8;
           ctx.shadowColor = "rgba(0, 255, 255, 0.2)";
        }

        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset

        // Pure clean label text
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        
        const fontSize = n.mass > 30 ? 14 : 11;
        ctx.font = `600 ${fontSize}px 'Inter', sans-serif`;
        ctx.textAlign = "center";
        
        if (n.mass > 30) {
           // Text inside the large body
           ctx.textBaseline = "middle";
           ctx.fillText(n.label, n.x, n.y);
        } else {
           // Text below the small body
           ctx.textBaseline = "top";
           ctx.fillText(n.label, n.x, n.y + n.radius + 6);
        }
      }
    };

    const loop = () => {
      try {
        checkResize();
        runNBodyPhysics();
        draw();
      } catch (err) {
        console.error("Canvas physics error:", err);
      }
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[650px] border border-border/50 bg-[#000205] relative overflow-hidden flex items-center justify-center rounded-[1.5rem] shadow-[inset_0_0_100px_rgba(0,40,100,0.15)]"
    >
      <div className="absolute top-5 left-6 z-10 flex items-center gap-3 pointer-events-none">
        <span className="w-2.5 h-2.5 bg-cyan-400 rotate-45 shadow-[0_0_12px_rgba(0,255,255,0.8)]"></span>
        <span className="text-xs font-mono tracking-widest uppercase text-cyan-500/80">N-Body Kinetics</span>
      </div>
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-crosshair touch-none"
      />
    </div>
  );
}

