import React, { useEffect, useState, useRef, useCallback } from 'react';
import Card from './CountryCard/CountryCard';
import CardContainer from './CardContainer/CardContainer';
import Spinner from '../Spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getData as getCountries } from '../../services/api';
import { shuffleArray } from '../../services/shuffle-array';

const Countries = ({ activeRegion }) => {
  const [slicedCountries, setSlicedCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const countries = useRef([]);
  const range = useRef({ min: 0, max: 15 });
  const wasFullyLoadedBefore = sessionStorage.getItem(activeRegion);

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    setError(null);

    const res = await getCountries(activeRegion);
    if (res.data) {
      shuffleArray(res.data);
      const countriesData = res.data.map(country => ({
        name: country.name.common,
        currencies: country.currencies,
        capital: country.capital,
        region: country.region,
        languages: country.languages,
        population: country.population,
        flag: country.flags.svg,
      }));
      countries.current = [...countriesData];
      setSlicedCountries(
        countries.current.slice(range.current.min, range.current.max)
      );

      if (wasFullyLoadedBefore) {
        countries.current = [
          ...JSON.parse(sessionStorage.getItem(`${activeRegion}-cards-order`)),
        ];
      }
    } else if (res.error) setError(res.error);
    setLoading(false);
  }, [activeRegion, wasFullyLoadedBefore]);

  useEffect(() => {
    range.current.min = 0;
    range.current.max = 15;
    setHasMore(true);
    fetchCountries();
  }, [activeRegion, fetchCountries]);

  const sliceCountries = () => {
    range.current.min += 15;
    range.current.max += 15;
    if (!countries.current[range.current.min]) {
      setHasMore(false);
      sessionStorage.setItem(activeRegion, 'loaded');

      sessionStorage.setItem(
        `${activeRegion}-cards-order`,
        JSON.stringify(countries.current)
      );

      return;
    }
    setTimeout(() => {
      setSlicedCountries(prev =>
        prev.concat(
          countries.current.slice(range.current.min, range.current.max)
        )
      );
    }, 200);
  };

  if (loading) return <Spinner classes="spinner" />;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      {!wasFullyLoadedBefore ? (
        <InfiniteScroll
          dataLength={slicedCountries.length}
          next={sliceCountries}
          style={{ fontSize: '2rem' }}
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
      ) : (
        <CardContainer>
          {countries.current.map((country, i) => (
            <Card key={country + i} {...country} />
          ))}
        </CardContainer>
      )}
    </>
  );
};
export default Countries;
