import { useGetFavouritesQuery } from '@/src/redux/api/favourites';
import scss from './Style.module.scss';
import { useEffect, useState } from 'react';

interface Types {
	link: string;
	id: number;
}

const Favourites = () => {
	const { data, isLoading, isError } = useGetFavouritesQuery();
	const [filteretData, setFilteredData] = useState<Types[]>([]);
	console.log(data, 'favorite');
	useEffect(() => {
		if (data?.publications) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const transformedPublications = data.publications.map((item: any) => {
				const id = Object.keys(item)[0];
				const link = item[id];
				return { id: Number(id), link: link };
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			setFilteredData(transformedPublications as any);
		}
	}, [data]);

	return (
		<div className={scss.favorite}>
			{isError ? (
				<p>Error fetching data</p>
			) : (
				<>{/* <p>Data loaded successfully</p> */}</>
			)}

			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<>
					{filteretData?.map((item) => (
						<div className={scss.widget} key={item.id}>
							<img src={item.link} alt="photo" />
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default Favourites;
