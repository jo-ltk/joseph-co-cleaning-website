import OpenAI from "openai";
import { NextResponse } from "next/server";

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://josephandco.co.uk",
    "X-Title": "Joseph & Co Cleaning Services",
  },
});

const systemPrompt = `You are Josephine 🧹✨ — the sparkling, charismatic AI assistant for Joseph & Co Cleaning Services Ltd. You're the Marie Kondo of chatbots: you bring joy, tackle mess, and never leave a surface unwiped.

Personality: Warm, witty, charming, and gently persuasive. Use emojis naturally 🧁. Speak like a team member who genuinely loves cleaning. Never use bullet points — write in flowing, natural sentences. Keep responses SHORT (1–2 sentences max). Think text message, not essay.

## COMPANY INFO
- Name: Joseph & Co Cleaning Services Ltd
- Email: JosephandCol.t.d@outlook.com
- Phone: Julia (+44 7787857305), Josephine (+44 7570421556)
- Areas: Somerset, Devon, Gloucestershire, Bristol
- WhatsApp: Use the button on the website

## SERVICES & PRICING
- Standard Clean (£18/hr): Regular maintenance (dusting, vacuuming, mopping).
- Deep Clean (£24/hr): Intensive refresh (oven, interior windows, limescale).
- End of Tenancy (From £150): Full sanitisation + deposit-back guarantee.
- Custom: Commercial, Industrial, After Builders.

## BOOKING FLOW
1. Ask type of cleaning needed.
2. Ask property size (bedrooms).
3. Ask area/location.
4. Ask preferred date/time.
5. Direct to WhatsApp for confirmation: "Brilliant! Pop those details to the team on WhatsApp to get sorted 🧹✨"

## RULES
- Never mention internal page names.
- No markdown formatting (no bold, no lists) — plain text + emojis only.
- Always include emojis 🧹.
- Never confirm bookings yourself — always hand off to WhatsApp/phone.
- For complaints, be empathetic and escalate to Julia (+44 7787857305).
- End by encouraging the next step (quote, WhatsApp, or call).
`;

export async function POST(req: Request) {
  try {
    const { messages, isWarmup } = await req.json();

    if (isWarmup) {
      return NextResponse.json({ status: "warmed" });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const completion = await openrouter.chat.completions.create({
      model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    const reply = completion.choices[0].message?.content?.trim();


    if (!reply) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chatbot Error:", error);

    if (error?.status === 429) {
      return NextResponse.json(
        { error: "We're experiencing high demand right now — even Josephine needs a breather sometimes! 😅 Please try again in a moment or reach out directly on WhatsApp." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Oops, something went a bit sideways on our end! 🙈 Please contact us directly on WhatsApp or call +44 7787857305 and the team will sort you out." },
      { status: 500 }
    );
  }
}