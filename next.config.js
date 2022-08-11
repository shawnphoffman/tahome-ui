const withLinaria = require('next-linaria')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	linaria: {
		/* linaria options here */
	},
}

module.exports = withLinaria(nextConfig)
