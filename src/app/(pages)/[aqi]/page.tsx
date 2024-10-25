import { notFound } from 'next/navigation'

import { getQuality } from '@/utils/qualityUtils'

type Props = {
	params: Promise<{
		aqi: number
	}>
}

export default async function DynamicErrorPage({ params }: Props) {
	const { aqi } = await params

	if (Number.isNaN(aqi)) {
		return notFound()
	}

	const { cls, label } = getQuality(aqi)

	const blend = aqi >= 400 ? 'none' : 'mix-blend-overlay'

	return (
		<div className={`flex w-dvw h-dvh items-center justify-center flex-col font-bold gap-[min(1rem,3vmin)] ${cls}`}>
			<div className="text-[55vmin] leading-[0.9]">{aqi}</div>
			<div className={`text-[max(9vmin,24px)] opacity-95 ${blend} text-center `}>{label}</div>
			<div className="flex flex-col gap-1">
				<div className={`text-[max(3vmin,12px)] opacity-90 text-black ${blend} text-center`}>a while ago</div>
			</div>
		</div>
	)
}
