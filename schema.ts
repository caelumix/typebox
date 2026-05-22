import type { certificate } from "./certificate.ts";
import type { certificate_provider } from "./certificate_provider.ts";
import type { dns } from "./dns.ts";
import type { endpoint } from "./endpoint.ts";
import type { experimental } from "./experimental.ts";
import type { http_client } from "./http_client.ts";
import type { inbound } from "./inbound.ts";
import type { log } from "./log.ts";
import type { ntp } from "./ntp.ts";
import type { outbound } from "./outbound.ts";
import type { route } from "./route.ts";
import type { service } from "./service.ts";

export interface schema {
  $schema?: string;
  log?: log;
  dns?: dns<
    string,
    string,
    string,
    string,
    dns.server<string, string, string, string>
  >;
  endpoints?: endpoint<string, string, string>[];
  inbounds?: inbound<string, string, string, string, string, string, string>[];
  outbounds?: outbound<string, string, string, string>[];
  route?: route<
    string,
    string,
    string,
    string,
    route.rule_set<string, string, string, string>
  >;
  services?: service<string, string, string, string, string, string>[];
  experimental?: experimental;
  ntp?: ntp<string, string>;
  certificate?: certificate;
  certificate_providers?: certificate_provider<
    string,
    string,
    string,
    string
  >[];
  http_clients?: http_client<string, string, string>[];
}
