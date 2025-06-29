import { PAGES } from '@/config/pages.config'
import Link from 'next/link'

export function Header() {
	return (
		<header className='py-3'>
			<h1 className='text-center text-3xl font-light text-sky-300 tracking-wide uppercase mb-6'>
				Async-race
			</h1>
			<nav className='flex justify-center items-center gap-6'>
				{PAGES.map(({ label, href }) => (
					<Link
						key={label}
						href={href}
						className='group bg-gradient-to-b from-gray-700 to-gray-600 rounded-xl shadow-md hover:shadow-lg active:shadow-sm active:scale-95 transition-all duration-200 uppercase'
					>
						<div className='bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg px-4 py-2'>
							<span className='font-semibold text-white'>{label}</span>
						</div>
					</Link>
				))}
			</nav>
		</header>
	)
}
