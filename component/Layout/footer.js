import React from 'react'
import styled from 'styled-components'

const FooterSty = styled.div`
    background: #232323;
    color: #87A9A8;
    .container{
        display: flex;
        justify-content: space-around;
    }
`
const Footer = () => {
    return (
        <FooterSty>
            <div className = 'container'>
                <div>
                    <ul>
                        <h3>asdasd</h3>
                        <li>Sub menu</li>
                        <li>Sub menu</li>
                        <li>Sub menu</li>
                        <li>Sub menu</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <h3>asdasd</h3>
                        <li>Sub menu</li>
                        <li>Sub menu</li>
                        <li>Sub menu</li>
                        <li>Sub menu</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <h3>asdasd</h3>
                        <li>Sub menu</li>
                        <li>Sub menu</li>
                        <li>Sub menu</li>
                        <li>Sub menu</li>
                    </ul>
                </div>
            </div>
            <div style = {{ background: 'black' , textAlign: 'center', padding: '5px', color: "#87A9A8"}} >
                Copy like theguitarnext@gmail.com
            </div>
        </FooterSty>
    )
}

export default Footer
