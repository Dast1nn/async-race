import { updataCar } from '@/services/carApi'
import { Car } from '@/types/car.type'
import { useState } from 'react'

type EditCarFormProps = {
	car: Car
	onUpdate: (updatedCar: Car) => void
}

export function EditCarForm({ car, onUpdate }: EditCarFormProps) {
	const [name, setName] = useState(car.name)
	const [color, setColor] = useState(car.color)
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const updated = await updataCar(car.id, { name, color })
			onUpdate(updated)
			setName('')
			setColor('#000000')
		} catch (error) {
			console.error('Error updating car:', error)
		}
	}
	return (
		<form onSubmit={handleSubmit} className='flex gap-2 items-center'>
			<input
				type='text'
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder='Update car name'
				className='border-2 px-2 py-1 rounded border-sky-300  outline-none focus:border-purple-400  transition duration-300 ease-in-out'
			/>
			<input
				type='color'
				value={color}
				onChange={e => setColor(e.target.value)}
				className='w-10 h-10 border rounded border-none'
			/>
			<button
				type='submit'
				disabled={car.id === 0}
				className='px-3 py-1 bg-sky-600 text-white rounded'
			>
				Save
			</button>
		</form>
	)
}
