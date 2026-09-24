import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    // One canonical production voice. Do not accept per-request voice changes;
    // that caused narration to change between lessons/providers.
    const voiceId = process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';

    // Option 1: ElevenLabs API (Premium, best quality)
    if (process.env.ELEVENLABS_API_KEY) {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: 'POST',
          headers: {
            Accept: 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': process.env.ELEVENLABS_API_KEY,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.72,
              similarity_boost: 0.78,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('ElevenLabs API error');
      }

      const audioBuffer = await response.arrayBuffer();

      return new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioBuffer.byteLength.toString(),
        },
      });
    }

    // Do not silently switch providers or browser voices. A provider change is
    // audible to learners and breaks timing/caption consistency.
    // Return a retryable error so the media worker can retry the canonical voice.

    // Return error if the canonical production TTS provider is not configured
    return NextResponse.json(
      {
        error:
          'Canonical TTS provider is not configured. Add ELEVENLABS_API_KEY (and optionally ELEVENLABS_VOICE_ID).',
        retryable: true,
      },
      { status: 503 }
    );
  } catch (error: unknown) {
    logger.error(
      'Text-to-speech error:',
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
