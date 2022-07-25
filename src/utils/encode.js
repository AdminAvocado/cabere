import { sha256 } from 'js-sha256';

export const encode = (string) => sha256(string);
