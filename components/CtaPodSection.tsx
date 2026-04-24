"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./ui/Button";

const floatingAvatars = [
  { src: "https://i.pravatar.cc/150?u=1", size: 80, top: "15%", left: "10%", delay: 0 },
  { src: "https://i.pravatar.cc/150?u=2", size: 60, top: "60%", left: "8%", delay: 0.5 },
  { src: "https://i.pravatar.cc/150?u=3", size: 70, top: "25%", right: "12%", delay: 1.2 },
  { src: "https://i.pravatar.cc/150?u=4", size: 90, top: "65%", right: "10%", delay: 0.8 },
  { src: "https://i.pravatar.cc/150?u=5", size: 50, top: "10%", right: "25%", delay: 1.5 },
  { src: "https://i.pravatar.cc/150?u=6", size: 55, top: "75%", left: "25%", delay: 0.3 },
];

export default function CtaPodSection() {
  return (
    <section className="bg-wild-sand py-12 px-5 md:px-10 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1550px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white rounded-[40px] md:rounded-[64px] py-16 md:py-20 px-10 text-center overflow-hidden border border-aztec/5 shadow-[0_32px_100px_rgba(0,0,0,0.04)]"
        >
          {/* Floating Avatars with Gravity-like Motion */}
          {floatingAvatars.map((img, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -12, 0],
                x: [0, 4, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: img.delay
              }}
              className="absolute hidden xl:block rounded-full overflow-hidden border-4 border-white shadow-lg pointer-events-none"
              style={{ 
                width: img.size * 0.9, // slightly smaller avatars for smaller height
                height: img.size * 0.9, 
                top: img.top, 
                left: img.left, 
                right: img.right 
              }}
            >
              <Image 
                src={img.src} 
                alt="Client" 
                fill 
                className="object-cover" 
                unoptimized
              />
            </motion.div>
          ))}

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-aztec text-3xl md:text-5xl font-bold leading-tight mb-6"
            >
              Ready for a spotless space?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xanadu text-base md:text-lg mb-10 max-w-lg mx-auto"
            >
              Join the elite homeowners and estates who trust Joseph.co for uncompromising standards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                variant="primary" 
                className="w-full sm:w-auto h-[56px] px-10 bg-aztec text-white hover:bg-aztec/90 rounded-full text-base font-bold"
              >
                Get Started &rarr;
              </Button>
              
              <Button 
                variant="secondary" 
                className="w-full sm:w-auto h-[56px] px-10 border-2 border-aztec/10 text-aztec hover:bg-aztec/5 rounded-full text-base font-bold"
              >
                Talk to Sales
              </Button>
            </motion.div>
          </div>

          {/* Decorative Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-green/5 via-transparent to-pine-green/5 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
