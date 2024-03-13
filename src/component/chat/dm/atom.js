import { atom } from 'jotai';

export const chatroomIdAtom = atom(undefined);
chatroomIdAtom.debugLabel = 'chatroomIdAtom';

export const changeChatroomNameModalAtom = atom(false);
changeChatroomNameModalAtom.debugLabel = 'changeChatroomNameModalAtom';

export const openedChatroomAtom = atom({
  chatroomId: undefined,
  chatroomName: '',

});
openedChatroomAtom.debugLabel = 'openedChatroomAtom';