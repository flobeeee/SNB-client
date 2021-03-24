import React, { useState, useEffect } from 'react';

import './Home.css';

const Home = (props) => {
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
  };

  const createCricleAll = (i) => {
    const stage = document.querySelector('.home-wrapper');
    const circle = document.createElement('span');
    const circleNamse = ['circle-green', 'circle-pink'];
    const circleName = circleNamse[getRandomIntInclusive(0, 1)];
    circle.classList.add(circleName);

    circle.style.borderRadius = 100 + 'px';

    circle.style.width = 45 + 'px';
    circle.style.height = 45 + 'px';

    circle.style.zIndex = 5;

    circle.style.right = '0%';
    circle.style.top = '0%';

    let startTop = 0;
    let startRight = 0;
    let endTop = 90;
    let endRight = 100;

    if (i < 0) {
      i *= -1;
      const interval = 25;
      const a = ((90 - interval) * (interval * i)) / (100 - interval); //y절편

      startRight = 0;
      startTop = a;
      endRight = (((100 - interval) * (90 - a))) / (90 - interval);
      //console.log(startTop, startRight, endTop, endRight);
    } else {
      startRight = (17 * i);
      endTop = (90 - (i * 17));
    }

    if (startTop > 80) { return; }


    circle.animate([
      { top: `${startTop}%`, right: `${startRight}%` },
      { top: `${endTop}%`, right: `${endRight}%` },
    ], 10000);

    stage?.appendChild(circle);
    setTimeout(() => {
      circle.remove();
    }, 10000);
  };

  const createCricleManyAll = () => {
    for (let i = -6; i < 6; i++) {
      createCricleAll(i);
    }
  };

  useEffect(() => {
    //const circleAnimationTopId =  setInterval(createManyCircleTop, 900);
    //const circleAnimationBottomId =  setInterval(createManyCircleBottom, 1200);
    const circleAnimationAllId = setInterval(createCricleManyAll, 900);

    return () => {
      clearInterval(circleAnimationAllId);
      //clearInterval(circleAnimationTopId);
      //clearInterval(circleAnimationBottomId);
    };
  }, []);



  return (
    <div className="home-wrapper">
      <div className="home-title-container">
        <p className="neon">
          Create Your <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <br></br>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Song List</p>
        {/* <marquee className="ssp" behavior="alternate" direction="up" width="1400" height="100" scrollamount="8">
          <marquee behavior="alternate" scrollamount="8">
            <span className="ssp-name">Team</span>
            ⎛⎝( ͡° ʖ̯ ͡°)⎠⎞<span className="ssp-name">백광호</span>
          ⎛⎝(´༎ຶٹ༎ຶ`)⎠⎞<span className="ssp-name">김유상</span>
          ⎛⎝( •᷄⌓•᷅ )⎠⎞<span className="ssp-name">이은정</span>
          ⎛⎝(๑•᎑•๑)⎠⎞<span className="ssp-name">임혜림</span>
          </marquee>
        </marquee> */}
      </div>
    </div>
  );

};


export default Home;