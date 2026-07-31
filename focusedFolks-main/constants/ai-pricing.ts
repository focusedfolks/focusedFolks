import type { InrPricingAddon, InrPricingPlan } from "@/types/inr-pricing";

/** AI Development & Solutions catalogue — all amounts stored in INR (source of truth). */
export const aiPricingPlans: InrPricingPlan[] = [
  {
    id: "openai-integration",
    name: "OpenAI Integration",
    scope: "API Integration",
    delivery: "3-5 Days",
    price: { type: "flat", minInr: 22500 },
  },
  {
    id: "gemini-integration",
    name: "Gemini Integration",
    scope: "API Integration",
    delivery: "3-5 Days",
    price: { type: "flat", minInr: 22500 },
  },
  {
    id: "ai-chatbot",
    name: "AI Chatbot",
    scope: "Custom Chatbot",
    delivery: "10-15 Days",
    price: { type: "flat", minInr: 57500 },
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    scope: "Workflow Automation",
    delivery: "10-20 Days",
    price: { type: "flat", minInr: 70000 },
  },
  {
    id: "rag-chatbot",
    name: "RAG Chatbot",
    scope: "Knowledge Base AI",
    delivery: "20-30 Days",
    price: { type: "flat", minInr: 105000 },
  },
  {
    id: "ai-voice-assistant",
    name: "AI Voice Assistant",
    scope: "Voice AI",
    delivery: "30-45 Days",
    price: { type: "flat", minInr: 165000 },
  },
];

export const aiPricingAddons: InrPricingAddon[] = [];

/** @deprecated Comparison table removed from OUR PRICE catalogue. */
export const aiPricingComparison = [];
