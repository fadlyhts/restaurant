import CONFIG from './config';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}/list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  SEARCH: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
  REVIEW: `${CONFIG.BASE_URL}/review`,
  IMAGE: {
    SMALL: (pictureId) => `${CONFIG.BASE_IMAGE_URL}/small/${pictureId}`,
    MEDIUM: (pictureId) => `${CONFIG.BASE_IMAGE_URL}/medium/${pictureId}`,
    LARGE: (pictureId) => `${CONFIG.BASE_IMAGE_URL}/large/${pictureId}`,
  },
};

export default API_ENDPOINT;
