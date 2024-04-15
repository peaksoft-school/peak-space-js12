import scss from './Notifications.module.scss';

const Notifications = () => {
	const data = [
		{
			userImg:
				'https://s3-alpha-sig.figma.com/img/1d05/d59e/2312732dd6546e4a1b3357770704b778?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aivZTgmjie2XVin3-fkJAojmIaosc3Lorlj-sScDPmcAa1j57h8dL2zKVenPHVDRn-9vdAMjb3bZetUXSgCb2u5kFLZmrlujSVfOGuBhlvvIJOr4BjDcTTWIpnYAzu7-K~Npi7xViglUUyot7Q9CNqSglYi6EmeTKGzRqgAhJsFr3S1wOifh0ekke9eFj7lP73IVrnDwoCQo7797kVNCgXGp8cXELwJzfUBFvFErPQVebCUESJN3J4bmL6yVAPKRV~JEjftow1zKuegfL6AmYoz0m9snRLApkEcA4IRohfZx3Vk1Cwt4zsUkVByzDUtk6joR~AXXPJp-YroUtyXKJA__',
			title: 'Yaaziza',
			comment: 'понравился ваш комментарий:“очень понравилась песня”',
			time: '21  мин. назад',
			postImg:
				'https://s3-alpha-sig.figma.com/img/3f5a/40e2/41af36a7fcc1e6d0f6a812a65fa52a1a?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XWeioKuQvfGtM24GxTsa10wq0ihZGVLhBoBKzFGZTvUrAG3CnZdli-bnEvzLDeWW~OQLaVPok1agQBkyEhnQX5oTLTNi-GB-n7jFNb9sYOVi7XSl1OxEnT5rOTndvLAtCJLftU2gimeKNLYdyY2MWNaKdZB4ot~0zcQcOMXNM7b2SJtZ4vsktUQ15WsxO7yaMGOl4u4vA7aieO6RBrC1IIXn4A0MPJyIZANbUf19e7ZZVhCgeryVO~0HipJviOpwTNCiMonjoPEsvODHxXTpfWbCWJLtv5BofNVDinWe7Mr9EUhc~ZgKGSJIJnuut9vgumFBx8OEDclAyFcaa2DlXA__'
		},
		{
			userImg:
				'https://s3-alpha-sig.figma.com/img/4eb1/4b02/61802b25e543f0595b8c08e4b4902fcf?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X2A0Xkx24ooYBUgE8r~Gp-Y9Qfaw4dC1J2l~gDP0N~F1INc4rKlcbGtHo4CVKIxeXASj9YeOQGKuudbY-UcJSiNerObTvgWFWAoWyQ8odgKVdlsci~6GKoOE-TF77NLj-K7MowhSkA9A9IMSLoZeNSPjE46InYsNXxmA1huzgnU1VyBU~03qsXBHZlowXzw6305SNPbyKcJP1PNkJzoxT1yQwLSCjVfA6C96TwjgADC0U2Z0Ph~IjJsknbfRU5tkrKuK7sOQ-rbkYaSejt2PlR39IBjd7m1f4XJRay6VF2SNChLAU5aQnH1M6e0TY20B27Bn~xG4UWjoykpzaEAkPQ__',
			title: 'Bolotov',
			comment: 'понравилась ваша публикация:',
			time: '21  мин. назад',
			postImg:
				'https://s3-alpha-sig.figma.com/img/90b6/6318/ba3b4f15a85b13d7edbf43fef661e60b?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bzgzY4OMqtqqyrktAVUQeFhuabUxHRazNnRag8cqLQdmZU07IP4t~HPazSTjXkMxIFvzYBJD-O--zjQxMaSUGUT~UcK2GvTaA~kxtlopQxg94f71FgWJJSgHI0LnbfnST4x0FNshKPcaWN4~fQPWHXmlNXWijHy8FNtDFQM5cTVgz5ElWN-Piv1wCw-d6aTgT7YN0VVu4y8s8~W0f-IDHpHg8O3yoxSeZhlQWzc67WexsYWypaECE8x2-Kvn7CwC6gy5fpnnqqgzsRCJBlwAEUttES-vWW5XJe4H62FAadJLPdgiuEZ67o3IqIV0vavuJ95UJKabyywGt-CqB8gtqQ__'
		},
		{
			userImg:
				'https://s3-alpha-sig.figma.com/img/9265/f6e3/e22a4d011fdf9bee1bc447fd54300962?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ANhMkENwn1bynRGXaLwBTg2ETrg3uUE1Ma7YRCujH83bT6Wz8jh5CUZKkJOvdDcKkpF2MBYsps1E9WqqF9zrMZ5MX9Ubamns~0P7Hg0b8HrxMHRZKiZ44MqNGBRm02OnqXjJXNNZmzpJKWISG4vwYGRS6Jg5zrJMLp1E~X~9SBlTbj2E6K0pJb7VD8BeEq~lufvWZZkF1-Mq1MSzsiMFpMsdA5uyvqq2N1AnVpNTaxZQI~krQwWwx2bprjRNucx0Y6woXyeGQQchT10FZn8foxbnROIDiU1-Q-GdImsS7umci1KQl0P4n0Hus5npylBbVHb9ws9-ZoQ9Gbg6EaFRPw__',
			title: 'Padme',
			comment: 'хочет с вами подружиться',
			time: '21  мин. назад'
		}
	];
	return (
		<div className={scss.notifi}>
			<div>{/* navbar */}</div>
			<div className={scss.aside}>
				<div className={scss.head}>
					<h2>Уведомления</h2>
				</div>
				<div className={scss.bar}>
					{data.map((item) => (
						<>
							<div className={scss.box}>
								<div className={scss.comment}>
									<div className={scss.start}>
										<img className={scss.userImg} src={item.userImg} alt="" />
										<div>
											<h4>{item.title}</h4>
											<p>{item.comment}</p>
										</div>
									</div>
									<p style={{ color: 'gray', fontSize: '10px' }}>{item.time}</p>
								</div>
								<img src={item.postImg} alt="" />
							</div>
						</>
					))}
				</div>
			</div>
		</div>
	);
};

export default Notifications;
