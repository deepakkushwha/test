
// export const CMSURL= 'http://localhost:1337/';
export const ENV = process.env.REACT_APP_ENV;
export const CMSURL = process.env.REACT_APP_CMSURL;
export const REFERENCEURL = process.env.REACT_APP_REFERENCE;
export const CMS_TOKEN = process.env.REACT_APP_CMS_TOKEN;

export const PAYMENTURL = 'http://3.111.41.161:8181/api/v1/';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = process.env.REACT_APP_OAUTH2_REDIRECT_URI;

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const PAGINATION_ARRAY = [10, 20, 50, 100];
export const POLICY_ENUMS = ["STANDALONE_CPA","MISCELLANEOUS","PCCV","GCCV","PVT_CAR","TWO_WHEELER"];
