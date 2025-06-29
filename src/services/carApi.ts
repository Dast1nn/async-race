import { URL } from '@/config/api.config'
import { Car } from '@/types/car.type'

export async function getCars(
	page = 1,
	limit = 4
): Promise<{ cars: Car[]; totalCount: number }> {
	const response = await fetch(`${URL}/garage?_page=${page}&_limit=${limit}`)

	if (!response.ok) {
		throw new Error(`Failed to fetch cars: ${response.statusText}`)
	}

	const totalCountHeader = response.headers.get('X-Total-Count')
	const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : 0
	const cars = await response.json()

	return { cars, totalCount }
}
export async function createCar(car: {
	name: string
	color: string
}): Promise<Car> {
	const response = await fetch(`${URL}/garage`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(car),
	})

	if (!response.ok) {
		throw new Error('Failed to create car')
	}

	const data: Car = await response.json()
	return data
}

export async function deleteCar(id: number): Promise<void> {
	await fetch(`${URL}/garage/${id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	})
}
export async function updataCar(
	id: number,
	car: { name: string; color: string }
) {
	const response = await fetch(`${URL}/garage/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(car),
	})
	if (!response.ok) {
		throw new Error('Failed to updata car')
	}
	return response.json()
}
export async function startEngine(id: number) {
	const response = await fetch(`${URL}/engine?id=${id}&status=started`, {
		method: 'PATCH',
	})
	if (!response.ok) throw new Error(`Failed to start engine for car ID: ${id}`)
	return response.json()
}
export async function stopEngine(id: number) {
	const response = await fetch(`${URL}/engine?id=${id}&status=stopped`, {
		method: 'PATCH',
	})
	if (!response.ok) throw new Error(`Failed to stop engine for car ID: ${id}`)
	return response.json()
}
export async function driveEngine(id: number) {
	const response = await fetch(`${URL}/engine?id=${id}&status=drive`, {
		method: 'PATCH',
	})
	if (!response.ok) {
		throw new Error(`Drive failed for car ${id}`)
	}
}
