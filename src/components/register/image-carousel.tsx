"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { slides } from "@/collections/image-carousel";
import { ImageSlide } from "@/types/carousel";

export function ImageCarousel() {
  const [index, setIndex] = useState<number>(0);
  const currentSlide: ImageSlide = slides[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <div className="border-0.75 relative h-full overflow-hidden rounded-xl dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <AnimatePresence mode="sync">
            <motion.img
              key={currentSlide.img}
              src={currentSlide.img}
              className="absolute w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8 }}
            />
          </AnimatePresence>

          <div className="relative z-20 flex h-full flex-col justify-end">
            <AnimatePresence mode="sync">
              <motion.div
                key={currentSlide.title}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent text-white p-5 rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8 }}
              >
                <h3 className="text-xl font-semibold">{currentSlide.title}</h3>
                <p className="text-sm mt-2">{currentSlide.prompt}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
