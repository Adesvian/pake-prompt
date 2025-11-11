import BaseLayout from "./views/components/layout/base-layout";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const words = `Prompt Smarter. Build Faster🚀.`;

  const images = [
    "/cover-1.jpeg",
    "/cover-2.jpeg",
    "/cover-3.jpeg",
    "/cover-4.jpeg",
    "/cover-5.jpeg",
    "/cover-6.jpeg",
    "/cover-7.jpeg",
    "/cover-8.jpeg",
    "/cover-9.jpeg",
    "/cover-10.jpeg",
    "/cover-11.jpeg",
    "/cover-12.jpeg",
    "/cover-13.jpeg",
    "/cover-14.jpeg",
    "/cover-15.jpeg",
    "/cover-16.jpeg",
    "/cover-17.jpeg",
    "/cover-18.jpeg",
    "/cover-19.jpeg",
  ];

  return (
    <BaseLayout>
      <section className="relative flex flex-1 w-full items-center justify-center overflow-hidden">
        <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 text-white">
          <TextGenerateEffect
            className="text-center text-2xl font-bold text-balance md:text-4xl lg:text-6xl"
            words={words}
          />
          <p className="mt-6 max-w-2xl text-center text-sm text-neutral-200 md:text-base">
            Explore, save, modify, and share your prompts to inspire,
            collaborate, and unlock the full potential of AI. You&apos;re not
            just a user—you can be a creator, explorer, and contributor. And it
            all starts with a single prompt.
          </p>

          <div className="mt-6 flex items-center justify-center">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black text-white flex items-center space-x-2 cursor-pointer"
            >
              <Link href="/explore" className="flex items-center space-x-2">
                <span>Explore Now</span>
                <ArrowRight />
              </Link>
            </HoverBorderGradient>
          </div>
        </div>

        {/* overlay hitam */}
        <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/70" />

        {/* background animasi */}
        <ThreeDMarquee
          className="pointer-events-none absolute h-full w-screen"
          images={images}
        />
      </section>
    </BaseLayout>
  );
}
