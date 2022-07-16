import _ = require('lodash');

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
