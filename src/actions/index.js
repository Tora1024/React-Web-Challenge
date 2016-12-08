import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const ERROR = 'ERROR';

const ROOT_URL = 'https://www.reddit.com/r/';

export function fetchPosts(category) {
	const request = axios.get(`${ROOT_URL}${category}/.json`);

	return (dispatch) => {
		request.then(({ data }) => {
			dispatch({ type: FETCH_POSTS, payload: data });
		}).catch((error) => {
			dispatch({ type: ERROR, payload: error });
		});
	};
}
