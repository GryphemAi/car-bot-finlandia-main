import { auth } from './auth'

export default auth((req) => {
  // Callback function
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
