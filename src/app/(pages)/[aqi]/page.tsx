import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import AqiDisplay from '@/app/components/AqiDisplay'

async function AqiPreview({ params }: Pick<PageProps<'/[aqi]'>, 'params'>) {
	const aqi = Number((await params).aqi)

	if (!Number.isFinite(aqi)) {
		notFound()
	}

	return <AqiDisplay aqi={aqi}>a while ago</AqiDisplay>
}

// Preview any AQI value, e.g. /175. Params are read inside Suspense so Cache Components can serve a static shell.
export default function AqiPreviewPage({ params }: PageProps<'/[aqi]'>) {
	return (
		<Suspense>
			<AqiPreview params={params} />
		</Suspense>
	)
}
