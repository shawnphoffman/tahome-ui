import './normalize.css'
import './globals.css'

import { GeistMono } from 'geist/font/mono'

export const metadata = {
	title: 'Tahome UI',
	description: 'Tahome Air Quality',
}

const TahomeApp = ({ children }) => {
	return (
		<html lang="en" className={GeistMono.className}>
			<body>{children}</body>
		</html>
	)
}

export default TahomeApp
