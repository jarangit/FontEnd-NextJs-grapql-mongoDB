import Link from 'next/link'

const Menu = () => {
    return(
        <div>
            <h1> THE GUITAR NEXT </h1>
            <ul>
                <li>
                    <Link href = "/" key = "home">
                        <a> Home </a>
                    </Link>
                </li>
                <li>
                    <Link href = "/products" key = "product">
                        <a> Product </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
export default Menu