import React, { useEffect, useState, useRef, useCallback } from 'react';
import SmallCountryCard from './SmallCountryCard/SmallCountryCard';
import CardContainer from './CardContainer/CardContainer';
import Spinner from '../Spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCountriesContext } from '../../contexts/countries-context';
import { getData as getCountries } from '../../services/api';
import { shuffleArray } from '../../services/helpers';

const Countries = ({ activeRegion }) => {
  const [slicedCountries, setSlicedCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const { countries, setCountries } = useCountriesContext();
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
      setCountries(countriesData);
      setSlicedCountries(
        countriesData.slice(range.current.min, range.current.max)
      );

      if (wasFullyLoadedBefore) {
        setCountries([
          ...JSON.parse(sessionStorage.getItem(`${activeRegion}-cards-order`)),
        ]);
      }
    } else if (res.error) setError(res.error);
    setLoading(false);
  }, [activeRegion, wasFullyLoadedBefore, setCountries]);

  useEffect(() => {
    range.current.min = 0;
    range.current.max = 15;
    setHasMore(true);
    fetchCountries();
  }, [activeRegion, fetchCountries]);

  const sliceCountries = () => {
    range.current.min += 15;
    range.current.max += 15;
    if (!countries[range.current.min]) {
      setHasMore(false);
      sessionStorage.setItem(activeRegion, 'loaded');

      sessionStorage.setItem(
        `${activeRegion}-cards-order`,
        JSON.stringify(countries)
      );

      return;
    }
    setTimeout(() => {
      setSlicedCountries(prev =>
        prev.concat(countries.slice(range.current.min, range.current.max))
      );
    }, 200);
  };

  if (loading) return <Spinner className="spinner" />;
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
            <p style={{ textAlign: 'center', paddingBottom: '2rem' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <CardContainer>
            {slicedCountries.map((country, i) => (
              <SmallCountryCard key={country + i} {...country} />
            ))}
          </CardContainer>
        </InfiniteScroll>
      ) : (
        <CardContainer>
          {countries.map((country, i) => (
            <SmallCountryCard key={country + i} {...country} />
          ))}
        </CardContainer>
      )}
    </>
  );
};
export default Countries;
