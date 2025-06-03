import { openai } from '@ai-sdk/openai'; // modèle image-compatible
import { experimental_generateImage as generateImage } from 'ai';
import { NextResponse } from 'next/server';

const hf_token = process.env.HUGGINGFACE_API_TOKEN;

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        const HF_API_TOKEN = `Bearer ${hf_token}`;

        const response = await fetch("https://huggingface.co/google/gemma-3-1b-it", {
            method: "POST",
            headers: {
                "Authorization": HF_API_TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: prompt })
        });

        if (!response.ok) {
            const errorText = await response.text(); // <-- lit du texte brut
            console.error("HTTP Error:", response.status, errorText);
            return NextResponse.json({ error: errorText }, { status: response.status });
        }

        const result = await response.json();

        return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message || 'Image generation failed' }, { status: 500 });
    }
}
