import { IConfig } from "@/utils/types";

const characters = [
    {
        type: 'live2d',
        name: 'Shizuku',
        model: 'Design_genius(1)',
        thumbnail: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1703411789/vcpp7u6zgtg14zldmjra.png',
        voice: 'Aoi (Female) ja-JP',
        style: 'Cheerful',
        bio: "I spent my early days growing up in New York. I had a blast bonding with my fellows. During my time there, I learned about the importance of taking care of others and making everyone around me happy. ",
        config: {
            
        }
    },
    {
        type: 'live2d',
        name: 'Hoshinonya',
        model: 'hoshinonya_skiyoshi',
        thumbnail: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1703411789/dzvzlvnbcnq68ftpxqhx.png',
        voice: 'Aoi (Female) ja-JP',
        style: 'Cheerful',
        bio: "I spent my early days growing up in New York. I had a blast bonding with my fellows. During my time there, I learned about the importance of taking care of others and making everyone around me happy. ",
        config: {
            
        }
    },
    {
        type: 'live2d',
        name: 'Hiyori',
        model: 'Hiyori',
        thumbnail: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1703411789/piwp8vymyqgiytdredfy.png',
        voice: 'Aoi (Female) ja-JP',
        style: 'Cheerful',
        bio: "I spent my early days growing up in New York. I had a blast bonding with my fellows. During my time there, I learned about the importance of taking care of others and making everyone around me happy. ",
        config: {
            
        }
    },
    {   
        type: 'image',
        name: 'ashley',
        model: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/mmo1sk9sfreddmpwufuu.png',
        thumbnail: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/mmo1sk9sfreddmpwufuu.png',
        voice: 'Amber (Female) en-US',
        style: 'Cheerful',
        bio: "I spent my early days growing up in New York. I had a blast bonding with my fellows. During my time there, I learned about the importance of taking care of others and making everyone around me happy. ",
        config: {
            idleAnimation: 'https://res.cloudinary.com/dtysxszqe/video/upload/v1701510590/Bae/rztsatwlkh7dqvpzyeye.mp4', 
        }
    },
    {   
        type: 'image',
        name: 'captain',
        model: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/d0cndjfeggffrvrdsxrb.png',
        thumbnail: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/d0cndjfeggffrvrdsxrb.png',
        voice: 'Yunhao (Male) zh-CN',
        style: 'Cheerful',
        bio: "I spent my early days growing up in New York. I had a blast bonding with my fellows. During my time there, I learned about the importance of taking care of others and making everyone around me happy. ",
        config: {
            idleAnimation: 'https://res.cloudinary.com/dtysxszqe/video/upload/v1701510590/Bae/jyzswowypxge1oqqcqpt.mp4',
        }
    },
    // {   
    //     type: 'image',
    //     name: 'girl',
    //     model: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/duliq6ycffxapu1a7uon.png',
    //     thumbnail: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/duliq6ycffxapu1a7uon.png',
    //     voice: 'en-US-Jenny',
    //     style: 'Cheerful',
    //     bio: "I spent my early days growing up in New York. I had a blast bonding with my fellows. During my time there, I learned about the importance of taking care of others and making everyone around me happy. ",
    //     config: {
    //         idleAnimation: 'https://res.cloudinary.com/dtysxszqe/video/upload/v1701510590/Bae/q8rzhirci2tktlophxb6.mp4', 
    //     }
    // },
    // {   
    //     type: 'image',
    //     name: 'boy',
    //     model: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/kjs9lmgosy5baft5gghf.png',
    //     thumbnail: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/kjs9lmgosy5baft5gghf.png',
    //     voice: 'zh-CN-Yunxi',
    //     style: 'Cheerful',
    //     bio: "I spent my early days growing up in New York. I had a blast bonding with my fellows. During my time there, I learned about the importance of taking care of others and making everyone around me happy. ",
    //     config: {
    //         idleAnimation: 'https://res.cloudinary.com/dtysxszqe/video/upload/v1701510590/Bae/hndc3fkxad9k8wmapja2.mp4', 
    //     }
    // },
]

export class ConfigManager {
    state: IConfig;

    constructor() {
        this.state = {
            characters: characters,
            selectedCharacter: characters[0],
            showCaption: true,
            background: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1703229724/mtsdwadts1yhvzmcr3wv.png',
            language: 'en-US'
        };

        // const storedValue = localStorage.getItem("configuration");
        // if(storedValue)
        //     this.state = JSON.parse(storedValue)
        // else
        //     this.setConfig(this.state)
    }

    setConfig(value: IConfig) {
        this.state = value;
        // localStorage.setItem('configuration', JSON.stringify(value));
    }
}