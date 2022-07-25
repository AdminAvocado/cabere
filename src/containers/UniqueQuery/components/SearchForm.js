import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Search.scss';
import Input from 'components/Input';
import Button from 'components/Button';
import Text from 'components/Text';
import Spinner from 'react-bootstrap/Spinner';
import CardHeader from 'components/Card/CardHeader';
import cardIcon from './assets/pay.svg';
import copyIcon from './assets/shape-copy.svg';

const SearchForm = (props) => {
  const [info, updateInfo] = useState({ number: '', rfc: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = props;
    onSubmit(info);
  };
  const { isLoading, error } = props;
  return (
    <div className="UniqueQuery-SearchForm">
      <form onSubmit={handleSubmit}>
        <CardHeader icon="AiOutlineUser">
          <Text component="h6" translationKey="unique-query.search-form.header-title" />
        </CardHeader>
        <div style={{ height: '7px' }} />
        <Input
          value={info.number}
          error={Boolean(error)}
          placeholder={<Text translationKey="unique-query.search-form.number-placeholder" />}
          onChange={(e) => updateInfo({ ...info, number: e.target.value })}
          decorator={cardIcon}
        />
        { error ? (
          <span className="UniqueQuery-SearchForm__error_number">
            <Text translationKey="unique-query.search-form.number-error" />
          </span>
        ) : null}
        <Input
          decorator={copyIcon}
          placeholder={<Text translationKey="unique-query.search-form.rfc-placeholder" />}
          value={info.rfc}
          onChange={(e) => updateInfo({ ...info, rfc: e.target.value })}
        />
        <div style={{ height: '65px' }} />
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <Spinner
              as="span"
              style={{ marginLeft: '-15px' }}
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : null}
          <Text translationKey="unique-query.search-form.search-button" />
        </Button>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.shape({}),
};

SearchForm.defaultProps = {
  onSubmit: () => 1,
  isLoading: false,
  error: null,
};

export default SearchForm;
