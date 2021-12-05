export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const formatNumbers = value =>
  new Intl.NumberFormat(navigator.language, { style: 'decimal' }).format(value);

export const getDataString = (data, extract) => {
  if (data && Array.isArray(data)) return data.join(', ');
  else if (data) return Object[extract](data).join(', ');
  else return 'None';
};
