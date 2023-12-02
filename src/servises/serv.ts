export const l = <T>(data: T, variableName?: string): void => {
    console.log('=============');
    if (variableName) {
        console.log(`${variableName}:`, data);
    } else {
        console.log(data);
    }
    console.log('=============');
};




// getRandomElement = <T>(array: T[]): T | undefined =>{
//     if (array.length === 0) {
//         return undefined;
//     }
//
//     const randomIndex = Math.floor(Math.random() * array.length);
//     return array[randomIndex];
// }