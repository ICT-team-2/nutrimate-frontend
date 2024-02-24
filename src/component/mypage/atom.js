import { atom } from 'jotai';
import { BOOKMARK_MENU, MY_PAGE_TAB } from '@src/component/mypage/const.js';


export const myPageTabAtom = atom(MY_PAGE_TAB.INFO);
myPageTabAtom.debugLabel = 'myPageTabAtom';

export const profileModalAtom = atom(false);
profileModalAtom.debugLabel = 'myPageProfileModalAtom';

export const profilePromptModalAtom = atom(false);
profilePromptModalAtom.debugLabel = 'myPageProfilePromptModalAtom';

export const uploadedImageAtom = atom(null);
uploadedImageAtom.debugLabel = 'myPageUploadedImageAtom';

export const followerListModalAtom = atom(false);
followerListModalAtom.debugLabel = 'myPageFollowerListModalAtom';

export const followingListModalAtom = atom(false);
followingListModalAtom.debugLabel = 'myPageFollowingListModalAtom';

export const bookmarkMenuAtom = atom(BOOKMARK_MENU.INFO);
bookmarkMenuAtom.debugLabel = 'myPageBookmarkMenuModalAtom';