import { cache, Suspense, ViewTransition } from 'react'
import type { Metadata } from 'next'

import AqiDisplay from '@/app/components/AqiDisplay'
import LiveUpdated from '@/app/components/LiveUpdated'
import LoadingScreen from '@/app/components/LoadingScreen'
import { getQuality } from '@/utils/qualityUtils'

const dataUrl = 'https://api.shawn.party/api/tahome/purple'

// Fetched on every request: the proxy already shares one cached reading across all of its instances,
// while a cache here would be per instance and could show readings from different moments.
// cache() lets the title and the page share a single fetch per request.
const getData = cache(async () => {
	const res = await fetch(dataUrl, { cache: 'no-store', signal: AbortSignal.timeout(10_000) })
	if (!res.ok) {
		throw new Error(`AQI request failed: ${res.status} ${res.statusText}`)
	}

	const data = await res.json()
	// data_time_stamp is when the sensor took the reading; time_stamp is only when PurpleAir answered
	const readingTime = data?.raw?.data_time_stamp ?? data?.raw?.time_stamp
	if (typeof data?.aqi !== 'number' || typeof readingTime !== 'number') {
		throw new Error('AQI response is missing aqi or a reading timestamp')
	}

	return {
		aqi: data.aqi as number,
		updated: readingTime * 1000,
	}
})

export async function generateMetadata(): Promise<Metadata> {
	const { aqi } = await getData()
	return {
		title: `${getQuality(aqi).label} | Tahome AQI`,
	}
}

async function Reading() {
	const { aqi, updated } = await getData()

	return (
		<AqiDisplay aqi={aqi}>
			<LiveUpdated updated={updated} />
		</AqiDisplay>
	)
}

// The loading screen fades out as the reading fades in
const Home = () => {
	return (
		<Suspense
			fallback={
				<ViewTransition exit="loading-exit" default="none">
					<LoadingScreen />
				</ViewTransition>
			}
		>
			<ViewTransition enter="reading-enter" default="none">
				<Reading />
			</ViewTransition>
		</Suspense>
	)
}

export default Home
