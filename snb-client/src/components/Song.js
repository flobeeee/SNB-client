import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Song = ({ songNum, title, singer, getSongs, link }) => {

  const [checked, setchecked] = useState(false);

  const getSongsHandler = () => {
    const data = { data: { songNum, title, singer, link }, checked };
    setchecked(!checked);
    getSongs(data);
  };

  return (
    <div className="songdata">
      <div className="songNum">{songNum}</div>
      <div className="title">{title}</div>
      <div className="singer">{singer}</div>
      <a href={`${link}`} target='_blank' rel="noopener noreferrer">
        링크
      </a>
      <input className="checkbox" type="checkbox" name={`${songNum}`} onChange={getSongsHandler} />
    </div>

  );
};
Song.propTypes = {
  getSongs: PropTypes.func,
  singer: PropTypes.string,
  title: PropTypes.string,
  songNum: PropTypes.number,
  link: PropTypes.string
};

export default Song;
