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
    y: -50,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
