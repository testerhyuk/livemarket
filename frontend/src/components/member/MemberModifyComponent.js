import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Col, Fade, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ResultModal from '../common/ResultModal'
import useCustomLogin from '../../hooks/useCustomLogin'
import { checkEmail, checkNickname, modifyMember, sendEmail } from '../../api/MemberApi'
import { logout } from '../../slices/loginSlice'
import ResultOverlay from '../common/ResultOverlay'
import AddressModal from './AddressModal'
import useCustomMove from '../../hooks/useCustomMove'

const initState = {
    email: '',
    pw: '',
    nickname: '',
    zipcode: '',
    streetAddress: '',
    detailAddress: '',
}

const initStateCheckPassword = {
    check_pw: ''
}

export default function MemberModifyComponent() {
    const loginInfo = useSelector(state => state.loginSlice)

    const [member, setMember] = useState(initState)

    const [checkPassword, setCheckPassword] = useState(initStateCheckPassword)

    const [result, setResult] = useState(null)

    const [showAddress, setShowAddress] = useState(false)

    const {moveToLogin} = useCustomLogin()

    const {moveToDeleteAccount, moveToAccountLinking} = useCustomMove()

    const dispatch = useDispatch()

    const targetNickname = useRef(null);

    const [showAlertMessage, setShowAlertMessage] = useState('')

    const [showNickname, setShowNickname] = useState(false);

    const [message, setMessage] = useState('')

    const [showEmail, setShowEmail] = useState(false);

    const targetEmail = useRef(null);

    const [isReadable, setIsReadable] = useState(false)

    const [validateEmail, setValidateEmail] = useState(false)

    let change = false;

    console.log(loginInfo)

    useEffect(() => {
        setMember({...loginInfo, pw:'change password'})
    }, [loginInfo])

    const handleChange = (e) => {
        member[e.target.name] = e.target.value

        setMember({...member})
    }

    const handleChangeCheckPassword = (e) => {
        checkPassword[e.target.name] = e.target.value

        setCheckPassword({...checkPassword})
    }

    const handleClickModify = () => {
        if(loginInfo.nickname !== member.nickname) {
            change = true
        }

        if(!member.streetAddress) {
            setShowAlertMessage('주소를 입력해주세요')
        } else if(!member.detailAddress) {
            setShowAlertMessage('상세 주소를 입력해주세요')
        } else if(checkPassword.check_pw !== member.pw) {
            setShowAlertMessage('비밀번호와 비밀번호 확인값이 다릅니다. 확인해주세요.')
        } else {
            modifyMember(member, change).then(result => {
                setResult('수정')
            }).catch(err => {
                setShowAlertMessage(err.response.data.ERROR)
            })
        }
    }

    const closeModal = () => {
        setResult(null)
        dispatch(logout())
        moveToLogin()
    }

    const handleAddress = () => {
        setShowAddress(true)
    }

    const completeModal = (zipcode, streetAddress) => {
        setMember({...member, 'zipcode':zipcode, 'streetAddress':streetAddress})
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

    const handleCheckEmail = () => {
        setShowEmail(true)

        checkEmail(member.email).then(res => {
            if(res) {
                if(loginInfo.social) {
                    setResult('이미 가입된 이메일입니다. 계정 연동 페이지로 이동합니다.')
                    moveToAccountLinking()
                } else {
                    setMessage('사용할 수 없는 이메일입니다')
                }
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

  return (
    <div className='form_group' style={{width:'60%', marginLeft:'25%', marginTop:'10%'}}>
        <h2 style={{marginBottom:'10%'}}>회원 정보 수정</h2>
        <Form.Group as={Row} className='mb-3' >
            <Form.Label className='form_label' column sm="2">이메일</Form.Label>

            <Col sm="10" style={{display:'flex'}}>
                <Form.Control 
                    className='form_control' 
                    type="text" 
                    name='email' 
                    onChange={handleChange} 
                    value={member.email}
                    disabled={loginInfo.social ? false : true}
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

            <Col sm="10">
                <Form.Control className='form_control' type="password" name='pw' onChange={handleChange} value={member.pw} />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
            <Form.Label className='form_label' column sm="2">비밀번호 확인</Form.Label>

            <Col sm="10">
                <Form.Control className='form_control' type="password" name='check_pw' onChange={handleChangeCheckPassword} value={checkPassword.check_pw || ''} />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
            <Form.Label className='form_label' column sm="2">주소</Form.Label>

            <Col sm="10">
                <div style={{display:'flex'}}>
                    <Form.Control style={{width:'22%', marginBottom:'2%', marginRight:'2%'}} className='form_control' type="text" name='zipcode' value={member.zipcode || ''} readOnly/>
                    <Button onClick={handleAddress} style={{height:'40px', backgroundColor:'#6667AB', border:'#6667AB'}}>주소 검색</Button>
                </div>
                <Form.Control style={{width:'73%', marginBottom:'2%'}} className='form_control' type="text" name='streetAddress' value={member.streetAddress || ''} readOnly/>
                <Form.Control style={{width:'73%', marginBottom:'2%'}} className='form_control' type="text" name='detailAddress' onChange={handleChange} value={member.detailAddress || ''} />
            </Col>
        </Form.Group>
    

        <div style={{textAlign:'right', marginBottom:'5%'}}>
            <Button
                style={
                    {backgroundColor:'#6667AB', border:'white', color:'white'}
                }
                onClick={handleClickModify}
            >
                수정
            </Button>
            {loginInfo.social ?
                <></>
                :
                <Button
                    style={
                        {backgroundColor:'#6667AB', border:'white', color:'white', marginLeft:'2%'}
                    }
                    onClick={moveToDeleteAccount}
                >
                    회원 탈퇴
                </Button>
            }
        </div>

        {showAddress ?
            <AddressModal show_modal={showAddress} callbackFn={completeModal}/>
            :
            <></>
        }

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
