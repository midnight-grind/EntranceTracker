import React, { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

const SwirlCanvas = () => {
  const canvasRef = useRef(null);
  const baseSpeed = 0.02; // Slower speed for particles
  const rangeSpeed = 0.5;
  const tickIncrement = 0.1;
  const zOff = 0.00005; 
  let particleCount = 700;
  let particlePropCount = 9;
  let particlePropsLength = particleCount * particlePropCount;
  let baseTTL = 50;
  let rangeTTL = 150;
  let baseRadius = 1;
  let rangeRadius = 4;
  let baseHue = 220;
  let rangeHue = 100;
  let noiseSteps = 8;
  let xOff = 0.00125;
  let yOff = 0.00125;
  let backgroundColor = 'hsla(260,40%,5%,1)';
  let canvas = { a: null, b: null };
  let ctx = { a: null, b: null };
  let particleProps, tick, simplex, center;

  useEffect(() => {
    const container = canvasRef.current;

    function setup() {
      createCanvas();
      resize();
      initParticles();
      draw();
    }

    function createCanvas() {
      canvas.a = document.createElement('canvas');
      canvas.b = document.createElement('canvas');

      canvas.b.style = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `;

      container.appendChild(canvas.b);
      ctx.a = canvas.a.getContext('2d');
      ctx.b = canvas.b.getContext('2d');
      center = [canvas.a.width / 2, canvas.a.height / 2];
    }

    function resize() {
      const { innerWidth, innerHeight } = window;

      canvas.a.width = innerWidth;
      canvas.a.height = innerHeight;
      canvas.b.width = innerWidth;
      canvas.b.height = innerHeight;

      center = [canvas.a.width / 2, canvas.a.height / 2];
    }

    function initParticles() {
      tick = 0;
      simplex = createNoise3D();
      particleProps = new Float32Array(particlePropsLength);

      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticle(i);
      }
    }

    function initParticle(i) {
      let x = Math.random() * canvas.a.width;
      let y = Math.random() * canvas.a.height;
      let vx = 0, vy = 0, life = 0;
      let ttl = baseTTL + Math.random() * rangeTTL;
      let speed = baseSpeed + Math.random() * rangeSpeed;
      let radius = baseRadius + Math.random() * rangeRadius;
      let hue = baseHue + Math.random() * rangeHue;

      particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    }

    function drawParticles() {
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i);
      }
    }

    function updateParticle(i) {
      let i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i;
      let x = particleProps[i];
      let y = particleProps[i2];
      let n = simplex(x * xOff, y * yOff, tick * zOff) * noiseSteps * Math.PI * 2;
      let vx = 0.5 * (Math.cos(n) + particleProps[i3]);
      let vy = 0.5 * (Math.sin(n) + particleProps[i4]);
      let life = particleProps[i5];
      let ttl = particleProps[i6];
      let speed = particleProps[i7];
      let radius = particleProps[i8];
      let hue = particleProps[i9];
      let x2 = x + vx * speed;
      let y2 = y + vy * speed;

      drawParticle(x, y, x2, y2, life, ttl, radius, hue);
      life++;

      particleProps[i] = x2;
      particleProps[i2] = y2;
      particleProps[i3] = vx;
      particleProps[i4] = vy;
      particleProps[i5] = life;

      if (x2 > canvas.a.width || x2 < 0 || y2 > canvas.a.height || y2 < 0 || life > ttl) {
        initParticle(i);
      }
    }

    function drawParticle(x, y, x2, y2, life, ttl, radius, hue) {
      ctx.a.save();
      ctx.a.lineCap = 'round';
      ctx.a.lineWidth = radius;
      ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.a.beginPath();
      ctx.a.moveTo(x, y);
      ctx.a.lineTo(x2, y2);
      ctx.a.stroke();
      ctx.a.closePath();
      ctx.a.restore();
    }

    function fadeInOut(life, ttl) {
      let hl = ttl * 0.5;
      return Math.abs(life - hl) / hl;
    }

    function draw() {
      tick += tickIncrement;
      ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
      ctx.b.fillStyle = backgroundColor;
      ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

      drawParticles();
      renderGlow();
      renderToScreen();

      requestAnimationFrame(draw);
    }

    function renderGlow() {
      ctx.b.save();
      ctx.b.filter = 'blur(8px) brightness(200%)'; // Keeps the existing glow effect
      ctx.b.globalCompositeOperation = 'lighter';
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    }

    function renderToScreen() {
      ctx.b.save();
      ctx.b.globalCompositeOperation = 'lighter';
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    }

    window.addEventListener('resize', resize);

    setup(); 

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(draw);
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      className="content content--canvas" 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1, 
        overflow: 'hidden', 
        filter: 'blur(2px)' // Added CSS blur filter for a light blur effect
      }}
    />
  );
};

export default SwirlCanvas;
