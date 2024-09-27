import ApiContants from '../contants/ApiContants';

const getFlatIcon = (
  code = 'IN',
  style = ApiContants.CountryFlag.STYLE.FLAT,
  size = ApiContants.CountryFlag.SIZE[64],
) => `${ApiContants.CountryFlag.BASE_URL}/${code}/${style}/${size}.png`;

export default {getFlatIcon};
