import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import useCustomLogin from '../../hooks/useCustomLogin'
import ResultModal from '../common/ResultModal'
import { registerMember } from '../../api/MemberApi'

const initState = {
    email: '',
    pw: '',
    nickname: ''
}

export default function RegisterComponent() {
    const [member, setMember] = useState(initState)

    const [result, setResult] = useState(null)

    const {moveToLogin} = useCustomLogin()

    const handleChange = (e) => {
        member[e.target.name] = e.target.value

        setMember({...member})
    }

    const closeModal = () => {
        setResult(null)
        moveToLogin()
    }

    const handleClickRegister = () => {
        registerMember(member).then(result => {
            setResult('회원가입')
        })
    }

  return (
    <div className='form_group' style={{width:'60%', marginLeft:'25%', marginTop:'10%'}}>
        <h2 style={{marginBottom:'10%'}}>회원 가입</h2>
        <Form.Group as={Row} className='mb-3' >
            <Form.Label className='form_label' column sm="2">이메일</Form.Label>

            <Col sm="10">
                <Form.Control className='form_control' type="text" name='email' onChange={handleChange} value={member.email} />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' >
            <Form.Label className='form_label' column sm="2">닉네임</Form.Label>

            <Col sm="10">
                <Form.Control className='form_control' type="text" name='nickname' onChange={handleChange} value={member.nickname} />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
            <Form.Label className='form_label' column sm="2">비밀번호</Form.Label>

            <Col sm="10">
                <Form.Control className='form_control' type="password" name='pw' onChange={handleChange} value={member.pw} />
            </Col>
        </Form.Group>

    

        <div style={{textAlign:'right', marginRight:'5%', marginBottom:'5%'}}>
            <Button

                style={
                    {backgroundColor:'#6667AB', border:'white', color:'white'}
                }
                onClick={handleClickRegister}
            >
                등록
            </Button>
        </div>

        {result ?
            <ResultModal
                callbackFn={closeModal}
                title={`${result} 결과`}
                content={`${result} 되었습니다!`}
                show_modal={true}
            />
            :
            <></>
        }
    </div>
  )
}
