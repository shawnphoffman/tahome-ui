const ErrorPage = async () => {
	return (
		<div className={`flex w-dvw h-dvh items-center justify-center flex-col font-bold gap-[min(1rem,3vmin)] bg-indigo-900 text-white`}>
			<div className="text-[50vmin] leading-[0.9]">500</div>
			{/* <div className="text-[max(9vmin,24px)] opacity-50 text-center">Not Found</div> */}
		</div>
	)
}

export default ErrorPage
