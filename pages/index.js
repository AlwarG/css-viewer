import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <iframe
          className={styles.cssStatsIframe}
          title='css-stats'
          src='https://cssstats.com/stats/?link=https%3A%2F%2Fcss.zohostatic.com%2Fbooks%2Fzbooks%2Fassets%2Fstyles%2Fzb-394a80436cfd57eb508b39d3ee4eadc9.css'
        />
      </main>
    </div>
  )
}
