// Validates a ?next= redirect target so we never open-redirect to external URLs
// and never bounce a signed-in user back to an auth page.
const ALLOWED_PATHS = /^\/[a-zA-Z0-9/_\-?=&#%]*$/;
const AUTH_PAGES = ["/login", "/signup"];

export function authReturnPath(next: string | null | undefined): string {
  if (!next || next.startsWith("//") || !ALLOWED_PATHS.test(next)) {
    return "/account";
  }

  const isAuthPage = AUTH_PAGES.some(
    (page) => next === page || next.startsWith(page + "/") || next.startsWith(page + "?"),
  );
  return isAuthPage ? "/account" : next;
}
