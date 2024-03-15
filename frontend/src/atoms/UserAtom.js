import { atomWithStorage } from 'jotai/utils';

const user = atomWithStorage('user', null);

export default user;