/* eslint-disable @typescript-eslint/no-unused-vars */

interface Img {
	img: string;
	id?: number | string;
}
namespace Edit {
	type PutRequest = {
		newImg: Img;
		id: number | string;
	};
	type PutResponse = {
		id: number | string;
		newImg: Img;
	}[];
}
