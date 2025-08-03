import Image from "next/image";
import BaseLayout from "../views/components/layout/base-layout";
import { title } from "process";

const platforms = [
  {
    title: "ChatGPT",
    link: "https://chat.openai.com/",
    description:
      "Advanced AI chatbot developed by OpenAI for general-purpose tasks including writing, coding, and learning.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    category: "Chatbot",
    pricing: "Free/Premium",
  },
  {
    title: "Claude",
    link: "https://claude.ai/",
    description:
      "AI assistant by Anthropic for thoughtful conversations, analysis, and creative work.",
    image:
      "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/claude-ai-icon.png",
    category: "Chatbot",
    pricing: "Free/Pro",
  },
  {
    title: "Midjourney",
    link: "https://www.midjourney.com/",
    description:
      "AI image generator that creates stunning artwork from text prompts.",
    image: "https://avatars.githubusercontent.com/u/61396273?s=280&v=4",
    category: "Image Generation",
    pricing: "Subscription",
  },
  {
    title: "DALL·E 3",
    link: "https://openai.com/dall-e-3",
    description:
      "OpenAI's most advanced AI image generator with exceptional prompt understanding.",
    image:
      "https://livetoday.id/wp-content/uploads/2024/08/Ilustrasi-Logo-Dall-E-3.webp",
    category: "Image Generation",
    pricing: "Pay-per-use",
  },
  {
    title: "Gemini",
    link: "https://gemini.google.com/",
    description: "Multimodal AI for creators and developers by Google.",
    image:
      "https://static.vecteezy.com/system/resources/previews/055/687/055/non_2x/rectangle-gemini-google-icon-symbol-logo-free-png.png",
    category: "Chatbot",
    pricing: "Free/Pro",
  },
  {
    title: "Bing Copilot",
    link: "https://www.bing.com/chat",
    description: "AI-powered search and answers by Microsoft.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Bing_Logo.svg",
    category: "Chatbot",
    pricing: "Free/Pro",
  },
  {
    title: "IBM WatsonX",
    link: "https://www.ibm.com/watsonx/",
    description: "Enterprise-ready AI & ML tools from IBM.",
    image:
      "https://boxplot.com/wp-content/uploads/2024/11/IBM_Watson_AI-1024x665.jpg",
    category: "Chatbot",
    pricing: "Free/Pro",
  },
  {
    title: "GitHub Copilot",
    link: "https://github.com/features/copilot",
    description:
      "AI pair programmer that helps write code faster with intelligent suggestions.",
    image:
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    category: "Coding",
    pricing: "Subscription",
  },
  {
    title: "Stable Diffusion",
    link: "https://stability.ai/stable-diffusion",
    description:
      "Open-source AI model for generating detailed images from text descriptions.",
    image:
      "https://tooldirectory.ai/_next/image?url=https%3A%2F%2Fstriking-kindness-e0d93214bb.media.strapiapp.com%2FStable_Diffusion_logo_2b68efd6c7.png&w=3840&q=72",
    category: "Image Generation",
    pricing: "Free/Commercial",
  },
  {
    title: "Jasper AI",
    link: "https://www.jasper.ai/",
    description:
      "AI marketing copilot for creating high-quality content and campaigns.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGpBm0kvMKgLpgYXFwUG6obVzzhEIXVgVPNA&s",
    category: "Content Writing",
    pricing: "Subscription",
  },
  {
    title: "Perplexity AI",
    link: "https://www.perplexity.ai/",
    description:
      "AI-powered search engine that provides accurate answers with cited sources.",
    image:
      "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/perplexity-ai-icon.png",
    category: "Search",
    pricing: "Free/Pro",
  },
  {
    title: "Runway ML",
    link: "https://runwayml.com/",
    description:
      "AI-powered creative suite for video editing, image generation, and content creation.",
    image:
      "https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2023/06/runway-800x439-1.png",
    category: "Video/Creative",
    pricing: "Subscription",
  },
  {
    title: "ElevenLabs",
    link: "https://elevenlabs.io/",
    description:
      "Advanced AI voice generator with realistic speech synthesis and voice cloning.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBVNpGHzjV-JkT1ekBJqayI93p42HDiK2XSw&s",
    category: "Voice/Audio",
    pricing: "Free/Premium",
  },
  {
    title: "Canva AI",
    link: "https://www.canva.com/ai-image-generator/",
    description:
      "AI-powered design tools integrated into Canva's platform for graphics and presentations.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiLt_Z2LIeMMUZ6OxEbA5YuAHxIqRbGa0CfA&s",
    category: "Design",
    pricing: "Free/Pro",
  },
  {
    title: "Copy.ai",
    link: "https://www.copy.ai/",
    description:
      "AI writing assistant for marketing copy, social media posts, and business content.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT14c1RIu0V-Xhj9vCFlpjA0a0Go3Q0Pxkwhw&s",
    category: "Content Writing",
    pricing: "Free/Premium",
  },
  {
    title: "Writesonic",
    link: "https://writesonic.com/",
    description:
      "AI writing platform for articles, ads, and landing pages with SEO optimization.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpy4tqofsQMiI83OLjBvS6yzCndORffIwiZQ&s",
    category: "Content Writing",
    pricing: "Free/Premium",
  },
  {
    title: "Luma AI",
    link: "https://lumalabs.ai/",
    description:
      "AI platform for creating photorealistic 3D models and scenes from images.",
    image:
      "https://cdn.dribbble.com/userupload/4454985/file/original-2fdb7a9244be2d686313432858b17290.jpg",
    category: "3D/AR",
    pricing: "Free/Premium",
  },
  {
    title: "Hugging Face",
    link: "https://huggingface.co/",
    description:
      "Open-source platform hosting thousands of AI models for various tasks.",
    image: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
    category: "Platform",
    pricing: "Free/Enterprise",
  },
  {
    title: "Replicate",
    link: "https://replicate.com/",
    description:
      "Platform to run open-source AI models via API with easy deployment.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7BWkd-_2Mai34fI4zacUOJqyIQ84txeBYtQ&s",
    category: "Platform",
    pricing: "Pay-per-use",
  },
  {
    title: "Leonardo AI",
    link: "https://leonardo.ai/",
    description:
      "AI image generator focused on creating game assets, concept art, and illustrations.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5AwOC13iesh_sl5V1FYIMRR98x2zDd6jfKg&s",
    category: "Image Generation",
    pricing: "Free/Premium",
  },
  {
    title: "Synthesia",
    link: "https://www.synthesia.io/",
    description:
      "AI video generator that creates professional videos with AI avatars and voiceovers.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbBVPuO6mSZpO-V9reoKRB8vM8h_PUeF1FAQ&s",
    category: "Video",
    pricing: "Subscription",
  },
  {
    title: "Notion AI",
    link: "https://www.notion.so/product/ai",
    description:
      "AI writing assistant integrated into Notion for enhanced productivity and content creation.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    category: "Productivity",
    pricing: "Subscription add-on",
  },
  {
    title: "Character.AI",
    link: "https://character.ai/",
    description:
      "Platform for creating and chatting with AI characters with distinct personalities.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStigmirhbvZqI-ZvjhUs0ztf9SiREyzCLTjA&s",
    category: "Entertainment",
    pricing: "Free/Plus",
  },
  {
    title: "Anthropic Claude",
    link: "https://www.anthropic.com/claude",
    description:
      "Constitutional AI assistant designed to be helpful, harmless, and honest.",
    image:
      "https://static-www.adweek.com/wp-content/uploads/2025/03/claude-search-game-2025.jpg?w=1200",
    category: "Chatbot",
    pricing: "API/Pro",
  },
  {
    title: "Pika Labs",
    link: "https://pika.art/",
    description:
      "AI video generator that creates short videos from text prompts and images.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS4i_QInGw6ajUTbXpTBz4tCh7Hry-Ss0ZsA&s",
    category: "Video",
    pricing: "Free/Premium",
  },
  {
    title: "Adobe Firefly",
    link: "https://www.adobe.com/products/firefly.html",
    description:
      "Adobe's family of creative generative AI models integrated into Creative Cloud.",
    image:
      "https://www.adobe.com/content/dam/shared/images/product-icons/svg/firefly.svg",
    category: "Creative Suite",
    pricing: "Subscription",
  },
  {
    title: "Grammarly",
    link: "https://www.grammarly.com/",
    description:
      "AI-powered writing assistant for grammar checking, style improvements, and tone detection.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcc-4w3ZxZ4GkRUL-ZZ5U3PxywWaao0RitWg&s",
    category: "Writing Assistant",
    pricing: "Free/Premium",
  },
  {
    title: "Murf AI",
    link: "https://murf.ai/",
    description:
      "AI voice generator with 120+ realistic voices in 20+ languages for voiceovers.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI4WQY6Ue3X5vAEnVvajxbggI-arfdbhRVhA&s",
    category: "Voice/Audio",
    pricing: "Free/Premium",
  },
  {
    title: "DeepL",
    link: "https://www.deepl.com/",
    description:
      "AI-powered translator providing more accurate and nuanced translations than competitors.",
    image: "https://static.deepl.com/img/logo/deepl-logo-blue.svg",
    category: "Translation",
    pricing: "Free/Pro",
  },
  {
    title: "Otter.ai",
    link: "https://otter.ai/",
    description:
      "AI meeting assistant that records, transcribes, and summarizes meetings automatically.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7XuVHVhwkF4-vrKBAJLYXbsOsFhbdZKiCEQ&s",
    category: "Productivity",
    pricing: "Free/Premium",
  },
  {
    title: "Tome",
    link: "https://tome.app/",
    description:
      "AI-powered storytelling tool for creating presentations and documents with generative content.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm32zWQiacx6HdUHwtToYnVH8Q9hkId1Lj0Q&s",
    category: "Presentations",
    pricing: "Free/Premium",
  },
  {
    title: "Cursor",
    link: "https://cursor.sh/",
    description:
      "AI-first code editor built for pair programming with AI assistants.",
    image: "https://img.icons8.com/?size=512&id=DiGZkjCzyZXn&format=png",
    category: "Coding",
    pricing: "Free/Pro",
  },
  {
    title: "Replit",
    link: "https://replit.com/",
    description:
      "Online IDE with AI coding assistant for collaborative programming and deployment.",
    image: "https://replit.com/public/images/logo.svg",
    category: "Coding",
    pricing: "Free/Premium",
  },
];
export default function PlatformPage() {
  return (
    <BaseLayout>
      <div className="relative w-full flex items-center justify-center min-h-[400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full p-30">
          {platforms.map((item, index) => (
            <a
              key={index}
              target="_blank"
              href={item.link}
              className="flex space-x-2"
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
                  <p className="text-sm text-gray-600 dark:text-gray-300 max-w-[12rem]">
                    {item.description.length > 50
                      ? item.description.substring(0, 50) + "..."
                      : item.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}
