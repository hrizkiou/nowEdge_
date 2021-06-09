const parse = (number) =>
  number !== 0 ? (number >= 10 ? number : `0${number}`) : 0;

const toFixedOnlyFloat = (num) => {
  const dec = ('' + num).split('.')[1];

  if (dec) {
    return parseFloat(num).toFixed(2);
  } else {
    return num;
  }
};

export {parse, toFixedOnlyFloat};
