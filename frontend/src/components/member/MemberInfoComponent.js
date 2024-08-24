import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { addProfileImage, API_SERVER_HOST, getMemberInfo } from '../../api/MemberApi'
import { Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCartShopping, faStore, faUserGear } from '@fortawesome/free-solid-svg-icons'
import useCustomLogin from '../../hooks/useCustomLogin'
import useCustomMove from '../../hooks/useCustomMove'

const host = API_SERVER_HOST

const initState = {
    email : '',
    nickname: '',
    streetAddress : '',
    detailAddress : '',
    file : ''
}

export default function MemberInfoComponent() {
    const loginState = useSelector(state => state.loginSlice)

    const [member, setMember] = useState(initState)

    const {moveToPath} = useCustomLogin()

    const uploadRef = useRef()

    const [uploaded, setUploaded] = useState(false)

    const {moveToSales} = useCustomMove()

    useEffect(() => {
        getMemberInfo(loginState.email).then(res => {
            setMember(res)
        })
    }, [loginState.email, uploaded])

    const handleClickAddProfile = (e) => {
        const file = uploadRef.current.files[0]

        addProfileImage(loginState.email, file).then(res => {
            setUploaded(!uploaded)
        })
    }

  return (
    <div>
        <Image 
            src={`${host}/api/member/view/${member.file}`}
            alt='profile_image'
            rounded='true'
            style={{width:'230px', marginLeft:'35%'}}
        />
        <div style={{fontWeight:'bold', fontSize:'33px', marginTop:'1%', marginLeft:"43%"}}>
            {member.nickname}
        </div>

        <div style={{display:'flex', marginLeft:'43.5%', marginTop:'1%'}}>
            <FontAwesomeIcon icon={faUserGear} className='fa-lg' onClick={() => moveToPath("/member/modify")} style={{marginRight:'3%', cursor:'pointer'}} />
            <div onChange={handleClickAddProfile}>
                <label htmlFor='file-input'>
                    <FontAwesomeIcon icon={faCamera} className='fa-lg' style={{cursor:'pointer'}} />
                </label>

                <input id="file-input" ref={uploadRef} type='file' style={{display:'none'}} />
            </div>
            
        </div>

        <div>
            <div style={{display:'flex', marginLeft:'39%', marginTop:'7%'}}>
                <FontAwesomeIcon icon={faCartShopping} className='fa-2x' style={{color: "#6667AB", marginRight:'12%', cursor:'pointer'}} />
                <FontAwesomeIcon icon={faStore} style={{color: "#6667AB", cursor:'pointer'}} className='fa-2x' onClick={moveToSales} />
            </div>
            <div style={{display:'flex', marginLeft:'37%', marginTop:'1%'}}>
                <p style={{marginRight:'7%'}}>구매 상품</p>
                <p>판매 상품</p>
            </div>
        </div>

        <div style={{borderBottom:'1px solid lightgray', width:'370px', marginLeft:'28%', marginTop:'3%', marginBottom:'3%'}}></div>

        <div>
            <p style={{marginLeft:'41%', fontWeight:'bold', fontSize:'25px'}}>찜한 상품</p>
        </div>
    </div>
  )
}
