import { URL } from '@/config/api.config'
export interface Winner {
	id: number
	wins: number
	time: number
}
export async function getWinner(id: number) {
	const res = await fetch(`${URL}/winners/${id}`)
	if (!res.ok) throw new Error('Winner not found')
	return res.json()
}

export async function getWinners({
	page = 1,
	limit = 10,
	sort = 'id',
	order = 'ASC',
}: {
	page?: number
	limit?: number
	sort?: 'id' | 'wins' | 'time'
	order?: 'ASC' | 'DESC'
}) {
	const res = await fetch(
		`${URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
	)

	if (!res.ok) throw new Error('Failed to fetch winners')

	const totalCountHeader = res.headers.get('X-Total-Count')
	const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : 0

	const winners = await res.json()
	return { winners, totalCount }
}

export async function createWinner(data: {
	id: number
	wins: number
	time: number
}) {
	const res = await fetch(`${URL}/winners`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})

	if (!res.ok) {
		const err = await res.text()
		throw new Error(`Failed to create winner: ${err}`)
	}

	return await res.json()
}

export async function updateWinner(
	id: number,
	data: { wins: number; time: number }
) {
	const res = await fetch(`${URL}/winners/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})

	if (!res.ok) {
		const err = await res.text()
		throw new Error(`Failed to update winner: ${err}`)
	}

	return await res.json()
}

export async function deleteWinner(id: number) {
	const res = await fetch(`${URL}/winners/${id}`, {
		method: 'DELETE',
	})

	if (!res.ok) {
		throw new Error(`Failed to delete winner with ID: ${id}`)
	}
}
