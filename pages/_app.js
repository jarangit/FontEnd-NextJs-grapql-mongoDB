import '../styles/globals.css'
import Layout from '../component/Layout/layout'
import AuthProvider  from '../appState/authProvider'
import apolloClient from "../apollo/apolloClient"
import { ApolloProvider } from "@apollo/react-hooks"
import fetch from "isomorphic-unfetch"
import cookie from "cookie"



const QUERY_USER = {
  query:`
    query {
      user {
        id
        name
        email
        products {
          id
        }
        carts {
          id
          product {
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

MyApp.getInitialProps = async ({ ctx }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps
  }
  console.log(ctx.req.headers)

  const { headers } = ctx.req

  const cookies = headers && cookie.parse(headers.cookie || "")

  const token = cookies && cookies.jwt
  console.log(token)
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
    return null
  }
}
  
export default apolloClient(MyApp)
