import React, { useContext } from 'react'
import { useQuery } from "@apollo/react-hooks"
import { useRouter } from "next/router"
import gql from "graphql-tag"
import apolloClient from '../../apollo/apolloClient'
import { AuthContext } from '../../appState/authProvider'

const UserPage = () => {
    return (
        <div className = "container">
            <h1> NO DATA </h1>
          {/* <div>
              <h1> Accout </h1>
              <p> {name} </p>
              <p> {email} </p>
          </div>
          <div>
              <h1> Your Product </h1>
              {products && 
                <div> {products.map((items, index) => (
                    <div id = {index} >
                        <p> Name: {items.name} </p>
                        <p> Price: {items.price} </p>
                        <p> Description: {items.description} </p>
                        <hr/>
                    </div>
                ))} 
                </div>
              }
          </div> */}
        </div>
    )
}

export default apolloClient(UserPage)
