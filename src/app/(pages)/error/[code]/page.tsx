import { Suspense } from 'react'
import { notFound } from 'next/navigation'

async function ErrorCode({ params }: Pick<PageProps<'/error/[code]'>, 'params'>) {
	const code = Number((await params).code)

	if (!Number.isInteger(code)) {
		notFound()
	}

	return <div className="text-[50vmin] leading-[0.9]">{code}</div>
}

export default function DynamicErrorPage({ params }: PageProps<'/error/[code]'>) {
	return (
		<div className={`flex w-dvw h-dvh items-center justify-center flex-col font-bold gap-[min(1rem,3vmin)] bg-purple-900 text-white`}>
			<Suspense>
				<ErrorCode params={params} />
			</Suspense>
		</div>
	)
}
