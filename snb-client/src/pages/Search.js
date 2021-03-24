import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import dotenv from 'dotenv';

import Song from '../components/Song';
import AddSong from '../components/AddSong';
import Modal from '../components/modal/CenterModal';
import nextimg from '../res/next.png';
import backimg from '../res/back.png';
import './Search.css';

dotenv.config();

const Search = ({ searchValue, searchType, title, userdata, isNext, nowPages }) => {

  useEffect(() => {
    setResult(searchValue);
    setPage(1);
    setNowPage(nowPages);
    setnext(isNext);
  }, [searchValue, searchType, title, userdata, isNext, nowPages]);

  const [result, setResult] = useState(searchValue);
  const [songList, setSongList] = useState([]);
  const [page, setPage] = useState(1);
  const [nowPage, setNowPage] = useState(nowPages);
  const [Next, setnext] = useState(isNext);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAddBtn, setIsAddBtn] = useState(true);

  const isAdd = (e) => {
    if (e === true) {
      setIsAddBtn(true);
      openPopUp();
    } else {
      setIsAddBtn(false);
      openPopUp();
    }
  };
  const openPopUp = () => {
    setIsOpenPopup(true);

  };

  const closePopUp = () => {
    setIsOpenPopup(false);
  };

  const NextPage = async () => {

    if (Next === true || page < nowPage) {

      if (searchType === 'singer') {
        await axios.get(`${process.env.REACT_APP_SCRAP_SERVER_ADDRESS}/v1/search/singer`,
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
        await axios.get(`${process.env.REACT_APP_SCRAP_SERVER_ADDRESS}/v1/search/title`,
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
      isAdd(true);
    }
  };

  const PreviousPage = async () => {
    if (page > 1) {

      if (searchType === 'singer') {
        await axios.get(`${process.env.REACT_APP_SCRAP_SERVER_ADDRESS}/v1/search/${searchType}`,
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
        await axios.get(`${process.env.REACT_APP_SCRAP_SERVER_ADDRESS}/v1/search/${searchType}`,
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
      isAdd(false);
    }
  };

  const getSongs = (songInfo) => {

    if (songInfo.checked === false) {
      let song = songList.filter(el => Number(el.songNum) !== Number(songInfo.data.songNum));
      setSongList(song);
    } else {
      setSongList([...songList, songInfo.data]);
    }
  };

  return (
    <div className='search-box'>
      <Modal visible={isOpenPopup} color={'#7660dccc'} isBlackBtn={false} onClose={closePopUp} backColor={true} isWarning={true} >
        {!isAddBtn ? (<div style={{ color: 'white' }}>첫번째 페이지 입니다</div>) : (<div style={{ color: 'white' }}>마지막 페이지 입니다</div>)}
      </Modal>
      <div className='info'>
        <div className='info-num'>번호</div>
        <div className='info-title'>제목</div>
        <div className='info-singer'>가수</div>
        <div className='info-mediabox'>
          <div className='info-media'>미디어</div>
          <div className='info-checkbox'>선택</div>
        </div>
      </div>
      <div className='songs'>
        {result.results ? (<div className='song'>
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
        </div>) : (<div>첫번째 리스트를 만드세요</div>)}
      </div>
      <div className='addsong-dropdown'>
        <div className='info-dropdown'>
          <AddSong userdata={userdata} songList={songList} />
        </div>
        <div className='search-btnbox'>
          <img className='search-previusbtn' alt="backbtn" src={backimg} onClick={() => PreviousPage()} />
          <img className='search-nextbtn' alt="nextbtn" src={nextimg} onClick={() => NextPage()} />
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