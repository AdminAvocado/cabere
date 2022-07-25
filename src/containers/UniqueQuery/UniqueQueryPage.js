import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import CardResult from './components/CardResult';
import SearchForm from './components/SearchForm';
import { searchClient, cleanInfoClient } from './uniqueQuery.actions';
import { uniqueQuerySelector } from './uniqueQuery.selectors';
import './UniqueQuery.scss';


export const UniqueQueryPage = ({ className }) => {
  const dispatch = useDispatch();
  const state = useSelector(uniqueQuerySelector);
  const handleSearch = (query) => {
    dispatch(searchClient(query));
  };
  const handleCleanInfo = () => dispatch(cleanInfoClient());
  const { isLoading, searchResult, error } = state;
  return (
    <div className={`UniqueQueryPage ${className}`}>
      <div className="UniqueQueryPage__container">
        {searchResult
          ? (
            <CardResult
              result={searchResult}
              onClickBackBtn={handleCleanInfo}
            />
          )
          : <SearchForm isLoading={isLoading} error={error} onSubmit={handleSearch} />}
      </div>
    </div>
  );
};

UniqueQueryPage.propTypes = {
  className: PropTypes.string,
};

UniqueQueryPage.defaultProps = {
  className: '',
};


export default UniqueQueryPage;
