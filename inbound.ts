/**
 * @module
 * The inbounds field.
 *
 * @example
 * ```ts
 * import { createInbound, createInbounds } from "@zhexin/typebox/inbound"
 * ```
 */

import type { dialer, duration, headers, item_with_tag, listable, listen, network, server, shadowsocks_method } from './types.ts'
import type { server_tls as tls } from './tls.ts'
import type { transport } from './transport.ts'

export const createInbound = <
    tag extends string,
    inbound_tag extends string = never,
    outbound_tag extends string = never,
    dns_server_tag extends string = never,
    rule_set_tag extends string = never,
    certificate_provider_tag extends string = never,
>(
    inbound: inbound<tag, outbound_tag, dns_server_tag, inbound_tag, rule_set_tag, certificate_provider_tag>,
): inbound<tag, outbound_tag, dns_server_tag, inbound_tag, rule_set_tag, certificate_provider_tag> => inbound

export const createInbounds = <
    tag extends string,
    outbound_tag extends string,
    dns_server_tag extends string,
    rule_set_tag extends string,
    certificate_provider_tag extends string,
    I extends inbound<tag, outbound_tag, dns_server_tag, I['tag'], rule_set_tag, certificate_provider_tag>,
>(inbounds: I[]): I[] => inbounds

/**
 * You should not use this directly, instead use {@link createInbound} or {@link createInbounds}.
 */
export type inbound<
    tag extends string,
    outbound_tag extends string,
    dns_server_tag extends string,
    inbound_tag extends string,
    rule_set_tag extends string,
    certificate_provider_tag extends string,
> =
    | direct<tag, inbound_tag>
    | mixed<tag, inbound_tag>
    | socks<tag, inbound_tag>
    | http<tag, outbound_tag, dns_server_tag, inbound_tag, certificate_provider_tag>
    | shadowsocks<tag, inbound_tag>
    | vmess<tag, outbound_tag, dns_server_tag, inbound_tag, certificate_provider_tag>
    | trojan<tag, outbound_tag, dns_server_tag, inbound_tag, certificate_provider_tag>
    | naive<tag, outbound_tag, dns_server_tag, inbound_tag, certificate_provider_tag>
    | hysteria<tag, outbound_tag, dns_server_tag, inbound_tag, certificate_provider_tag>
    | shadowtls<tag, outbound_tag, dns_server_tag, inbound_tag>
    | vless<tag, outbound_tag, dns_server_tag, inbound_tag, certificate_provider_tag>
    | tuic<tag, outbound_tag, dns_server_tag, inbound_tag, certificate_provider_tag>
    | hysteria2<tag, outbound_tag, dns_server_tag, inbound_tag, certificate_provider_tag>
    | anytls<tag, outbound_tag, dns_server_tag, inbound_tag, certificate_provider_tag>
    | tun<tag, rule_set_tag>
    | redirect<tag, inbound_tag>
    | tproxy<tag, inbound_tag>
    | cloudflared<tag, outbound_tag, dns_server_tag>

interface direct<T extends string, I extends string> extends listen<T, I> {
    type: 'direct'
    network?: network
    override_address?: string
    override_port?: number
}
interface mixed<T extends string, I extends string> extends listen<T, I> {
    type: 'mixed'
    users?: auth[]
    set_system_proxy?: boolean
}
interface socks<T extends string, I extends string> extends listen<T, I> {
    type: 'socks'
    users?: auth[]
}
interface http<T extends string, O extends string, DS extends string, I extends string, C extends string> extends listen<T, I> {
    type: 'http'
    users?: auth[]
    set_system_proxy?: boolean
    tls?: tls<O, DS, C>
}
interface shadowsocks<T extends string, I extends string> extends listen<T, I> {
    type: 'shadowsocks'
    network?: network
    method: shadowsocks_method
    password: string
    users?: user[]
    destinations?: [user & server]
    multiplex?: multiplex
}
interface vmess<T extends string, O extends string, DS extends string, I extends string, C extends string> extends listen<T, I> {
    type: 'vmess'
    users: vmess_user[]
    tls?: tls<O, DS, C>
    multiplex?: multiplex
    transport?: transport
}
interface trojan<T extends string, O extends string, DS extends string, I extends string, C extends string> extends listen<T, I> {
    type: 'trojan'
    users: user[]
    tls?: tls<O, DS, C>
    fallback?: server
    fallback_for_alpn?: {
        [alpn: string]: server
    }
    multiplex?: multiplex
    transport?: transport
}
interface naive<T extends string, O extends string, DS extends string, I extends string, C extends string> extends listen<T, I> {
    type: 'naive'
    users: auth[]
    network?: network
    /**
     * @default bbr
     */
    quic_congestion_control?: 'bbr' | 'bbr_standard' | 'bbr2' | 'bbr2_variant' | 'cubic' | 'reno'
    tls?: tls<O, DS, C>
}
interface hysteria<T extends string, O extends string, DS extends string, I extends string, C extends string> extends listen<T, I> {
    type: 'hysteria'
    up: string
    up_mbps: number
    down: string
    down_mbps: number
    obfs?: string
    users: hysteria_user[]
    recv_window_conn?: number
    recv_window_client?: number
    max_conn_client?: number
    disable_mtu_discovery?: boolean
    tls: tls<O, DS, C>
}
interface shadowtls<T extends string, O extends string, DS extends string, I extends string> extends listen<T, I> {
    type: 'shadowtls'
    version?: 1 | 2 | 3
    password?: string
    users?: user[]
    handshake: server & dialer<O, DS>
    handshake_for_server_name?: {
        [server_name: string]: server & dialer<O, DS>
    }
    strict_mode?: boolean
    wildcard_sni?: 'off' | 'authed' | 'all'
}
interface vless<T extends string, O extends string, DS extends string, I extends string, C extends string> extends listen<T, I> {
    type: 'vless'
    users: vless_user[]
    tls?: tls<O, DS, C>
    multiplex?: multiplex
    transport?: transport
}
interface tuic<T extends string, O extends string, DS extends string, I extends string, C extends string> extends listen<T, I> {
    type: 'tuic'
    users: tuic_user[]
    congestion_control?: 'cubic' | 'new_reno' | 'bbr'
    auth_timeout?: duration
    zero_rtt_handshake?: boolean
    heartbeat?: duration
    tls: tls<O, DS, C>
}
interface hysteria2<T extends string, O extends string, DS extends string, I extends string, C extends string> extends listen<T, I> {
    type: 'hysteria2'
    up_mbps?: number
    down_mbps?: number
    obfs?: {
        type: 'salamander'
        password: string
    }
    users: user[]
    ignore_client_bandwidth?: boolean
    tls: tls<O, DS, C>
    masquerade?: string | masquerade
    /**
     * @default standard
     */
    bbr_profile?: 'conservative' | 'standard' | 'aggressive'
    brutal_debug?: boolean
}
interface anytls<T extends string, O extends string, DS extends string, I extends string, C extends string> extends listen<T, I> {
    type: 'anytls'
    users: user[]
    /**
     * AnyTLS padding scheme line array.
     */
    padding_scheme?: listable<string>
    tls?: tls<O, DS, C>
}
interface tun<T extends string, RS extends string> extends item_with_tag<T> {
    type: 'tun'
    interface_name?: string
    mtu?: number
    address: listable<string>
    auto_route?: boolean
    iproute2_table_index?: number
    iproute2_rule_index?: number
    auto_redirect?: boolean
    auto_redirect_input_mark?: string
    auto_redirect_output_mark?: string
    /**
     * @default 0x2025
     */
    auto_redirect_reset_mark?: string
    /**
     * @default 100
     */
    auto_redirect_nfqueue?: number
    /**
     * @default 32768
     */
    auto_redirect_iproute2_fallback_rule_index?: number
    exclude_mptcp?: boolean
    loopback_address?: listable<string>
    strict_route?: boolean
    route_address?: listable<string>
    route_address_set?: listable<RS>
    route_exclude_address?: listable<string>
    route_exclude_address_set?: listable<RS>
    include_interface?: listable<string>
    exclude_interface?: listable<string>
    include_uid?: listable<number>
    include_uid_range?: listable<string>
    exclude_uid?: listable<number>
    exclude_uid_range?: listable<string>
    include_android_user?: listable<number>
    include_package?: listable<string>
    exclude_package?: listable<string>
    endpoint_independent_nat?: boolean
    include_mac_address?: listable<string>
    exclude_mac_address?: listable<string>
    udp_timeout?: string
    stack?: 'system' | 'gvisor' | 'mixed'
    platform?: {
        http_proxy: tun_platform
    }
}
interface tun_platform extends server {
    enabled: true
    bypass_domain?: listable<string>
    match_domain?: listable<string>
}
interface redirect<T extends string, I extends string> extends listen<T, I> {
    type: 'redirect'
}
interface tproxy<T extends string, I extends string> extends listen<T, I> {
    type: 'tproxy'
    network?: network
}
interface cloudflared<T extends string, O extends string, DS extends string> extends item_with_tag<T> {
    type: 'cloudflared'
    token: string
    ha_connections?: number
    protocol?: 'quic' | 'http2'
    post_quantum?: boolean
    edge_ip_version?: 0 | 4 | 6
    datagram_version?: 'v2' | 'v3'
    grace_period?: duration
    region?: string
    control_dialer?: dialer<O, DS>
    tunnel_dialer?: dialer<O, DS>
}

interface multiplex {
    enabled: true
    padding?: boolean
    brutal?: {
        enabled: true
        up_mbps: number
        down_mbps: number
    }
}

interface auth {
    username: string
    password: string
}
interface user {
    name: string
    password: string
}
interface vmess_user {
    name: string
    uuid: string
}
interface hysteria_user {
    name: string
    auth?: string
    auth_str: string
}
interface vless_user {
    name: string
    uuid: string
    flow?: 'xtls-rprx-vision'
}
interface tuic_user {
    name?: string
    uuid: string
    password?: string
}

type masquerade = masquerade_file | masquerade_proxy | masquerade_http
interface masquerade_file {
    type: 'file'
    directory: string
}
interface masquerade_proxy {
    type: 'proxy'
    url: string
    rewrite_host?: boolean
}
interface masquerade_http {
    type: 'string'
    status_code?: number
    headers?: headers
    content: string
}
