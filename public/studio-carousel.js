document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('#studio-carousel');
  if (!carousel) return;

  let pausedUntil = 0;

  const step = () => {
    const half = carousel.scrollWidth / 2;
    if (half > 0 && carousel.scrollLeft >= half) carousel.scrollLeft -= half;
    if (Date.now() > pausedUntil) carousel.scrollLeft += 0.45;
    window.requestAnimationFrame(step);
  };

  document.querySelectorAll('[data-carousel-dir]').forEach((button) => {
    button.addEventListener('click', () => {
      const dir = Number(button.getAttribute('data-carousel-dir')) || 1;
      const firstCell = carousel.querySelector('.studio__cell');
      const amount = firstCell ? firstCell.getBoundingClientRect().width + 20 : 360;
      pausedUntil = Date.now() + 4500;
      carousel.scrollBy({ left: dir * amount, behavior: 'smooth' });
    });
  });

  carousel.addEventListener('pointerenter', () => {
    pausedUntil = Date.now() + 1000;
  });

  window.requestAnimationFrame(step);
});
