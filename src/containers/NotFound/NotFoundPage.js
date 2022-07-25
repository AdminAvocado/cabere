import React from 'react';
import Container from 'react-bootstrap/Container';
import Text from 'components/Text';
import './NotFound.scss';

const NotFoundPage = () => (
  <Container>
    <div className="NotFoundPage__col">
      <div className="NotFoundPage__row">
        <h1>404</h1>
        <Text component="h3" translationKey="not-found.subtitle" />
      </div>
    </div>
  </Container>
);

export default NotFoundPage;
