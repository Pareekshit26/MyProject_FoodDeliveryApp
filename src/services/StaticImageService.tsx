import ApiContants from '../contants/ApiContants';

const getFlatIcon = (
  code = 'IN',
  style = ApiContants.CountryFlag.STYLE.FLAT,
  size = ApiContants.CountryFlag.SIZE[64],
) => `${ApiContants.CountryFlag.BASE_URL}/${code}/${style}/${size}.png`;

const getLogo = imageId => {
  return `${ApiContants.STATIC_IMAGE.BASE_URL}/logo/${imageId}.png`;
};

const getPoster = (imageId, quality = ApiContants.STATIC_IMAGE.QUALITY.SD) =>
  `${ApiContants.STATIC_IMAGE.BASE_URL}/poster/${quality}/${imageId}.png`;

const getGalleryImage = (
  imageId,
  size,
  quality = ApiContants.STATIC_IMAGE.QUALITY.SD,
) => {
  return `${ApiContants.STATIC_IMAGE.BASE_URL}/gallery/${size}/${quality}/${imageId}.png`;
};

export default {getFlatIcon, getLogo, getPoster, getGalleryImage};
