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