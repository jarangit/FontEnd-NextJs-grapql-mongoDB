import '../styles/globals.css'
import Layout from '../component/Layout/layout'
import AuthProvider  from '../appState/authProvider'
import apolloClient from "../apollo/apolloClient"
import { ApolloProvider } from "@apollo/react-hooks"
import fetch from "isomorphic-unfetch"
import cookie from "cookie"
import { Router } from 'next/router'



const QUERY_USER = {
  query:`
    query {
      user {
        id
        name
        email
        products {
          id
          name
          price
          description
        }
        carts {
          id
          product {
            id
            name
            description
            imageUrl
            price
          }
          quantity
        }
      }
    }
  `
}
function MyApp({ Component, pageProps, apollo, user }) {
  // console.log(user)
  return (
    <ApolloProvider client = { apollo } >
        <AuthProvider userData = {user}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
       </AuthProvider>
    </ApolloProvider>

  )
}

MyApp.getInitialProps = async ({ ctx, router }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps
  }

  const { headers } = ctx.req

  const cookies = headers && cookie.parse(headers.cookie || "")

  const token = cookies && cookies.jwt

  if ( !token ) {
    if ( router.pathname === '/cart' || router.pathname === '/manageProduct' || router.pathname === '/user/*'){
      ctx.res.writeHead(302, { Location: "register/signIn" })
      ctx.res.end()
    }
    return null
  }


  const response = await fetch("http://localhost:4444/graphql", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}` || ""
    },
    body: JSON.stringify(QUERY_USER)
  })

  if (response.ok) {
    const result = await response.json()
    console.log(result)
    return { user: result.data.user }
  } else {
    if ( router.pathname === '/cart' || router.pathname === '/manageProduct' || router.pathname === '/user/*'){
      ctx.res.writeHead(302, { Location: "register/signIn" })
      ctx.res.end()
    }
    return null
  }
}
  
export default apolloClient(MyApp)
