import React, { useContext } from 'react'
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { AuthContext } from '../../appState/authProvider'


const UserData = () => {
  const { user } = useContext(AuthContext)

  console.log(user)

    return (
        <div className = "container">
           {user &&(
             <div>
               <div>
                  <h1> Name: {user.name} </h1>
                  <p> Email: {user.email} </p>
               </div>
               <div>
                 <h2> Your Product </h2>
                 <div>
                   {user.products.map(items => (
                     <div>
                       <p> Name: {items.name} </p>
                       <p> Price: {items.price} </p>
                       <p> Description: {items.description} </p>
                       <hr/>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}
        </div>
    )
}

export default UserData
