import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import logo from '../../logo.png'
import './css/LoginComponent.css'
import useCustomLogin from '../../hooks/useCustomLogin'
import ResultModal from '../common/ResultModal'
import KakaoLoginComponent from './KakaoLoginComponent'
import { useNavigate } from 'react-router-dom'

const initState = {
    email: '',
    pw: ''
}

export default function LoginComponent() {
    const [loginParam, setLoginParam] = useState({...initState})
 
    const {doLogin, moveToPath} = useCustomLogin()

    const [result, setResult] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value
        setLoginParam({...loginParam})
    }

    const handleClickLogin = (e) => {
        doLogin(loginParam).then(data => {
            if(data.error) {
                setResult(true)
            } else {
                moveToPath("/")
            }
        })
    }

    const closeModal = () => {
      setResult(false)
    }

  return (
    <div className="sign-in__wrapper">
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded">
        <img
          className="img-thumbnail mx-auto d-block mb-3"
          src={logo}
          alt="logo"
        />
        <Form.Group className="mb-2" controlId="username">
            <Form.Label>이메일</Form.Label>
            <Form.Control
                onChange={handleChange}
                value={loginParam.email}
                name='email'
                type="text"
                placeholder="이메일을 입력해주세요"
                required
            />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label className='form_label'>비밀번호</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={loginParam.pw}
            name='pw'
            type="password"
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </Form.Group>
        <Button className="w-100" style={{backgroundColor:'#6667AB', border:'1px solid #6667AB'}} onClick={handleClickLogin}>
            로그인
        </Button>

        <KakaoLoginComponent />
        
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted"
            variant="link"
            onClick={() => navigate("../register")}
          >
            회원가입
          </Button>
        </div>
      </Form>

      {result ?
        <ResultModal
          callbackFn={closeModal}
          title={'로그인 정보'}
          content={'아이디 또는 비밀번호를 확인해주세요!'}
          show_modal={true}
        />
        :
        <></>
      }
    </div>
  )
}
