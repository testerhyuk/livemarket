import React, { useEffect, useState } from 'react'
import banner1 from '../../pictures/banner1.png'
import banner2 from '../../pictures/banner2.png'
import banner3 from '../../pictures/banner3.png'
import './css/Banner.css'

export default function Banner() {
    const images = [banner1, banner2, banner3]
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalTime = 3000;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % images.length);
        }, intervalTime);

        return () => clearInterval(intervalId);
    }, [currentIndex, images.length, intervalTime]);

  return (
    <div className='banner'>
        <img src={images[currentIndex]} alt={`banner${currentIndex}`} />
        <div className='division-line'></div>
    </div>
  )
}
