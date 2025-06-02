// app/page.tsx
'use client';

import { useState } from 'react';

export default function TranscriptPage() {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/generate-transcript', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setTranscript(data.transcript);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
        className="border p-2 w-full"
      />
      <button onClick={handleSubmit} className="mt-2 bg-blue-500 text-white px-4 py-2">
        {loading ? 'Loading...' : 'Generate Transcript'}
      </button>

      {transcript && <pre className="mt-4 whitespace-pre-wrap">{transcript}</pre>}
    </div>
  );
}
