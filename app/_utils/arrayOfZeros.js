export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const currentYear = new Date().getFullYear();

export const arrayOfZeros = Array(isLeapYear(currentYear) ? 366 : 365).fill(0);
