// app/platform/[slug]/page.tsx

import BaseLayout from "@/app/views/components/layout/base-layout";
import { platforms } from "@/types/platforms";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Define the Platform type
// Page Props interface
interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all platforms (optional - for static generation)
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return platforms.map((platform) => ({
    slug: platform.slug,
  }));
}

// Generate metadata for each platform page
export async function generateMetadata({ params }: PageProps) {
  const platform = platforms.find((p) => p.slug === params.slug);

  if (!platform) {
    return {
      title: "Platform Not Found",
      description: "The requested platform could not be found.",
    };
  }

  return {
    title: `${platform.title} - AI Platform Review`,
    description: platform.description,
    openGraph: {
      title: platform.title,
      description: platform.description,
      images: [platform.image],
    },
  };
}

// Main page component
export default function PlatformDetail({ params }: PageProps) {
  const { slug } = params;

  // Find the platform by slug
  const platform = platforms.find((p) => p.slug === slug);

  // If platform not found, trigger 404
  if (!platform) {
    notFound();
  }

  return (
    <BaseLayout>
      <div className="max-w-6xl mx-auto px-4 pt-30">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <Link href="/platforms" className="text-white">
            ← Back to Platforms
          </Link>
        </nav>

        {/* Header Section */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <Image
                src={platform.image}
                alt={platform.title}
                width={120}
                height={120}
                className="w-42 h-42 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {platform.title}
                </h1>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  {platform.category}
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                  {platform.pricing}
                </span>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {platform.description}
              </p>
              <a
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-black hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Visit Platform
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About {platform.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {platform.fullDescription}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {platform.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Use Cases
              </h2>
              <div className="flex flex-wrap gap-2">
                {platform.useCases.map((useCase, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Pros */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Pros
              </h3>
              <ul className="space-y-2">
                {platform.pros.map((pro, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {pro}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Cons
              </h3>
              <ul className="space-y-2">
                {platform.cons.map((con, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <svg
                      className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {con}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Info */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Category:
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {platform.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Pricing:
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {platform.pricing}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
