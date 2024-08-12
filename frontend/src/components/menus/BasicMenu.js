import { faBell, faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import "./css/BasicMenu.css"
import logo from '../../logo.png'
import { Dropdown } from 'react-bootstrap'

export default function BasicMenu() {
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
                    <Dropdown.Item><Link className='all_products' to={'/products/'}>전체 상품</Link></Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </li>
            <li className='logo'><Link to={'/'}><img src={logo} width='150px' alt='logo' /></Link></li>
            <ul className='navbar2'>
                <li><FontAwesomeIcon icon={faSearch} className='fasearch' size='2x' /></li>
                <li><FontAwesomeIcon icon={faBell} className='fabell' size='2x' /></li>
                <li><FontAwesomeIcon icon={faUser} className='fauser' size='2x' /></li>
            </ul>
        </ul>
    </div>
  )
}
