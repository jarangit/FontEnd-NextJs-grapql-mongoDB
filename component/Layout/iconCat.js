import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHeadset } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'


const DIV = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    div{
        text-align: center;
        width: 300px;
        margin: 50px;
    }
`
const IconCat = () => {
    return (
        <div style = {{ background: '#eff6f7' }} >
            <DIV className = "container" >
                <div>
                    <FontAwesomeIcon icon = {faHeadset} size = '3x' color = "#ff00aa"/>
                </div>
                <div>
                    <FontAwesomeIcon icon = {faHeadset} size = '3x' color = "#ff00aa"/>
                </div>
                <div>
                    <FontAwesomeIcon icon = {faHeadset} size = '3x' color = "#ff00aa"/>
                </div>
                <div>
                    <FontAwesomeIcon icon = {faHeadset} size = '3x' color = "#ff00aa"/>
                </div>
                <div>
                    <FontAwesomeIcon icon = {faHeadset} size = '3x' color = "#ff00aa"/>
                </div>
                <div>
                    <FontAwesomeIcon icon = {faHeadset} size = '3x' color = "#ff00aa"/>
                </div>
            </DIV>
        </div>
    )
}

export default IconCat
