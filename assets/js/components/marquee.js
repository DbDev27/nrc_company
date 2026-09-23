export function initMarquee() {
  document.querySelectorAll(".marquee").forEach((marquee) => {
    const track = marquee.querySelector(".marquee__track");
    const original = track?.querySelector(".marquee__group");

    if (!track || !original) {
      return;
    }

    const clone = original.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);

    let position = 0;
    let lastTime = performance.now();
    const speed = Number(marquee.dataset.speed) || 1;

    function animate(currentTime) {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      position -= speed * (delta / 16.67);

      if (Math.abs(position) >= original.offsetWidth) {
        position += original.offsetWidth;
      }

      track.style.transform = `translate3d(${position}px, 0, 0)`;
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  });
}