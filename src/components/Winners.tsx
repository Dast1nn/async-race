'use client'

import { getCar } from '@/services/carApi'
import { getWinners } from '@/services/winnerApi'
import { Car } from '@/types/car.type'
import { Winner } from '@/types/winner.type'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { PaginationButton } from './PaginationButton'

interface CombinedWinner extends Winner, Car {}

export function Winners() {
	const [winners, setWinners] = useState<CombinedWinner[]>([])
	const [page, setPage] = useState(1)
	const [totalCount, setTotalCount] = useState(0)
	const limit = 10

	useEffect(() => {
		const fetchWinnersWithCarInfo = async () => {
			try {
				const { winners, totalCount } = await getWinners({ page, limit })

				const enriched = await Promise.all(
					winners.map(async (winner: Winner) => {
						try {
							const car = await getCar(winner.id)
							return {
								...winner,
								name: car.name,
								color: car.color,
							}
						} catch {
							return {
								...winner,
								name: 'Unknown',
								color: '#999999',
							}
						}
					})
				)

				setWinners(enriched)
				setTotalCount(totalCount)
			} catch (error) {
				console.error('Failed to fetch winners with car info:', error)
			}
		}

		fetchWinnersWithCarInfo()
	}, [page])

	const totalPages = Math.ceil(totalCount / limit)

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold mb-4'>Winners List</h1>
			<table className='w-full border border-gray-300'>
				<thead>
					<tr>
						<th className='px-4 py-2 border'>ID</th>
						<th className='px-4 py-2 border'>Color</th>
						<th className='px-4 py-2 border'>Name</th>
						<th className='px-4 py-2 border'>Wins</th>
						<th className='px-4 py-2 border'>Best Time (s)</th>
					</tr>
				</thead>
				<tbody>
					{winners.map(winner => (
						<tr key={winner.id}>
							<td className='px-4 py-2 border text-center'>{winner.id}</td>
							<td className='px-4 py-2 border text-center'>
								<div>
									<FontAwesomeIcon
										icon={faCarSide}
										style={{
											color: winner.color,
											fontSize: '35px',
										}}
									/>
								</div>
							</td>
							<td className='px-4 py-2 border text-center'>{winner.name}</td>
							<td className='px-4 py-2 border text-center'>{winner.wins}</td>
							<td className='px-4 py-2 border text-center'>
								{(winner.time / 1000).toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<h1 className='text-2xl font-semibold mt-4'>Pagination</h1>
				<PaginationButton
					page={page}
					totalPages={totalPages}
					onChange={setPage}
				/>
			</div>
		</div>
	)
}
