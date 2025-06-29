'use client'
type PaginationButtonsProps = {
	page: number
	totalPages: number
	onChange: (page: number) => void
}
export function PaginationButton({
	page,
	totalPages,
	onChange,
}: PaginationButtonsProps) {
	return (
		<div className='flex items-center justify-end gap-4 '>
			<button
				onClick={() => onChange(1)}
				disabled={page === 1}
				className='px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50'
			>
				Previous
			</button>

			<span className='text-sky-300'>
				Page {page} of {totalPages}
			</span>

			<button
				onClick={() => onChange(totalPages)}
				disabled={page >= totalPages}
				className='px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50'
			>
				Next
			</button>
		</div>
	)
}
