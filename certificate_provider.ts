import type { item_with_tag, listable } from './types.ts'

export const createCertificateProvider = <
    tag extends string,
    outbound_tag extends string = never,
>(cp: certificate_provider<tag, outbound_tag>): certificate_provider<tag, outbound_tag> => cp

export type certificate_provider<T extends string, O extends string> = item_with_tag<T> & headless_certificate_provider<O>
export type headless_certificate_provider<O extends string> = acme<O> | tailscale<O> | cloudflare<O>

interface acme<O extends string> {
    type: 'acme'
    domain: listable<string>
    /**
     * @default $XDG_DATA_HOME/certmagic
     * @default $HOME/.local/share/certmagic
     */
    data_directory?: string
    default_server_name?: string
    email?: string
    provider?: 'letsencrypt' | 'zerossl' | string
    account_key?: string
    disable_http_challenge?: boolean
    disable_tls_alpn_challenge?: boolean
    alternative_http_port?: number
    alternative_tls_port?: number
    external_account?: {
        key_id: string
        mac_key: string
    }
    dns01_challenge?: dns01
    key_type?: 'ed25519' | 'p256' | 'p384' | 'rsa2048' | 'rsa4096'
    detour?: O
}

interface tailscale<E extends string> {
    type: 'tailscale'
    endpoint: E
}

type cloudflare<O extends string> = origin_ca_key_cloudflare<O> | api_token_cloudflare<O>

interface origin_ca_key_cloudflare<O extends string> extends base_cloudflare<O> {
    origin_ca_key: string
}

interface api_token_cloudflare<O extends string> extends base_cloudflare<O> {
    api_token: string
}

interface base_cloudflare<O extends string> {
    type: 'cloudflare-origin-ca'
    domain: listable<string>
    /**
     * @default $XDG_DATA_HOME/certmagic
     * @default $HOME/.local/share/certmagic
     */
    data_directory?: string
    /**
     * @default origin-rsa
     */
    request_type?: 'origin-rsa' | 'origin-ecc'
    /**
     * @default 5475
     */
    requested_validity?: 7 | 30 | 90 | 365 | 730 | 1095 | 5475
    detour?: O
}

type dns01 = dns01_ali | dns01_cf | acmedns

interface dns01_ali {
    provider: 'alidns'
    access_key_id: string
    access_key_secret: string
    region_id: string
    security_token: string
}

interface dns01_cf {
    provider: 'cloudflare'
    api_token: string
    zone_token?: string
}

interface acmedns {
    provider: 'acmedns'
    username: string
    password: string
    subdomain: string
    server_url: string
}
