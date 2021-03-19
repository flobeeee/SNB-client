import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Song from '../components/Song';
import AddSong from '../components/AddSong';

require('dotenv').config;

const Search = ({ searchValue, searchType, title, userdata, nextPageValue }) => {

  const [result, setResult] = useState(searchValue);
  const [songList, setSongList] = useState([]);

  const getSongs = (songInfo) => {
    // eslint-disable-next-line no-empty
    if (songInfo.checked === false) {
      let result = songList.filter(el => songList.title !== songInfo.title);
      setSongList(result);
    } else {
      setSongLsit(songList.push(songInfo));
    }

  };

  return (
    <div className="search-box">
      {result.map((data, index) => (
        <Song
          key={index}
          songNum={data.songNum}
          title={data.title}
          singer={data.singer}
          link={data.link}
          getSongs={getSongs}
        />
      ))}
      <AddSong searchType={searchType} title={title} userdata={userdata} nextPageValue={nextPageValue} />
    </div>
  );
};

Search.propTypes = {
  list: PropTypes.array,
  searchValue: PropTypes.string,
  searchType: PropTypes.string,
  title: PropTypes.string,
  userdata: PropTypes.object,
  nextPageValue: PropTypes.func
};

export default Search;