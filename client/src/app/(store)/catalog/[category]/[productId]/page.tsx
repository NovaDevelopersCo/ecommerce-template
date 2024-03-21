export default function Page({
	params
}: {
	params: { category: string; productId: string }
}) {
	const { category, productId } = params
	return (
		<div>
			Item: {productId} from {category}
		</div>
	)
}
