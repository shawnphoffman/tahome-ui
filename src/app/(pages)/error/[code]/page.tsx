import { notFound } from 'next/navigation'

type Props = {
	params: Promise<{
		code: number
	}>
}

export default async function DynamicErrorPage({ params }: Props) {
	const { code } = await params

	if (Number.isNaN(code)) {
		return notFound()
	}

	return (
		<div className={`flex w-dvw h-dvh items-center justify-center flex-col font-bold gap-[min(1rem,3vmin)] bg-purple-900 text-white`}>
			<div className="text-[50vmin] leading-[0.9]">{code}</div>
		</div>
	)
}
