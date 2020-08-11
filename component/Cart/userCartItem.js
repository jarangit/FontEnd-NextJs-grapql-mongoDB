import React, { useContext } from 'react'
import { AuthContext } from '../../appState/authProvider'

const UserCartItem = () => {
    const { user } = useContext(AuthContext)

    return (
        <div className = "container" >
            {user &&(
                user.carts.map(items => (
                    <div>
                        <img src = {items.product.imageUrl} width ="100"/>
                        <p> { items.product.name } </p>
                        <p> { items.product.description } </p>
                        <p> { items.product.price } </p>
                        <button> Delete </button>
                    </div>
                ))
            )}
        </div>
    )
}

export default UserCartItem
