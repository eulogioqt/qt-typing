import WordsES from "../data/WordsES.json";
import WordsEN from "../data/WordsEN.json";

const LANGS = {
    "es": WordsES,
    "en": WordsEN
}

export const useWords = (lang) => {
    const Words = LANGS[lang];

    const generateRandomWord = () => Words[Math.floor(Math.random() * Words.length)];
    const generateWords = () => {
        const list = [];
        for (let i = 0; i < 100; i++)
            list.push(generateRandomWord());

        return list;
    }

    return {
        generateRandomWord,
        generateWords
    }
}