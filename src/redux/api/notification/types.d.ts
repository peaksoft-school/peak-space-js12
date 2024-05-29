namespace NOTIFICATIONS {
	type GetNotificationResponse = {
		id: Key | null | undefined;
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
