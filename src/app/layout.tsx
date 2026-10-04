import '@/app/globals.css'

import { GeistMono } from 'geist/font/mono'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
	title: 'Tahome UI',
	description: 'Tahome Air Quality',
}

export const viewport: Viewport = {
	themeColor: '#000000',
	colorScheme: 'dark',
}

const TahomeApp = ({ children }: LayoutProps<'/'>) => {
	return (
		<html lang="en" className={`m-0 p-0 bg-black text-white ${GeistMono.className}`}>
			<body>
				<main>{children}</main>
			</body>
		</html>
	)
}

export default TahomeApp
