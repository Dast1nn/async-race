import { URL } from '@/config/api.config'
export async function getWinner(id: number) {
	const res = await fetch(`${URL}/winners/${id}`)
	if (!res.ok) throw new Error('Winner not found')
	return res.json()
}
export async function getWinners(page: number, limit: number) {
	const res = await fetch(
		`${URL}/winners?_page=${page}&_limit=${limit}&_sort=time&_order=ASC`
	)
	const totalCount = parseInt(res.headers.get('X-Total-Count') || '0', 10)
	const winners = await res.json()
	return { winners, totalCount }
}
