const findRandomNumber = function (from, to) {
  let number;

  if(from < 0 || to < 0) {
    return 'Числа могут быть только положительные';
  }

  if(from === to) {
    return 'Расширьте диапазон';
  }

  if(from > to) {
    number = to + Math.random() * (from + 1 - to);
    return Math.floor(number);
  }

  number = from + Math.random() * (to + 1 - from);
  return Math.floor(number);
};

findRandomNumber(0, 20);

const findRandomFloatNumber = function (from, to, fix) {
  let number;

  if(from < 0 || to < 0) {
    return 'Числа могут быть только положительные';
  }

  if(from === to) {
    return 'Расширьте диапазон';
  }

  if(from > to) {
    number = to + Math.random() * (from + 1 - to);
    return number.toFixed(fix);
  }

  number = from + Math.random() * (to + 1 - from);
  return number.toFixed(fix);
};

findRandomFloatNumber(0, 10.43, 5);
