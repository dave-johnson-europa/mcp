// Animated Git-style branch lines background
// Simple canvas animation for demo purposes
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'branchlines-bg';
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = 0;
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity = 0.18;
  document.body.prepend(canvas);

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const ctx = canvas.getContext('2d');
  const colors = ['#bfff00', '#eaffd0', '#222'];
  const lines = Array.from({ length: 7 }, (_, i) => ({
    x: 80 + i * 180,
    y: Math.random() * window.innerHeight,
    speed: 0.3 + Math.random() * 0.5,
    color: colors[i % colors.length],
    phase: Math.random() * Math.PI * 2
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach((line, idx) => {
      ctx.save();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2 + (idx % 2);
      ctx.beginPath();
      for (let y = 0; y < canvas.height; y += 8) {
        const x = line.x + Math.sin((y / 80) + line.phase) * 30;
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
      // Animate phase
      line.phase += 0.008 * (idx + 1);
    });
    requestAnimationFrame(draw);
  }
  draw();
});
