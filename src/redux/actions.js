import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TITLE,
  TABLE_RESIZE,
} from './types';
import { CHANGE_TEXT } from './types';
// Action creator; Обьекты создающиеся для Redux
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  };
}
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data,
  };
}
