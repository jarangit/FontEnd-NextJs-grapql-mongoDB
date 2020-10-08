import Head from 'next/head'
import ShowAllProduct from '../component/Product/showAllProduct'
import HomeBanner from '../component/Layout/homeBandner'
import IconCat from '../component/Layout/iconCat'
export default function Home() {
  return (
    <div>
      <Head>
        <title>The Guitar Next</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomeBanner/>
      <IconCat/>
      <ShowAllProduct/>
    </div>
  )
}
