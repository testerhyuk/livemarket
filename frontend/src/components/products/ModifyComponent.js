import React, { useEffect, useRef, useState } from 'react'
import { API_SERVER_HOST, deleteOne, getOne, putOne } from '../../api/ProductsApi'
import useCustomMove from '../../hooks/useCustomMove'
import { Button, CloseButton, Col, Form, Image, Row } from 'react-bootstrap'
import FetchingModal from '../common/FetchingModal'
import ResultModal from '../common/ResultModal'
import './css/ModifyComponent.css'

const initState = {
    pno: 0,
	pname: '',
	pdesc: '',
	price: 0,
    category: '',
	uploadedFileNames: []
}

const host = API_SERVER_HOST

export default function ModifyComponent({pno}) {
    const [product, setProduct] = useState(initState)

    const [fetching, setFetching] = useState(false)

    const [result, setResult] = useState(null)

    const uploadRef = useRef()

    const {moveToRead, moveToList} = useCustomMove()

    const category = ['음식', '의류', '가전제품', '신발', '기타 상품']

    useEffect(() => {
        setFetching(true)
        
        getOne(pno).then(data => {
            setFetching(false)
            setProduct(data)
        })
    }, [pno])

    const handleChangeProduct = (e) => {
		product[e.target.name] = e.target.value
		setProduct({...product})
	}

    const deleteOldImages = (imageName) => {
        const resultFileNames = product.uploadedFileNames.filter(fileName => fileName !== imageName)

        product.uploadedFileNames = resultFileNames

        setProduct({...product})
    }

    const handleClickModify = () => {
        const files = uploadRef.current.files

        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
			formData.append("files", files[i]);
		}

        formData.append("pname", product.pname)
		formData.append("pdesc", product.pdesc)
		formData.append("price", product.price)
        formData.append("category", product.category)

        for( let i = 0; i < product.uploadedFileNames.length ; i++){
			formData.append("uploadFileNames", product.uploadedFileNames[i])
		}

        setFetching(true)

        putOne(pno, formData).then(data => {
            setResult('수정')
            setFetching(false)
        })
    }

    const handleClickDelete = () => {
        setFetching(true)

        if(window.confirm('정말 삭제하시겠습니까?')) {
            deleteOne(pno).then(data => {
                setResult('삭제')
                setFetching(false)
            })
        }
    }

    const closeModal = () => {
        if (result === '수정') {
            moveToRead(pno)
        } else if(result === '삭제') {
            moveToList({page:1})
        }

        setResult(null)
    }

    const handleNumberOnly = (e) => {
        const input = e.target
        input.value = input.value.replace(/[^0-9]/g, '');
    }

  return (
    <div className='form_group'>
        <Form.Group as={Row} className='mb-3' >
            <Form.Label className='form_label' column sm="2">상품 이름</Form.Label>

            <Col sm="10">
                <Form.Control className='form_control' type="text" name='pname' onChange={handleChangeProduct} value={product.pname} />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
            <Form.Label className='form_label' column sm="2">상품 설명</Form.Label>
            <Form.Control className='form_textarea' as="textarea" rows={5} name='pdesc' onChange={handleChangeProduct} value={product.pdesc} />
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
            <Form.Label className='form_label' column sm="2">상품 가격</Form.Label>

            <Col sm="10">
                <Form.Control className='form_control' type="text" name='price' onKeyUp={handleNumberOnly} onChange={handleChangeProduct} value={product.price} />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
            <Form.Label className='form_label' column sm="2">카테고리 선택</Form.Label>
            
            <Col sm="10">
                <Form.Select name='category' className='form_control' onChange={handleChangeProduct} value={product.category}>
                    <option>카테고리 선택</option>
                    <option value="0">{category[0]}</option>
                    <option value="1">{category[1]}</option>
                    <option value="2">{category[2]}</option>
                    <option value="3">{category[3]}</option>
                    <option value="4">{category[4]}</option>
                </Form.Select>
            </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formFile" className="mb-3">
            <Form.Label className='form_label' column sm="2">상품 이미지</Form.Label>

            <Col sm="10">
                <Form.Control className='form_control' type="file" ref={uploadRef} multiple={true} />
            </Col>
        </Form.Group>

        <div style={{marginTop:'5%'}}>
            {product.uploadedFileNames.map((imgFile, i) =>
                <div key={i} style={{marginLeft:'17%'}}>
                    <CloseButton onClick={() => deleteOldImages(imgFile)} />
                    <Image 
                        src={`${host}/api/products/view/${imgFile}`} 
                        alt='product_image' 
                        width='60%' 
                        rounded='true'
                        style={{display:'block', marginLeft:'5%', marginBottom:'5%'}}
                    />
                </div>
            )}
        </div>

        <div style={{textAlign:'right', marginRight:'5%', marginBottom:'5%'}}>
            <Button 
                style={
                    {backgroundColor:'#6667AB', border:'white', color:'white'}
                }
                onClick={handleClickModify}
            >
                수정
            </Button>

            <Button 
                style={
                    {backgroundColor:'#6667AB', border:'white', color:'white', marginLeft:'2%'}
                }
                onClick={handleClickDelete}
            >
                삭제
            </Button>

            <Button 
                    style={{backgroundColor:'#6667AB', border:'white', color:'white', marginLeft:'2%'}}
                    onClick={() => moveToList()}
                >
                    목록
            </Button>
        </div>
            

        {fetching ? <FetchingModal show_modal={true} /> : <></>}

        {result ?
            <ResultModal
                callbackFn={closeModal}
                title={`상품 ${result} 결과`}
                content={`상품이 정상적으로 ${result}되었습니다!`}
                show_modal={true}
            />
            :
            <></>
        }
    </div>
  )
}
