import { useEffect, useRef, useState } from 'react';
import generateResponse from '../config/gemini';
import Context from './context';

const RECENT_PROMPTS_STORAGE_KEY = 'gemini-clone-recent-prompts';

const ContextProvider = ({ children }) => {
  const typingDelay = 75;
  const typingTimeoutsRef = useRef([]);
  const [input, setInput] = useState('');
  const [recentprompts, setRecentPrompts] = useState('');
  const [prevprompts, setPrevPrompts] = useState(() => {
    const savedPrompts = localStorage.getItem(RECENT_PROMPTS_STORAGE_KEY);

    if (!savedPrompts) {
      return [];
    }

    try {
      const parsedPrompts = JSON.parse(savedPrompts);
      return Array.isArray(parsedPrompts) ? parsedPrompts : [];
    } catch {
      return [];
    }
  });
  const [showresults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultdata, setResultData] = useState('');
  const [responseArray, setResponseArray] = useState([]);

  const clearTypingTimeouts = () => {
    typingTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    typingTimeoutsRef.current = [];
  };

  const delayPara = (index, nextWord) => {
    const timeoutId = setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, typingDelay * index);

    typingTimeoutsRef.current.push(timeoutId);
  };

  useEffect(() => {
    localStorage.setItem(
      RECENT_PROMPTS_STORAGE_KEY,
      JSON.stringify(prevprompts),
    );
  }, [prevprompts]);

  const loadPreviousPrompt = (prompt, response) => {
    clearTypingTimeouts();
    setRecentPrompts(prompt);
    setShowResults(true);
    setLoading(false);
    setResultData(response);
  };

  const onSent = async (prompt) => {
    const finalPrompt = prompt ?? input;

    if (!finalPrompt?.trim()) {
      return;
    }

    clearTypingTimeouts();
    setResultData('');
    setLoading(true);
    setShowResults(true);
    setRecentPrompts(finalPrompt);
    setInput('');

    try {
      const response = await generateResponse(finalPrompt);
      const responseArray = response.split('**');
      let formattedResponse = '';

      for (let index = 0; index < responseArray.length; index += 1) {
        if (index % 2 === 1) {
          formattedResponse += `<b>${responseArray[index]}</b>`;
        } else {
          formattedResponse += responseArray[index];
        }
      }

      formattedResponse = formattedResponse.split('*').join('<br/>');
      formattedResponse = formattedResponse.replace(
        /\s(\d+\.\s)/g,
        '<br/><br/>$1',
      );
      formattedResponse = formattedResponse
        .replace(/\s*<br\/>\s*/g, '<br/>')
        .replace(/(<br\/>){3,}/g, '<br/><br/>')
        .trim();

      const formattedResponseArray = formattedResponse.match(
        /<br\/>|<b>.*?<\/b>|[^\s]+(?:\s+|$)/g,
      ) || [];

      setResponseArray(formattedResponseArray);
      setPrevPrompts((prev) => [...prev, { prompt: finalPrompt, response: formattedResponse }]);

      for (let index = 0; index < formattedResponseArray.length; index += 1) {
        const nextWord = formattedResponseArray[index];
        delayPara(index, nextWord);
      }
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    input,
    setInput,
    prevprompts,
    setPrevPrompts,
    onSent,
    loadPreviousPrompt,
    setRecentPrompts,
    recentprompts,
    showresults,
    setShowResults,
    loading,
    resultdata,
    responseArray,
    setLoading,
    setResultData,
    setResponseArray,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
