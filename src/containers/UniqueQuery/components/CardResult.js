import React from 'react';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import Button from 'components/Button';
import undoIcon from './assets/undo.svg';
import './Search.scss';

const ACTIVE_STATUS = 1;
// const UNACTIVE_STATUS = 0;

const CardResult = (props) => {
  const { result, onClickBackBtn, showBackButton } = props;
  return (
    <div className="UniqueQuery-CardResult">
      <div className="UniqueQuery-CardResult__field">
        <span className="UniqueQuery-CardResult__field__status">
          <div className={`UniqueQuery-CardResult__field__status-point ${result.status === ACTIVE_STATUS ? 'active' : 'inactive'}`} />
          { result.status === ACTIVE_STATUS
            ? (
              <Text
                component="span"
                translationKey="unique-query.card-result.status_active"
              />
            ) : (
              <Text
                component="span"
                translationKey="unique-query.card-result.status_inactive"
              />
            )}
          <span style={{ flex: 1 }} />
          {showBackButton ? (
            <Button variant="none" onClick={onClickBackBtn}>
              <img src={undoIcon} alt="undo_img" />
            </Button>
          ) : null}
        </span>
      </div>
      <div className="UniqueQuery-CardResult__field">
        <Text
          component="label"
          translationKey="unique-query.card-result.id"
        />
        <span className="UniqueQuery-CardResult__field__value">{result.clientNumber}</span>
      </div>
      <div className="UniqueQuery-CardResult__field">
        <Text
          component="label"
          translationKey="unique-query.card-result.name"
        />
        <span className="UniqueQuery-CardResult__field__value">{result.name}</span>
      </div>
      <div className="UniqueQuery-CardResult__field">
        <Text
          component="label"
          translationKey="unique-query.card-result.last_name"
        />
        <span className="UniqueQuery-CardResult__field__value">{result.lastName}</span>
      </div>
      <div className="UniqueQuery-CardResult__field">
        <Text
          component="label"
          translationKey="unique-query.card-result.second_last_name"
        />
        <span className="UniqueQuery-CardResult__field__value">{result.mLastName}</span>
      </div>
      <div className="UniqueQuery-CardResult__field">
        <Text
          component="label"
          translationKey="unique-query.card-result.rfc"
        />
        <span className="UniqueQuery-CardResult__field__value">{result.rfc}</span>
      </div>
      <div className="UniqueQuery-CardResult__field">
        <Text
          component="label"
          translationKey="unique-query.card-result.operation"
        />
        <span className="UniqueQuery-CardResult__field__value">{result.comment}</span>
      </div>
      <div className="UniqueQuery-CardResult__field">
        <Text
          component="label"
          translationKey="unique-query.card-result.plan_type"
        />
        <span className="UniqueQuery-CardResult__field__value">{result.coverageid}</span>
      </div>
      <div className="UniqueQuery-CardResult__field">
        <Text
          component="label"
          translationKey="unique-query.card-result.date"
        />
        <span className="UniqueQuery-CardResult__field__value">{result.operationDate}</span>
      </div>
    </div>
  );
};

CardResult.propTypes = {
  onClickBackBtn: PropTypes.func,
  showBackButton: PropTypes.bool,
  result: PropTypes.shape({
    coverageid: PropTypes.string,
    status: PropTypes.number,
    comment: PropTypes.string,
    name: PropTypes.string,
    lastName: PropTypes.string,
    mLastName: PropTypes.string,
    clientNumber: PropTypes.string,
    rfc: PropTypes.string,
    operationDate: PropTypes.string,
  }),
};


CardResult.defaultProps = {
  onClickBackBtn: () => 1,
  showBackButton: true,
  result: {},
};
export default CardResult;
