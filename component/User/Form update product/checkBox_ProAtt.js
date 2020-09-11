import React, { useState, useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_PRODUCTS_ATT } from '../../Product/createProductFrom_selectAtt'
import { AuthContext } from '../../../appState/authProvider'


const CheckBox_ProAtt = (props) => {
    const { data, loading, error } = useQuery(QUERY_PRODUCTS_ATT)
    const { ID_ATTPro_FromEdit, setID_ATTPro_FromEdit } = useContext(AuthContext)
    const [IDAtt, setIDAtt] = useState([])
    
    const GetID =() => {
        const findIdAtt =  ID_ATTPro_FromEdit.find(e => e === event.target.id )
        if(findIdAtt){
            setID_ATTPro_FromEdit(ID_ATTPro_FromEdit.filter((e)=>(e !== event.target.id)))
 
        }else {
            let idAAtt = event.target.id
            setID_ATTPro_FromEdit(id => [...id, `${idAAtt}`])
        }
         console.log(ID_ATTPro_FromEdit)
     }
     console.log(ID_ATTPro_FromEdit)

    return (
        <div style = {{ border: "1px solid red" }}>
            <strong> เลือกคุณสมบัติ </strong>
            {data && (
                <form id = "Sel_Pro_Att" onSubmit = "return false">
                    {data.productAttributes.map(items => (
                        <div>
                            <h3> {items.name} </h3>
                                {items.pd_options_attrs.map((subItems, index) => {
                                    let CheckID = false
                                            {props.dataAtt.map(itemsMain => {
                                                if ( itemsMain.id === subItems.id ){
                                                    CheckID = true
                                                }
                                            })}  
                                    return(
                                        <div key = {index}>
                                            <input id = {subItems.id} type="checkbox" name="vehicle1" defaultChecked = {CheckID} onClick = {GetID}/>
                                            <label> {subItems.opVal} </label>
                                        </div>
                                    )
                
                                })}
                        </div>
                    ))}
                </form>
            )}
        </div>
    )
}

export default CheckBox_ProAtt
