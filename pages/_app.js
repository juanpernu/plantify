import '../styles/style.scss';
import '../styles/form.scss';
import Head from 'next/head';
import Link from 'next/link';
import Provider from './context';

function MyApp({ Component, pageProps }) {
  const isLogin = pageProps.pageName && pageProps.pageName == "login";
  return (
    <Provider>
      <Head>
        <title>Plantify - ❤️ your plants</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Plantify - ❤️ your plants" key="title" />
        <link rel="shortcut icon" href="/favicon.jpg" />
      </Head>

      <div className="top-bar">
        <div id="logo" className={isLogin ? 'center' : ''}>
          <h1>Plantify</h1><span className="logo-emoji">🍀</span>
          <p>Love your plants</p>
        </div>
        {!isLogin && <div className="nav">
          <Link href="/home">
            <a>My plants</a>
          </Link>
          <Link href="/new">
            <a>Add Plant</a>
          </Link>
        </div>}
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
