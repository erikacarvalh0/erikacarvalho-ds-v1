import { iBreadcrumbData } from "../../interfaces/atoms";

export const categories: iBreadcrumbData[] = [
	{
	  id: 1,
	  name: 'Electronics',
	  children: [
		{
		  id: 2,
		  name: 'Computers',
		  children: [
			{ id: 3, name: 'Laptops' },
			{ id: 4, name: 'Desktops' }
		  ]
		}
	  ]
	},
	{
	  id: 5,
	  name: 'Clothing',
	  children: [
		{
		  id: 6,
		  name: 'Men',
		  children: [
			{ id: 7, name: 'Shirts' },
			{ id: 8, name: 'Pants' }
		  ]
		}
	  ]
	}
  ];
  