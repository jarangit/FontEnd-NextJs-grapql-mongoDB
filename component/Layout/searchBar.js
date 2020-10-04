import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHeadset } from '@fortawesome/free-solid-svg-icons'


const DIV = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: baseline;
    margin: 0 20px;

    #searchbar-contact{   
        color: white;
    }
    div{
        /* input{
            width:100%;
        } */
        label{
            border: 1px solid #53E9E4; 
            padding: 5px 10px;
            border-radius: 40px;
            font-size: 15px;
            background: #53E9E4;
            :hover{
                color: white;
                background: #92e5e2;

            }
    }
    }
`
const SearchBox = styled.input`
    border-radius: 1rem;
    height: 30px;
    margin: 10px;
    width: 300px;
    border: 1px solid;
    border-color:  #d3d3d3;
    color: white;
    background: none;
    padding: 15px;
    :focus {
        outline: none;    
        }
    ::placeholder{
        color: #d3d3d3;
        font-size: 15px;
    }
    

`

const SearchBar = () => {
    return (
            <DIV>
                <div id = 'searchbar-contact'>
                    <SearchBox type = "search" placeholder = "search" autofocus />
                    <label> <FontAwesomeIcon icon = {faSearch}/> Search </label>
                </div>
            </DIV>
    )
}

export default SearchBar
