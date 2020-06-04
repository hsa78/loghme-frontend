import React from 'react'
import './style.css'
import logoImg from './images/LOGO.png'
import cover from './images/Cover.jpg'

function HomeTitle(props){
    const backgroundStyle = { background: `linear-gradient(0deg,#FF6B6BBA, #FF6B6BBA), url(${cover})`,
                              backgroundSize: 'cover',
                              backgroundPosition: '0px 40%',
                            }
    return (
        <div className="home-title-box" style={backgroundStyle}>
            <img src={logoImg} className="home-logo-img" alt="logo"/>
            <p >اولین و بزرگ‌ترین وب‌سایت سفارش آنلاین غذا در دانشگاه تهران</p>
        </div>
    );
}

export default HomeTitle