/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NOTIFICATIONS {
	type GetNotificationResponse = {
		id: number;
		message: string;
		senderUserName: string;
		createdAt: number;
		publicationOrStoryImageUrl: string;
		senderProfileImageUrl: string;
		senderUserId: number;
		publicationId: number;
		commentId: null;
		storyId: null;
	}[];
	type GetNotificationRequest = void;
}
