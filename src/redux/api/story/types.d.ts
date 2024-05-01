/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STORY {
	type GetStoryResponse = {
		[x: string]: Key | null | undefined;
		backImg: string;
		storyImg: string;
	}[];
	type GetStoryRequest = void;
}
