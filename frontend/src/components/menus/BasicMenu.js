import { faBell, faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars, faSearch, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import "./css/BasicMenu.css"
import logo from '../../logo.png'
import SideMenu from './SideMenu'

export default function BasicMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const side = useRef();
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

  return (
    <div className='nav_layout'>
        <ul className='navbar'>
            <li className='sidebar'>
                {isOpen ?
                    <>
                        <span onClick={() => toggleMenu()}>
                            <FontAwesomeIcon className='fa_x' icon={faX} size='2x' color='#8498D9' />  
                        </span>                  
                        <SideMenu />
                    </>
                    :
                    <FontAwesomeIcon
                        icon={faBars} 
                        className='fabars' 
                        size='2x'
                        onClick={() => toggleMenu()}
                    />
                }
            </li>
            <li className='logo'><Link to={'/'}><img src={logo} width='150px' /></Link></li>
            <ul className='navbar2'>
                <li><FontAwesomeIcon icon={faSearch} className='fasearch' size='2x' /></li>
                <li><FontAwesomeIcon icon={faBell} className='fabell' size='2x' /></li>
                <li><FontAwesomeIcon icon={faUser} className='fauser' size='2x' /></li>
            </ul>
        </ul>
    </div>
  )
}
