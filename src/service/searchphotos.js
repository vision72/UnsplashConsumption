import axios from 'axios';
import { SEARCH_PHOTO_URL } from '../constants';

const searchPhotos = async (query, page, token) => {
	const response = await axios.get(SEARCH_PHOTO_URL + `&query=${query}&page=${page}`, { cancelToken: token });
	return response;
};

export default searchPhotos;
