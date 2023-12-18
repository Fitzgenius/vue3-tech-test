import axios from 'axios'
import { serialize } from './utils'

const BASE_URL = 'https://tst-api.feeditback.com/'
const REQUEST_HEADERS = {
  'X-FIB-API-LANGUAGE': 'en-gb',
  'X-FIB-API-AUTH-TYPE': 'exam',
  'X-FIB-API-AUTH-TOKEN': 'F6HCAFVHPEg3"Sw#',
}

const callAPI = async (path, params = []) => {
  let data
  const queryParams = serialize(params)
  await axios.get(`${BASE_URL}${path}?${queryParams}`, {
    headers: REQUEST_HEADERS,
  }).then(res => {
    data = res
  })
    .catch(err => console.log(`API ERROR: ${err}`))
  return data
}

export default callAPI
