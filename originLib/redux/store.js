import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import localStoreSlice, { localStoreSliceName } from "./slices/localStoreSlice";

const needPersistSliceNames = [localStoreSliceName];

/**
 * 保存需要持久化的数据
 *
 * @param state
 */
export const saveState = (state = {}) => {
  try {
    const persistState = {};
    for (let needPersistSliceName of needPersistSliceNames) {
      for (let stateKey in state) {
        if (needPersistSliceName === stateKey) {
          persistState[stateKey] = state[stateKey];
        }
      }
    }
    const serialisedState = JSON.stringify(persistState);
    localStorage.setItem("_store", serialisedState);
  } catch (e) {
    console.log(e);
  }
};

/**
 * 加载储存的数据
 *
 * @returns {any|undefined}
 */
export const loadState = () => {
  try {
    const serialisedState = localStorage.getItem("_store");
    if (!serialisedState) {
      return undefined;
    }
    return JSON.parse(serialisedState);
  } catch (e) {
    return undefined;
  }
};

/**
 * 校验传入的reducer对应的key是否已经被定义过了
 *
 * @param extraReducer 传入的reducer
 * @param existReducer 已经定义过的reducer
 */
const validateExtraReducerHasExistSlice = (extraReducer, existReducer) => {
  const existReducerKeys = Object.keys(existReducer);
  const extraReducerKeys = Object.keys(extraReducer);

  let duplicateKeys = [];
  for (let existReducerKey of existReducerKeys) {
    if (extraReducerKeys.includes(existReducerKey)) {
      duplicateKeys.push(existReducerKey);
    }
  }

  if (duplicateKeys.length > 0) {
    throw new Error(
      `Duplicate keys are defined: [${duplicateKeys.join("、")}]`
    );
  }
};

/**
 * 定义store
 */
let store = null;

/**
 * 初始化store
 *
 * @param preloadedState 初始化state
 * @param extraReducer 额外的reducer
 * @returns store
 */
const createStore = (preloadedState = loadState() || {}, extraReducer = {}) => {
  if (store) {
    return store;
  }

  const thisReducer = {
    user: userSlice,
    store: localStoreSlice,
  };

  validateExtraReducerHasExistSlice(extraReducer, thisReducer);

  store = configureStore({
    reducer: {
      ...extraReducer,
      ...thisReducer,
    },
    preloadedState,
  });

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
};

export default createStore;
