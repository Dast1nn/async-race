'use client'
import { createCar } from '@/services/carApi'
import { Car } from '@/types/car.type'
import React, { useState } from 'react'

type CreateCarFormProps = {
	onSuccess: (car: Car) => void
}
export function CreateCarForm({ onSuccess }: CreateCarFormProps) {
	const [name, setName] = useState('')
	const [color, setColor] = useState('#000000')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const newCar = await createCar({ name, color })
			onSuccess(newCar)
			setName('')
			setColor('#000000')
		} catch (error) {
			console.error('Error creating car:', error)
		}
	}
	return (
		<form onSubmit={handleSubmit} className='flex gap-2 items-center mb-4'>
			<input
				type='text'
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder='Car name'
				required
				className='border px-2 py-1 rounded  outline-none'
			/>
			<input
				type='color'
				value={color}
				onChange={e => setColor(e.target.value)}
				className='w-10 h-10 p-0 border rounded border-none'
			/>
			<button
				type='submit'
				className='px-3 py-1 bg-green-600 text-white rounded border-none'
			>
				Create
			</button>
		</form>
	)
}
