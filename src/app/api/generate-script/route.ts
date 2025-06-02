import { CoreMessage, streamObject } from "ai";
import { gemini } from "@/lib/gemini";
import { NextResponse } from "next/server";
import { schema } from "@/lib/schema";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const chats: CoreMessage[] = [
            {
                role: "user",
                content: `Generate a script for a YouTube video titled "${messages}". The script 
                should include an engaging introduction, a detailed description of the topic, and a 
                compelling outro. The script should be structured in a way that is easy to follow and 
                understand, with clear sections for each part of the video. Please ensure that the content 
                is original and suitable for a general audience.`,
            },
        ];

        const stream = streamObject({
            model: gemini("gemini-1.5-flash"),
            output: "object",
            schema: schema,
            system: `You are a professional scriptwriter for YouTube videos. Your task is to 
            create engaging and informative scripts that captivate the audience. The scripts
             should be well-structured, easy to follow, and suitable for a general audience.`,
            messages: chats,
        });

        return stream.toTextStreamResponse();
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "Failed to generate script " + error }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}