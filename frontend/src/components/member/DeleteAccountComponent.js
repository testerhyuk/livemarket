import React, { useRef, useState } from 'react'
import { Alert, Button, Col, Fade, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMember, sendEmail, validateNumberCheck } from '../../api/MemberApi'
import { logout } from '../../slices/loginSlice'
import useCustomLogin from '../../hooks/useCustomLogin'
import ResultModal from '../common/ResultModal'

const initState = {
    email: ''
}

export default function DeleteAccountComponent() {
    const loginState = useSelector(state => state.loginSlice)
    const [checkEmail, setChckEmail] = useState(initState)
    const dispatch = useDispatch()
    const [isReadable, setIsReadable] = useState(false)
    const [result, setResult] = useState(null)
    const {moveToLogin} = useCustomLogin()
    const [showAlertMessage, setShowAlertMessage] = useState('')
    const [validateNumberEmail, setValidateNumberEmail] = useState('');
    const targetValidateNumber = useRef(null);
    const [emailIsValidated, setEmailIsValidated] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false)
    const targetEmail = useRef(null);

    const handleChange = (e) => {
        checkEmail[e.target.name] = e.target.value

        setChckEmail({...checkEmail})
    }

    const handleClickValidateEmail = () => {
        validateNumberCheck(validateNumberEmail).then(result => {
            setShowAlertMessage('인증되었습니다')
            setEmailIsValidated(true)
            setIsReadable(true)
        }).catch(err => {
            setShowAlertMessage(err.response.data.ERROR)
        })
    }

    const handleChangeNumber = (e) => {
        setValidateNumberEmail(e.target.value)
    }

    const handleClickDeleteAccount = () => {
        if(loginState.email !== checkEmail.email) {
            setShowAlertMessage('이메일이 다릅니다. 확인해주세요.')
        } else if(loginState.email === checkEmail.email && emailIsValidated) {
            deleteMember(loginState.email).then(res => {
                setResult(res.RESULT)
            }).catch(err => {
                setShowAlertMessage(err)
            })
        }
    }

    const handleCheckEmail = () => {
        if(loginState.email !== checkEmail.email) {
            setShowAlertMessage('회원님의 이메일이 아닙니다')
        } else {
            setValidateEmail(true)
            sendEmail(checkEmail.email)
        }
        
    }

    const closeModal = () => {
        setResult(null)
        dispatch(logout())
        moveToLogin()
    }

  return (
    <div style={{width:'55%', marginLeft:'25%', marginTop:'10%'}}>
        <Form.Group as={Row} className='mb-3' >
            <Form.Label className='form_label' column sm="2">이메일</Form.Label>

            <Col sm="10" style={{display:'flex'}}>
                <Form.Control 
                    className='form_control' 
                    type="text" 
                    name='email' 
                    onChange={handleChange} 
                    value={checkEmail.email}
                    disabled={isReadable ? true : false}
                />
                 <Button 
                    id='targetEmail' 
                    onClick={handleCheckEmail} 
                    ref={targetEmail} 
                    style={{width:'30%', marginLeft:'5%', backgroundColor:'#6667AB', border:'#6667AB'}}
                    disabled={isReadable ? true : false}
                >
                    인증
                </Button>
            </Col>
        </Form.Group>
        <Form.Group>
            <Col>
                    {validateEmail ?
                            <div style={{display:'flex', marginBottom:'2%'}}>
                                <Form.Control 
                                    style={{width:'30%', marginLeft:'17.5%'}} 
                                    className='form_control' 
                                    type="text" 
                                    name='validateNumber'
                                    onChange={handleChangeNumber}
                                    value={validateNumberEmail.validateNumber}
                                    disabled={isReadable ? true : false}
                                />
                                <Button 
                                    style={{width:'18%', marginLeft:'5%', backgroundColor:'#6667AB', border:'#6667AB'}}
                                    onClick={handleClickValidateEmail}
                                    ref={targetValidateNumber}
                                    disabled={isReadable ? true : false}
                                >
                                    인증 확인
                                </Button>
                            </div>
                            :
                            <></>
                        }
                </Col>
        </Form.Group>

        <div style={{textAlign:'right', marginBottom:'5%', marginTop:'10%'}}>
            <Button
                style={
                    {backgroundColor:'#6667AB', border:'white', color:'white', marginRight:'1%'}
                }
                onClick={handleClickDeleteAccount}
            >
                회원 탈퇴
            </Button>
        </div>

        {showAlertMessage ?
            <Alert variant={'danger'} transition={Fade}>
                {showAlertMessage}
            </Alert>
            :
            <></>
        }

        {result ?
            <ResultModal
                callbackFn={closeModal}
                title={`${result} 결과`}
                content={`정상적으로 ${result}되었습니다!`}
                show_modal={true}
            />
            :
            <></>
        }
    </div>
  )
}
