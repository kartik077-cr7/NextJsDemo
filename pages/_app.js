import '../styles/globals.css'
import Layout from '../components/layout/Layout'

// index.js just responds when url is / so when we use 
// navbar we need to cover all pages with layour
// so we have app.js as a root components

//Components are actual page content 
//Pageprops are props page are getting

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
   </Layout>)
}

export default MyApp
