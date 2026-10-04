const QUALITY_CONST = {
	good: {
		label: 'Good',
		cls: 'bg-aqi-good text-black',
	},
	moderate: {
		label: 'Moderate',
		cls: 'bg-aqi-moderate text-black',
	},
	unhealthySensitive: {
		label: 'Unhealthy for Sensitive Groups',
		cls: 'bg-aqi-unhealthy-sensitive text-black',
	},
	unhealthy: {
		label: 'Unhealthy',
		cls: 'bg-aqi-unhealthy text-white',
	},
	veryUnhealthy: {
		label: 'Very Unhealthy',
		cls: 'bg-aqi-very-unhealthy text-white',
	},
	hazardous: {
		label: 'Hazardous',
		cls: 'bg-aqi-hazardous text-white',
	},
	veryHazardous: {
		label: 'Very Hazardous',
		cls: 'bg-aqi-very-hazardous text-white',
	},
	dead: {
		label: 'You are dead...',
		cls: 'bg-aqi-dead text-white',
	},
} as const

type QualityKey = keyof typeof QUALITY_CONST

const QUALITY_CLASSES: QualityKey[] = ['good', 'moderate', 'unhealthySensitive', 'unhealthy', 'veryUnhealthy', 'hazardous', 'veryHazardous']

// UPDATED 2024
/*                                       AQI     RAW PM2.5
	Good                                0 - 50  |  0.0 – 9.0
	Moderate                          51 - 100  |  9.1 – 35.4
	Unhealthy for Sensitive Groups   101 – 150  |  35.5 – 55.4
	Unhealthy                        151 – 200  |  55.5 – 125.4
	Very Unhealthy                   201 – 300  |  125.5 – 225.4
	Hazardous                        301 – 400  |  225.5 – 325.4
	Very Hazardous                   401 – 500  |  325.5 – 500.4
*/

export const getQuality = (aqi: number) => {
	let qualityIndex = 0

	if (aqi <= 200) {
		qualityIndex = Math.floor(Math.abs(aqi - 1) / 50)
	} else {
		qualityIndex = Math.floor(Math.abs(aqi - 1) / 100) + 2
	}

	const key = QUALITY_CLASSES[qualityIndex]
	const { label, cls } = (key && QUALITY_CONST[key]) || QUALITY_CONST.dead

	return {
		index: qualityIndex,
		label: label,
		cls: cls,
	}
}
