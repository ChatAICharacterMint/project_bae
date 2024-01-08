// @ts-nocheck

import { getWaveBlob } from 'webm-to-wav-converter';
import config from '@/config';

export class AzureSpeech {
  private _ttsapikey: string;
  private _ttsregion: string;

  constructor() {
    this._ttsregion = config.TTS_REGION;
    this._ttsapikey = config.TTS_API_KEY;
  }

  async getSpeechUrl(voice: string, text: string) {
    if (this._ttsregion === undefined || this._ttsregion === "") return;

    // #TODO: tts api authurization with Bearer access_token - auth flow
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/ssml+xml');
    requestHeaders.set('X-Microsoft-OutputFormat', 'riff-8khz-16bit-mono-pcm');
    requestHeaders.set('Ocp-Apim-Subscription-Key', this._ttsapikey);
    requestHeaders.set('User-Agent', 'myaibae')

    const ssml = `
      <speak version=\'1.0\' xml:lang=\'${voice.split(' ')[2]}\'>
        <voice xml:lang=\'${voice.split(' ')[2]}\' xml:gender=\'${voice.split(' ')[1]}\' name=\'${voice.split(' ')[2]}-${voice.split(' ')[0]}Neural\'>
          ${text}
        </voice>
      </speak>
    `;

    const response = await fetch(
      `https://${this._ttsregion}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        method: 'POST',
        headers: requestHeaders,
        body: ssml
      }
    );
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const audio: any = document.getElementById('voice');
    audio.currentTime = 0;
    audio.src = url;

    return url;
  }

  async getTextFromSpeech(language: string, data: Blob) {
    if (this._ttsregion === undefined || this._ttsregion === "") return '';

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Accept', 'application/json;text/xml');
    requestHeaders.set(
      'Content-Type',
      'audio/wav; codecs=audio/pcm; samplerate=16000'
    );
    requestHeaders.set('Ocp-Apim-Subscription-Key', this._ttsapikey);

    const wav = await getWaveBlob(data, false);

    const response = await fetch(
      `https://${this._ttsregion}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${language}`,
      {
        method: 'POST',
        headers: requestHeaders,
        body: wav
      }
    );
    const json = await response.json();
    return json.DisplayText;
  }
}
