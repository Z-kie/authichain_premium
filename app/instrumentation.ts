
/**
 * Instrumentation file for monitoring setup
 * This runs before any other code in the application
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Import Sentry for Node.js runtime
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Import Sentry for Edge runtime
    await import('./sentry.edge.config');
  }
}
