import React from "react";
import { motion } from "framer-motion";

type Props = {
  variants: any;
  children: React.ReactNode;
  className?: string;
};

function AnimationContainer({ variants, children, className, ...rest }: Props) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default AnimationContainer;
