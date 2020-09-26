import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Menu from '../component/Layout/menu'
import Layout from '../component/Layout/layout'
import ShowAllProduct from '../component/Product/showAllProduct'
import HomeBanner from '../component/Layout/homeBandner'
import IconCat from '../component/Layout/iconCat'
import BannerPromo from '../component/Layout/3BannerPromo'
export default function Home() {
  return (
    <div>
      <Head>
        <title>The Guitar Next</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomeBanner/>
      <IconCat/>
      {/* <BannerPromo/> */}
      <ShowAllProduct/>
    </div>
  )
}
