import { initGlobalState  } from 'qiankun';
// 初始化 state
const initialState = {
  key: '',
};
const actions = initGlobalState( initialState );

export default actions;