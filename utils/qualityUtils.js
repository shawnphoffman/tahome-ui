const QUALITY_COLORS = [
	{
		color: '#FFF',
		background: '#00d24d',
	},
	{
		color: '#000',
		background: '#fafa4c',
	},
	{
		color: '#FFF',
		background: '#fc8434',
	},
	{
		color: '#FFF',
		background: '#fe6a69',
	},
	{
		color: '#FFF',
		background: '#a87383',
	},
	{
		color: '#FFF',
		background: '#a97abc',
	},
	{
		color: '#FFF',
		background: '#543b63',
	},
]

const QUALITY = ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous', 'Very Hazardous']

export const getQualityIndex = aqi => {
	if (aqi <= 200) {
		return Math.floor(Math.abs(aqi - 1) / 50)
	}
	return Math.floor(Math.abs(aqi - 1) / 100) + 2
}

export const getQualityColors = aqi => {
	return QUALITY_COLORS[getQualityIndex(aqi)]
}

export const getQualityLabel = aqi => {
	return QUALITY[getQualityIndex(aqi)]
	/*                                  AQI         RAW PM2.5
	Good                               0 - 50   |   0.0 – 12.0
	Moderate                          51 - 100  |  12.1 – 35.4
	Unhealthy for Sensitive Groups   101 – 150  |  35.5 – 55.4
	Unhealthy                        151 – 200  |  55.5 – 150.4
	Very Unhealthy                   201 – 300  |  150.5 – 250.4
	Hazardous                        301 – 400  |  250.5 – 350.4
	Very Hazardous                   401 – 500  |  350.5 – 500.4
	*/
}
