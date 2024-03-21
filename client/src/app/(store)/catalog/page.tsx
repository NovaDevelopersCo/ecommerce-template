import { ProductsCatalog } from '@widgets/ProductsCatalog'

export default function Page({ page = '1', limit = '12' }: { page: string, limit: string }) {
	return <ProductsCatalog page={+page} limit={+limit} />
}
