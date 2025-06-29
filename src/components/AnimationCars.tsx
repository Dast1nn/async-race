import { startEngine, stopEngine } from '@/services/carApi'
import { useEffect, useState } from 'react'

type Props = {
	id: number
	color: string
	name: string
	shouldStart: boolean
	shouldReset: boolean
}
export function AnimationCars({
	id,
	color,
	name,
	shouldStart,
	shouldReset,
}: Props) {
	const [position, setPosition] = useState(0)
	const [duration, setDuration] = useState('0s')
	const [isRunning, setIsRunning] = useState(false)
	const handleStart = async () => {
		try {
			const { velocity, distance } = await startEngine(id)
			const time = distance / velocity
			setDuration(`${time}ms`)
			setIsRunning(true)
			setPosition(1)
		} catch (error) {
			console.error('Start failed:', error)
		}
	}

	const handleStop = async () => {
		try {
			await stopEngine(id)
			setPosition(0)
			setDuration('0.5s')
			setTimeout(() => {
				setIsRunning(false)
			}, 500)
		} catch (error) {
			console.error('Stop failed:', error)
		}
	}
	useEffect(() => {
		if (shouldStart) {
			handleStart()
		}
	}, [shouldStart])

	useEffect(() => {
		if (shouldReset) {
			handleStop()
		}
	}, [shouldReset])

	return (
		<div className='mb-8'>
			<div className='flex items-center gap-4 mb-2'>
				<button
					onClick={handleStart}
					disabled={isRunning}
					className={`px-3 py-1 rounded ${
						isRunning
							? 'bg-green-300 cursor-not-allowed'
							: 'bg-green-600 text-white'
					}`}
				>
					Start
				</button>
				<button
					onClick={handleStop}
					disabled={!isRunning}
					className={`px-3 py-1 rounded ${
						!isRunning
							? 'bg-red-300 cursor-not-allowed'
							: 'bg-red-600 text-white'
					}`}
				>
					Stop
				</button>
				<span className='text-xl ' style={{ color: color }}>
					{name}
				</span>
			</div>

			<div className='relative h-14 bg-sky-900 rounded overflow-hidden w-[1500px]'>
				<div
					className='absolute top-1 left-0 w-12 h-12 rounded-full'
					style={{
						backgroundColor: color,
						transform: position === 1 ? 'translateX(90vw)' : 'translateX(0)',
						transition: `transform ${duration} linear`,
					}}
				/>
			</div>
		</div>
	)
}
