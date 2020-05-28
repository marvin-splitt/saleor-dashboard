/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AppTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: AppFragment
// ====================================================

export interface AppFragment_privateMetadata {
  __typename: "MetadataItem";
  key: string;
  value: string;
}

export interface AppFragment_metadata {
  __typename: "MetadataItem";
  key: string;
  value: string;
}

export interface AppFragment_webhooks {
  __typename: "Webhook";
  name: string;
}

export interface AppFragment {
  __typename: "App";
  id: string;
  name: string | null;
  created: any | null;
  isActive: boolean | null;
  type: AppTypeEnum | null;
  homepageUrl: string | null;
  appUrl: string | null;
  configurationUrl: string | null;
  supportUrl: string | null;
  version: string | null;
  privateMetadata: (AppFragment_privateMetadata | null)[];
  metadata: (AppFragment_metadata | null)[];
  webhooks: (AppFragment_webhooks | null)[] | null;
}
