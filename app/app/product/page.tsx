export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';

/**
 * /product route - Redirects to /explore
 * This route is maintained for backward compatibility with navigation links
 * All product browsing functionality is now in /explore
 */
export default function ProductPage() {
  redirect('/explore');
}
