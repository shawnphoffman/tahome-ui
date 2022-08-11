import '../styles/globals.css'

import Layout from '../components/layout'

function TahomeApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}

export default TahomeApp
