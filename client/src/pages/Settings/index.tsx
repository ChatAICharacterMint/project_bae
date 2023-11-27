import React, {useContext, useState} from 'react';
import { AppContext } from 'contexts';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
 
const Settings: React.FC = () => {
  const personalityTab = 'personality';
  const backStoryTab = 'backStory';
  const knowledgeBaseTab = 'knowledgeBase';
  const wordsLimitation = 3000;

  const context = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(personalityTab);
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
      showCaption: false,
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
    <div className='w-full h-full flex justify-center items-center p-[2rem]'>
      <Tabs className={'w-full max-w-[650px]'}>
        <TabList className={'flex justify-center gap-[1rem]'}>
            <Tab>Personality</Tab>
            <Tab>Backstory</Tab>
            <Tab>Knowledge Base</Tab>
        </TabList>
        <div className='mt-[1rem]'>
          <TabPanel>
            <div className='w-full max-w-[650px] h-[50vh] flex flex-col justify-center items-center gap-[1rem]'>
              <textarea className='w-full h-full flex-grow p-[1rem] outline-none border-none bg-[#000] text-[#fff] rounded-[10px]' placeholder='Personality' 
                onChange={(event) =>
                  handleTextFieldChange(event, fieldsMap.get('personality'))
                }
              />

              <div className='flex gap-[1rem] justify-center'>
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
            </div>
          </TabPanel>
          <TabPanel>
              <div className='w-full max-w-[650px] h-[50vh] flex flex-col justify-center items-center gap-[1rem]'>
              <textarea className='w-full h-full flex-grow p-[1rem] outline-none border-none bg-[#000] text-[#fff] rounded-[10px]' placeholder='Backstory' 
                onChange={(event) =>
                  handleTextFieldChange(event, fieldsMap.get('backStory'))
                }
              />

              <div className='flex gap-[1rem] justify-center'>
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
            </div>
          </TabPanel>
          <TabPanel>
            <div className='w-full max-w-[650px] h-[50vh] flex flex-col justify-center items-center gap-[1rem]'>
              <textarea className='w-full h-full flex-grow p-[1rem] outline-none border-none bg-[#000] text-[#fff] rounded-[10px]' placeholder='Knowledge Base' 
                onChange={(event) =>
                  handleTextFieldChange(event, fieldsMap.get('knowledgeBase'))
                }
              />

              <div className='flex gap-[1rem] justify-center'>
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
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  )
};

export default Settings;
 