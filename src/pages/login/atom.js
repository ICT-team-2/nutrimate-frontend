import {atom} from 'jotai';
import {atomWithStorage, createJSONStorage} from 'jotai/vanilla/utils';


const session = createJSONStorage(() => sessionStorage);

export const userIdAtom = atomWithStorage('userId', 0, session);
