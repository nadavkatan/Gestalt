// This function takes a 2 dimensional array and removes all empty sub arrays
export const removeEmptyArrays = (inputArray) => {
    const isTwoDimensional = inputArray.every((subArray) => Array.isArray(subArray));

    if(!isTwoDimensional) return inputArray;
    
    const filteredArray = inputArray.filter((subArray) => subArray.length > 0);
    return filteredArray

}



