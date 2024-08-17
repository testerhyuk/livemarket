import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ResultModal from '../common/ResultModal'
import useCustomLogin from '../../hooks/useCustomLogin'
import { modifyMember } from '../../api/MemberApi'
import { logout } from '../../slices/loginSlice'

const initState = {
    email: '',
    pw: '',
    nickname: ''
}

export default function MemberModifyComponent() {
    const loginInfo = useSelector(state => state.loginSlice)

    const [member, setMember] = useState(initState)

    const [result, setResult] = useState(null)

    const {moveToLogin} = useCustomLogin()

    const dispatch = useDispatch()

    useEffect(() => {
        setMember({...loginInfo, pw:'change password'})
    }, [loginInfo])

    const handleChange = (e) => {
        member[e.target.name] = e.target.value

        setMember({...member})
    }

    const handleClickModify = () => {
        modifyMember(member).then(result => {
            setResult('수정')
        })
    }

    const closeModal = () => {
        setResult(null)
        dispatch(logout())
        moveToLogin()
    }

  return (
    <div className='form_group' style={{width:'60%', marginLeft:'25%', marginTop:'10%'}}>
        <h2 style={{marginBottom:'10%'}}>회원 정보 수정</h2>
        <Form.Group as={Row} className='mb-3' >
            <Form.Label className='form_label' column sm="2">이메일</Form.Label>

            <Col sm="10">
                <Form.Control className='form_control' type="text" name='email' onChange={handleChange} value={member.email} readOnly disabled />
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
                onClick={handleClickModify}
            >
                수정
            </Button>
        </div>

        {result ?
            <ResultModal
                callbackFn={closeModal}
                title={`회원 정보 ${result} 결과`}
                content={`회원 정보가 정상적으로 ${result}되었습니다!`}
                show_modal={true}
            />
            :
            <></>
        }
    </div>
  )
}
