/* eslint-disable react/prop-types */
import React from 'react';

const DateNavBarBtn = (props) => {
  const { styleClasses, btnClick, date } = props;

  return (
    <button type="button" className={styleClasses} onClick={btnClick}>
      {date}
    </button>
  );
};

export default DateNavBarBtn;
