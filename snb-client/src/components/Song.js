import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../components/Song.css';

const Song = ({ songNum, title, singer, getSongs, link, checking }) => {

  const [checked, setchecked] = useState(true);

  const getSongsHandler = () => {
    const data = { data: { songNum, title, singer, link }, checked: checked };
    setchecked(!checked);
    getSongs(data);
  };
  return (
    <div className="songdata">
      <div className="songNum">{songNum}</div>
      <div className="title">{title}</div>
      <div className="singer">{singer}</div>
      <input className="checkbox" type="checkbox" defaultChecked={false} name={`${songNum}`} onChange={getSongsHandler} />
    </div>

  );
};
Song.propTypes = {
  getSongs: PropTypes.func,
  singer: PropTypes.string,
  title: PropTypes.string,
  songNum: PropTypes.string,
  link: PropTypes.string,
  checking: PropTypes.bool
};

export default Song;
