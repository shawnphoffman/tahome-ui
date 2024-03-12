import { getQuality } from '../utils/qualityUtils'

const dataUrl = 'https://api.shawn.party/api/tahome/purple'

export const revalidate = 60

async function getData() {
	try {
		const res = await fetch(dataUrl)
		const data = await res.json()

		const aqi = data.aqi
		const lastUpdated = new Date(data.raw.time_stamp * 1000)
		const quality = getQuality(aqi)

		return {
			aqi,
			updated: lastUpdated.toLocaleString('en-US', { timeZone: 'PST' }),
			label: quality.label,
			cls: quality.cls,
			qualityIndex: quality.index,
		}
	} catch {
		return {}
	}
}

export async function generateMetadata() {
	const { aqi, label } = await getData()
	return {
		title: `Tahome AQI: ${aqi} ${label}`,
	}
}

const Home = async () => {
	const { aqi, updated, label, cls, qualityIndex } = await getData()

	console.log({
		aqi,
		updated,
		label,
		cls,
		qualityIndex,
	})

	return (
		<div>
			<div className={`container ${cls}`}>
				{/* <div className="label">AQI: {label}</div> */}
				<div className="value">{aqi}</div>
				<div className="label">{label}</div>
				<div className="timeStamp">Updated: {updated}</div>
			</div>
		</div>
	)
}

export default Home
