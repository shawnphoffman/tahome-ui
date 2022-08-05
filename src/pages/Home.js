import { memo } from 'react'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { styled } from 'linaria/react'

const dataUrl = `https://api.apify.com/v2/actor-tasks/ice_planet_hoff~purple-sensor-fetch/runs/last/dataset/items?token=${process.env.REACT_APP_APIFY_TOKEN}&status=SUCCEEDED`

const QUALITY_COLORS = [
	{
		color: '#607631',
		background: '#a8e05f',
	},
	{
		color: '#8c6c1d',
		background: '#fdd64b',
	},
	{
		color: '#974a20',
		background: '#ff9b57',
	},
	{
		color: '#942431',
		background: '#fe6a69',
	},
	{
		color: '#573344',
		background: '#a87383',
	},
	{
		color: '#543b63',
		background: '#a97abc',
	},
	{
		color: '#543b63',
		background: '#a97abc',
	},
]

const QUALITY = ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous', 'Very Hazardous']

const getQualityIndex = aqi => {
	if (aqi <= 200) {
		return Math.floor(Math.abs(aqi - 1) / 50)
	}
	return Math.floor(Math.abs(aqi - 1) / 100) + 2
}

const getQualityLabel = aqi => {
	return QUALITY[getQualityIndex(aqi)]
	/*                                  AQI         RAW PM2.5
	Good                               0 - 50   |   0.0 – 12.0
	Moderate                          51 - 100  |  12.1 – 35.4
	Unhealthy for Sensitive Groups   101 – 150  |  35.5 – 55.4
	Unhealthy                        151 – 200  |  55.5 – 150.4
	Very Unhealthy                   201 – 300  |  150.5 – 250.4
	Hazardous                        301 – 400  |  250.5 – 350.4
	Very Hazardous                   401 – 500  |  350.5 – 500.4
	*/
}

const Home = () => {
	// const { isLoading, error, data } = useQuery(['aqi'], () => fetch(dataUrl).then(res => res.json()), {
	// 	cacheTime: 30 * 60 * 1000,
	// })

	// if (isLoading) return 'Loading...'

	// if (error) return 'An error has occurred: ' + error.message

	// const aqi = data[0].aqi

	const aqi = 401

	const colors = QUALITY_COLORS[getQualityIndex(aqi)]

	return (
		<Container text={colors.color} background={colors.background}>
			<Label>AQI: {getQualityLabel(aqi)}</Label>
			<Value>{aqi}</Value>
		</Container>
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
`

const Label = styled.div`
	font-size: 5rem;
	margin-top: 1rem;
	text-align: center;

	@media (max-width: 500px) {
		font-size: 3rem;
	}
`

const Value = styled.div`
	font-size: 30rem;

	@media (max-width: 500px) {
		font-size: 15rem;
	}
`

export default memo(Home)
