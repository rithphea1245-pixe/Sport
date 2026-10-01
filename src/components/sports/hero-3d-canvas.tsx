"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  pulsePhase: number;
}

export function Hero3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Mouse & Rotation state
  const rotRef = useRef({
    rx: 0.25,
    ry: 0.35,
    targetRx: 0.25,
    targetRy: 0.35,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    autoRotateSpeed: 0.004,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Create 3D Fibonacci Sphere Nodes
    const SPHERE_RADIUS = Math.min(width, height) * 0.36;
    const TOTAL_NODES = 85;
    const points: Point3D[] = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < TOTAL_NODES; i++) {
      const y = 1 - (i / (TOTAL_NODES - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({
        x: x * SPHERE_RADIUS,
        y: y * SPHERE_RADIUS,
        z: z * SPHERE_RADIUS,
        baseX: x * SPHERE_RADIUS,
        baseY: y * SPHERE_RADIUS,
        baseZ: z * SPHERE_RADIUS,
        size: Math.random() * 2 + 1.5,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Interactive mouse drag
    const onMouseDown = (e: MouseEvent) => {
      rotRef.current.isDragging = true;
      rotRef.current.lastMouseX = e.clientX;
      rotRef.current.lastMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (rotRef.current.isDragging) {
        const deltaX = e.clientX - rotRef.current.lastMouseX;
        const deltaY = e.clientY - rotRef.current.lastMouseY;
        rotRef.current.targetRy += deltaX * 0.007;
        rotRef.current.targetRx += deltaY * 0.007;
        rotRef.current.lastMouseX = e.clientX;
        rotRef.current.lastMouseY = e.clientY;
      } else {
        // Gentle tilt tracking
        const rect = canvas.getBoundingClientRect();
        const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        rotRef.current.targetRy += normX * 0.0006;
        rotRef.current.targetRx = -normY * 0.25;
      }
    };

    const onMouseUp = () => {
      rotRef.current.isDragging = false;
    };

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        rotRef.current.isDragging = true;
        rotRef.current.lastMouseX = e.touches[0].clientX;
        rotRef.current.lastMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (rotRef.current.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - rotRef.current.lastMouseX;
        const deltaY = e.touches[0].clientY - rotRef.current.lastMouseY;
        rotRef.current.targetRy += deltaX * 0.008;
        rotRef.current.targetRx += deltaY * 0.008;
        rotRef.current.lastMouseX = e.touches[0].clientX;
        rotRef.current.lastMouseY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      rotRef.current.isDragging = false;
    };

    const el = canvas.parentElement || canvas;
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Render loop
    let tick = 0;
    const FOCAL_LENGTH = 400;

    const render = () => {
      tick++;

      // Physics damping & auto rotation
      rotRef.current.targetRy += rotRef.current.autoRotateSpeed;
      rotRef.current.rx += (rotRef.current.targetRx - rotRef.current.rx) * 0.06;
      rotRef.current.ry += (rotRef.current.targetRy - rotRef.current.ry) * 0.06;

      const cosX = Math.cos(rotRef.current.rx);
      const sinX = Math.sin(rotRef.current.rx);
      const cosY = Math.cos(rotRef.current.ry);
      const sinY = Math.sin(rotRef.current.ry);

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw Atmospheric Neon Core Glow
      const coreGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        SPHERE_RADIUS * 1.3
      );
      coreGradient.addColorStop(0, "rgba(198, 254, 86, 0.22)");
      coreGradient.addColorStop(0.4, "rgba(198, 254, 86, 0.07)");
      coreGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, SPHERE_RADIUS * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Transform 3D points
      interface ProjectedPoint {
        px: number;
        py: number;
        pz: number;
        scale: number;
        alpha: number;
        size: number;
        index: number;
      }

      const projected: ProjectedPoint[] = [];

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // 3D rotation Y
        const x1 = pt.baseX * cosY - pt.baseZ * sinY;
        const z1 = pt.baseZ * cosY + pt.baseX * sinY;

        // 3D rotation X
        const y2 = pt.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + pt.baseY * sinX;

        // Perspective Projection
        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + z2 + SPHERE_RADIUS * 0.4);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;
        const alpha = Math.max(0.12, Math.min(1, (z2 + SPHERE_RADIUS) / (SPHERE_RADIUS * 1.8)));

        projected.push({
          px,
          py,
          pz: z2,
          scale,
          alpha,
          size: pt.size * scale,
          index: i,
        });
      }

      // Draw 3D Orbiting Stadium Track Rings
      const ringCount = 3;
      for (let r = 0; r < ringCount; r++) {
        const ringRadius = SPHERE_RADIUS * (1.18 + r * 0.18);
        const tiltX = rotRef.current.rx + (r - 1) * 0.4;
        const tiltY = rotRef.current.ry + tick * 0.006 * (r % 2 === 0 ? 1 : -1);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(1, Math.cos(tiltX) * 0.45);
        ctx.rotate(tiltY);

        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = r === 1 ? "rgba(198, 254, 86, 0.4)" : "rgba(198, 254, 86, 0.15)";
        ctx.lineWidth = r === 1 ? 1.5 : 1;
        ctx.setLineDash([8, 12]);
        ctx.stroke();

        // Pulsing light traveling on the ring
        const travelAngle = (tick * 0.02 * (r + 1)) % (Math.PI * 2);
        const lx = Math.cos(travelAngle) * ringRadius;
        const ly = Math.sin(travelAngle) * ringRadius;

        ctx.beginPath();
        ctx.arc(lx, ly, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#C6FE56";
        ctx.shadowColor = "#C6FE56";
        ctx.shadowBlur = 10;
        ctx.fill();

        ctx.restore();
      }

      // Draw Wireframe Interconnections between close points
      ctx.lineWidth = 0.8;
      const MAX_DIST = SPHERE_RADIUS * 0.55;

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const lineAlpha = (1 - dist / MAX_DIST) * Math.min(p1.alpha, p2.alpha) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(198, 254, 86, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      // Sort points so back points are drawn first, front points drawn on top
      projected.sort((a, b) => a.pz - b.pz);

      // Draw Glowing Sphere Nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const isHighlight = p.index % 6 === 0;

        ctx.beginPath();
        ctx.arc(p.px, p.py, isHighlight ? p.size * 1.5 : p.size, 0, Math.PI * 2);

        if (isHighlight) {
          ctx.fillStyle = "#C6FE56";
          ctx.shadowColor = "#C6FE56";
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        } else {
          ctx.fillStyle = `rgba(198, 254, 86, ${p.alpha * 0.85})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Interactive 3D Hint Tag */}
      <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C6FE56]/30 text-[10px] text-[#C6FE56] font-bold tracking-wider uppercase pointer-events-none flex items-center gap-1.5 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#C6FE56] animate-ping" />
        Interactive 3D Sphere • Drag to Orbit
      </div>
    </div>
  );
}
