import { memo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { styled } from 'linaria/react'

const dataUrl = `https://api.apify.com/v2/actor-tasks/ice_planet_hoff~purple-sensor-fetch/runs/last/dataset/items?token=${process.env.REACT_APP_APIFY_TOKEN}&status=SUCCEEDED`

const Home = () => {
	const { isLoading, error, data } = useQuery(['aqi'], () => fetch(dataUrl).then(res => res.json()), {
		cacheTime: 30 * 60 * 1000,
	})

	if (isLoading) return 'Loading...'

	if (error) return 'An error has occurred: ' + error.message

	return (
		<Container>
			<Label>AQI</Label>
			<Value>{data[0].aqi}</Value>
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
`

const Label = styled.div`
	font-size: 6rem;
	margin-top: 1rem;

	@media (max-width: 500px) {
		font-size: 4rem;
	}
`

const Value = styled.div`
	font-size: 30rem;

	@media (max-width: 500px) {
		font-size: 15rem;
	}
`

export default memo(Home)
