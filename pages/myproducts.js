import React from 'react'
import UserProducts from '../component/User/userProducts'
import Link from 'next/link'

const MyProducts = () => {
    return (
        <div>
            <Link href = '/create_product' >
                <a> เพิ่มสินค้า </a>
            </Link>
            {/* <CreateProductForm/> */}
            <UserProducts/>
        </div>
    )
}

export default MyProducts
