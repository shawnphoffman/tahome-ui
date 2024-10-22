import { formatDistance } from 'date-fns'

import ClientRefresh from '@/app/components/ClientRefresh'
import { getQuality } from '@/utils/qualityUtils'

const dataUrl = 'https://api.shawn.party/api/tahome/purple'

async function getData() {
	try {
		const res = await fetch(dataUrl, {
			next: { revalidate: 300 },
		})
		const data = await res.json()

		const aqi = data.aqi
		const lastUpdated = new Date(data.raw.time_stamp * 1000)
		const quality = getQuality(aqi)

		return {
			aqi,
			updatedPst: lastUpdated.toLocaleString('en-US', { timeZone: 'PST' }),
			updated: lastUpdated,
			label: quality.label,
			cls: quality.cls,
		}
	} catch {
		return {}
	}
}

export async function generateMetadata() {
	const { aqi, label } = await getData()
	return {
		title: `${aqi} ${label} | Tahome AQI`,
	}
}

const Home = async () => {
	const { aqi, updated, label, cls } = await getData()

	// console.log({
	// 	aqi,
	// 	updated,
	// 	label,
	// 	cls,
	// })

	return (
		<div className={`flex w-dvw h-dvh items-center justify-center flex-col font-bold gap-[min(1rem,3vmin)] ${cls}`}>
			<div className="text-[55vmin] leading-[0.9]">{aqi}</div>
			<div className="text-[max(9vmin,24px)] opacity-50 text-center">{label}</div>
			<div className="flex flex-col gap-1">
				<div className="text-[max(3vmin,12px)] opacity-75 text-center">
					{formatDistance(new Date(updated!), new Date(), { addSuffix: true })}
				</div>
				{/* <div className="text-[max(3vmin,12px)] opacity-50 text-center leading-tight">
					Updated {formatRelative(new Date(updated!), new Date())}
				</div> */}
			</div>
			<ClientRefresh />
		</div>
	)
}

export default Home
