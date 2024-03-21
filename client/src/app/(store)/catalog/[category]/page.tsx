export default function Page({ params }: { params: { category: string } }) {
	const { category } = params
	return (
		<div>
			<h1>Category {category}</h1>
		</div>
	)
}
