export default function Page({ params }: { params: { category: string } }) {
	const { category } = params
	return <div>Category {category}</div>
}
