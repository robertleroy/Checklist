import { sequence } from '@sveltejs/kit/hooks';
import { handleAuth } from '$lib/hooks/handleAuth.js';
import { handleTheme } from '$lib/hooks/handleTheme.js';

export const handle = sequence(handleAuth, handleTheme);