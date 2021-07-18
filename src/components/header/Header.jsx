import React from 'react';
import LogoIcon from '../../app/icons/logoIcon';
import HeaderRealtors from './HeaderRealtors/HeaderRealtors';
import { useHistory, useParams } from 'react-router-dom';

export const Header = () => {
  const { realtorId } = useParams();
  const history = useHistory();

  const handleClick = () => {
    if (realtorId) {
      history.push(`/realtors/${realtorId}`);
    }
  };

  return (
    <header className={'header'}>
      <div
        data-testid={'header-logo'}
        className={'header__logo'}
        onClick={handleClick}
      >
        <LogoIcon />
      </div>
      <HeaderRealtors />
    </header>
  );
};

export default Header;
