import { atom } from 'jotai';
import {
  INFO_TABS,
  NEWS_CATEGORY,
  NUTRIENTS_GENDER_CATEGORY,
  RECOMMAND_MENU,
} from '@src/component/infomation/const.js';

export const infoTabStateAtom = atom(INFO_TABS.NEWS);
export const recommandMenuStateAtom = atom(RECOMMAND_MENU.NUTRIENTS);
export const selectedNewsCategoryAtom = atom(NEWS_CATEGORY.FOOD);
export const selectedNutrientsGenderCategoryAtom = atom(NUTRIENTS_GENDER_CATEGORY.ALL);
export const selectedNutrientsAgeCategoryAtom = atom(NUTRIENTS_GENDER_CATEGORY.ALL);