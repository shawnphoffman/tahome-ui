import { useMemo } from 'react'
import { styled } from 'linaria/react'
import Head from 'next/head'

import { getQualityColors, getQualityIndex, getQualityLabel } from '../utils/qualityUtils'

// const dataUrl = `https://api.apify.com/v2/actor-tasks/ice_planet_hoff~purple-sensor-fetch/runs/last/dataset/items?token=${process.env.REACT_APP_APIFY_TOKEN}&status=SUCCEEDED`
const dataUrl = 'https://api.shawn.party/api/tahome/purple'

// Server data fetch
export async function getServerSideProps(context) {
	const res = await fetch(dataUrl)
	const data = await res.json()

	// const data = json[0]

	const aqi = data.aqi
	const lastUpdated = new Date(data.raw.time_stamp * 1000)
	const colors = getQualityColors(aqi)
	const label = getQualityLabel(aqi)
	const qualityIndex = getQualityIndex(aqi)

	context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=300')

	return {
		props: {
			aqi,
			updated: lastUpdated.toLocaleString('en-US', { timeZone: 'PST' }),
			colors,
			label,
			qualityIndex,
		},
	}
}

//
export default function Home(props) {
	const { aqi, updated, colors, label } = props

	const title = useMemo(() => `Tahome AQI: ${aqi} ${label}`, [aqi, label])

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content="Air quality at Tahome" />
			</Head>
			<Container text={colors.color} background={colors.background}>
				<Label>AQI: {getQualityLabel(aqi)}</Label>
				<Value>{aqi}</Value>
				<TimeStamp>Updated: {updated}</TimeStamp>
			</Container>
		</div>
	)
}

const Container = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	align-items: center;
	flex-direction: column;
	font-weight: bold;
	background: ${p => p.background};
	color: ${p => p.text};
	padding: 2rem;
`

const Label = styled.div`
	font-size: 5rem;
	text-align: center;

	@media (max-width: 600px) {
		font-size: 3rem;
	}
	@media (max-width: 400px) {
		font-size: 2rem;
	}
`

const Value = styled.div`
	font-size: 30rem;

	@media (max-width: 800px) {
		font-size: 20rem;
	}
	@media (max-width: 600px) {
		font-size: 15rem;
	}
	@media (max-width: 400px) {
		font-size: 12rem;
	}
`

const TimeStamp = styled.div`
	font-size: 2rem;
	text-align: center;

	@media (max-width: 600px) {
		font-size: 1.5rem;
	}
	@media (max-width: 400px) {
		font-size: 1rem;
	}
`
