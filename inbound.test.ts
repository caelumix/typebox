import { createInbound, createInbounds } from './inbound.ts'

createInbounds([
    {
        type: 'shadowsocks',
        tag: 'b',
        listen: '',
        listen_port: 80,
        password: '',
        method: '2022-blake3-aes-128-gcm',
        // This error is used to check type safety
        // detour: '',
    },
    {
        type: 'anytls',
        tag: 'ccccc',
        listen: '',
        listen_port: 0,
        users: [],
    },
])

const _ = createInbound({
    tag: 'trojan',
    type: 'trojan',
    tls: {
        enabled: true,
        certificate_provider: {
            type: 'acme',
            domain: ['example.com'],
            email: 'admin@example.com',
        },
    },
    listen: '',
    listen_port: 0,
    users: [],
})
