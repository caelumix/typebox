import type { base_default_rule, base_logical_rule } from "./rule.ts";
import type { listable } from "./types.ts";

export type rule_set =
  | rule_set4
  | rule_set3
  | rule_set2
  | rule_set1;

type rule_set4 = {
  version: 2;
  rules: headless_rule<version4>[];
};
type rule_set3 = {
  version: 3;
  rules: headless_rule<version3>[];
};
type rule_set2 = {
  version: 2;
  rules: headless_rule<version2>[];
};
type rule_set1 = {
  version: 1;
  rules: headless_rule<version1>[];
};

type version4 = default_headless_rule;
type version3 = Omit<
  version4,
  | "network_interface_address"
  | "default_interface_address"
>;
type version2 = Omit<
  version3,
  | "network_type"
  | "network_is_expensive"
  | "network_is_constrained"
>;
type version1 = version2;

type headless_rule<R extends default_headless_rule> =
  | R
  | logical_headless_rule<R>;

type logical_headless_rule<R extends default_headless_rule> =
  & base_logical_rule
  & { rules: headless_rule<R>[] };

type default_headless_rule = base_default_rule & {
  query_type?: listable<string | number>;
};
