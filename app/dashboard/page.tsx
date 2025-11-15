'use client'
import { useEffect, useState } from 'react'
import { useUserStore } from '../../lib/store'

export default function Dashboard() {
	const accessToken = useUserStore(state => state.accessToken)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [userData, setUserData] = useState<any>(null)

	useEffect(() => {
		if (!accessToken) return

		fetch('https://helminthoid-clumsily-xuan.ngrok-free.dev/api/v1/users/me', {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
			.then(res => res.json())
			.then(data => setUserData(data))
	}, [accessToken])

	if (!userData) return <p>Loading...</p>

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Welcome, {userData.full_name}</h1>
			<p>Role: {userData.role?.name}</p>
			<p>Telegram ID: {userData.telegram_id}</p>
		</div>
	)
}
