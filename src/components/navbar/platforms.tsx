import { ProductItem } from "@/components/ui/navbar-menu";

export default function PlatformItems() {
  return (
    <>
      <ProductItem
        title="ChatGPT"
        href="https://chat.openai.com/"
        src="https://static.vecteezy.com/system/resources/previews/021/972/603/non_2x/minsk-belarus-03-27-2023-openai-and-chatgpt-logo-artifical-chatbot-system-chat-bot-button-for-web-app-and-phone-icon-symbol-editorial-illustration-free-vector.jpg"
        description="The OG conversational AI from OpenAI."
      />
      <ProductItem
        title="Gemini"
        href="https://gemini.google.com/"
        src="https://static.vecteezy.com/system/resources/previews/055/687/055/non_2x/rectangle-gemini-google-icon-symbol-logo-free-png.png"
        description="Google’s multimodal AI for creators & developers."
      />
      <ProductItem
        title="Claude"
        href="https://claude.ai/"
        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/claude-ai-icon.png"
        description="Helpful, harmless AI by Anthropic."
      />
      <ProductItem
        title="Leonardo AI"
        href="https://leonardo.ai/"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5AwOC13iesh_sl5V1FYIMRR98x2zDd6jfKg&s"
        description="Next-gen image generation powered by AI."
      />
      <ProductItem
        title="Bing Copilot"
        href="https://www.bing.com/chat"
        src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Bing_Logo.svg"
        description="AI-powered search and answers by Microsoft."
      />
      <ProductItem
        title="IBM WatsonX"
        href="https://www.ibm.com/watsonx/"
        src="https://boxplot.com/wp-content/uploads/2024/11/IBM_Watson_AI-1024x665.jpg"
        description="Enterprise-ready AI & ML tools from IBM."
      />
    </>
  );
}
