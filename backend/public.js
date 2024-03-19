import path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const publicDir = path.join(__dirname, "public/");
export const publicAvaDir = path.join(publicDir, "images/avatars");