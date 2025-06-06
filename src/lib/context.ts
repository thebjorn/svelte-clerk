import type {
	SignedInSessionResource,
	ActClaim,
	ClientResource,
	OrganizationCustomPermissionKey,
	OrganizationCustomRoleKey,
	OrganizationResource,
	UserResource,
	SessionStatusClaim,
	JwtPayload
} from '@clerk/types';
import type { HeadlessBrowserClerk, BrowserClerk } from '$lib/types.js';
import { getContext, setContext } from 'svelte';

const _contextKey = '$$_clerk';

export interface ClerkContext {
	clerk: HeadlessBrowserClerk | BrowserClerk | null;
	isLoaded: boolean;
	auth: {
		userId: string | null | undefined;
		sessionId: string | null | undefined;
		actor: ActClaim | null | undefined;
		sessionStatus: SessionStatusClaim | null | undefined;
		sessionClaims: JwtPayload | null | undefined;
		orgId: string | null | undefined;
		orgRole: OrganizationCustomRoleKey | null | undefined;
		orgSlug: string | null | undefined;
		orgPermissions: OrganizationCustomPermissionKey[] | null | undefined;
		factorVerificationAge: [number, number] | null;
	};
	client: ClientResource | null | undefined;
	session: SignedInSessionResource | null | undefined;
	user: UserResource | null | undefined;
	organization: OrganizationResource | null | undefined;
}

export const useClerkContext = (): ClerkContext => {
	const client = getContext(_contextKey);
	if (!client) {
		throw new Error(
			'No Clerk data was found in Svelte context. Did you forget to wrap your component with ClerkProvider?'
		);
	}

	return client as ClerkContext;
};

export const setClerkContext = (context: ClerkContext): void => {
	setContext(_contextKey, context);
};
