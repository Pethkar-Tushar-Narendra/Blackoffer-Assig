import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import './FilterBox.css';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { HiSearch } from 'react-icons/hi';
import Box from './SearchfilterCard/Box';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        json: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const FilterBox = () => {
  const [{ loading, json, error, regionArray }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
    }
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('api/data/get', {
          headers: { Authorization: `SomethingSecret` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data.DBdata });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: err.response.data.message
            ? err.response.data.message
            : err.message,
        });
      }
    };
    fetchData();
  }, []);
  const [end_year, setEndYear] = useState('');
  const [topics, setTopics] = useState('');
  const [sector, setSector] = useState('');
  const [region, setRegion] = useState('');
  const [end_yearIsOpen, setEndYearIsOpen] = useState(false);
  const [topicsIsOpen, setTopicsIsOpen] = useState(false);
  const [sectorIsOpen, setSectorIsOpen] = useState(false);
  const [regionIsOpen, setRegionIsOpen] = useState(false);
  const end_yearToggle = () => {
    setEndYearIsOpen(!end_yearIsOpen);
    setTopicsIsOpen(false);
    setSectorIsOpen(false);
    setRegionIsOpen(false);
  };

  const topicsToggle = () => {
    setEndYearIsOpen(false);
    setTopicsIsOpen(!topicsIsOpen);
    setSectorIsOpen(false);
    setRegionIsOpen(false);
  };
  const sectorToggle = () => {
    setEndYearIsOpen(false);
    setTopicsIsOpen(false);
    setSectorIsOpen(!sectorIsOpen);
    setRegionIsOpen(false);
  };
  const regionToggle = () => {
    setEndYearIsOpen(false);
    setTopicsIsOpen(false);
    setSectorIsOpen(false);
    setRegionIsOpen(!regionIsOpen);
  };
  var array = [
    {
      title: 'End Year',
      value: end_year,
      func: setEndYear,
      toggle: end_yearToggle,
      modal: end_yearIsOpen,
    },
    {
      title: 'Topic',
      value: topics,
      func: setTopics,
      toggle: topicsToggle,
      modal: topicsIsOpen,
    },
    {
      title: 'Region',
      value: region,
      func: setRegion,
      toggle: regionToggle,
      modal: regionIsOpen,
    },
    {
      title: 'Sector',
      value: sector,
      func: setSector,
      toggle: sectorToggle,
      modal: sectorIsOpen,
    },
  ];
  return (
    <div className="filter-container">
      <h2 className="title">Search Data with Filter</h2>
      {loading ? (
        <></>
      ) : error ? (
        <></>
      ) : (
        <>
          {array.map((ele, i) => {
            var array = [];
            if (ele.title === 'Region')
              array = [...new Set(json.map((item) => item.region))];
            else array = [...new Set(json.map((item) => item.topic))];
            return (
              <Box
                key={i}
                array={array}
                title={ele.title}
                func={ele.func}
                toggle={ele.toggle}
                modal={ele.modal}
              />
            );
          })}

          <div className="search-button">
            <div className="btn">Search</div>
          </div>
          <div className="table"></div>
        </>
      )}
    </div>
  );
};

export default FilterBox;
