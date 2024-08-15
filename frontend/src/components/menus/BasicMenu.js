import { faBell, faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./css/BasicMenu.css"
import logo from '../../logo.png'
import { Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import useCustomLogin from '../../hooks/useCustomLogin'
import ResultModal from '../common/ResultModal'

export default function BasicMenu() {
    const loginState = useSelector(state => state.loginSlice)

    const {doLogout, moveToPath} = useCustomLogin()

    const [result, setResult] = useState(false)

    const handleClickLogout = (e) => {
        doLogout()
        setResult(true)
    }

    const closeModal = () => {
        setResult(false)
        moveToPath('/')
    }

  return (
    <div className='nav_layout'>
        <ul className='navbar'>
            <li>
            <Dropdown>
                <Dropdown.Toggle className='dropdown_toggle'>
                    <FontAwesomeIcon
                        icon={faBars} 
                        className='fabars'
                        size='2x'
                    />
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdown_menu'>
                    <Dropdown.Item className='all_products' as={Link} to={'/products/'}>전체 상품</Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </li>
            <li className='logo'><Link to={'/'}><img src={logo} width='150px' alt='logo' /></Link></li>
            <ul className='navbar2' style={{display:'flex'}}>
                <li><FontAwesomeIcon icon={faSearch} className='fasearch' size='2x' /></li>
                <li><FontAwesomeIcon icon={faBell} className='fabell' size='2x' /></li>
                <li>
                    <Dropdown>
                        <Dropdown.Toggle className='dropdown_member_toggle'>
                            <FontAwesomeIcon icon={faUser} className='fauser' size='2x' />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='dropdown_menu'>
                            {loginState.email ?
                                <>
                                    <Dropdown.Item className='memberInfo' as={Link} to={'/'}>회원정보</Dropdown.Item>
                                    <Dropdown.Item className='cart' as={Link} to={'/'}>장바구니</Dropdown.Item>
                                    <Dropdown.Item className='wish' as={Link} to={'/'}>찜 리스트</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item className='logout' as={Link} to={'/'} onClick={handleClickLogout}>로그아웃</Dropdown.Item>
                                </>
                                :
                                <Dropdown.Item className='memberInfo' as={Link} to={'/member/login'}>로그인</Dropdown.Item>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </ul>

        {result ? 
            <ResultModal
                callbackFn={closeModal}
                title={'로그인 정보'}
                content={'로그아웃되었습니다!'}
                show_modal={true}
            />
            :
            <></>
        }
    </div>
  )
}
