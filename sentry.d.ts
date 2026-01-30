// Optional: install @sentry/nextjs to enable Sentry. This declaration allows type-check without the package.
declare module "@sentry/nextjs" {
  const Sentry: {
    init: (config: unknown) => void
    captureException: (error: Error, options?: unknown) => void
    setUser: (user: unknown) => void
    addBreadcrumb: (breadcrumb: unknown) => void
  }
  export default Sentry
}
