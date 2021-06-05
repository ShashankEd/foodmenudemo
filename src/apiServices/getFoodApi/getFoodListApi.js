import apiConstants from '../../config/apiConstants';
import {getRequest} from '../requestService';

const endPoint = apiConstants.API_END_POINTS.SEARCH_FOOD;
/**
 * Get the user list
 * @param body : object : payload for GET api call
 */

export default function getFoodListApi(body,qParam) {
  return getRequest(endPoint, body, qParam);
}
