'use client'

export const getTelegram = () => {
	if (typeof window === 'undefined') return null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (window as any)?.Telegram?.WebApp ?? null
}

export const initTelegramWebApp = () => {
	const tg = getTelegram()
	if (!tg) return ''
	tg.expand()
	return tg.initData || ''
}

export const getTelegramInitData = () => {
	const tg = getTelegram()
	return tg?.initData || ''
}
