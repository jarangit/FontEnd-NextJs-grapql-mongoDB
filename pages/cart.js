import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import UserCartItem from '../component/Cart/userCartItem'

const Cart = () => {
 
    
    return (
        <div>
            <h1 style = { {textAlign: "center"} } > CART </h1>
            <UserCartItem/>
        </div>
    )
}

export default Cart
