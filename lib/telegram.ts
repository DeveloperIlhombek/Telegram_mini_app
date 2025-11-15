// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tg = (window as any).Telegram?.WebApp

export const initTelegramWebApp = () => {
	if (!tg) return null
	tg.expand() // full screen
	return tg.initData || ''
}

export const getTelegramInitData = (): string => {
	return tg?.initData || ''
}
