import React, {useContext, useState} from 'react';
import { AppContext } from 'contexts';

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
      voice: 'zh-CN-YunxiNeural',
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
      voice: 'zh-CN-YunxiNeural',
      style: 'Cheerful',
  },
]

const Settings: React.FC = () => {
  const personalityTab = 'personality';
  const backStoryTab = 'backStory';
  const knowledgeBaseTab = 'knowledgeBase';
  const wordsLimitation = 3000;

  const context = useContext(AppContext);
  const [character, setCharacter] = useState(context.config.state.character);
  const [personalityText, setPersonalityText] = useState(
    context.config.state.personality
  );
  const [backStoryText, setBackStoryText] = useState(context.config.state.backStory);
  const [knowledgeBaseText, setKnowledgeBaseText] = useState(
    context.config.state.knowledgeBase
  );

  interface SettingField {
    key: string;
    title: string;
    tabName: string;
    value: string;
    setter: React.Dispatch<React.SetStateAction<string>>;
  }

  const fieldsMap = new Map<string, SettingField>([
    [
      personalityTab,
      {
        key: personalityTab,
        title: 'Personality',
        tabName: 'Character Personality',
        value: personalityText,
        setter: setPersonalityText,
      },
    ],
    [
      backStoryTab,
      {
        key: backStoryTab,
        title: 'Backstory',
        tabName: 'Backstory',
        value: backStoryText,
        setter: setBackStoryText,
      },
    ],
    [
      knowledgeBaseTab,
      {
        key: knowledgeBaseTab,
        title: 'Knowledge Base',
        tabName: 'Knowledge Base',
        value: knowledgeBaseText,
        setter: setKnowledgeBaseText,
      },
    ],
  ]);

  const handleSaveButtonClick = () => {
    if (
      !personalityText ||
      personalityText.trim() === '' ||
      !backStoryText ||
      backStoryText.trim() === '' ||
      !knowledgeBaseText ||
      knowledgeBaseText.trim() === ''
    ) {
      return handleCancelButtonClick();
    }
    context.config.setConfig({
      character: character,
      happyIndex: 2,
      showCaption: true,
      personality: personalityText,
      backStory: backStoryText,
      knowledgeBase: knowledgeBaseText
    })
  };

  const handleCancelButtonClick = () => {
    setCharacter(context.config.state.character)
    setPersonalityText(context.config.state.personality);
    setBackStoryText(context.config.state.backStory);
    setKnowledgeBaseText(context.config.state.knowledgeBase);
    return;
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: SettingField | undefined
  ) => {
    if (field) {
      const text = event.target.value;
      const wordPattern = /\b\w+\b/g;
      const matches = text.match(wordPattern);
      const wordCount = matches ? matches.length : 0;

      if (wordCount > wordsLimitation && matches) {
        const truncatedText = matches.slice(0, wordsLimitation).join(' ');
        field.setter(truncatedText);
      } else {
        field.setter(text);
      }
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center p-[2rem] gap-[1rem] overflow-y-auto'>
      <div className='w-full flex gap-[1rem] justify-end'>
        <button className='bg-lime-700 text-[#fff] px-[1rem] py-[0.5rem] rounded-[10px]'
          onClick={() => {
            handleSaveButtonClick();
          }}
        >
          Save
        </button>
        <button className='bg-gray-700 text-[#fff] px-[1rem] py-[0.5rem] rounded-[10px]'
          onClick={() => {
            handleCancelButtonClick();
          }}
        >
          Cancel
        </button>
      </div>
      <div className='w-full float-left'>
        <span className='mr-[1rem]'>Character: </span>
        <select
          className='outline-none border-none rounded-[8px] px-[10px] py-[5px] capitalize'
          id='name'
          name='name'
          value={character.name}
          onChange={(evt) => {
            const c = characters.filter( item => item.name === evt.target.value)[0]
            if(c) setCharacter(c)
          }}
        >
          {
            characters.map( (item, idx) => 
              <option key={idx} value={item.name}>{item.name}</option>
            )
          }
        </select>
      </div>
      <div className='w-full flex flex-col gap-[10px] max-w-[650px]'>
        <span>Peronsonalty</span>
        <textarea className='w-full h-[160px] flex-grow p-[1rem] resize-none outline-none border-none bg-[#000] text-[#fff] rounded-[10px]' placeholder='Personality' 
          onChange={(event) =>
            handleTextFieldChange(event, fieldsMap.get('personality'))
          }
        />
        <span>BackStory</span>
        <textarea className='w-full h-[160px] flex-grow p-[1rem] resize-none outline-none border-none bg-[#000] text-[#fff] rounded-[10px]' placeholder='Backstory' 
          onChange={(event) =>
            handleTextFieldChange(event, fieldsMap.get('backStory'))
          }
        />
        <span> KnowldgeBase</span>
        <textarea className='w-full h-[160px] flex-grow p-[1rem] resize-none outline-none border-none bg-[#000] text-[#fff] rounded-[10px]' placeholder='Knowledge Base' 
          onChange={(event) =>
            handleTextFieldChange(event, fieldsMap.get('knowledgeBase'))
          }
        />
      </div>
    </div>
  )
};

export default Settings;
 