import { type ReactNode, ViewTransition } from 'react'

import { getQuality } from '@/utils/qualityUtils'

type Props = {
	aqi: number
	children?: ReactNode
}

export default function AqiDisplay({ aqi, children }: Props) {
	const { cls, label } = getQuality(aqi)

	return (
		<div
			className={`flex w-dvw h-dvh items-center justify-center flex-col font-bold gap-[min(1rem,3vmin)] motion-safe:transition-colors motion-safe:duration-1000 motion-safe:ease-in-out ${cls}`}
		>
			{/* Keyed and named so a new value crossfades with the old one when a refresh changes it */}
			<ViewTransition key={aqi} name="aqi-value" share="aqi-crossfade" default="none">
				<div className="text-[55vmin] leading-[0.9]">{aqi}</div>
			</ViewTransition>
			<ViewTransition key={label} name="aqi-label" share="aqi-crossfade" default="none">
				<div className="text-[max(9vmin,24px)] text-center">{label}</div>
			</ViewTransition>
			<div className="text-[max(3vmin,12px)] text-center">{children}</div>
		</div>
	)
}
