import getFoodListApi from '../../../apiServices/getFoodApi/getFoodListApi'
import {StoreFetchableData} from '../base';

class getFoodListData extends StoreFetchableData {
  constructor() {
    super('getFoodList', getFoodListApi);
  }
  fetchCall(data, moreData) {
    return dispatch =>
      dispatch(this.actions.fetch()) &&
      this.fetchData(data, moreData)
        .then((res) => {
          dispatch(this.actions.response(res));
        })
        .catch((err) => {
          dispatch(this.actions.error(err));
          console.log(err)
        });
  }
}
export var getFoodList = new getFoodListData();
