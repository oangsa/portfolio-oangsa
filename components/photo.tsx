"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import photo from "../assets/me_bg.png";

export default function Photo(): JSX.Element {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className="photo-frame"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        src={photo}
        priority
        quality={90}
        sizes="(min-width: 960px) 38vw, 86vw"
        alt="Portrait of Suthang Sukrueangkun"
      />
    </motion.figure>
  );
}
