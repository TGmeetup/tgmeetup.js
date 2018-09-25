import React from 'react';
import {
  IoLogoFacebook,
  IoIosAddCircle,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoGoogleplus,
}from 'react-icons/io';

const Icon = ({ type }) => {
  if (type === 'facebook')
    return <IoLogoFacebook />;
  if (type === 'twitter')
    return <IoLogoTwitter />;
  if (type === 'youtube')
    return <IoLogoYoutube />;
  if (type === 'google-plus')
    return <IoLogoGoogleplus />;

  return <IoIosAddCircle />;
}

export default Icon;
