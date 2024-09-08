import { mean, standardDeviation } from "./MathUtils";
import { getWordLength } from "./Utils";

export const calcConsistency = (list) => {
    const avg = mean(list);
    const stdDev = standardDeviation(list);
    const consistencyPercentage = (1 - (stdDev / avg)) * 100;
    return isNaN(consistencyPercentage) ? 0 : consistencyPercentage;
};

export const calcKeyStrokes = (wordList, writtenWords) => wordList.reduce(
    ([ck, ik, cw, iw], word, index) => {
        const isCorrect = writtenWords[index];
        const wordLength = getWordLength(word) + 1;

        return [
            ck + (isCorrect ? wordLength : 0),
            ik + (isCorrect === false ? wordLength : 0),
            cw + (isCorrect ? 1 : 0),
            iw + (isCorrect === false ? 1 : 0)
        ];
    }, [0, 0, 0, 0]
);

export const calcWPM = (keys, duration) => (keys / 5) * (60 / duration);
export const calcLiveWPM = (keys, duration, endTime) => (keys / 5) * (60 / (duration - (endTime - Date.now()) / 1000));
export const calcRaw = (correctKeys, incorrectKeys, duration) => calcWPM(correctKeys + incorrectKeys, duration);
export const calcLiveRaw = (correctKeys, incorrectKeys, duration, endTime) => calcLiveWPM(correctKeys + incorrectKeys, duration, endTime);
export const calcAccuracy = (accuracy) => (accuracy.correct / (accuracy.correct + accuracy.wrong)) * 100;