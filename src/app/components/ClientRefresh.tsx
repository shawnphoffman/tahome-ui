'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientRefresh() {
	const router = useRouter()

	useEffect(() => {
		// console.log('Refreshing...')
		setTimeout(() => {
			router.refresh()
		}, 1000)
	}, [router])

	return null
}
