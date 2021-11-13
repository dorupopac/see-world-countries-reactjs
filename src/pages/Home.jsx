import React, { useEffect, useState } from 'react';
import Card from '../components/CountryCard/CountryCard';
import CardContainer from '../components/CardContainer/CardContainer';
import Spinner from '../components/Spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getData as getCountries } from '../services/api';

const range = {
  min: 0,
  max: 15,
};

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [slicedCountries, setSlicedCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

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
      setSlicedCountries(
        res.data.slice(range.min, range.max).map(country => ({
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

  useEffect(() => {
    fetchCountries();
  }, []);

  const sliceCountries = () => {
    range.min += 15;
    range.max += 15;
    if (!countries[range.min]) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setSlicedCountries(prev =>
        prev.concat(countries.slice(range.min, range.max))
      );
    }, 400);
  };

  if (loading) return <Spinner />;
  if (error) return <h1>{error}</h1>;

  return (
    <InfiniteScroll
      dataLength={slicedCountries.length}
      next={sliceCountries}
      style={{fontSize: '2rem'}}
      scrollThreshold="30px"
      hasMore={hasMore}
      loader={<Spinner />}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <CardContainer>
        {slicedCountries.map((country, i) => (
          <Card key={country + i} {...country} />
        ))}
      </CardContainer>
    </InfiniteScroll>
  );
};
export default Home;
