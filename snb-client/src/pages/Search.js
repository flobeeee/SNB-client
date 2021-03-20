import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Song from '../components/Song';
import axios from 'axios';
import AddSong from '../components/AddSong';

require('dotenv').config;
//searchValue는 배열이다
const Search = ({ searchValue, searchType, title, userdata, isNext, nowPages }) => {

  const [result, setResult] = useState(searchValue);
  const [songList, setSongList] = useState([]);
  const [page, setPage] = useState(1);
  const [nowPage, setNowPage] = useState(nowPages);
  const [Next, setnext] = useState(isNext);

  console.log('값이 바뀌나요?', result);

  useEffect(() => {
    setResult(searchValue);
    setPage(1);
    setNowPage(nowPages);
    setnext(isNext);
  }, [searchValue, searchType, title, userdata, isNext, nowPages]);

  const NextPage = async () => {

    if (Next === true || page < nowPage) {

      if (searchType === 'singer') {
        await axios.get(`https://localhost:5000/v1/search/${searchType}`,
          { params: { page: page + 1, numOfRow: 15, singer: title } },
          { withCredentials: true })
          .then(res => {
            setResult(res.data);
            setnext(res.data.page.isNext);
            setPage(page + 1);
            setNowPage(res.data.page.nowPages);
            setSongList([]);
          });
      } else {
        await axios.get(`https://localhost:5000/v1/search/${searchType}`,
          { params: { page: page + 1, numOfRow: 15, title: title } },
          { withCredentials: true })
          .then(res => {
            setResult(res.data);
            setnext(res.data.page.isNext);
            setPage(page + 1);
            setNowPage(res.data.page.nowPages);
            setSongList([]);
          });
      }
    } else {
      alert('마지막 페이지 입니다');
    }
  };

  const PreviousPage = async () => {
    if (page > 1) {

      if (searchType === 'singer') {
        await axios.get(`https://localhost:5000/v1/search/${searchType}`,
          { params: { page: page - 1, numOfRow: 15, singer: title } },
          { withCredentials: true })
          .then(res => {
            setResult(res.data);
            setnext(res.data.page.isNext);
            setPage(page - 1);
            setNowPage(res.data.page.nowPages);
            setSongList([]);
          });
      } else {
        await axios.get(`https://localhost:5000/v1/search/${searchType}`,
          { params: { page: page - 1, numOfRow: 15, title: title } },
          { withCredentials: true })
          .then(res => {
            setResult(res.data);
            setnext(res.data.page.isNext);
            setPage(page - 1);
            setNowPage(res.data.page.nowPages);
            setSongList([]);
          });
      }
    } else {
      alert('첫 번째 페이지 입니다');
    }
  };

  const getSongs = (songInfo) => {
    // eslint-disable-next-line no-empty

    if (songInfo.checked === false) {
      let song = songList.filter(el => Number(el.songNum) !== Number(songInfo.songNum));
      setSongList(song);
    } else {
      setSongList([...songList, songInfo.data]);
      console.log('노래 정보', songInfo);
    }
  };

  return (
    <div className="search-box">
      {result.results.map((data) => (
        <Song
          key={data.songNum}
          songNum={data.songNum}
          title={data.title}
          singer={data.singer}
          link={data.link}
          getSongs={getSongs}
        />
      ))}
      <AddSong userdata={userdata} songList={songList} />
      <div className='page-box'>
        <div className="search-btnbox">
          <button className="search-previosbtn" onClick={() => PreviousPage()}>이전</button>
          <button className="search-nextbtn" onClick={() => NextPage()}>다음</button>
        </div>
      </div>
    </div>

  );
};

Search.propTypes = {
  searchValue: PropTypes.object,
  searchType: PropTypes.string,
  title: PropTypes.string,
  userdata: PropTypes.object,
  isNext: PropTypes.bool,
  nowPages: PropTypes.number
};

export default Search;