import React, { useEffect, useState } from 'react';
import Card from '../components/CountryCard/CountryCard';
import CardContainer from '../components/CardContainer/CardContainer';
import { getData as getCountries } from '../services/api';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError('');

      const res = await getCountries('all');
      if (res.data) {
        setCountries(
          res.data.map(country => ({
            name: country.name.common,
            currencies: country.currencies,
            capital: country.capital,
            region: country.region,
            languages: country.languages,
            population: country.population,
            flag: country.flags.svg,
          }))
        );
      } else if (res.error) setError(res.error);
      setLoading(false);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    console.log(countries);
  }, [countries]);

  return (
    <CardContainer>
      {countries.map((country, i) => (
        <Card key={country + i} {...country} />
      ))}
    </CardContainer>
  );
};
export default Home;
