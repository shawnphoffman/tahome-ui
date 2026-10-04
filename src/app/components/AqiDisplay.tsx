import type { ReactNode } from 'react'

import { getQuality } from '@/utils/qualityUtils'

type Props = {
	aqi: number
	children?: ReactNode
}

export default function AqiDisplay({ aqi, children }: Props) {
	const { cls, label } = getQuality(aqi)

	return (
		<div
			className={`flex w-dvw h-dvh items-center justify-center flex-col font-bold gap-[min(1rem,3vmin)] motion-safe:transition-colors motion-safe:duration-1000 motion-safe:ease-in-out motion-safe:animate-fade-in ${cls}`}
		>
			{/* Keyed so a new value fades in instead of swapping instantly */}
			<div key={aqi} className="text-[55vmin] leading-[0.9] motion-safe:animate-fade-in">
				{aqi}
			</div>
			<div key={label} className="text-[max(9vmin,24px)] text-center motion-safe:animate-fade-in">
				{label}
			</div>
			<div className="text-[max(3vmin,12px)] text-center">{children}</div>
		</div>
	)
}
