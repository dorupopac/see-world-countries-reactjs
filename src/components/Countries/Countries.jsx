import React, { useEffect, useState, useRef, useCallback } from 'react';
import SmallCountryCard from './SmallCountryCard/SmallCountryCard';
import CardContainer from './CardContainer/CardContainer';
import Spinner from '../Spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCountriesContext } from '../../contexts/countries-context';
import { shuffleArray } from '../../services/helpers';

const Countries = ({ activeRegion }) => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [slicedCountries, setSlicedCountries] = useState([]);
  const { countries, loading, error } = useCountriesContext();
  const [hasMore, setHasMore] = useState(true);
  const range = useRef({ min: 0, max: 15 });
  const wasFullyLoadedBefore = sessionStorage.getItem(activeRegion);

  const getCountries = useCallback(async () => {
    let filteredCountriesByRegion = countries.filter(
      countryObj =>
        countryObj.region.toLowerCase() === activeRegion.toLowerCase()
    );
    if (activeRegion === 'all') {
      filteredCountriesByRegion = [...countries];
    }
    setFilteredCountries(filteredCountriesByRegion);

    if (!wasFullyLoadedBefore) {
      shuffleArray(filteredCountriesByRegion);
      setSlicedCountries(
        filteredCountriesByRegion.slice(range.current.min, range.current.max)
      );
    }

    if (wasFullyLoadedBefore) {
      setFilteredCountries([
        ...JSON.parse(sessionStorage.getItem(`${activeRegion}-cards-order`)),
      ]);
    }
  }, [activeRegion, wasFullyLoadedBefore, countries]);

  useEffect(() => {
    range.current.min = 0;
    range.current.max = 15;
    setHasMore(true);
    getCountries();
  }, [activeRegion, getCountries]);

  const sliceCountries = () => {
    range.current.min += 15;
    range.current.max += 15;
    if (!filteredCountries[range.current.min]) {
      setHasMore(false);
      sessionStorage.setItem(activeRegion, 'loaded');

      sessionStorage.setItem(
        `${activeRegion}-cards-order`,
        JSON.stringify(filteredCountries)
      );
      return;
    }
    setTimeout(() => {
      setSlicedCountries(prev =>
        prev.concat(
          filteredCountries.slice(range.current.min, range.current.max)
        )
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
          {filteredCountries.map((country, i) => (
            <SmallCountryCard key={country + i} {...country} />
          ))}
        </CardContainer>
      )}
    </>
  );
};
export default Countries;
