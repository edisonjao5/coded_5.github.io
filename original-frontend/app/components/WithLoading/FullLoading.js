import React, { useEffect } from 'react';
import LoginBg from 'images/login-bg.jpg';
import Logo from 'images/logo.svg';

const FullLoading = () => {
  useEffect(() => {
    document.getElementById('main_page').style.height = '100%';
  });
  return (
    <div
      className="shadow-lg rounded-lg overflow-hidden align-items-center justify-content-center d-flex"
      style={{
        backgroundImage: `url(${LoginBg})`,
        backgroundSize: 'cover',
        height: '100%',
      }}
    >
      <div className="text-center">
        <div
          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
          className="p-4 rounded shadow"
        >
          <img src={Logo} width="250" className="pb-3" alt="" />
          <br />
          <span className="font-21">Datos iniciales .... </span>{' '}
          <i className="spinner-border spinner-border-sm" />
        </div>
      </div>
    </div>
  );
};

FullLoading.propTypes = {};
export default FullLoading;
