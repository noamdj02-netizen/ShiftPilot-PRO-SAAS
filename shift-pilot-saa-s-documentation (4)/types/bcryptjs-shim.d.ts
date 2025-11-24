// Temporary shim to avoid build-time type resolution errors for bcryptjs.
// The project currently includes `bcryptjs` and an external @types package
// that may not expose the expected declarations. This file tells TypeScript
// to accept imports from 'bcryptjs' until proper types are restored.
declare module "bcryptjs" {
  const whatever: any;
  export default whatever;
}
