export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.16 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: false, amount: 0.16 },
  transition: { duration: 0.5, delay },
});

export const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { staggerChildren: 0.08 } },
  viewport: { once: false, amount: 0.12 },
};

export const staggerItem = (delay = 0) => ({
  initial: { opacity: 0, y: 30, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: false, amount: 0.16 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: false, amount: 0.16 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const slideLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: false, amount: 0.16 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const slideRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: false, amount: 0.16 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};
