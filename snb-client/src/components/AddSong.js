import React, { useState } from 'react';
import PropTypes from 'prop-types';


const AddSong = ({ searchType, title, userdata, nextPageValue }) => {

  const [page, setPage] = useState(2);
  const [song, setSong] = useState([]);
  const [value, setValue] = useState(userdata.list.id);

  const changePage = async () => {
    if (page > 0) {
      setPage(page + 1);
      await axios.get(`${process.env.SCRAP_SERVER_ADDRESS}/v1/search/${searchType}`,
        { page, numOfRow: 15, title }, { withCredentials: true })
        .then(res => {
          nextPageValue(res.data.results);
        });
    } else {
      setPage(1);
      await axios.get(`${process.env.SCRAP_SERVER_ADDRESS}/v1/search/${searchType}`,
        { page, numOfRow: 15, title }, { withCredentials: true })
        .then(res => {
          nextPageValue(res.data.results);
        });
    }
  };

  const handleClick = async () => {
    await axios.post(`${process.env.MAIN_SERVER_ADDRESS}/mylist/song/add`,
      { listid: value, song: song }, { withCredentials: true });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='addsong'>
      <div className="search-btnbox">
        <button className="search-previosbtn" onClick={() => changePage()}>이전</button>
        <button className="search-nextbtn" onClick={() => changePage()}>다음</button>
      </div>
      <div className="search-listbox">
        <select name="list" id="listDropdown" value={value} onChange={handleChange}>
          {props.list.map((data) => {
            <option value={data.id}>{data.listname}</option>;
          })}
        </select>
        <button className="search-aaddlistbtn" onClick={handleClick}>내 리스트에 저장</button>
      </div>
    </div>

  );

};
AddSong.propTypes = {
  list: PropTypes.array,
  searchValue: PropTypes.string,
  searchType: PropTypes.string,
  title: PropTypes.string,
  userdata: PropTypes.object,
  nextPageValue: PropTypes.func
};

export default AddSong;