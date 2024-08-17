import React from 'react'
import { Link } from 'react-router-dom'
import { getkakaoLoginLink } from '../../api/KakaoApi'
import { Button } from 'react-bootstrap'

const link = getkakaoLoginLink()

export default function KakaoLoginComponent() {
  return (
    <div>
        <div style={{fontSize:'12px', marginTop:'10px', color:'gray', textDecoration:'underline', marginBottom:'5px'}}>카카오로 로그인 시에 자동 가입 처리됩니다</div>
        <div>
            <div>
                <Button 
                    className="w-100"
                    style={{
                        backgroundColor:'#FEE500',
                        border:'1px solid #FEE500'
                    }}
                >
                    <Link to={link} style={{textDecoration:'none', color:'#191919'}}>카카오 로그인</Link>
                </Button>
            </div>
        </div>
    </div>
  )
}
