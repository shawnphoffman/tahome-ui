'use client'

import { useEffect } from 'react'

type Props = {
	error: Error & { digest?: string }
	retry: () => void
}

export default function Error({ error, retry }: Props) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className="flex w-dvw h-dvh items-center justify-center flex-col font-bold gap-[min(2rem,5vmin)] bg-indigo-900 text-white">
			<div className="text-[max(9vmin,24px)] text-center">AQI unavailable</div>
			<button
				type="button"
				onClick={() => retry()}
				className="rounded border-2 border-white px-6 py-3 text-[max(3vmin,16px)] hover:bg-white hover:text-indigo-900 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
			>
				Try again
			</button>
		</div>
	)
}
