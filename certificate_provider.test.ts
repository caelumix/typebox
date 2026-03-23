import { createCertificateProvider } from './certificate_provider.ts'

const _ = createCertificateProvider({
    type: 'acme',
    tag: 'my-cert',
    domain: ['example.com'],
    email: 'admin@example.com',
})
