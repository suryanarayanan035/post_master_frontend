'use client';

import axios from 'axios';
import PlanCards from '@components/PlanCards';

export default function HomePagePlanCards({ plans }) {
  const onClickCreateAccount = (accountType) => {
    axios.get(
      `http://localhost:8000/external_app/authorize?account_type=${accountType}`,
      {
        headers: {
          Authorization:
            'Token 6cfcc719bec30fe22cb52fbc7d69ca21e2f70695abe6f0b12b7ef9b28732cfe2',
        },
      },
    );
  };

  return <PlanCards cards={plans} onClick={onClickCreateAccount} />;
}
