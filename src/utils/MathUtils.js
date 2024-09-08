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