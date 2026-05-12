/**
 * @module
 * The service field.
 *
 * @example
 * ```ts
 * import { createService } from "@zhexin/typebox/service"
 * ```
 */

import type { dialer, headers, listable, listen, server } from './types.ts'
import type { client_tls, server_tls } from './tls.ts'
import type { headless_http_client } from './http_client.ts'

export const createService = <
    tag extends string,
    outbound_tag extends string,
    inbound_tag extends string,
    dns_server_tag extends string,
    certificate_provider_tag extends string,
    http_client_tag extends string,
>(
    service: service<tag, outbound_tag, inbound_tag, dns_server_tag, certificate_provider_tag, http_client_tag>,
): service<tag, outbound_tag, inbound_tag, dns_server_tag, certificate_provider_tag, http_client_tag> => service

export type service<
    tag extends string,
    outbound_tag extends string,
    inbound_tag extends string,
    dns_server_tag extends string,
    certificate_provider_tag extends string,
    http_client_tag extends string,
> =
    | derp<tag, outbound_tag, inbound_tag, dns_server_tag, certificate_provider_tag, http_client_tag>
    | resolved<tag, inbound_tag>
    | ssm_api<tag, outbound_tag, inbound_tag, dns_server_tag, certificate_provider_tag, http_client_tag>
    | ccm<tag, outbound_tag, inbound_tag, dns_server_tag, certificate_provider_tag, http_client_tag>
    | ocm<tag, outbound_tag, inbound_tag, dns_server_tag, certificate_provider_tag, http_client_tag>
    | hysteria_realm<tag, outbound_tag, inbound_tag, dns_server_tag, certificate_provider_tag, http_client_tag>

interface derp<T extends string, O extends string, I extends string, DS extends string, C extends string, H extends string> extends listen<T, I> {
    type: 'derp'
    tls: server_tls<O, DS, C, H>
    config_path: string
    verify_client_endpoint?: listable<string>
    verify_client_url?: listable<verify_client_url<O, DS>> | listable<string>
    home?: string
    mesh_with?: listable<mesh_with<O, DS>>
    mesh_psk?: string
    mesh_psk_file?: string
    stun?: stun<T, I>
}

interface resolved<T extends string, I extends string> extends listen<T, I> {
    type: 'resolved'
}

interface ssm_api<
    T extends string,
    O extends string,
    I extends string,
    DS extends string,
    C extends string,
    H extends string,
> extends listen<T, I> {
    type: 'ssm-api'
    servers: { [key: string]: I }
    cache_path?: string
    tls?: server_tls<O, DS, C, H>
}

interface ccm<
    T extends string,
    O extends string,
    I extends string,
    DS extends string,
    C extends string,
    H extends string,
> extends Omit<listen<T, I>, 'detour'> {
    type: 'ccm'
    credential_path?: string
    usages_path?: string
    users?: token_auth[]
    headers?: headers
    detour?: O
    tls?: server_tls<O, DS, C, H>
}

interface ocm<
    T extends string,
    O extends string,
    I extends string,
    DS extends string,
    C extends string,
    H extends string,
> extends Omit<listen<T, I>, 'detour'> {
    type: 'ocm'
    credential_path?: string
    usages_path?: string
    users?: token_auth[]
    headers?: headers
    detour?: O
    tls?: server_tls<O, DS, C, H>
}

interface hysteria_realm<T extends string, O extends string, I extends string, DS extends string, C extends string, H extends string> extends listen<T, I> {
    type: 'hysteria-realm'
    tls?: server_tls<O, DS, C, H>
    users: hysteria_realm_user[]
}

interface hysteria_realm_user {
    name: string
    token: string
    max_realms?: number
}

interface token_auth {
    name?: string
    token?: string
}

type verify_client_url<O extends string, DS extends string> = {
    url: string
} & headless_http_client<O, DS>

interface mesh_with<O extends string, DS extends string> extends dialer<O, DS>, server {
    host?: string
    tls?: client_tls
}

interface stun<T extends string, I extends string> extends listen<T, I> {
    enable: true
}
