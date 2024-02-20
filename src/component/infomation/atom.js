import { atom } from 'jotai';
import {
  INFO_TABS,
  NEWS_CATEGORY,
  NUTRIENTS_GENDER_CATEGORY,
  RECOMMAND_MENU,
} from '@src/component/infomation/const.js';

export const infoTabStateAtom = atom(INFO_TABS.NEWS);
infoTabStateAtom.debugLabel = 'infoTabStateAtom';

export const recommandMenuStateAtom = atom(RECOMMAND_MENU.NUTRIENTS);
recommandMenuStateAtom.debugLabel = 'recommandMenuStateAtom';

export const selectedNewsCategoryAtom = atom(NEWS_CATEGORY.FOOD);
selectedNewsCategoryAtom.debugLabel = 'selectedNewsCategoryAtom';

export const selectedNutrientsGenderCategoryAtom = atom(NUTRIENTS_GENDER_CATEGORY.ALL);
selectedNutrientsGenderCategoryAtom.debugLabel = 'selectedNutrientsGenderCategoryAtom';


export const selectedNutrientsAgeCategoryAtom = atom(NUTRIENTS_GENDER_CATEGORY.ALL);
selectedNutrientsAgeCategoryAtom.debugLabel = 'selectedNutrientsAgeCategoryAtom';


export const searchKeywordAtom = atom('');
searchKeywordAtom.debugLabel = 'infomationSearchKeywordAtom';

export const searchCategoryAtom = atom('');
searchCategoryAtom.debugLabel = 'infomationSearchCategoryAtom';