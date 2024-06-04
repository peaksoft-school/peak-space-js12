/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PROFILEFAVORITE {
	type GetFavoriteResponse = {
		id: number;
		publications: string[];
	};
	type GetFavoriteRequest = void;

	type PostFavoriteResponse = {
		id: number;
	};

	type PostFavoriteRequest = {
		id: number;
	};
}
