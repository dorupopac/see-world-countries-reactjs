export const formatNumbers = value =>
  new Intl.NumberFormat(navigator.language, { style: 'decimal' }).format(value);
