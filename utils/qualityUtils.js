const QUALITY = ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous', 'Very Hazardous']
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

	const label = QUALITY[qualityIndex]
	const cls = QUALITY_CLASSES[qualityIndex]

	return {
		index: qualityIndex,
		label: label || 'You are dead...',
		cls: cls || 'dead',
	}
}
