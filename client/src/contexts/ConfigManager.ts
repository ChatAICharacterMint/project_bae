interface ICharacter {
    name: string,
    image: string,
    idleAnimation: string,
    voice: string,
    style: string,
    happyIndex: number, // 0 - 4 // how about float value?
    background: string
}

interface IConfig {
    characters: Array<ICharacter>;
    selectedCharacter: ICharacter;
    showCaption: boolean;
}

const characters = [
    {
        name: 'ashley',
        image: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/mmo1sk9sfreddmpwufuu.png',
        idleAnimation: 'https://d-id-talks-prod.s3.us-west-2.amazonaws.com/google-oauth2%7C104991781854731369823/tlk_YmO82ZjMqrN6TJDvONJ9o/1701325834267.mp4?AWSAccessKeyId=AKIA5CUMPJBIK65W6FGA&Expires=1701412242&Signature=NxdMIK2AtD9kj43QLRK6inhRSm8%3D&X-Amzn-Trace-Id=Root%3D1-65682c12-5304429017f4da254ee9b8ee%3BParent%3Dbed29312440bcb25%3BSampled%3D1%3BLineage%3D6b931dd4%3A0', 
        voice: 'en-US-JennyNeural',
        style: 'Cheerful',
        happyIndex: 2,
        background: "I spent my early days growing up in New York. I had a blast bonding with my fellows. During my time there, I learned about the importance of taking care of others and making everyone around me happy. ",
    },
    {
        name: 'captain',
        image: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/d0cndjfeggffrvrdsxrb.png',
        idleAnimation: 'https://d-id-talks-prod.s3.us-west-2.amazonaws.com/google-oauth2%7C104991781854731369823/tlk_n01UnT3ZjjwdPNCmTIIZQ/1701326398112.mp4?AWSAccessKeyId=AKIA5CUMPJBIK65W6FGA&Expires=1701412805&Signature=dAJEOXmTZ1qdEXv2rUBeQZ5opQM%3D&X-Amzn-Trace-Id=Root%3D1-65682e45-2b840ab20807332969a03642%3BParent%3Db38afbc20666663b%3BSampled%3D1%3BLineage%3D6b931dd4%3A0', 
        voice: 'zh-CN-YunxiNeural',
        style: 'Cheerful',
        happyIndex: 2,
        background: "I spent my early days growing up in New York. I had a blast bonding with my fellows. During my time there, I learned about the importance of taking care of others and making everyone around me happy. ",
    },
    {
        name: 'girl',
        image: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/duliq6ycffxapu1a7uon.png',
        idleAnimation: 'https://d-id-talks-prod.s3.us-west-2.amazonaws.com/google-oauth2%7C104991781854731369823/tlk_DY424l2JiA5YFy-numHBU/1701326470380.mp4?AWSAccessKeyId=AKIA5CUMPJBIK65W6FGA&Expires=1701412881&Signature=pSrvARO5oEQZ523ojn%2FElWH3q%2Bo%3D&X-Amzn-Trace-Id=Root%3D1-65682e91-7fec0e987bdada804ad133f2%3BParent%3Db732cc201911dad9%3BSampled%3D1%3BLineage%3D6b931dd4%3A0', 
        voice: 'en-US-JennyNeural',
        style: 'Cheerful',
        happyIndex: 2,
        background: "I spent my early days growing up in New York. I had a blast bonding with my fellows. During my time there, I learned about the importance of taking care of others and making everyone around me happy. ",
    },
    {
        name: 'boy',
        image: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1701071571/Bae/kjs9lmgosy5baft5gghf.png',
        idleAnimation: 'https://d-id-talks-prod.s3.us-west-2.amazonaws.com/google-oauth2%7C104991781854731369823/tlk_yV022gVpV6VGkWHSHd_xu/1701326582061.mp4?AWSAccessKeyId=AKIA5CUMPJBIK65W6FGA&Expires=1701412999&Signature=VVdK1qo3QMOv%2FNPtbNT0MaxaOKU%3D&X-Amzn-Trace-Id=Root%3D1-65682f07-5be451a31c20fab51508ba18%3BParent%3D110dac8f6a7d1ce7%3BSampled%3D1%3BLineage%3D6b931dd4%3A0', 
        voice: 'zh-CN-YunxiNeural',
        style: 'Cheerful',
        happyIndex: 2,
        background: "I spent my early days growing up in New York. I had a blast bonding with my fellows. During my time there, I learned about the importance of taking care of others and making everyone around me happy. ",
    },
]

export class ConfigManager {
    state: IConfig;

    constructor() {
        this.state = {
            characters: characters,
            selectedCharacter: characters[0],
            showCaption: true,
        };

        const storedValue = localStorage.getItem("configuration");
        if(storedValue)
            this.state = JSON.parse(storedValue)
        else
            this.setConfig(this.state)
    }

    setConfig(value: IConfig) {
        this.state = value;
        localStorage.setItem('configuration', JSON.stringify(value));
    }
}