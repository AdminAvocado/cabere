import React from 'react';
import { shallow } from 'enzyme';
import { DataOwnerPage } from '../DataOwnerPage';

describe('<DataOwnerPage />', () => {
  it('Should renders without crashing', () => {
    const component = shallow(
      <DataOwnerPage
        data={[]}
        isLoading={false}
        getStats={(a) => a}
      />,
    );
    expect(component).toMatchSnapshot();
  });
});
