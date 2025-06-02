// app/api/transcript/route.ts
import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 't-youtube-transcript-fetcher';



export async function POST(req: Request) {
    try {
        const { url } = await req.json();
        // Récupérer la transcription par URL ou ID vidéo
        const transcript = await YoutubeTranscript.fetchTranscript(url);
        return NextResponse.json({ transcript });
    } catch (error: any) {
        return NextResponse.json({ error: "first " + error.message }, { status: 500 });
    }
}
