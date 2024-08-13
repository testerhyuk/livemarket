import React, { useEffect, useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove'
import { API_SERVER_HOST, getOne } from '../../api/ProductsApi'
import FetchingModal from '../common/FetchingModal'
import { Badge, Button, Image } from 'react-bootstrap'

const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    uploadedFileNames: []
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
                <div style={{marginRight:'25%'}}>아이디(지역)</div>
                <div>랭크</div>
            </div>

            <div style={{textAlign:'center', marginRight:'35%'}}>
                <div
                    style={{
                        fontWeight:'bold',
                        fontSize:'25px'
                    }}
                >
                    {product.pname}
                </div>
                <div style={{display:'flex', justifyContent:'center'}}>
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
                    margin:'5% 43%',
                    width:'300px'
                }}></div>
                
                <div style={{marginLeft:'7%', marginBottom:'5%'}}>
                    <div
                        style={{
                            fontWeight:'bold',
                            fontSize:'20px',
                            marginBottom:'5%'
                        }}
                    >
                        판매가 : {product.price}
                    </div>
                    <div
                        style={{marginRight:'15%', fontSize:'13px'}}
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
            <Button 
                style={{backgroundColor:'#6667AB', border:'white', color:'white', marginRight:'1%'}}
                onClick={() => moveToModify(pno)}
            >
                상품 수정
            </Button>

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
