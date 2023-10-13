const QUALITY = ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous', 'Very Hazardous']
const QUALITY_CLASSES = ['good', 'moderate', 'unhealthySensitive', 'unhealthy', 'veryUnhealthy', 'hazardous', 'veryHazardous']

/*                                       AQI     RAW PM2.5
	Good                                0 - 50  |  0.0 – 12.0
	Moderate                          51 - 100  |  12.1 – 35.4
	Unhealthy for Sensitive Groups   101 – 150  |  35.5 – 55.4
	Unhealthy                        151 – 200  |  55.5 – 150.4
	Very Unhealthy                   201 – 300  |  150.5 – 250.4
	Hazardous                        301 – 400  |  250.5 – 350.4
	Very Hazardous                   401 – 500  |  350.5 – 500.4
*/

export const getQuality = aqi => {
	let qualityIndex = 0

	if (aqi <= 200) {
		qualityIndex = Math.floor(Math.abs(aqi - 1) / 50)
	} else {
		qualityIndex = Math.floor(Math.abs(aqi - 1) / 100) + 2
	}

	return {
		index: qualityIndex,
		label: QUALITY[qualityIndex],
		cls: QUALITY_CLASSES[qualityIndex],
	}
}
