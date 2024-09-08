import { mean, standardDeviation } from "./Utils";

export const consistency = (list) => {
    const avg = mean(list);
    const stdDev = standardDeviation(list);
    const consistencyPercentage = (1 - (stdDev / avg)) * 100;
    return isNaN(consistencyPercentage) ? 0 : consistencyPercentage;
};