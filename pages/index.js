import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Menu from '../component/Layout/menu'
import Layout from '../component/Layout/layout'

export default function Home() {
  return (
    <div>
      <Head>
        <title>The Guitar Next</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
            <h1 style = { {textAlign: "center"} } > HOME </h1>
    </div>
  )
}
