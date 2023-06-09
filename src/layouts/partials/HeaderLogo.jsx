import React from 'react'
import logo from '../../assets/img/logo-delpz-bl.png'

const HeaderLogo = ({ type = 'default' }) => {

    if (type === 'primary')
        return (
            <div className='' style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <figure style={{ margin: 0 }}>
                    <img src={logo} alt="logo-delapaz" width={150} />
                </figure>
            </div>
        )

    return (
        <div>
            <figure style={{ margin: 0 }}>
                <img src={logo} alt="logo-delapaz" width={150} />
            </figure>
        </div>
    )
}

export default HeaderLogo