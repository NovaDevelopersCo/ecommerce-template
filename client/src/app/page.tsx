import { ProductsCatalog } from '@widgets/ProductsCatalog'

export default function Home({
	page = 1,
	limit = 5
}: {
	page: number
	limit: number
}) {
	return <main>{/* <ProductsCatalog page={page} limit={limit} /> */}</main>
}
