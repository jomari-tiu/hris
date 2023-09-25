export const fadeDown = {
  initial: {
    y: -50,
    opacity: 0,
  },
  animate: {
    y: -0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
