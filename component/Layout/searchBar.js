import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHeadset } from '@fortawesome/free-solid-svg-icons'


const DIV = styled.div`
    /* background: #1A1B1E; */
    /* max-width: 1500px; */
    /* margin: 30px auto; */
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    #searchbar-contact{    
        color: #9FC3B7;
    }
    div{
        label{
            :hover{
                color: #DDEEEF;
            }
    }
    }
`
const SearchBox = styled.input`
    border-radius: 1rem;
    height: 30px;
    margin: 10px;
    width: 500px;
    border: 1px solid;
    border-color:  #9FC3B7;
    color: white;
    background: #1A1B1E;
    /* -webkit-box-shadow: 3px 25px 35px -21px rgba(142, 105, 208,0.98);
    -moz-box-shadow: 3px 25px 35px -21px  rgba(142, 105, 208,0.98);
    box-shadow: 3px 25px 35px -21px rgba(142, 105, 208,0.98); */
    padding: 10px;
    :focus {
        outline: none;    
        }
    ::placeholder{
        color: white;
        font-size: 15px;
    }
    

`

const SearchBar = () => {
    return (
        <div  style = {{ background: "#232323"}}>
            <DIV className = 'container' style = {{ alignItems: "center" }} >
                <h1 style = {{ color: 'white' }} > GUIATAR NEXT </h1>
                <div id = 'searchbar-contact'>
                    <SearchBox type = "search" placeholder = "search" autofocus />
                    <label> <FontAwesomeIcon icon = {faSearch}/> Search </label>
                </div>
            </DIV>
        </div>
    )
}

export default SearchBar
