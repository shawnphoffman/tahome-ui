import { memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { styled } from 'linaria/react'

const dataUrl = `https://api.apify.com/v2/actor-tasks/ice_planet_hoff~purple-sensor-fetch/runs/last/dataset/items?token=${process.env.REACT_APP_APIFY_TOKEN}&status=SUCCEEDED`

const QUALITY_COLORS = [
	{
		color: '#FFF',
		background: '#00d24d',
	},
	{
		color: '#000',
		background: '#fafa4c',
	},
	{
		color: '#FFF',
		background: '#fc8434',
	},
	{
		color: '#FFF',
		background: '#fe6a69',
	},
	{
		color: '#FFF',
		background: '#a87383',
	},
	{
		color: '#FFF',
		background: '#a97abc',
	},
	{
		color: '#FFF',
		background: '#543b63',
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
	const { isLoading, error, data } = useQuery(['aqi'], () => fetch(dataUrl).then(res => res.json()), {
		cacheTime: 30 * 60 * 1000,
	})

	if (isLoading) return 'Loading...'

	if (error) return 'An error has occurred: ' + error.message

	const aqi = data[0].aqi
	const lastUpdated = new Date(data[0].raw.time_stamp * 1000)

	const colors = QUALITY_COLORS[getQualityIndex(aqi)]

	return (
		<Container text={colors.color} background={colors.background}>
			<Label>AQI: {getQualityLabel(aqi)}</Label>
			<Value>{aqi}</Value>
			<TimeStamp>Updated: {lastUpdated.toLocaleString()}</TimeStamp>
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

export default memo(Home)
