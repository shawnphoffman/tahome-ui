'use server'

import { refresh } from 'next/cache'

// Re-renders the page with a fresh reading. Awaiting this inside a transition keeps it pending until the new reading arrives.
export async function refreshReading() {
	refresh()
}
