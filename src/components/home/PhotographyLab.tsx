"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

export default function PhotographyLab() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

  return (
    <section className="text-background relative bg-[#EAE9E5]">
      <div ref={targetRef} className="h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="absolute top-12 left-12 z-10 py-10 mix-blend-multiply">
            <h2 className="text-accent font-serif text-6xl md:text-8xl">
              The Darkroom
            </h2>
            <p className="mt-4 max-w-sm font-mono text-sm text-black/60">
              Photography is my practice of slowing down. <br />
              Analog only. No edits.
            </p>
          </div>

          <motion.div style={{ x, y: 120 }} className="flex gap-12 pl-[30vw]">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="relative flex h-[60vh] w-[40vw] shrink-0 rotate-1 flex-col bg-black p-4 pb-12 shadow-2xl shadow-black/30 transition-transform duration-500 hover:rotate-0 md:w-[25vw]"
              >
                {/* Image Placeholder */}
                <div className="bg-muted relative h-full w-full overflow-hidden grayscale transition-all duration-700 hover:grayscale-0">
                  <Image
                    src={`https://picsum.photos/800/1200?random=${i}`} // Replace with your real photos
                    alt="Analog Photography"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex justify-between font-mono text-[10px] tracking-widest text-white uppercase">
                  <span>Fuji Superia 400</span>
                  <span>Tokyo, JP</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="h-20" />
    </section>
  );
}
