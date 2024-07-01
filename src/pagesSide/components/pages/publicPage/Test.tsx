// @ts-nocheck
import { useGetTestQuery } from '@/src/redux/api/userPublic';
import { useParams } from 'react-router-dom';

const Test = () => {
	const { publicName } = useParams();
	const { data, error, isLoading } = useGetTestQuery(publicName);
	console.log(data);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			<h1>Test</h1>
			{data?.map((item) => (
				<div>
					<p>{item.tematica}</p>
				</div>
			))}
		</div>
	);
};

export default Test;
