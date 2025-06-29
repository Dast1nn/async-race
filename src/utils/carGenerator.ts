const brands = [
	'Tesla',
	'BMW',
	'Audi',
	'Toyota',
	'Ford',
	'Chevy',
	'Nissan',
	'Honda',
	'Lexus',
	'Mazda',
]

function getRandomName(): string {
	const brand = brands[Math.floor(Math.random() * brands.length)]
	return `${brand} `
}
function getRandomColor(): string {
	const r = Math.floor(Math.random() * 256)
		.toString(16)
		.padStart(2, '0')
	const g = Math.floor(Math.random() * 256)
		.toString(16)
		.padStart(2, '0')
	const b = Math.floor(Math.random() * 256)
		.toString(16)
		.padStart(2, '0')
	return `#${r}${g}${b}`
}

export function generateRandomCars(
	count: number
): { name: string; color: string }[] {
	return Array.from({ length: count }, () => ({
		name: getRandomName(),
		color: getRandomColor(),
	}))
}
