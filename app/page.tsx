'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useUserStore } from '../lib/store'
import { initTelegramWebApp } from '../lib/telegram'

export default function Home() {
	const router = useRouter()
	const setAccessToken = useUserStore(state => state.setAccessToken)
	const setTelegramId = useUserStore(state => state.setTelegramId)

	useEffect(() => {
		const initData = initTelegramWebApp()
		if (!initData) return

		fetch(
			'https://helminthoid-clumsily-xuan.ngrok-free.dev/api/v1/auth/telegram-login',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ init_data: initData }),
			}
		)
			.then(res => res.json())
			.then(data => {
				if (data.status === 'ok') {
					setAccessToken(data.access_token)
					router.push('/dashboard')
				} else if (data.status === 'new_user') {
					setTelegramId(data.telegram_id)
					router.push(`/registration?next_step=${data.next_step}`)
				}
			})
	}, [])

	return (
		<div className='flex items-center justify-center h-screen'>
			<p className='text-lg font-semibold'>Loading Telegram Mini App...</p>
		</div>
	)
}
