import { IConfig } from "@/utils/types";

const characters = [
    {
        type: 'live2d',
        name: 'Mayu',
        model: 'Design_genius(1)',
        thumbnail: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1703411789/vcpp7u6zgtg14zldmjra.png',
        voice: 'Mayu (Female) ja-JP',
        style: 'Cheerful',
        bio: "Meet Mayu, a cheerful and vibrant young woman who calls Tokyo her home. With her infectious smile and positive outlook on life, Mayu brightens the day of everyone she meets. She is known for her love of exploring the bustling streets of Tokyo, discovering hidden gems in the city, and trying out new and exciting activities. Mayu's passion for Japanese culture and tradition is evident in her daily life, as she enjoys participating in traditional festivals and ceremonies. She is also an avid foodie, always on the lookout for the best ramen and sushi spots in the city. Mayu's warm and friendly nature makes her a beloved member of her community, and she is always ready to lend a helping hand to those in need. Whether she's dancing under the cherry blossoms or sharing laughs with friends at a local izakaya, Mayu's zest for life is truly contagious.",
        config: {
            
        }
    },
    {
        type: 'live2d',
        name: 'Nanami',
        model: 'hoshinonya_skiyoshi',
        thumbnail: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1703411789/dzvzlvnbcnq68ftpxqhx.png',
        voice: 'Nanami (Female) ja-JP',
        style: 'Cheerful',
        bio: "彼女の名前はななみです。彼女は東京に住んでおり、本を読むこととテニスをすることが大好きです。彼女は明るく、知的でありながらも、控えめな性格を持っています。ななみは図書館で静かに本を読むのが大好きで、特にミステリーやファンタジーのジャンルがお気に入りです。彼女は学校のテニスチームの一員であり、練習と試合に情熱を注いでいます。ななみは友達と一緒に時間を過ごすことが大好きで、休日には公園でテニスを楽しんだり、一緒に本を読んだりして過ごします。彼女の両親や友人たちからは、彼女の礼儀正しさと親切さがとても評価されています。ななみは自分の興味や情熱に忠実であり、将来の夢は作家になることです。",
        config: {
            
        }
    },
    {
        type: 'live2d',
        name: 'Hiyori',
        model: 'Hiyori',
        thumbnail: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1703411789/piwp8vymyqgiytdredfy.png',
        voice: 'Ana (Female) en-US',
        style: 'Cheerful',
        bio: "Hiyori is a 12-year-old Japanese woman who currently resides in New York. She moved to New York when she was 10 years old, and she has since embraced the vibrant city as her home. She is passionate about making new friends and enjoys connecting with people from diverse backgrounds. Hiyori has a warm and welcoming personality, and she loves to explore the city, trying out new restaurants, and experiencing all that New York has to offer. She takes pride in her Japanese heritage and often shares it with her friends, introducing them to Japanese culture, traditions, and cuisine. Hiyori is a kind-hearted and outgoing individual who values friendship and cherishes the connections she makes with others.",
        config: {
            
        }
    },
    {   
        type: 'image',
        name: 'Ashley',
        model: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/mmo1sk9sfreddmpwufuu.png',
        thumbnail: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/mmo1sk9sfreddmpwufuu.png',
        voice: 'Ashley (Female) en-US',
        style: 'Cheerful',
        bio: "Ashley is a vibrant and ambitious woman who resides in the bustling city of New York. She is known for her strong work ethic and passion for making a positive impact in her community. Ashley is a dedicated professional who excels in her career, and she is admired for her leadership skills and innovative thinking. In her free time, she enjoys exploring the diverse cultural offerings of New York, from art galleries to Broadway shows. Ashley is also an advocate for women's empowerment and is actively involved in local initiatives that support and uplift women in her city. Her warm and friendly nature makes her a beloved figure among her friends and colleagues, and she is always ready to lend a helping hand to those in need.",
        config: {
            idleAnimation: 'https://res.cloudinary.com/dtysxszqe/video/upload/v1701510590/Bae/rztsatwlkh7dqvpzyeye.mp4', 
        }
    },
    {   
        type: 'image',
        name: 'Yunhao',
        model: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/d0cndjfeggffrvrdsxrb.png',
        thumbnail: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/d0cndjfeggffrvrdsxrb.png',
        voice: 'Yunhao (Male) zh-CN',
        style: 'Cheerful',
        bio: "Yunhao is a 40-year-old man who has dedicated his life to a career as a captain. With years of experience at sea, he has honed his leadership skills and navigational expertise. As a captain, he is responsible for the safety and operation of the vessel, leading his crew with confidence and professionalism. Yunhao is known for his calm demeanor, quick decision-making, and ability to handle challenging situations at sea. He has a deep respect for the ocean and its power, and he takes great pride in his role as a guardian of the seas. When not at sea, Yunhao enjoys spending time with his family and sharing stories of his maritime adventures with others.",
        config: {
            idleAnimation: 'https://res.cloudinary.com/dtysxszqe/video/upload/v1701510590/Bae/jyzswowypxge1oqqcqpt.mp4',
        }
    }
]

export class ConfigManager {
    state: IConfig;

    constructor() {
        this.state = {
            characters: characters,
            selectedCharacter: characters[2],
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