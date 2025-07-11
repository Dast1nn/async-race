'use client'
import {
	createCar,
	deleteCar,
	driveEngine,
	getCars,
	startEngine,
} from '@/services/carApi'
import { createWinner, getWinner, updateWinner } from '@/services/winnerApi'
import { Car } from '@/types/car.type'
import { defaultCar } from '@/types/defaultCar.type'
import { generateRandomCars } from '@/utils/carGenerator'
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { AnimationCars } from './AnimationCars'
import { CreateCarForm } from './CreateCarForm'
import { EditCarForm } from './EditCarForm'
import { GenerateButton } from './GenerateButton'
import { PaginationButton } from './PaginationButton'
import { WinnerModal } from './WinnerModal'
export function Garage() {
	const [cars, setCars] = useState<Car[]>([])
	const [totalCount, setTotalCount] = useState(0)
	const [page, setPage] = useState(1)
	const [editingId, setEditingId] = useState<number | null>(null)
	const [shouldStartRace, setShouldStartRace] = useState(false)
	const [shouldReset, setShouldReset] = useState(false)

	const [winner, setWinner] = useState<null | {
		id: number
		name: string
		time: number
	}>(null)

	const itemsPerPage = 4
	const handleGenerateCars = async () => {
		const cars = generateRandomCars(100)
		try {
			await Promise.all(cars.map(car => createCar(car)))
			const { cars: newCars, totalCount } = await getCars(page)

			setCars(newCars)
			setPage(1)
			setTotalCount(totalCount)
		} catch (error) {
			console.error('Failed to generate cars:', error)
		}
	}

	const handleDeleteCar = async (id: number) => {
		try {
			await deleteCar(id)
			setCars(prevCars => prevCars.filter(car => car.id !== id))
			setTotalCount(prevCount => prevCount - 1)
		} catch (error) {
			console.error(`Failed to delete car with ID ${id}:`, error)
		}
	}

	// async function deleteCarsInRange(start: number, end: number) {
	// 	for (let id = start; id <= end; id++) {
	// 		try {
	// 			await deleteCar(id)
	// 			console.log(`Deleted car with ID: ${id}`)
	// 		} catch (error) {
	// 			console.error(`Failed to delete car with ID ${id}:`, error)
	// 		}
	// 	}
	// }
	// deleteCarsInRange(21, 320)
	useEffect(() => {
		const fetchCars = async () => {
			try {
				const response = await getCars(page)
				setCars(response.cars)
				setTotalCount(response.totalCount)
			} catch (error) {
				console.error('Error fetching cars:', error)
			}
		}
		fetchCars()
	}, [page])
	const handleAddCar = (newCar: Car) => {
		setCars(prev => [...prev, newCar])
	}
	const handleUpdateCar = (updatedCar: Car) => {
		setCars(prev =>
			prev.map(car => (car.id === updatedCar.id ? updatedCar : car))
		)
	}
	const handleRace = async () => {
		setWinner(null)
		setShouldStartRace(false)

		setTimeout(() => setShouldStartRace(true), 0)

		try {
			const { cars: allCars } = await getCars(1, 200)

			const results: { id: number; name: string; time: number }[] = []

			await Promise.allSettled(
				allCars.map(async car => {
					try {
						const { velocity, distance } = await startEngine(car.id)
						const time = distance / velocity
						await driveEngine(car.id)
						results.push({ id: car.id, name: car.name, time })

						try {
							const existing = await getWinner(car.id)
							await updateWinner(car.id, {
								wins: existing.wins + 1,
								time: Math.min(existing.time, time),
							})
						} catch {
							await createWinner({ id: car.id, wins: 1, time })
						}
					} catch (err) {
						console.warn(`Car ${car.id} failed:`, err)
					}
				})
			)

			if (results.length > 0) {
				const fastest = results.reduce((prev, curr) =>
					curr.time < prev.time ? curr : prev
				)
				setWinner(fastest)
			} else {
				console.log('No cars finished')
			}
		} catch (error) {
			console.error('Failed to race all cars:', error)
		}

		setShouldStartRace(false)
	}

	const totalPages = Math.ceil(totalCount / itemsPerPage)
	const selectedCar = cars.find(car => car.id === editingId)
	return (
		<div className='p-4'>
			<div className='flex flex-row gap-5 justify-center mb-3 h-10'>
				<button
					onClick={handleRace}
					className='px-4 py-2 bg-sky-600 text-white rounded-lg font-semibold uppercase'
				>
					Race
				</button>
				<button
					onClick={() => {
						setShouldReset(true)
						setTimeout(() => setShouldReset(false), 0)
						setWinner(null)
					}}
					className='px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold uppercase'
				>
					Reset
				</button>
				<div>
					<GenerateButton onGenerate={handleGenerateCars} />
				</div>
				<div>
					<CreateCarForm onSuccess={handleAddCar} />
				</div>
				<div>
					<EditCarForm
						car={selectedCar ?? defaultCar}
						onUpdate={handleUpdateCar}
					/>
				</div>
			</div>
			<div className='w-full max-h'>
				<p className='mb-6 text-gray-600'>Total Cars: {totalCount}</p>
				<div className='w-full border-t pt-4'>
					<ul className='space-y-10'>
						{cars.map(car => (
							<li key={car.id} className='w-full'>
								<div className='flex items-center  gap-2 border-b py-3 w-full'>
									<div className='flex  items-center gap-3'>
										<div className='flex flex-col gap-2.5'>
											<button
												onClick={() => handleDeleteCar(car.id)}
												className='px-3 py-1 bg-red-600 text-white rounded'
											>
												<FontAwesomeIcon icon={faTrash} />
											</button>
											<button
												onClick={() => setEditingId(car.id)}
												className='px-3 py-1 bg-green-600 text-white rounded'
											>
												<FontAwesomeIcon icon={faCheck} />
											</button>
										</div>

										<AnimationCars
											id={car.id}
											color={car.color}
											name={car.name}
											shouldStart={shouldStartRace}
											shouldReset={shouldReset}
										/>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
				{winner && (
					<WinnerModal
						name={winner.name}
						time={winner.time}
						onClose={() => setWinner(null)}
					/>
				)}
			</div>
			<h1 className='text-2xl font-semibold mt-2'>Garage List</h1>
			<PaginationButton
				page={page}
				totalPages={totalPages}
				onChange={setPage}
			/>
		</div>
	)
}
