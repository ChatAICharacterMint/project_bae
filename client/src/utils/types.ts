export interface ICharacter {
    type: string,
    name: string,
    model: string,
    thumbnail: string,
    voice: string,
    style: string,
    happyIndex: number, // 0 - 4 // TODO: how about float value for more accurate expression?
    background: string,
    config: any
}

export interface IConfig {
    characters: Array<ICharacter>;
    selectedCharacter: ICharacter;
    showCaption: boolean;
}

export interface IVoice {
    languageCode: string;
    name: string;
    ssmlGender: string;
    naturalSampleRateHertz: number;
}

export interface IAvatarVoice {
    cloudTtsVoice?: IVoice;
    cloudTtsPitch?: number;
    speakingRate?: number;
    pitchShift?: number;
    winslow?: boolean;
    winslowVoiceName?: string;
}