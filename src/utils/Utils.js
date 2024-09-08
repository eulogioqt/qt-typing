export const getWordLength = (word) => {
    const specialCharacters = {
        'á': ['´', 'a'],
        'é': ['´', 'e'],
        'í': ['´', 'i'],
        'ó': ['´', 'o'],
        'ú': ['´', 'u'],
        'ü': ['^', '¨', 'u'],
    };

    let keystrokes = [];

    for (let char of word) {
        if (specialCharacters[char]) {
            keystrokes.push(...specialCharacters[char]);
        } else {
            keystrokes.push(char);
        }
    }

    return keystrokes.length;
}

export const mean = (list) => {
    const sum = list.reduce((acc, value) => acc + value, 0);
    return sum / list.length;
};

export const standardDeviation = (list) => {
    const avg = mean(list);
    const squareDiffs = list.map(value => Math.pow(value - avg, 2));
    const avgSquareDiff = mean(squareDiffs);
    return Math.sqrt(avgSquareDiff);
};