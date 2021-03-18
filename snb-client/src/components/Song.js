import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Song = ({ songnum, title, singer, getSongs }) => {

  const [checked, setchecked] = useState(false);

  const getSongsHandler = () => {
    setchecked(!checked);
    const data = { data: songnum, title, singer, checked };
    getSongs(data);
  };
  return (
    <div className="songdata">
      <div className="songnum">{songnum}</div>
      <div className="title">{title}</div>
      <div className="singer">{singer}</div>
      <input className="checkbox" type="checkbox" name="song" onChange={() => getSongsHandler} />
    </div>

  );
};
Song.propTypes = {
  getSongs: PropTypes.func,
  singer: PropTypes.string,
  title: PropTypes.string,
  songnum: PropTypes.number
};

export default Song;
