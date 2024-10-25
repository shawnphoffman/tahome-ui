import '@/app/globals.css'

import { GeistMono } from 'geist/font/mono'

export const metadata = {
	title: 'Tahome UI',
	description: 'Tahome Air Quality',
}

const TahomeApp = ({ children }) => {
	return (
		<html lang="en" className={`m-0 p-0 bg-black text-white ${GeistMono.className}`}>
			<body>
				<main>{children}</main>
			</body>
		</html>
	)
}

export default TahomeApp
