// ❗ Hech qanday window global scope-da yo‘q
// ❗ Faqat shart bilan tekshiriladi
// ❗ Vercel build vaqtida hech qanday xato bermaydi

export function getTelegram() {
	if (typeof window === 'undefined') return null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (window as any)?.Telegram?.WebApp ?? null
}

export function getTelegramInitData() {
	const tg = getTelegram()
	return tg?.initData || ''
}

export function expandTelegram() {
	const tg = getTelegram()
	if (tg) tg.expand()
}
