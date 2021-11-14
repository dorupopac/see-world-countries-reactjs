import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  headers: { Accept: 'application/json' },
});

export const getData = async params => {
  try {
    const res = await instance.get(`/${params}`);
    return { data: res.data };
  } catch (err) {
    return { error: err.message };
  }
};
