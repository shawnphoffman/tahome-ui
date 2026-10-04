// Shown while the first reading loads. Fades in after a short delay so fast loads don't flash it.
export default function LoadingScreen() {
	return (
		<div
			role="status"
			className="flex w-dvw h-dvh items-center justify-center flex-col gap-[min(1rem,3vmin)] bg-black text-white motion-safe:animate-fade-in-delayed"
		>
			<div className="size-[min(12vmin,96px)] rounded-full border-[min(1vmin,8px)] border-white/20 border-t-white motion-safe:animate-spin" />
			<div className="text-[max(3vmin,12px)] text-white/80">Reading the air…</div>
		</div>
	)
}
