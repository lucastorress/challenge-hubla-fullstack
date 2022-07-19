import _ = require('lodash');

/**
 * On this file, we have some auxiliary functions to use on data manipulation
 * We also have constant properties that define the sizes of headers in upload
 */

const stringHeaderSizeProperties = {
  type: 1,
  date: 25,
  product: 30,
  price: 10,
  seller: 20,
};

const factoryProperties = (sizes: typeof stringHeaderSizeProperties) => {
  let lineTotalSize = 0;
  const indexesToSlice = [];

  _.forIn(sizes, (propValue) => {
    lineTotalSize += propValue;
    indexesToSlice.push(propValue);
  });

  return { lineTotalSize, indexesToSlice };
};

const { lineTotalSize: totalSize, indexesToSlice: indexes } = factoryProperties(
  stringHeaderSizeProperties,
);

const transactionFileProperties = {
  properties: {
    sizes: stringHeaderSizeProperties,
    totalSize,
    indexes,
  },
};

/**
 * This functions receive a string and slice it in many pieces with specific
 * sizes.
 * @param str A string to be sliced. e.g.: 'abcdef'
 * @param sizeChunks The length of this array will define how many chunks we want
 * and the number on each position will define the size of string we want.
 * e.g.: [1, 2, 3]
 * @returns A array with strings. e.g.: ["a", "bc", "def"]
 */
const splitStringIntoChunks = (str: string, sizeChunks: number[]) => {
  const strChunks: string[] = [];
  let stringToSlice = str;

  for (let index of sizeChunks) {
    const chunk = stringToSlice.slice(0, index);
    strChunks.push(_.trimEnd(chunk));
    stringToSlice = stringToSlice.slice(index);
  }

  return strChunks;
};

export { transactionFileProperties, splitStringIntoChunks };
