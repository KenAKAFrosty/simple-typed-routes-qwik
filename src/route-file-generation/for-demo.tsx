//Just doing this to keep it simpler than trying to update the underlying QwikCity package

import type { Component } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";

export type __Link = Component<Omit<LinkProps, "href"> & { href?: RoutePath }>;


export const _Link = Link as __Link
