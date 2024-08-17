import React from 'react'
import { API_SERVER_HOST } from '../../api/MemberApi'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './css/TodayProductComponent.css'
import useCustomMove from '../../hooks/useCustomMove';

export default function TodayProductComponent({product}) {
  const host = API_SERVER_HOST

  const {moveToRead} = useCustomMove()

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipe: false
  };

  return (
    <div>
        <div style={{marginTop:'20px'}}>
          {product.length === 0 ? 
            <div style={{border:'1px solid lightgray', margin:'20px 10px', padding:'90px', textAlign:'center'}}>오늘 추가된 상품이 없습니다!</div> 
            :
            <div className="slider-container" style={{marginBottom:'30px'}}>
              <Slider {...settings}>
                {product.map(prd => {
                  return (
                    <div key={prd.pno} className='h-[300px] cursor-pointer' onClick={() => moveToRead(prd.pno)}>
                      <div className='h-46 flex justify-center items-center '>
                        <img src={`${host}/api/products/view/Thumb_${prd.uploadedFileNames[0]}`} alt="product_image" className='h-44 w-33 rounded' />
                      </div>

                      <div className='flex flex-col items-center justify-center gap-1 p-4'>
                        <p className='text-xl font-semibold'>{prd.pname}</p>
                        <p className='text-center'>{prd.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          }
        </div>
    </div>
  )
}
