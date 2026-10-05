'use client'

import { useEffect, useSyncExternalStore, useTransition } from 'react'

import { refreshReading } from '@/app/actions'

const REFRESH_MS = 60_000
const TICK_MS = 15_000

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

// Shared clock so the relative time re-renders without setState in an effect.
// Starts at 0 so nothing reads the current time during the server prerender.
let now = 0

const subscribeToClock = (onChange: () => void) => {
	const id = setInterval(() => {
		now = Date.now()
		onChange()
	}, TICK_MS)
	return () => clearInterval(id)
}

const getClock = () => {
	if (!now) now = Date.now()
	return now
}

const getServerClock = () => null

const formatAgo = (updated: number, current: number) => {
	const seconds = Math.max(0, Math.round((current - updated) / 1000))
	if (seconds < 60) return 'just now'
	if (seconds < 3600) return rtf.format(-Math.round(seconds / 60), 'minute')
	if (seconds < 86400) return rtf.format(-Math.round(seconds / 3600), 'hour')
	return rtf.format(-Math.round(seconds / 86400), 'day')
}

type Props = {
	updated: number
}

// Shows how old the reading is and pulls fresh server data once a minute while the tab is visible.
// The current reading stays on screen during a refresh, with a pulsing dot until the new one arrives.
export default function LiveUpdated({ updated }: Props) {
	const current = useSyncExternalStore(subscribeToClock, getClock, getServerClock)
	const [isRefreshing, startRefresh] = useTransition()

	useEffect(() => {
		const refresh = () => {
			if (document.visibilityState !== 'visible') return
			startRefresh(async () => {
				await refreshReading()
			})
		}
		const id = setInterval(refresh, REFRESH_MS)
		document.addEventListener('visibilitychange', refresh)
		return () => {
			clearInterval(id)
			document.removeEventListener('visibilitychange', refresh)
		}
	}, [])

	return (
		<span className="relative">
			<time dateTime={new Date(updated).toISOString()}>{current === null ? ' ' : formatAgo(updated, current)}</time>
			{/* Positioned outside the text's box so the time stays centered whether or not it shows */}
			<span
				aria-hidden
				className={`absolute left-full top-1/2 ml-[0.5em] size-[0.5em] -translate-y-1/2 rounded-full bg-current transition-opacity duration-500 ${isRefreshing ? 'opacity-70 motion-safe:animate-pulse' : 'opacity-0'}`}
			/>
		</span>
	)
}
