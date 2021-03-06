import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import sizeMe from 'react-sizeme';
import PropTypes from "prop-types";

// oldsrc url decoded is:
//
// data:image/svg xml;charset=UTF-8,<svg width="800" height="400" 
// xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" 
// preserveAspectRatio="none"><defs><style type="text/css">#holder_15ba800aa1d 
// text { fill:#555;font-weight:normal;font-family:Helvetica, monospace;font-size:40pt }
// </style></defs><g id="holder_15ba800aa1d"><rect width="800" height="400" 
// fill="#777"></rect><g><text x="285.921875" y="218.3">First slide</text></g></g></svg>

const items = [
  {
    oldsrc: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    src:'https://unsplash.it/800/400',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    oldsrc: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    src:'https://unsplash.it/800/401',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    oldsrc: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    src:'https://unsplash.it/800/402',
    altText: 'Slide 3',
    caption: 'Slide 3'
  },
  {
    src: 'https://unsplash.it/800/403',
    altText: 'Slide 4',
    caption: 'Slide 4'
  },
  {
    src: 'https://unsplash.it/800/404',
    altText: 'Slide 5',
    caption: 'Slide 5'
  }
];


const MyCarousel = (props) => {


  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // useEffect(() => {
  //   const canvas = this.refs.canvas
  //   const ctx = canvas.getContext("2d")
  //   const img = this.refs.image

  //   img.onload = () => {
  //     ctx.drawImage(img, 0, 0)
  //     ctx.font = "40px Courier"
  //     ctx.fillText(this.props.text, 210, 75)
  //   }

  // },[]);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  const { width, height } = props.size;
  console.log('size', width, height);

  // var width='100%';
  // var height='100%';
  var color1='#1229b0';
  var color2='#c03c3c';
  var color3='#1a7e4c';
 
  return (
    <>
    <Carousel
      ride='carousel'
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>

    <div>
      <svg width={width} height={height} className='chart'>
      <filter id="blurMe">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
      </filter>
      <defs>
        <linearGradient id="MyGradient">
          <stop offset="5%" stopColor="#A8F" />
          <stop offset="95%" stopColor="#eeebeb" />
        </linearGradient>
      </defs>
      {/* <!-- The rectangle is filled using a linear-gradient paint server --> */}
      <rect fill="url(#MyGradient)"
        stroke="black"
        strokeWidth="0"
        x="0" y="0" width={width} height={height}/>

        <circle cx={30} cy={80} r={25} fill={color1} filter="url(#blurMe)" />
        <circle cx={130} cy={80} r={60} fill={color2} filter="url(#blurMe)" />
        <circle cx={260} cy={80} r={40} fill={color3} filter="url(#blurMe)" />
      </svg>
    </div>
    </>
  );
}
MyCarousel.propTypes = {
  size:{
    width: PropTypes.number,
    height: PropTypes.number
  }
};

export default sizeMe({ monitorHeight: true })(MyCarousel);