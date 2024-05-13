/* eslint-disable @typescript-eslint/no-unused-vars */
namespace USERPUBLIC {
	type GetUserPublicResponse = {
		id: number;
		img: string;
	}[];

	type GetUserPublicRequest = void;

	type PostUserPublicResponse = {
		id: number;
		img: string;
	};

  type PostUserPublicRequest = {
    id: number;
    img: string
  }

	type GetPublicVideoResponse ={
		id: number;
		img: string
	}[] ;

	type GetPublicVideoRequest = void
}
