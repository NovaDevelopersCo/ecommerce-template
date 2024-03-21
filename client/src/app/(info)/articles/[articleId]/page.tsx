export default function Page({ params }: { params: { articleId: string } }) {
	const { articleId } = params
	return <div>Article: {articleId}</div>
}
