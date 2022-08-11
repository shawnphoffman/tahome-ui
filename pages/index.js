import { styled } from 'linaria/react'
import Head from 'next/head'

import { getQualityColors, getQualityIndex, getQualityLabel } from '../utils/qualityUtils'

const dataUrl = `https://api.apify.com/v2/actor-tasks/ice_planet_hoff~purple-sensor-fetch/runs/last/dataset/items?token=${process.env.REACT_APP_APIFY_TOKEN}&status=SUCCEEDED`

// Server data fetch
export async function getServerSideProps(context) {
	const res = await fetch(dataUrl)
	const json = await res.json()
	const data = json[0]

	const aqi = data.aqi
	const lastUpdated = new Date(data.raw.time_stamp * 1000)
	const colors = getQualityColors(aqi)
	const label = getQualityLabel(aqi)
	const qualityIndex = getQualityIndex(aqi)

	context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=300')

	return {
		props: {
			aqi,
			updated: lastUpdated.toLocaleString(),
			colors,
			label,
			qualityIndex,
		},
	}
}

//
export default function Home(props) {
	const { aqi, updated, colors, label, qualityIndex } = props
	return (
		<div>
			<Head>
				<title>
					Tahome AQI: {aqi} {label}
				</title>
				<meta name="description" content="Air quality at Tahome" />
			</Head>
			<Container text={colors.color} background={colors.background}>
				<Label>AQI: {getQualityLabel(aqi)}</Label>
				<Value>{aqi}</Value>
				<TimeStamp>Updated: {updated}</TimeStamp>
			</Container>
			<div>
				<code>
					<pre>{JSON.stringify(props, null, 2)}</pre>
				</code>
			</div>
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
