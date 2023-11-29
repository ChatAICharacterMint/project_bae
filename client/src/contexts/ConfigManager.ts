interface ICharacter {
    name: string,
    image: string,
    voice: string,
    style: string,
}

interface IConfig {
    character: ICharacter;
    showCaption: boolean;
    personality: string;
    backStory: string;
    knowledgeBase: string;
    happyIndex: number; // 0 - 4 // how about float value?
}

const characters = [
    {
        name: 'ashley',
        image: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/mmo1sk9sfreddmpwufuu.png',
        voice: 'en-US-JennyNeural',
        style: 'Cheerful',
    },
    {
        name: 'captain',
        image: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/d0cndjfeggffrvrdsxrb.png',
        voice: 'en-US-JennyNeural',
        style: 'Cheerful',
    },
    {
        name: 'girl',
        image: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/duliq6ycffxapu1a7uon.png',
        voice: 'en-US-JennyNeural',
        style: 'Cheerful',
    },
    {
        name: 'boy',
        image: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/kjs9lmgosy5baft5gghf.png',
        voice: 'en-US-JennyNeural',
        style: 'Cheerful',
    },
]

export class ConfigManager {
    state: IConfig;

    constructor() {
        this.state = {
            character: characters[0],
            happyIndex: 2,
            showCaption: true,
            personality: "Oh boy oh boy oh boy! So good to see ya! It's me, a cheerful companion.",
            backStory: "I spent my early days growing up in New York. I had a blast bonding with my fellows. During my time there, I learned about the importance of taking care of others and making everyone around me happy. ",
            knowledgeBase: ""
        };

        const storedValue = localStorage.getItem("configuration");
        if(storedValue) this.state = JSON.parse(storedValue);
    }

    setConfig(value: IConfig) {
        this.state = value;
        localStorage.setItem('configuration', JSON.stringify(value));
    }
}