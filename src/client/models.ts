import { UUID } from 'crypto';

export type Body_login_login_access_token = {
  grant_type?: string | null;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
};

export type HTTPValidationError = {
  detail?: Array<ValidationError>;
};

export type Dictionary = {
  [key: string]: string;
};

export type IncidentCreate = {
  title: string;
  description?: string | null;
};

export type Incident = {
  additional_comms_channel?: boolean | null;
  additional_comms_channel_id?: string | null;
  additional_comms_channel_link?: string | null;
  boilerplate_message_ts?: string | null;
  channel_id: string;
  channel_name: string;
  components?: string | null;
  created_at: string;
  description: string;
  digest_message_ts?: string | null;
  id: number;
  impact?: string | null;
  is_security_incident?: boolean | null;
  last_update_sent?: string | null;
  link: string;
  meeting_link?: string | null;
  postmortem?: string | null;
  roles?: Dictionary | null;
  roles_all?: Array<string> | null;
  severity: string;
  severities?: Array<string> | null;
  slug: string;
  status: string;
  statuses?: Array<string> | null;
  tags?: Array<string> | null;
  updated_at?: string | null;
};

export type Incidents = {
  data: Array<Incident>;
  count: number;
};

export type IncidentEvent = {
  created_at: string;
  id: UUID;
  image?: string | null;
  incident_slug: string;
  mimetype?: string | null;
  parent: number;
  source: string;
  text?: string | null;
  timestamp: string | null;
  title?: string | null;
  updated_at?: string | null;
  user?: string | null;
};

export type IncidentParticipant = {
  created_at: string;
  id: number;
  is_lead: boolean;
  parent: number;
  role: string;
  updated_at?: string | null;
  user_id: string;
  user_name: string;
};

export type JiraIssue = {
  key: string;
  parent: number;
  status?: string | null;
  team?: string | null;
  url?: string | null;
};

export type MaintenanceWindowCreate = {
  title: string;
  description?: string | null;
};

export type MaintenanceWindow = {
  channels: Array<Dictionary>;
  components: Array<string>;
  contact: string;
  created_at: string;
  description: string;
  end_timestamp: string;
  id: UUID;
  start_timestamp: string;
  status: string;
  title: string;
  updated_at?: string | null;
};

export type MaintenanceWindows = {
  data: Array<MaintenanceWindow>;
  count: number;
};

export type Message = {
  message: string;
};

export type NewPassword = {
  token: string;
  new_password: string;
};

export type OpsgenieIncident = {
  id: string;
  parent: number;
};

export type PagerDutyIncident = {
  id: string;
  parent: number;
};

export type Postmortem = {
  id: string;
  parent: number;
  participants?: Array<string> | null;
  url?: string | null;
};

export type SlackUser = {
  name?: string | null;
  real_name?: string | null;
  email?: string | null;
  id?: string | null;
};

export type SlackUsers = {
  data?: Array<SlackUser>;
};

export type StatuspageIncident = {
  channel_id: string;
  id: string;
  message_ts: string;
  name: string;
  parent: number;
  shortlink: string;
  status: string;
  updated_at: string;
  updates: Array<Dictionary>;
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

export type UserRegister = {
  email: string;
  password: string;
  full_name?: string | null;
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
