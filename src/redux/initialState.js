import { clone } from '@core/utils';
import { defaultStyles, defaultTitle } from '@/constants';
const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyle: defaultStyles,
  openedData: new Date().toJSON(),
};
const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});
export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
