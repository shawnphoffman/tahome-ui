import { formatDistance } from 'date-fns'

// export async function generateMetadata() {
// 	const { aqi, label } = await getData()
// 	return {
// 		title: `${aqi} ${label} | Tahome AQI`,
// 	}
// }

const ErrorPage = async () => {
	return (
		<div className={`flex w-dvw h-dvh items-center justify-center flex-col font-bold gap-[min(1rem,3vmin)] bg-red-900 text-white`}>
			<div className="text-[50vmin] leading-[0.9]">404</div>
			<div className="text-[max(9vmin,24px)] opacity-50 text-center">Not Found</div>
		</div>
	)
}

export default ErrorPage
