import { Winners } from '@/components/Winners'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Winners',
}

export default function Page() {
	return (
		<div>
			<Winners />
		</div>
	)
}
