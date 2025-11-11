import Image from "next/image";
import BaseLayout from "../views/components/layout/base-layout";
import Link from "next/link";
import { platforms } from "@/types/platforms";

export default function PlatformPage() {
  return (
    <BaseLayout>
      <div className="mt-24 mb-4 sm:my-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full px-4 sm:p-30">
          {platforms.map((item, index) => (
            <Link
              key={index}
              href={`/platforms/${item.slug}`}
              className="flex-1 group"
            >
              <div className="flex items-center gap-4 border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="w-16 h-16 object-cover rounded-md shadow-md"
                  />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-black dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm sm:text-base line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}
