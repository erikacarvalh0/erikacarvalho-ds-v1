export const mockData = Array.from({ length: 100 }, (_, index) => ({
	id: index + 1,
	title: `Post Title ${index + 1}`,
	body: `This is the body of post number ${index + 1}.`,
  }));