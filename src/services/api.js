import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  headers: { Accept: 'application/json' },
});

const buildPath = (...params) => `/${params.join('/')}`;

export const getData = async (...params) => {
  const builtPath = buildPath(...params);
  try {
    const res = await instance.get(builtPath);
    return { data: res.data };
  } catch (err) {
    return { error: err.message };
  }
};
