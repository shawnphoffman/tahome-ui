import './normalize.css'
import './globals.css'

export const metadata = {
	title: 'Tahome UI',
	description: 'Tahome Air Quality',
}

const TahomeApp = ({ children }) => {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}

export default TahomeApp
