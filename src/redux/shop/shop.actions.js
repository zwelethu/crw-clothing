import ShopActionTypes from './shop.types';
import { firestore } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionError = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    let stuff = [];

    dispatch(fetchCollectionsStart());
    firestore
      .collection('collection')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { title, items } = doc.data();
          stuff.push({
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
          });
        });
      })
      .then(() => {
        return stuff.reduce((accumulator, collection) => {
          accumulator[collection.title.toLowerCase()] = collection;
          return accumulator;
        }, {});
      })
      .then((data) => {
        dispatch(fetchCollectionSuccess(data));
      })
      .catch((error) => dispatch(fetchCollectionError(error.message)));
  };
};
