import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
	name: string
	time: number
	onClose: () => void
}
export function WinnerModal({ name, time, onClose }: Props) {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return createPortal(
		<div className='fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded shadow-lg z-50'>
			Winner: {name} — Time: {(time / 1000).toFixed(2)}s
			<button
				onClick={onClose}
				className='ml-4 px-3 py-1 bg-white text-green-600 rounded'
			>
				Close
			</button>
		</div>,
		document.getElementById('portal-root')!
	)
}
