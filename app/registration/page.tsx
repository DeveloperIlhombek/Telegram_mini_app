'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useUserStore } from '../../lib/store'

export default function RegistrationPage() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const telegramId = useUserStore(state => state.telegramId)
	const setAccessToken = useUserStore(state => state.setAccessToken)

	const [step, setStep] = useState(searchParams.get('next_step') || 'full_name')
	const [value, setValue] = useState('')

	const handleNext = async () => {
		const res = await fetch(
			'http://localhost:8000/api/v1/registration/submit-step',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					telegram_id: telegramId,
					step_name: step,
					value,
				}),
			}
		)

		const data = await res.json()
		if (data.status === 'ok') {
			setAccessToken(data.access_token)
			router.push('/dashboard')
		} else if (data.status === 'next') {
			setStep(data.next_step)
			setValue('')
		}
	}

	return (
		<div className='p-6 max-w-md mx-auto'>
			<h2 className='text-xl font-bold mb-4'>Registration Step: {step}</h2>
			<Input
				type='text'
				placeholder={`Enter ${step}`}
				value={value}
				onChange={e => setValue(e.target.value)}
				className='mb-4'
			/>
			<Button onClick={handleNext}>Next</Button>
		</div>
	)
}
