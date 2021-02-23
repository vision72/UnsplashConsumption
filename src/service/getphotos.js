import axios from 'axios';
import { PHOTO_LIST_URL } from '../constants';

const getPhotos = async (page) => {
	const response = await axios.get(PHOTO_LIST_URL, { params: { page } });
	return response;
};

export default getPhotos;
