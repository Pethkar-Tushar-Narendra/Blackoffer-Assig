import React from 'react';
import './Box.css';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GrFormClose } from 'react-icons/gr';
import { HiSearch } from 'react-icons/hi';
const Box = ({ title, value, func, toggle, modal, array }) => {
  console.log(array);
  return (
    <div className="box">
      <p className="label">{title}</p>
      <div className="value" onClick={toggle}>
        <h3>{value ? value : 'Select'}</h3>
        <i>{modal ? <GrFormClose /> : <RiArrowDropDownLine />}</i>
      </div>
      <div className="popup" style={{ display: modal ? 'flex' : 'none' }}>
        <div className="search">
          <input></input>
          <i>
            <HiSearch />
          </i>
        </div>
        <div className="option">
          <h4>Options</h4>
        </div>
      </div>
    </div>
  );
};

export default Box;
