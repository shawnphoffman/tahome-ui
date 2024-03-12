import { getQuality } from '../../utils/qualityUtils'

async function getData(override) {
	return new Promise((resolve, reject) => {
		try {
			// const res = await fetch(dataUrl)
			// const data = await res.json()

			const aqi = override
			const lastUpdated = new Date()
			const quality = getQuality(aqi)

			console.log({ aqi, lastUpdated, quality, override })

			resolve({
				aqi,
				updated: lastUpdated.toLocaleString('en-US', { timeZone: 'PST' }),
				label: quality.label,
				cls: quality.cls,
				qualityIndex: quality.index,
			})
		} catch {
			reject()
		}
	})
}

export async function generateMetadata({ params }) {
	const { aqi, label } = await getData(params.override)
	return {
		title: `Tahome AQI: ${aqi} ${label}`,
	}
}

const Home = async ({ params }) => {
	const { aqi, updated, label, cls, qualityIndex } = await getData(params.override)

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
