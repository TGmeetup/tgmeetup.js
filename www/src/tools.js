export const binaryInsert = (array, toInsert, cmpFunc) => {
  let start = 0;
  for (let end = array.length; start < end;) {
    const mid = Math.floor((start + end) / 2)

    const cmpResult = cmpFunc(toInsert, array[mid])

    if (cmpResult < 0) {
      end = mid - 1;
    } else if (cmpResult > 0) {
      start = mid + 1;
    } else {
      break;
    }
  }

  array.splice(start, 0, toInsert)

  return array
}
