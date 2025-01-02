export type ApplicationData = {
  created_at: string;
  data?: string | null;
  deletable?: boolean | null;
  description?: string | null;
  id?: string;
  json_data?: Record<string, unknown> | null;
  name: string;
  updated_at: string | null;
};

export type Body_login_access_token_api_v1_login_access_token_post = {
  grant_type?: string | null;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
};

export type ConfigurationResponse = {
  data: Array<unknown>;
};

export type HTTPValidationError = {
  detail?: Array<ValidationError>;
};

export type IncidentEvent = {
  created_at: string;
  id?: string;
  image: Blob | File | null;
  incident_slug?: string | null;
  message_ts?: string | null;
  mimetype?: string | null;
  parent: number;
  source: string;
  text?: string | null;
  timestamp: string | null;
  title?: string | null;
  updated_at: string | null;
  user?: string | null;
};

/**
 * IncidentEvent base class, excludes image
 */
export type IncidentEventBase = {
  created_at: string;
  id: string;
  incident_slug: string;
  message_ts?: string | null;
  mimetype?: string | null;
  source: string;
  text?: string | null;
  timestamp: string | null;
  title?: string | null;
  updated_at: string | null;
  user?: string | null;
};

export type IncidentParticipant = {
  created_at: string;
  id: number;
  is_lead: boolean;
  role: string;
  updated_at: string | null;
  user_id: string;
  user_name: string;
};

export type IncidentRecord = {
  additional_comms_channel?: boolean | null;
  additional_comms_channel_id?: string | null;
  additional_comms_channel_link?: string | null;
  boilerplate_message_ts?: string | null;
  channel_id?: string | null;
  channel_name?: string | null;
  components?: string | null;
  created_at: string;
  description?: string | null;
  digest_message_ts?: string | null;
  has_private_channel?: boolean | null;
  id: number;
  impact?: string | null;
  is_security_incident?: boolean | null;
  last_update_sent: string | null;
  link?: string | null;
  meeting_link?: string | null;
  roles?: Record<string, unknown> | null;
  roles_all?: Array<string> | null;
  severity?: string | null;
  severities?: Array<string> | null;
  slug?: string | null;
  status?: string | null;
  statuses?: Array<string> | null;
  tags?: Array<string> | null;
  updated_at: string | null;
};

export type Incidents = {
  data: Array<IncidentRecord>;
  count: number;
};

export type JiraIssueRecord = {
  key?: string;
  status?: string | null;
  team?: string | null;
  url?: string | null;
};

export type MaintenanceWindowRecord = {
  channels?: Array<string>;
  components?: Array<string>;
  contact?: string | null;
  created_at: string;
  description: string;
  end_timestamp: string;
  id?: string;
  start_timestamp: string;
  status: string;
  title: string;
  updated_at: string | null;
};

export type MaintenanceWindows = {
  data: Array<MaintenanceWindowRecord>;
  count: number;
};

export type Message = {
  message: string;
};

export type OpsgenieIncidentRecord = {
  id?: string;
};

export type PagerAutoMappingRequest = {
  value: string;
};

/**
 * Pager data response
 */
export type PagerDataResponse = {
  platform: string;
  data: Array<unknown> | Record<string, unknown>;
  ts: string;
};

export type PagerDutyIncidentRecord = {
  created_at: string;
  id?: string;
  updated_at: string | null;
  url?: string | null;
};

export type PostmortemRecord = {
  id?: string;
  url?: string | null;
};

export type StatuspageIncidentRecord = {
  channel_id?: string | null;
  id?: string;
  message_ts?: string | null;
  name?: string | null;
  shortlink?: string | null;
  status?: string | null;
  updated_at: string | null;
  updates?: Array<unknown> | null;
  upstream_id: string;
};

/**
 * Generic success response
 */
export type SuccessResponse = {
  result: string;
  message: string;
};

export type Token = {
  access_token: string;
  token_type?: string;
};

export type UpdatePassword = {
  current_password: string;
  new_password: string;
};

export type UserCreate = {
  email: string;
  is_active?: boolean;
  is_superuser?: boolean;
  full_name?: string | null;
  password: string;
};

export type UserPublic = {
  email: string;
  is_active?: boolean;
  is_superuser?: boolean;
  full_name?: string | null;
  id: string;
};

export type UserUpdate = {
  email?: string | null;
  is_active?: boolean;
  is_superuser?: boolean;
  full_name?: string | null;
  password?: string | null;
};

export type UserUpdateMe = {
  full_name?: string | null;
  email?: string | null;
};

export type UsersPublic = {
  data: Array<UserPublic>;
  count: number;
};

export type ValidationError = {
  loc: Array<string | number>;
  msg: string;
  type: string;
};
