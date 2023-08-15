// This function takes a 2 dimensional array and removes all empty sub arrays
export const removeEmptyArrays = (inputArray) => {
    const isTwoDimensional = inputArray.every((subArray) => Array.isArray(subArray));

    if(!isTwoDimensional) return inputArray;

    const filteredArray = inputArray.filter((subArray) => subArray.length > 0);
    return filteredArray

}

export const formatArrayTo2d = (arr) => {
      let breakpointsIndexes = [];
      let output = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "separator") {
          breakpointsIndexes.push(i);
        }
      }
      for (let j = breakpointsIndexes.length - 1; j >= 0; j--) {
        output.push(arr.splice(breakpointsIndexes[j] + 1, arr.length));
        arr.pop();
      }
      output.push(arr);
      return output.reverse();
    };

export const formatArrayTo1d = (arr) => {
      let output = [];
      for (let i = 0; i < arr.length - 1; i++) {
        output.push(...arr[i], "separator");
      }
      output.push(...arr[arr.length - 1]);

      return output;
    };


    // Function that checks whether two (sorted) arrays are identical
export const arrayEquals = (a, b) => {
        return (
          Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => val === b[index])
        );
      };

      // The line cords are initially recieved as an array with objects.
    // This function removes the objects and sets each point in an array. All the points are then stored in a
    // higher level array, returning a two-dimensional array of the line cords.
 export  const convertToArr = (lineCords) => {
        let arr = [];
        for (let i = 0; i < lineCords.length; i++) {
          arr.push([Number(lineCords[i].x), Number(lineCords[i].y)]);
        }
  
        return arr;
      };