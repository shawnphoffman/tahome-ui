const QUALITY_CONST = {
	good: {
		label: 'Good',
		cls: 'bg-green-600 text-white',
	},
	moderate: {
		label: 'Moderate',
		// cls: 'bg-moderate text-moderate-foreground',
		cls: 'bg-yellow-500 text-black',
	},
	unhealthySensitive: {
		label: 'Unhealthy for Sensitive Groups',
		// cls: 'bg-unhealthySensitive text-unhealthySensitive-foreground',
		cls: 'bg-orange-500 text-white',
	},
	unhealthy: {
		label: 'Unhealthy',
		// cls: 'bg-unhealthy text-unhealthy-foreground',
		cls: 'bg-pink-600 text-white',
	},
	veryUnhealthy: {
		label: 'Very Unhealthy',
		// cls: 'bg-veryUnhealthy text-veryUnhealthy-foreground',
		cls: 'bg-fuchsia-600 text-white',
	},
	hazardous: {
		label: 'Hazardous',
		// cls: 'bg-hazardous text-hazardous-foreground',
		cls: 'bg-purple-600 text-white',
	},
	veryHazardous: {
		label: 'Very Hazardous',
		// cls: 'bg-veryHazardous text-veryHazardous-foreground',
		cls: 'bg-indigo-600 text-white',
	},
	dead: {
		label: 'You are dead...',
		// cls: 'bg-dead text-dead-foreground',
		cls: 'bg-black text-white',
	},
} as const

const QUALITY_CLASSES = ['good', 'moderate', 'unhealthySensitive', 'unhealthy', 'veryUnhealthy', 'hazardous', 'veryHazardous']

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

export const getQuality = aqi => {
	let qualityIndex = 0

	if (aqi <= 200) {
		qualityIndex = Math.floor(Math.abs(aqi - 1) / 50)
	} else {
		qualityIndex = Math.floor(Math.abs(aqi - 1) / 100) + 2
	}

	const key = QUALITY_CLASSES[qualityIndex]
	const { label, cls } = QUALITY_CONST[key] || QUALITY_CONST.dead

	return {
		index: qualityIndex,
		label: label,
		cls: cls,
	}
}
