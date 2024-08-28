export const useWords = (Words) => {
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