import React, { useRef, useState } from 'react'
import { Alert, Button, Col, Fade, Form, Row } from 'react-bootstrap'
import useCustomLogin from '../../hooks/useCustomLogin'
import ResultModal from '../common/ResultModal'
import { checkEmail, checkNickname, registerMember, sendEmail, validateNumberCheck } from '../../api/MemberApi'
import AddressModal from './AddressModal'
import ResultOverlay from '../common/ResultOverlay'

const initState = {
    email: '',
    pw: '',
    nickname: '',
    zipcode: '',
    streetAddress: '',
    detailAddress: ''
}

export default function RegisterComponent() {
    const [member, setMember] = useState(initState)

    const [result, setResult] = useState(null)

    const [showAddress, setShowAddress] = useState(false)

    const [showAlertMessage, setShowAlertMessage] = useState('')

    const [validateEmail, setValidateEmail] = useState(false)

    const [emailIsValidated, setEmailIsValidated] = useState(false);

    const [validateNumberEmail, setValidateNumberEmail] = useState('');

    const [isReadable, setIsReadable] = useState(false)

    const targetEmail = useRef(null);

    const targetNickname = useRef(null);

    const targetValidateNumber = useRef(null);

    const [showEmail, setShowEmail] = useState(false);
    const [showNickname, setShowNickname] = useState(false);
    const [showValidateEmail, setShowValidateEmail] = useState(false);

    const [message, setMessage] = useState('')

    const {moveToLogin} = useCustomLogin()

    const handleChange = (e) => {
        member[e.target.name] = e.target.value

        setMember({...member})
    }

    const handleChangeNumber = (e) => {
        setValidateNumberEmail(e.target.value)
    }

    const handleClickValidateEmail = () => {
        setShowValidateEmail(true)
        validateNumberCheck(validateNumberEmail).then(result => {
            setMessage('인증되었습니다')
            setEmailIsValidated(true)
            setIsReadable(true)
        }).catch(err => {
            setMessage(err.response.data.ERROR)
        })

        setTimeout(function() {
            setShowValidateEmail(false)
        }, 2000);
    }

    const closeModal = () => {
        setResult(null)
        moveToLogin()
    }

    const handleClickRegister = () => {
        if(emailIsValidated) {
            registerMember(member).then(result => {
                setResult('회원가입')
            }).catch(err => {
                setShowAlertMessage(err.response.data.ERROR)
            })
        } else {
            setShowAlertMessage('이메일이 인증되지 않았습니다')
        }
    }

    const handleCheckEmail = () => {
        setShowEmail(true)

        checkEmail(member.email).then(res => {
            if(res) {
                setMessage('사용할 수 없는 이메일입니다')
            } else {
                setValidateEmail(true)
                
                sendEmail(member.email)

                setMessage('사용 가능한 이메일입니다')
            }
        })

        setTimeout(function() {
            setShowEmail(false)
        }, 2000);
        
    }

    const handleCheckNickname = () => {
        setShowNickname(true)

        checkNickname(member.nickname).then(res => {
            if(res) {
                setMessage('사용할 수 없는 닉네임입니다')
            } else {
                setMessage('사용 가능한 닉네임입니다')
            }
        })

        setTimeout(function() {
            setShowNickname(false)
        }, 2000);
        
    }

    const handleAddress = () => {
        setShowAddress(true)
    }

    const completeModal = (zipcode, streetAddress) => {
        setMember({...member, 'zipcode':zipcode, 'streetAddress':streetAddress})
    }

  return (
    <div className='form_group' style={{width:'55%', marginLeft:'25%', marginTop:'10%'}}>
        <h2 style={{marginBottom:'10%'}}>회원 가입</h2>
        <Form.Group as={Row} className='mb-3' >
            <Form.Label className='form_label' column sm="2">이메일</Form.Label>

            <Col sm="10" style={{display:'flex'}}>
                <Form.Control 
                    className='form_control' 
                    type="text" 
                    name='email' 
                    onChange={handleChange} 
                    value={member.email}
                    disabled={isReadable ? true : false}
                />
                <Button 
                    id='targetEmail' 
                    onClick={handleCheckEmail} 
                    ref={targetEmail} 
                    style={{width:'30%', marginLeft:'5%', backgroundColor:'#6667AB', border:'#6667AB'}}
                    disabled={isReadable ? true : false}
                >
                    중복 확인
                </Button>
                <ResultOverlay target={targetEmail} show={showEmail} message={message} />
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
                                    style={{width:'15%', marginLeft:'5%', backgroundColor:'#6667AB', border:'#6667AB'}}
                                    onClick={handleClickValidateEmail}
                                    ref={targetValidateNumber}
                                    disabled={isReadable ? true : false}
                                >
                                    인증
                                </Button>
                                <ResultOverlay target={targetValidateNumber} show={showValidateEmail} message={message} />
                            </div>
                            :
                            <></>
                        }
                </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' >
            <Form.Label className='form_label' column sm="2">닉네임</Form.Label>

            <Col sm="10" style={{display:'flex'}}>
                <Form.Control className='form_control' type="text" name='nickname' onChange={handleChange} value={member.nickname} />
                <Button id='targetNickname' ref={targetNickname} onClick={handleCheckNickname} style={{width:'30%', marginLeft:'5%', backgroundColor:'#6667AB', border:'#6667AB'}}>중복 확인</Button>
                <ResultOverlay target={targetNickname} show={showNickname} message={message} />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
            <Form.Label className='form_label' column sm="2">비밀번호</Form.Label>

            <Col sm="10" style={{width:'62%'}}>
                <Form.Control className='form_control' type="password" name='pw' onChange={handleChange} value={member.pw} />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
            <Form.Label className='form_label' column sm="2">주소</Form.Label>

            <Col sm="10">
                <div style={{display:'flex'}}>
                    <Form.Control style={{width:'22%', marginBottom:'2%', marginRight:'2%'}} className='form_control' type="text" name='zipcode' value={member.zipcode} readOnly/>
                    <Button onClick={handleAddress} style={{height:'40px', backgroundColor:'#6667AB', border:'#6667AB'}}>주소 검색</Button>
                </div>
                <Form.Control style={{width:'73%', marginBottom:'2%'}} className='form_control' type="text" name='streetAddress' value={member.streetAddress} readOnly/>
                <Form.Control style={{width:'73%', marginBottom:'2%'}} className='form_control' type="text" name='detailAddress' onChange={handleChange} value={member.detailAddress} />
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

        {showAlertMessage ?
            <Alert variant={'danger'} transition={Fade}>
                {showAlertMessage}
            </Alert>
            :
            <></>
        }

        {showAddress ?
            <AddressModal show_modal={showAddress} callbackFn={completeModal}/>
            :
            <></>
        }

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
