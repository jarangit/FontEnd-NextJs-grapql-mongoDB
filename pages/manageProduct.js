import React from 'react'
import CreateProductForm from '../component/Product/createProductForm'
import UserProducts from '../component/User/userProducts'

const ManageProduct = () => {
    return (
        <div>
            <CreateProductForm/>
            <UserProducts/>
        </div>
    )
}

export default ManageProduct
