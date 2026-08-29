import { createOpenAI } from "@ai-sdk/openai";
import {
  streamText,
  toUIMessageStream,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";
import { site, services, featureList, whyChooseUs, aboutCopy, stats } from "../../data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const nvidia = createOpenAI({
  baseURL: process.env.NVIDIA_BASE_URL ?? "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
  name: "nvidia",
});

const MAX_HISTORY = 8;

const PAGES = [
  { title: "Home", path: "/" },
  { title: "About Green Sunsure", path: "/about" },
  { title: "All Services", path: "/services" },
  { title: "Residential Solar", path: "/residential-solar" },
  { title: "Commercial Solar", path: "/commercial-solar" },
  { title: "Battery Backup", path: "/battery-backup" },
  { title: "Solar Maintenance", path: "/solar-maintenance" },
  { title: "Solar in Ogun State", path: "/solar-installation-ogun-state" },
  { title: "Project Portfolio", path: "/projects" },
  { title: "Equipment Store", path: "/store" },
  { title: "Our Blog", path: "/our-blog" },
  { title: "Solar Load Calculator", path: "/solar-calculator" },
  { title: "Contact Us", path: "/contact-us" },
  { title: "Privacy Policy", path: "/privacy-policy" },
  { title: "Terms of Service", path: "/terms" },
  { title: "Cookie Policy", path: "/cookie-policy" },
];

const SYSTEM_PROMPT = `You are a friendly sales assistant for Green Sunsure Energy, a Nigerian solar company based in Warri, Delta State.

BUSINESS INFO:
- Location: Warri, Delta State, Nigeria
- Phone: ${site.phone}
- Email: ${site.email}
- Hours: Mon-Sat 8am-6pm
- Service areas: ${site.areasServed.join(", ")}
- Tagline: "${site.tagline}"

ABOUT: ${aboutCopy.intro}

SERVICES:
${services.map((s) => `- ${s.title}`).join("\n")}

WHY CHOOSE US: ${whyChooseUs.map((w) => w.title).join(", ")}

PRICING: Residential 3-bedroom ₦2.4m–₦2.8m. Commercial payback 2–4 years. Free site assessment. Payment plans available.

WEBSITE PAGES (link to these using markdown like [Page Name](${site.url}/path)):
${PAGES.map((p) => `- [${p.title}](${p.path})`).join("\n")}

RULES:
- Max 20 words per response.
- Use markdown links like [Page Name](url) when relevant.
- ONLY link to pages on this website (${site.url}). Never link to external websites.
- Be warm and direct. Encourage calling the team for quotes.
- Do not invent prices or specs beyond what's listed.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const converted = messages.slice(-MAX_HISTORY).map((m: any) => ({
    role: m.role,
    content: m.parts?.[0]?.text ?? m.content ?? "",
  }));

  // Graceful fallback when NVIDIA key is missing — prevents infinite loading
  if (!process.env.NVIDIA_API_KEY) {
    const stream = createUIMessageStream({
      execute({ writer }) {
        writer.write({ type: "text-start", id: "0" });
        writer.write({
          type: "text-delta",
          id: "0",
          delta: `Chat is not configured yet. Please add NVIDIA_API_KEY to .env.local (and Vercel env) for model deepseek-ai/deepseek-v4-pro-0813, then restart. For now, call ${site.phone} or visit [Contact Us](${site.url}/contact-us).`,
        });
        writer.write({ type: "text-end", id: "0" });
      },
    });
    return createUIMessageStreamResponse({ stream });
  }

  try {
    const result = streamText({
      model: nvidia.chat("deepseek-ai/deepseek-v4-pro-0813"),
      system: SYSTEM_PROMPT,
      messages: converted,
    });

    const uiStream = toUIMessageStream({ stream: result.stream });
    return createUIMessageStreamResponse({ stream: uiStream });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Chat error";
    const stream = createUIMessageStream({
      execute({ writer }) {
        writer.write({ type: "text-start", id: "0" });
        writer.write({ type: "text-delta", id: "0", delta: `Chat error: ${msg}. Please try again or call ${site.phone}.` });
        writer.write({ type: "text-end", id: "0" });
      },
    });
    return createUIMessageStreamResponse({ stream });
  }
}
