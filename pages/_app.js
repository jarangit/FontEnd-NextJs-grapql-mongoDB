import '../styles/globals.css'
import Layout from '../component/Layout/layout'
// import { ApolloProvider } from '@apollo/react-hooks'
import apolloClient from '../apollo/apolloClient'

function MyApp({ Component, pageProps, apollo }) {
  return (
    // <ApolloProvider client = { apollo } >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    // </ApolloProvider>
  )
}

export default MyApp
