import { Suspense } from 'react'
import type { Metadata } from 'next'
import { cacheLife } from 'next/cache'

import AqiDisplay from '@/app/components/AqiDisplay'
import LiveUpdated from '@/app/components/LiveUpdated'
import { getQuality } from '@/utils/qualityUtils'

const dataUrl = 'https://api.shawn.party/api/tahome/purple'

// Throws instead of returning an empty result so a failed fetch never gets cached as a blank page.
async function getData() {
	'use cache'
	// Fetched at request time, never baked into the build: an expire under 5 minutes keeps this out of
	// prerenders. Viewers share one upstream call per minute; after 4 idle minutes the next request
	// waits for a fresh reading instead of showing an old one.
	cacheLife({ stale: 30, revalidate: 60, expire: 240 })

	const res = await fetch(dataUrl, { signal: AbortSignal.timeout(10_000) })
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
}

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

const Home = () => {
	return (
		<Suspense>
			<Reading />
		</Suspense>
	)
}

export default Home
