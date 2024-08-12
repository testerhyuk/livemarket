import React, { useState } from 'react'
import banner1 from '../../pictures/banner1.png'
import banner2 from '../../pictures/banner2.png'
import banner3 from '../../pictures/banner3.png'
import './css/Banner.css'
import { Carousel } from 'react-bootstrap'

export default function Banner() {
    const images = [banner1, banner2, banner3]

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };

  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img className='banner_image' src={images[0]} alt={`banner${0}`} />
        </Carousel.Item>
        <Carousel.Item>
          <img className='banner_image' src={images[1]} alt={`banner${1}`} />
        </Carousel.Item>
        <Carousel.Item>
          <img className='banner_image' src={images[2]} alt={`banner${2}`} />
        </Carousel.Item>
      </Carousel>
      <div className='division-line'></div>
    </div>
  )
}
