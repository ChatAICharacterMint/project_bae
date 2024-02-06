import React, {useContext, useEffect, useState} from 'react';
import Switch from "react-switch";
import CharacterItem from '@/components/CharacterItem';
import { AppContext } from '@/contexts';
import { LANGUAGE_TO_VOICE_MAPPING_LIST } from '@/utils/azureVoices';

import AddSVG from '@/assets/images/icon/add.svg';

const Profile: React.FC = () => {
  const wordsLimitation = 3000;

  const context = useContext(AppContext);
  const [config, setConfig] = useState(context.config.state);
  const [showCaption, setShowCaption] = useState(context.config.state.showCaption);
  const [language, setLanguage] = useState(context.config.state.language);

  const [availableLanguages, setAvailableLanguages] = useState<Array<string>>([]);
  const [availabelVoices, setAvailableVoices] = useState<Array<string>>([]);
  const [availableStyles, setAvailableStyles] = useState<Array<string>>([]);

  const [toast, setToast] = useState<string | null>(null);
  function showToast(text: string, timeout = 1000) {
    setToast(text);

    setTimeout(() => {
      setToast(null);
    }, timeout);
  }
  useEffect(() => {
    const languages: Array<string> = [];
    const voices: Array<string> = [];
    const styles: Array<string> = [
      'Cheerful'
    ];
    LANGUAGE_TO_VOICE_MAPPING_LIST.map( item => {
      const lang = `${item.voice.split('-')[0]}-${item.voice.split('-')[1]}`;
      const voice = `${item.voice.split('-')[2].replace('Neural', '')} ${item.IsMale ? '(Male)' : '(Female)'} ${item.voice.split('-')[0]}-${item.voice.split('-')[1]}`;
      if(!languages.includes(lang)) languages.push(lang);
      voices.push(voice)
    })
    setAvailableLanguages(languages)
    setAvailableVoices(voices);
    setAvailableStyles(styles);
  }, [])

  const handleSaveButtonClick = () => {
    const characters = context.config.state.characters.map( item => {
      if(item.name == context.config.state.selectedCharacter.name)
        return {
          ...item,
          voice: config.selectedCharacter.voice,
          style: config.selectedCharacter.style,
          bio: config.selectedCharacter.bio
        }
      else return item
    })
    setConfig({
      ...config,
      characters: characters,
    });
    context.config.setConfig({
      ...context.config.state,
      characters: characters,
      selectedCharacter: config.selectedCharacter
    });
    showToast('Saved')
  };

  const handleCancelButtonClick = () => {
    setConfig(config)
    return;
  };

  return (
    <div className='settings relative'>
      <div className='w-full h-[100vh] flex flex-col p-[2rem] gap-[1rem] overflow-y-auto'>

        {/* Global settings */}
        <div className='w-full flex justify-between gap-[1rem]'>
          <div className='flex items-center gap-[1rem]'>
            <span className='text-[#fff]'>Language:</span>
            <select
              className='outline-none border-none rounded-[4px]'
              name='language'
              value={language}
              onChange={ (evt) => {
                setLanguage(evt.target.value);
                context.config.setConfig({
                  ...context.config.state,
                  language: evt.target.value
                });
              }}
            >
              {
                availableLanguages.map( (item, idx) => 
                  <option key={idx} value={item}>{item}</option>
                )
              }
            </select>
          </div>

          <div className='flex items-center gap-[1rem]'>
            <span className='text-[#fff]'>Caption:</span>
            <Switch checked={showCaption}
              height={24}
              onChange={(checked) => {
                setShowCaption(checked);
                context.config.setConfig({
                  ...context.config.state,
                  showCaption: checked
                });
              }} 
            />
          </div>
        </div>
        {/* Character List */}
        <div className='container'>
          <div className='w-full flex flex-wrap gap-[1rem] mt-[1rem]'>
              {
                config.characters.map( (item, idx) => 
                  <CharacterItem key={idx} character={item} 
                    // onClick={() => {
                    //   setConfig({
                    //     ...config,
                    //     selectedCharacter: item
                    //   });
                    //   context.config.setConfig({
                    //     ...context.config.state,
                    //     selectedCharacter: item
                    //   });
                    // }} 
                  />
                )
              }
          </div>
        </div>
        {/* Character Edit */}
        <div className='w-full flex flex-col items-center gap-[1.5rem] mt-[2rem]'>
          <div className='w-full max-w-[650px] flex justify-evenly'>
            <div className='flex items-center gap-[1rem]'>
              <span className='text-[#fff]'>Voice: </span>
              <select
                className='outline-none border-none rounded-[4px]'
                name='voice'
                value={config.selectedCharacter.voice}
                onChange={(event) => {
                  setConfig({
                    ...config,
                    selectedCharacter: {
                      ...config.selectedCharacter,
                      voice: event.target.value
                    }
                  })
                }}
              >
                {
                  availabelVoices.map( (item, idx) =>
                    <option key={idx} value={item}>{item}</option>
                  )
                }
              </select>
            </div>
            <div className='flex items-center gap-[1rem]'>
              <span className='text-[#fff]'>Style: </span>
              <select
                className='outline-none border-none rounded-[4px]'
                name='style'
                value={config.selectedCharacter.style}
                onChange={(event) => {
                  setConfig({
                    ...config,
                    selectedCharacter: {
                      ...config.selectedCharacter,
                      style: event.target.value
                    }
                  })
                }}
              >
                {
                  availableStyles.map( (item, idx) =>
                    <option key={idx} value={item}>{item}</option>
                  )
                }
              </select>
            </div>
          </div>
          <div className='w-full max-w-[650px]'>
            <span className='text-[#fff]'>Bio:</span>
            <textarea className='w-full h-[160px] flex-grow p-[1rem] resize-none outline-none border-none bg-[#000] text-[#fff] rounded-[10px]' placeholder="Character's background" value={config.selectedCharacter.bio}
              onChange={(event) => {
                const text = event.target.value;
                const wordPattern = /\b\w+\b/g;
                const matches = text.match(wordPattern);
                const wordCount = matches ? matches.length : 0;

                if (wordCount > wordsLimitation && matches) {
                  const truncatedText = matches.slice(0, wordsLimitation).join(' ');
                  setConfig({
                    ...config,
                    selectedCharacter: {
                      ...config.selectedCharacter,
                      bio: truncatedText
                    }
                  })
                } else {
                  setConfig({
                    ...config,
                    selectedCharacter: {
                      ...config.selectedCharacter,
                      bio: text
                    }
                  })
                }
              }}
            />
          </div>

          <div className='w-full flex gap-[1rem] justify-center mt-[1rem]'>
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
      </div>
      {
        toast &&
        <div className="absolute flex justify-center w-fit mx-auto my-0 top-[2rem] left-0 right-0 px-[1rem] py-[0.5rem] bg-[#0006] rounded-[1rem] transition-all duration-200">
          <span className='text-[#fff]'>{toast}</span>
        </div>
      }
    </div>
  )
};

export default Profile;
 