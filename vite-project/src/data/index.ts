export default {
	user: [
		{
			id: 1,
			name: "John Doe",
			email: "3wNt1@example.com",
			isAdmin: true,
		},
		{
			id: 2,
			name: "David Smith",
			email: "test@example.com",
			isAdmin: false,
		},
	],
	shops: [
		{
			id: 1,
			userId: 1,
			name: "Shop 1",
			layouts: {
				lg: [
					{ i: "1", x: 0, y: 0, w: 4, h: 2 },
					{ i: "2", x: 4, y: 0, w: 4, h: 2 },
					{ i: "3", x: 8, y: 0, w: 4, h: 2 },
				],
				md: [
					{ i: "1", x: 0, y: 0, w: 6, h: 2 },
					{ i: "2", x: 6, y: 0, w: 6, h: 2 },
					{ i: "3", x: 0, y: 2, w: 6, h: 2 },
				],
				sm: [
					{ i: "1", x: 0, y: 0, w: 12, h: 2 },
					{ i: "2", x: 0, y: 2, w: 12, h: 2 },
					{ i: "3", x: 0, y: 4, w: 12, h: 2 },
				],
				xs: [
					{ i: "1", x: 0, y: 0, w: 6, h: 2 },
					{ i: "2", x: 0, y: 2, w: 6, h: 2 },
					{ i: "3", x: 0, y: 4, w: 6, h: 2 },
				],
				xxs: [
					{ i: "1", x: 0, y: 0, w: 4, h: 2 },
					{ i: "2", x: 0, y: 2, w: 4, h: 2 },
					{ i: "3", x: 0, y: 4, w: 4, h: 2 },
				],
			},
		},
		{
			id: 2,
			userId: 1,
			name: "Shop 2",
			layouts: {
				lg: [
					{ i: "1", x: 0, y: 0, w: 4, h: 2 },
					{ i: "2", x: 4, y: 0, w: 4, h: 2 },
					{ i: "3", x: 8, y: 0, w: 4, h: 2 },
				],
				md: [
					{ i: "1", x: 0, y: 0, w: 6, h: 2 },
					{ i: "2", x: 6, y: 0, w: 6, h: 2 },
					{ i: "3", x: 0, y: 2, w: 6, h: 2 },
				],
				sm: [
					{ i: "1", x: 0, y: 0, w: 12, h: 2 },
					{ i: "2", x: 0, y: 2, w: 12, h: 2 },
					{ i: "3", x: 0, y: 4, w: 12, h: 2 },
				],
				xs: [
					{ i: "1", x: 0, y: 0, w: 6, h: 2 },
					{ i: "2", x: 0, y: 2, w: 6, h: 2 },
					{ i: "3", x: 0, y: 4, w: 6, h: 2 },
				],
				xxs: [
					{ i: "1", x: 0, y: 0, w: 4, h: 2 },
					{ i: "2", x: 0, y: 2, w: 4, h: 2 },
					{ i: "3", x: 0, y: 4, w: 4, h: 2 },
				],
			},
		},
		{
			id: 3,
			userId: 2,
			name: "Shop 3",
			layouts: {
				lg: [
					{ i: "1", x: 0, y: 0, w: 4, h: 2 },
					{ i: "2", x: 4, y: 0, w: 4, h: 2 },
					{ i: "3", x: 8, y: 0, w: 4, h: 2 },
				],
				md: [
					{ i: "1", x: 0, y: 0, w: 6, h: 2 },
					{ i: "2", x: 6, y: 0, w: 6, h: 2 },
					{ i: "3", x: 0, y: 2, w: 6, h: 2 },
				],
				sm: [
					{ i: "1", x: 0, y: 0, w: 12, h: 2 },
					{ i: "2", x: 0, y: 2, w: 12, h: 2 },
					{ i: "3", x: 0, y: 4, w: 12, h: 2 },
				],
				xs: [
					{ i: "1", x: 0, y: 0, w: 6, h: 2 },
					{ i: "2", x: 0, y: 2, w: 6, h: 2 },
					{ i: "3", x: 0, y: 4, w: 6, h: 2 },
				],
				xxs: [
					{ i: "1", x: 0, y: 0, w: 4, h: 2 },
					{ i: "2", x: 0, y: 2, w: 4, h: 2 },
					{ i: "3", x: 0, y: 4, w: 4, h: 2 },
				],
			},
		},
	],

	breakpoints: {
		lg: 1200,
		md: 996,
		sm: 768,
		xs: 480,
		xxs: 0,
	},
	maxWidthBreakpoints: {
		lg: 1900,
		md: 1119,
		sm: 995,
		xs: 767,
		xxs: 479,
	},
};
