import { atom } from 'jotai';
import { MY_PAGE_TAB } from '@src/component/mypage/const.js';


export const myPageTabAtom = atom(MY_PAGE_TAB.INFO);

export const profileModalAtom = atom(false);
export const profilePromptModalAtom = atom(false);
export const uploadedImageAtom = atom(null);
export const followerListModalAtom = atom(false);
export const followingListModalAtom = atom(false);