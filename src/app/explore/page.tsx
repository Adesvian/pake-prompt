"use client";
import { useEffect, useState } from "react";
import BaseLayout from "../views/components/layout/base-layout";
import { LoaderFour } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { fetchData } from "@/lib/firebase/service";
export default function ExplorePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData("output");
      console.log(result);
    };

    getData();
  }, []);

  if (loading) {
    return (
      <BaseLayout>
        <div className="relative flex flex-1 w-full items-center justify-center overflow-hidden">
          <div className="flex justify-center items-center min-h-[400px] text-5xl">
            <LoaderFour />
          </div>
        </div>
      </BaseLayout>
    );
  }

  if (error) {
    return (
      <BaseLayout>
        <div className="relative flex flex-1 w-full items-center justify-center bg-white dark:bg-black">
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:20px_20px]",
              "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
              "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
            )}
          />
          {/* Radial gradient for the container to give a faded look */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
          <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
            <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
              Something{" "}
              <span className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                glitched
              </span>
              . The prompt ran off to find{" "}
              <span className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                inspiration 🧠
              </span>
            </h2>
          </p>
        </div>
      </BaseLayout>
    );
  }
}
