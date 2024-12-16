import { NextResponse } from 'next/server';
import UsersAPI from '@APIs/UsersAPI';

// eslint-disable-next-line consistent-return
export async function middleware(request) {
  let accessToken = request.cookies.get('accessToken');
  accessToken = accessToken && accessToken.value;
  const { pathname } = request.nextUrl;
  const pathnameArr = pathname.split('/');
  const AUTHENTICATION_PATHS = ['login', 'signup'];

  if (
    !accessToken ||
    !(await new UsersAPI().validateAccessToken(accessToken))
  ) {
    // this condition checks if the user is not logged in and is trying to access a page that requires authentication
    if (
      !['login', 'signup', 'reset-password', 'forgot-password'].includes(
        pathnameArr[pathnameArr.length - 1],
      )
    ) {
      return NextResponse.redirect(new URL('/users/login', request.nextUrl));
    }
  } else if (
    AUTHENTICATION_PATHS.includes(pathnameArr[pathnameArr.length - 1])
  ) {
    return NextResponse.redirect(new URL('/users/dashboard', request.nextUrl));
  }
}
export const config = {
  matcher: '/users/:path*',
};
