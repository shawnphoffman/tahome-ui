import type { ReactNode } from 'react'

import { getQuality } from '@/utils/qualityUtils'

type Props = {
	aqi: number
	children?: ReactNode
}

export default function AqiDisplay({ aqi, children }: Props) {
	const { cls, label } = getQuality(aqi)

	return (
		<div className={`flex w-dvw h-dvh items-center justify-center flex-col font-bold gap-[min(1rem,3vmin)] ${cls}`}>
			<div className="text-[55vmin] leading-[0.9]">{aqi}</div>
			<div className="text-[max(9vmin,24px)] text-center">{label}</div>
			<div className="text-[max(3vmin,12px)] text-center">{children}</div>
		</div>
	)
}
