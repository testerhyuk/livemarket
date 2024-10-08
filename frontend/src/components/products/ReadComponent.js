import React, { useEffect, useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove'
import { API_SERVER_HOST, getOne } from '../../api/ProductsApi'
import FetchingModal from '../common/FetchingModal'
import { Badge, Button, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    uploadedFileNames: [],
    user: '',
    nickname: '',
    city: ''
}

const productCategory = {
    0: '음식',
    1: '의류',
    2: '가전제품',
    3: '신발',
    4: '기타상품'
}

const host = API_SERVER_HOST

export default function ReadComponent({pno}) {
    const [product, setProduct] = useState(initState)

    const [fetching, setFetching] = useState(false)

    const {moveToModify, moveToList, page, size} = useCustomMove()

    const loginState = useSelector(state => state.loginSlice)

    useEffect(() => {
        setFetching(true)

        getOne(pno).then(data => {
            setFetching(false)
            setProduct(data)
        })
    }, [pno])

  return (
    <div style={{marginTop:'10%',}}>
        {fetching ? <FetchingModal /> : <></>}

        <div style={{marginLeft:'0%'}}>
            <div style={{display:'flex', justifyContent:'center', marginBottom:'3%'}}>
                <div style={{marginRight:'25%', fontWeight:'bold'}}>
                    {`${product.nickname}(${product.city.substring(0, 2)})`}
                </div>
                <div>랭크</div>
            </div>

            <div>
                <div
                    style={{
                        fontWeight:'bold',
                        fontSize:'25px',
                        marginLeft:'30%'
                    }}
                >
                    {product.pname}
                </div>
                <div style={{display:'flex', marginLeft:'30%'}}>
                    <Badge 
                        style={{
                            width:'60px', 
                            height:'25px', 
                            display:'flex', 
                            alignItems:'center', 
                            justifyContent:'center', 
                            color:'black',
                            border: '2px solid #6667AB',
                            borderRadius:'10px',
                            fontSize:'11px',
                            fontWeight:'lighter',
                            marginTop:'2%'
                        }} 
                        bg='white'>
                        #{productCategory[product.category]}
                    </Badge>
                </div>

                <div style={{
                    borderBottom:'1px solid lightgrey',
                    margin:'5% 0',
                    marginLeft:'30%',
                    width:'350px'
                }}></div>
                
                <div style={{marginBottom:'5%'}}>
                    <div
                        style={{
                            fontWeight:'bold',
                            fontSize:'20px',
                            marginBottom:'5%',
                            marginLeft:'30%'
                        }}
                    >
                        판매가 : {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                    </div>
                    <div
                        style={{fontSize:'14px', marginLeft:'30%'}}
                    >
                        {product.pdesc}
                    </div>
                </div>
            </div>
        </div>

        <div>
            {product.uploadedFileNames.map((imgFile, i) =>
                <Image 
                    src={`${host}/api/products/view/${imgFile}`} 
                    alt='product_image' 
                    key={i} width='60%' 
                    rounded='true'
                    style={{display:'block', marginLeft:'22%', marginRight:'auto', marginBottom:'5%'}}
                />
            )}
        </div>
        
        <div style={{textAlign:'right', marginRight:'5%', marginBottom:'5%'}}>
            {loginState.email === product.user ?
                <Button 
                style={{backgroundColor:'#6667AB', border:'white', color:'white', marginRight:'1%'}}
                onClick={() => moveToModify(pno)}
                >
                    상품 수정
                </Button>
                :
                <></>
            }

            <Button 
                style={{backgroundColor:'#6667AB', border:'white', color:'white'}}
                onClick={() => moveToList({page, size})}
            >
                목록
            </Button>
        </div>
    </div>
  )
}
