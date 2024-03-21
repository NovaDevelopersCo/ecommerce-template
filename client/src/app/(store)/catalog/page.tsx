import { ProductsCatalog } from '@widgets/ProductsCatalog'

export default function Page({
	page = '1',
	limit = '5'
}: {
	page: string
	limit: string
}) {
	return <ProductsCatalog page={+page} limit={+limit} />
}
