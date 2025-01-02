export const $ApplicationData = {
  properties: {
    created_at: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    data: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    deletable: {
      type: 'any-of',
      contains: [
        {
          type: 'boolean',
        },
        {
          type: 'null',
        },
      ],
    },
    description: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    id: {
      type: 'string',
      format: 'uuid',
    },
    json_data: {
      type: 'any-of',
      contains: [
        {
          type: 'dictionary',
          contains: {
            properties: {},
          },
        },
        {
          type: 'null',
        },
      ],
    },
    name: {
      type: 'string',
      isRequired: true,
    },
    updated_at: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'date-time',
        },
        {
          type: 'null',
        },
      ],
      isRequired: true,
    },
  },
} as const;

export const $Body_login_access_token_api_v1_login_access_token_post = {
  properties: {
    grant_type: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          pattern: 'password',
        },
        {
          type: 'null',
        },
      ],
    },
    username: {
      type: 'string',
      isRequired: true,
    },
    password: {
      type: 'string',
      isRequired: true,
    },
    scope: {
      type: 'string',
      default: '',
    },
    client_id: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    client_secret: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
  },
} as const;

export const $ConfigurationResponse = {
  properties: {
    data: {
      type: 'array',
      contains: {
        properties: {},
      },
      isRequired: true,
    },
  },
} as const;

export const $HTTPValidationError = {
  properties: {
    detail: {
      type: 'array',
      contains: {
        type: 'ValidationError',
      },
    },
  },
} as const;

export const $IncidentEvent = {
  properties: {
    created_at: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    id: {
      type: 'string',
      format: 'uuid',
    },
    image: {
      type: 'any-of',
      contains: [
        {
          type: 'binary',
          format: 'binary',
        },
        {
          type: 'null',
        },
      ],
      isRequired: true,
    },
    incident_slug: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    message_ts: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    mimetype: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    parent: {
      type: 'number',
      isRequired: true,
    },
    source: {
      type: 'string',
      isRequired: true,
    },
    text: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    timestamp: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'date-time',
        },
        {
          type: 'null',
        },
      ],
      isRequired: true,
    },
    title: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    updated_at: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'date-time',
        },
        {
          type: 'null',
        },
      ],
      isRequired: true,
    },
    user: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
  },
} as const;

export const $IncidentEventBase = {
  description: `IncidentEvent base class, excludes image`,
  properties: {
    created_at: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    id: {
      type: 'string',
      isRequired: true,
      format: 'uuid',
    },
    incident_slug: {
      type: 'string',
      isRequired: true,
    },
    message_ts: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    mimetype: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    source: {
      type: 'string',
      isRequired: true,
    },
    text: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    timestamp: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'date-time',
        },
        {
          type: 'null',
        },
      ],
      isRequired: true,
    },
    title: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    updated_at: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'date-time',
        },
        {
          type: 'null',
        },
      ],
      isRequired: true,
    },
    user: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
  },
} as const;

export const $IncidentParticipant = {
  properties: {
    created_at: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    id: {
      type: 'number',
      isRequired: true,
    },
    is_lead: {
      type: 'boolean',
      isRequired: true,
    },
    role: {
      type: 'string',
      isRequired: true,
    },
    updated_at: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'date-time',
        },
        {
          type: 'null',
        },
      ],
      isRequired: true,
    },
    user_id: {
      type: 'string',
      isRequired: true,
    },
    user_name: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;

export const $IncidentRecord = {
  properties: {
    additional_comms_channel: {
      type: 'any-of',
      contains: [
        {
          type: 'boolean',
        },
        {
          type: 'null',
        },
      ],
    },
    additional_comms_channel_id: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    additional_comms_channel_link: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    boilerplate_message_ts: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    channel_id: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    channel_name: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    components: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    created_at: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    description: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    digest_message_ts: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    has_private_channel: {
      type: 'any-of',
      contains: [
        {
          type: 'boolean',
        },
        {
          type: 'null',
        },
      ],
    },
    id: {
      type: 'number',
      isRequired: true,
    },
    impact: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    is_security_incident: {
      type: 'any-of',
      contains: [
        {
          type: 'boolean',
        },
        {
          type: 'null',
        },
      ],
    },
    last_update_sent: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'date-time',
        },
        {
          type: 'null',
        },
      ],
      isRequired: true,
    },
    link: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    meeting_link: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    roles: {
      type: 'any-of',
      contains: [
        {
          type: 'dictionary',
          contains: {
            properties: {},
          },
        },
        {
          type: 'null',
        },
      ],
    },
    roles_all: {
      type: 'any-of',
      contains: [
        {
          type: 'array',
          contains: {
            properties: {},
          },
        },
        {
          type: 'null',
        },
      ],
    },
    severity: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    severities: {
      type: 'any-of',
      contains: [
        {
          type: 'array',
          contains: {
            properties: {},
          },
        },
        {
          type: 'null',
        },
      ],
    },
    slug: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    status: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    statuses: {
      type: 'any-of',
      contains: [
        {
          type: 'array',
          contains: {
            properties: {},
          },
        },
        {
          type: 'null',
        },
      ],
    },
    tags: {
      type: 'any-of',
      contains: [
        {
          type: 'array',
          contains: {
            properties: {},
          },
        },
        {
          type: 'null',
        },
      ],
    },
    updated_at: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'date-time',
        },
        {
          type: 'null',
        },
      ],
      isRequired: true,
    },
  },
} as const;

export const $Incidents = {
  properties: {
    data: {
      type: 'array',
      contains: {
        type: 'IncidentRecord',
      },
      isRequired: true,
    },
    count: {
      type: 'number',
      isRequired: true,
    },
  },
} as const;

export const $JiraIssueRecord = {
  properties: {
    key: {
      type: 'string',
    },
    status: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    team: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    url: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
  },
} as const;

export const $MaintenanceWindowRecord = {
  properties: {
    channels: {
      type: 'array',
      contains: {
        properties: {},
      },
    },
    components: {
      type: 'array',
      contains: {
        properties: {},
      },
    },
    contact: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    created_at: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    description: {
      type: 'string',
      isRequired: true,
    },
    end_timestamp: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    id: {
      type: 'string',
      format: 'uuid',
    },
    start_timestamp: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    status: {
      type: 'string',
      isRequired: true,
    },
    title: {
      type: 'string',
      isRequired: true,
    },
    updated_at: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'date-time',
        },
        {
          type: 'null',
        },
      ],
      isRequired: true,
    },
  },
} as const;

export const $MaintenanceWindows = {
  properties: {
    data: {
      type: 'array',
      contains: {
        type: 'MaintenanceWindowRecord',
      },
      isRequired: true,
    },
    count: {
      type: 'number',
      isRequired: true,
    },
  },
} as const;

export const $Message = {
  properties: {
    message: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;

export const $OpsgenieIncidentRecord = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
  },
} as const;

export const $PagerAutoMappingRequest = {
  properties: {
    value: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;

export const $PagerDataResponse = {
  description: `Pager data response`,
  properties: {
    platform: {
      type: 'string',
      isRequired: true,
    },
    data: {
      type: 'any-of',
      contains: [
        {
          type: 'array',
          contains: {
            properties: {},
          },
        },
        {
          type: 'dictionary',
          contains: {
            properties: {},
          },
        },
      ],
      isRequired: true,
    },
    ts: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;

export const $PagerDutyIncidentRecord = {
  properties: {
    created_at: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    id: {
      type: 'string',
      format: 'uuid',
    },
    updated_at: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'date-time',
        },
        {
          type: 'null',
        },
      ],
      isRequired: true,
    },
    url: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
  },
} as const;

export const $PostmortemRecord = {
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    url: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
  },
} as const;

export const $StatuspageIncidentRecord = {
  properties: {
    channel_id: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    id: {
      type: 'string',
      format: 'uuid',
    },
    message_ts: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    name: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    shortlink: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    status: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    updated_at: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'date-time',
        },
        {
          type: 'null',
        },
      ],
      isRequired: true,
    },
    updates: {
      type: 'any-of',
      contains: [
        {
          type: 'array',
          contains: {
            properties: {},
          },
        },
        {
          type: 'null',
        },
      ],
    },
    upstream_id: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;

export const $SuccessResponse = {
  description: `Generic success response`,
  properties: {
    result: {
      type: 'string',
      isRequired: true,
    },
    message: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;

export const $Token = {
  properties: {
    access_token: {
      type: 'string',
      isRequired: true,
    },
    token_type: {
      type: 'string',
      default: 'bearer',
    },
  },
} as const;

export const $UpdatePassword = {
  properties: {
    current_password: {
      type: 'string',
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
    new_password: {
      type: 'string',
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const;

export const $UserCreate = {
  properties: {
    email: {
      type: 'string',
      isRequired: true,
      format: 'email',
      maxLength: 255,
    },
    is_active: {
      type: 'boolean',
      default: true,
    },
    is_superuser: {
      type: 'boolean',
      default: false,
    },
    full_name: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          maxLength: 255,
        },
        {
          type: 'null',
        },
      ],
    },
    password: {
      type: 'string',
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const;

export const $UserPublic = {
  properties: {
    email: {
      type: 'string',
      isRequired: true,
      format: 'email',
      maxLength: 255,
    },
    is_active: {
      type: 'boolean',
      default: true,
    },
    is_superuser: {
      type: 'boolean',
      default: false,
    },
    full_name: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          maxLength: 255,
        },
        {
          type: 'null',
        },
      ],
    },
    id: {
      type: 'string',
      isRequired: true,
      format: 'uuid',
    },
  },
} as const;

export const $UserUpdate = {
  properties: {
    email: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'email',
          maxLength: 255,
        },
        {
          type: 'null',
        },
      ],
    },
    is_active: {
      type: 'boolean',
      default: true,
    },
    is_superuser: {
      type: 'boolean',
      default: false,
    },
    full_name: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          maxLength: 255,
        },
        {
          type: 'null',
        },
      ],
    },
    password: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          maxLength: 40,
          minLength: 8,
        },
        {
          type: 'null',
        },
      ],
    },
  },
} as const;

export const $UserUpdateMe = {
  properties: {
    full_name: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          maxLength: 255,
        },
        {
          type: 'null',
        },
      ],
    },
    email: {
      type: 'any-of',
      contains: [
        {
          type: 'string',
          format: 'email',
          maxLength: 255,
        },
        {
          type: 'null',
        },
      ],
    },
  },
} as const;

export const $UsersPublic = {
  properties: {
    data: {
      type: 'array',
      contains: {
        type: 'UserPublic',
      },
      isRequired: true,
    },
    count: {
      type: 'number',
      isRequired: true,
    },
  },
} as const;

export const $ValidationError = {
  properties: {
    loc: {
      type: 'array',
      contains: {
        type: 'any-of',
        contains: [
          {
            type: 'string',
          },
          {
            type: 'number',
          },
        ],
      },
      isRequired: true,
    },
    msg: {
      type: 'string',
      isRequired: true,
    },
    type: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;
