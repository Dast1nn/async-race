type GenerateCarsButtonProps = {
	onGenerate: () => void
}

export function GenerateButton({ onGenerate }: GenerateCarsButtonProps) {
	return (
		<div>
			<button
				className='group bg-gradient-to-b from-gray-700 to-gray-600 rounded-xl shadow-md hover:shadow-lg active:shadow-sm active:scale-95 transition-all duration-200 uppercase mb-2.5'
				onClick={onGenerate}
			>
				<div className='bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg px-4 py-2'>
					<span className='font-semibold text-white'>
						Generate Random 100 cars
					</span>
				</div>
			</button>
		</div>
	)
}
