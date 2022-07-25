/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


const Translator = (props) => {
  const { translationKey, component, ...others } = props;
  const { t } = useTranslation('');
  if (component !== 'none') {
    return React.createElement(component, others, t(`${translationKey}`));
  }
  return t(`${translationKey}`);
};

Translator.propTypes = {
  translationKey: PropTypes.string,
  component: PropTypes.string.isRequired,

};

Translator.defaultProps = {
  translationKey: '',
};


const Text = (props) => {
  const { translationKey, component, ...others } = props;
  return (
    <Suspense fallback="..">
      <Translator translationKey={translationKey} component={component} {...others} />
    </Suspense>
  );
};

Text.propTypes = {
  translationKey: PropTypes.string.isRequired,
  component: PropTypes.string,
};

Text.defaultProps = {
  component: 'none',
};


export default Text;
