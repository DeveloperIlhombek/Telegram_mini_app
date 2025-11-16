'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useUserStore } from '../lib/store'
import {
	expandTelegram,
	getTelegram,
	getTelegramInitData,
} from '../lib/telegram'

export default function HomePage() {
	const router = useRouter()
	const setAccessToken = useUserStore(s => s.setAccessToken)
	const setTelegramId = useUserStore(s => s.setTelegramId)

	useEffect(() => {
		const tg = getTelegram()
		if (!tg) return

		expandTelegram()

		const initData = getTelegramInitData()
		if (!initData) return

		fetch(
			`https://helminthoid-clumsily-xuan.ngrok-free.dev/api/v1/auth/telegram-login`,
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
			<p className='text-xl font-semibold'>Loading...</p>
		</div>
	)
}
