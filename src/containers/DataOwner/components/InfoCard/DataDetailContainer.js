import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailSelector } from 'containers/DataOwner/dataOwner.selectors';
import { getDataDetail } from 'containers/DataOwner/dataOwner.actions';
import Text from 'components/Text';
import moment from 'moment';

import DetailCard from './DataDetailCard';

const DataDetailContainer = () => {
  const dispatch = useDispatch();
  const data = useSelector(detailSelector);

  useEffect(() => {
    const now = moment();
    dispatch(getDataDetail({ month: now.month() + 1, year: now.year() }));
  }, [dispatch]);
  const { registeredUsers, unsuscribedUsers, activeUsers } = data;

  return (
    <div className="DataDetailContainer">
      <DetailCard
        label={<Text translationKey="data-owner.info-card.total-users-active-label" />}
        amount={activeUsers}
      />
      <DetailCard
        label={<Text translationKey="data-owner.info-card.registred-users-label" />}
        amount={registeredUsers}
      />
      <DetailCard
        label={<Text translationKey="data-owner.info-card.unregistred-user-label" />}
        amount={unsuscribedUsers}
      />
    </div>
  );
};

export default DataDetailContainer;
