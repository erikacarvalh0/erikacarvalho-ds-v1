import { iCommentData } from "../../interfaces/molecules";

export const comments = [
	{
	  id: 1,
	  text: 'Parent',
	  replies: [
		{
		  id: 2,
		  text: 'Child',
		  replies: [
			{
			  id: 3,
			  text: 'Grandchild',
			  replies: []
			}
		  ]
		}
	  ]
	}
  ] as iCommentData[];