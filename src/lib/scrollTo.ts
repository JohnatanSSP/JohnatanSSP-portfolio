/**
 * Smooth scroll utility with customizable offset.
 * Uses native smooth scroll (leverages CSS scroll-behavior: smooth).
 * Falls back gracefully in reduced-motion environments.
 */
export function scrollToSection(id: string, offset = 90) {
  const element = document.getElementById(id);
  if (!element) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: prefersReduced ? 'instant' : 'smooth',
  });
}
