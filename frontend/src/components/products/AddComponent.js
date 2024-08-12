import React, { useRef, useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove';
import { postAdd } from '../../api/ProductsApi';
import { Button, Col, Form, Row } from 'react-bootstrap';
import FetchingModal from '../common/FetchingModal';
import ResultModal from '../common/ResultModal';
import './css/AddComponent.css'

const initState = {
    pname: '',
    pdesc: '',
    price: 0,
    files: [],
    category: ''
}

export default function AddComponent(props) {
    const [product, setProduct] = useState(initState);

    const uploadRef = useRef();

    const [fetching, setFetching] = useState(false);

    const [result, setResult] = useState(false);

    const {moveToList} = useCustomMove()
    
    const category = ['음식', '의류', '가전제품', '신발', '기타 상품']

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
    }

    const handleClickAdd = (e) => {

        const formData = new FormData()

        const files = uploadRef.current.files

        for(let i = 0; i < files.length; i++) {
            formData.append("files", files[i])
        }

        formData.append("pname", product.pname)
		formData.append("pdesc", product.pdesc)
		formData.append("price", product.price)
        formData.append("category", product.category)

        setFetching(true)

        postAdd(formData).then(data => {
            sleep(3000)
            setFetching(false)
            setResult(data.RESULT)
        })
    }

    function sleep(ms) {
        const wakeUpTime = Date.now() + ms;
        while (Date.now() < wakeUpTime) {}
    }

    const closeModal = () => {
        setResult(null)
        moveToList()
    }

    const handleNumberOnly = (e) => {
        const input = e.target
        input.value = input.value.replace(/[^0-9]/g, '');
    }

  return (
    <div className='form_group'>
        <Form.Group as={Row} className='mb-3' onChange={handleChangeProduct} value={product.pname}>
            <Form.Label className='form_label' column sm="2">상품 이름</Form.Label>

            <Col sm="10">
                <Form.Control className='form_control' type="text" placeholder="상품명을 입력하세요" name='pname' />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' onChange={handleChangeProduct} value={product.pdesc}>
            <Form.Label className='form_label' column sm="2">상품 설명</Form.Label>
            <Form.Control className='form_textarea' as="textarea" rows={5} placeholder="상품명을 입력하세요" name='pdesc' />
        </Form.Group>

        <Form.Group as={Row} className='mb-3' onChange={handleChangeProduct} value={product.price}>
            <Form.Label className='form_label' column sm="2">상품 가격</Form.Label>

            <Col sm="10">
                <Form.Control className='form_control' type="text" placeholder="상품가격을 ',' 없이 숫자만 입력하세요" name='price' onKeyUp={handleNumberOnly} />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' onChange={handleChangeProduct} value={product.category}>
            <Form.Label className='form_label' column sm="2">카테고리 선택</Form.Label>
            
            <Col sm="10">
                <Form.Select name='category' className='form_control'>
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

        <Button 
            style={
                {backgroundColor:'#6667AB', border:'white', color:'white', marginLeft:'76%', marginTop:'3%'}
            }
            onClick={handleClickAdd}
        >
            상품 추가
        </Button>

        {fetching ? <FetchingModal show_modal={true} /> : <></>}

        {result ?
            <ResultModal
                callbackFn={closeModal}
                title={'상품 등록 결과'}
                content={'상품이 정상적으로 등록되었습니다!'}
                show_modal={true}
            />
            :
            <></>
        }
    </div>
  )
}

