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
                <li>
                    <Link href = "/" >
                        <a> Cart </a>
                    </Link>
                </li>
                <li>
                    <Link href = "/signUp" >
                        <a> Sign Up </a>
                    </Link>
                </li>
                <li>
                    <Link href = "/signIn">
                        <a> Sign In </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
export default Menu