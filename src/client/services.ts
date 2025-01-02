import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';

import type {
  ConfigurationResponse,
  IncidentEvent,
  IncidentEventBase,
  IncidentParticipant,
  IncidentRecord,
  Incidents,
  JiraIssueRecord,
  OpsgenieIncidentRecord,
  PagerDutyIncidentRecord,
  PostmortemRecord,
  StatuspageIncidentRecord,
  SuccessResponse,
  Body_login_access_token_api_v1_login_access_token_post,
  Token,
  UserPublic,
  MaintenanceWindowRecord,
  MaintenanceWindows,
  PagerAutoMappingRequest,
  PagerDataResponse,
  ApplicationData,
  Message,
  UpdatePassword,
  UserCreate,
  UsersPublic,
  UserUpdate,
  UserUpdateMe,
} from './models';

export type HealthData = {};

export type IncidentData = {
  GetIncidentsApiV1IncidentGet: {
    filter?: string;
    limit?: number;
    skip?: number;
  };
  PostIncidentApiV1IncidentPost: {
    requestBody: IncidentRecord;
  };
  GetIncidentApiV1IncidentSlugGet: {
    slug: string;
  };
  GetIncidentJiraIssuesApiV1IncidentSlugJiraGet: {
    slug: string;
  };
  GetIncidentOpsgenieApiV1IncidentSlugOpsgenieGet: {
    slug: string;
  };
  GetIncidentPagerdutyApiV1IncidentSlugPagerdutyGet: {
    slug: string;
  };
  GetIncidentPostmortemsApiV1IncidentSlugPostmortemGet: {
    slug: string;
  };
  GetIncidentStatuspageApiV1IncidentSlugStatuspageGet: {
    slug: string;
  };
  GetIncidentParticipantsApiV1IncidentSlugParticipantsGet: {
    slug: string;
  };
  DeleteIncidentApiV1IncidentIdDelete: {
    id: string;
  };
  PatchIncidentApiV1IncidentFieldPatch: {
    field: string;
    requestBody: IncidentRecord;
  };
  GetIncidentEventsApiV1IncidentSlugEventsGet: {
    slug: string;
  };
  GetIncidentEventImageApiV1IncidentSlugEventsImageIdGet: {
    id: string;
    slug: string;
  };
  DeleteIncidentEventApiV1IncidentSlugEventsIdDelete: {
    id: string;
  };
  PatchIncidentEventApiV1IncidentSlugEventsIdPatch: {
    requestBody: IncidentEvent;
  };
  GetIncidentConfigApiV1IncidentConfigParameterGet: {
    parameter: string;
  };
};

export type JobData = {
  RunJobApiV1JobRunJobIdPost: {
    jobId: unknown;
  };
  DeleteJobApiV1JobRunJobIdDelete: {
    jobId: unknown;
  };
};

export type LoginData = {
  LoginAccessTokenApiV1LoginAccessTokenPost: {
    formData: Body_login_access_token_api_v1_login_access_token_post;
  };
};

export type MaintenanceWindowData = {
  GetMaintenanceWindowApiV1MaintenanceWindowIdGet: {
    id: string;
  };
  DeleteMaintenanceWindowApiV1MaintenanceWindowIdDelete: {
    id: string;
  };
  PatchMaintenanceWindowApiV1MaintenanceWindowFieldPatch: {
    field: string;
    requestBody: MaintenanceWindowRecord;
  };
};

export type PagerData = {
  PatchPagerAutomappingApiV1PagerAutoMapStorePatch: {
    requestBody: PagerAutoMappingRequest;
  };
};

export type SettingData = {
  GetSettingApiV1SettingSettingNameGet: {
    settingName: string;
  };
};

export type UsersData = {
  ReadUsersApiV1UsersGet: {
    limit?: number;
    skip?: number;
  };
  CreateUserApiV1UsersPost: {
    requestBody: UserCreate;
  };
  UpdateUserMeApiV1UsersMePatch: {
    requestBody: UserUpdateMe;
  };
  UpdatePasswordMeApiV1UsersMePasswordPatch: {
    requestBody: UpdatePassword;
  };
  ReadUserByIdApiV1UsersUserIdGet: {
    userId: string;
  };
  UpdateUserApiV1UsersUserIdPatch: {
    requestBody: UserUpdate;
    userId: string;
  };
  DeleteUserApiV1UsersUserIdDelete: {
    userId: string;
  };
};

export class HealthService {
  /**
   * Get Health
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getHealthApiV1HealthGet(): CancelablePromise<unknown> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/health',
    });
  }
}

export class IncidentService {
  /**
   * Get Incidents
   * @returns Incidents Successful Response
   * @throws ApiError
   */
  public static getIncidentsApiV1IncidentGet(
    data: IncidentData['GetIncidentsApiV1IncidentGet'] = {}
  ): CancelablePromise<Incidents> {
    const { skip = 0, limit = 100, filter } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident',
      query: {
        skip,
        limit,
        filter,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Post Incident
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static postIncidentApiV1IncidentPost(
    data: IncidentData['PostIncidentApiV1IncidentPost']
  ): CancelablePromise<unknown> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/incident',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Incident
   * @returns IncidentRecord Successful Response
   * @throws ApiError
   */
  public static getIncidentApiV1IncidentSlugGet(
    data: IncidentData['GetIncidentApiV1IncidentSlugGet']
  ): CancelablePromise<IncidentRecord> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}',
      path: {
        slug,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Incident Jira Issues
   * @returns JiraIssueRecord Successful Response
   * @throws ApiError
   */
  public static getIncidentJiraIssuesApiV1IncidentSlugJiraGet(
    data: IncidentData['GetIncidentJiraIssuesApiV1IncidentSlugJiraGet']
  ): CancelablePromise<Array<JiraIssueRecord>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/jira',
      path: {
        slug,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Incident Opsgenie
   * @returns OpsgenieIncidentRecord Successful Response
   * @throws ApiError
   */
  public static getIncidentOpsgenieApiV1IncidentSlugOpsgenieGet(
    data: IncidentData['GetIncidentOpsgenieApiV1IncidentSlugOpsgenieGet']
  ): CancelablePromise<Array<OpsgenieIncidentRecord>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/opsgenie',
      path: {
        slug,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Incident Pagerduty
   * @returns PagerDutyIncidentRecord Successful Response
   * @throws ApiError
   */
  public static getIncidentPagerdutyApiV1IncidentSlugPagerdutyGet(
    data: IncidentData['GetIncidentPagerdutyApiV1IncidentSlugPagerdutyGet']
  ): CancelablePromise<Array<PagerDutyIncidentRecord>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/pagerduty',
      path: {
        slug,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Incident Postmortems
   * @returns PostmortemRecord Successful Response
   * @throws ApiError
   */
  public static getIncidentPostmortemsApiV1IncidentSlugPostmortemGet(
    data: IncidentData['GetIncidentPostmortemsApiV1IncidentSlugPostmortemGet']
  ): CancelablePromise<Array<PostmortemRecord>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/postmortem',
      path: {
        slug,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Incident Statuspage
   * @returns StatuspageIncidentRecord Successful Response
   * @throws ApiError
   */
  public static getIncidentStatuspageApiV1IncidentSlugStatuspageGet(
    data: IncidentData['GetIncidentStatuspageApiV1IncidentSlugStatuspageGet']
  ): CancelablePromise<Array<StatuspageIncidentRecord>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/statuspage',
      path: {
        slug,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Incident Participants
   * @returns IncidentParticipant Successful Response
   * @throws ApiError
   */
  public static getIncidentParticipantsApiV1IncidentSlugParticipantsGet(
    data: IncidentData['GetIncidentParticipantsApiV1IncidentSlugParticipantsGet']
  ): CancelablePromise<Array<IncidentParticipant>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/participants',
      path: {
        slug,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Delete Incident
   * @returns SuccessResponse Successful Response
   * @throws ApiError
   */
  public static deleteIncidentApiV1IncidentIdDelete(
    data: IncidentData['DeleteIncidentApiV1IncidentIdDelete']
  ): CancelablePromise<SuccessResponse> {
    const { id } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/incident/{id}',
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Patch Incident
   * Field is the value being changed: severity, status
   * The incident value sent over from the frontend is the IncidentRecord with updated fields
   * In this case, the API accepts the record and parses whatever field was changed and references
   * its value to pass to the methods that handle the changes
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static patchIncidentApiV1IncidentFieldPatch(
    data: IncidentData['PatchIncidentApiV1IncidentFieldPatch']
  ): CancelablePromise<unknown> {
    const { field, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/incident/{field}',
      path: {
        field,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Incident Events
   * Return events excluding the image field
   *
   * If there is an image present, an additional request will have to be made
   * against the following endpoint to get the iamge specifically
   * @returns IncidentEventBase Successful Response
   * @throws ApiError
   */
  public static getIncidentEventsApiV1IncidentSlugEventsGet(
    data: IncidentData['GetIncidentEventsApiV1IncidentSlugEventsGet']
  ): CancelablePromise<Array<IncidentEventBase>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/events',
      path: {
        slug,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Incident Event Image
   * Returns only the image content and mimetype when an event contains an image
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getIncidentEventImageApiV1IncidentSlugEventsImageIdGet(
    data: IncidentData['GetIncidentEventImageApiV1IncidentSlugEventsImageIdGet']
  ): CancelablePromise<unknown> {
    const { slug, id } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/events/image/{id}',
      path: {
        slug,
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Delete Incident Event
   * @returns SuccessResponse Successful Response
   * @throws ApiError
   */
  public static deleteIncidentEventApiV1IncidentSlugEventsIdDelete(
    data: IncidentData['DeleteIncidentEventApiV1IncidentSlugEventsIdDelete']
  ): CancelablePromise<SuccessResponse> {
    const { id } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/incident/{slug}/events/{id}',
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Patch Incident Event
   * @returns SuccessResponse Successful Response
   * @throws ApiError
   */
  public static patchIncidentEventApiV1IncidentSlugEventsIdPatch(
    data: IncidentData['PatchIncidentEventApiV1IncidentSlugEventsIdPatch']
  ): CancelablePromise<SuccessResponse> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/incident/{slug}/events/{id}',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Incident Config
   * @returns ConfigurationResponse Successful Response
   * @throws ApiError
   */
  public static getIncidentConfigApiV1IncidentConfigParameterGet(
    data: IncidentData['GetIncidentConfigApiV1IncidentConfigParameterGet']
  ): CancelablePromise<ConfigurationResponse> {
    const { parameter } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/config/{parameter}',
      path: {
        parameter,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}

export class JobService {
  /**
   * Get Jobs
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getJobsApiV1JobGet(): CancelablePromise<
    Array<Record<string, unknown>>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/job',
    });
  }

  /**
   * Run Job
   * @returns SuccessResponse Successful Response
   * @throws ApiError
   */
  public static runJobApiV1JobRunJobIdPost(
    data: JobData['RunJobApiV1JobRunJobIdPost']
  ): CancelablePromise<SuccessResponse> {
    const { jobId } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/job/run/{job_id}',
      path: {
        job_id: jobId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Delete Job
   * @returns SuccessResponse Successful Response
   * @throws ApiError
   */
  public static deleteJobApiV1JobRunJobIdDelete(
    data: JobData['DeleteJobApiV1JobRunJobIdDelete']
  ): CancelablePromise<SuccessResponse> {
    const { jobId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/job/run/{job_id}',
      path: {
        job_id: jobId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}

export class LoginService {
  /**
   * Login Access Token
   * OAuth2 compatible token login, get an access token for future requests
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static loginAccessTokenApiV1LoginAccessTokenPost(
    data: LoginData['LoginAccessTokenApiV1LoginAccessTokenPost']
  ): CancelablePromise<Token> {
    const { formData } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/login/access-token',
      formData: formData,
      mediaType: 'application/x-www-form-urlencoded',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Test Token
   * Test access token
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static testTokenApiV1LoginTestTokenPost(): CancelablePromise<UserPublic> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/login/test-token',
    });
  }
}

export class MaintenanceWindowService {
  /**
   * Get Maintenance Windows
   * @returns MaintenanceWindows Successful Response
   * @throws ApiError
   */
  public static getMaintenanceWindowsApiV1MaintenanceWindowGet(): CancelablePromise<MaintenanceWindows> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/maintenance_window',
    });
  }

  /**
   * Get Maintenance Window
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getMaintenanceWindowApiV1MaintenanceWindowIdGet(
    data: MaintenanceWindowData['GetMaintenanceWindowApiV1MaintenanceWindowIdGet']
  ): CancelablePromise<unknown> {
    const { id } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/maintenance_window/{id}',
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Delete Maintenance Window
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static deleteMaintenanceWindowApiV1MaintenanceWindowIdDelete(
    data: MaintenanceWindowData['DeleteMaintenanceWindowApiV1MaintenanceWindowIdDelete']
  ): CancelablePromise<unknown> {
    const { id } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/maintenance_window/{id}',
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Patch Maintenance Window
   * Field is the value being changed:
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static patchMaintenanceWindowApiV1MaintenanceWindowFieldPatch(
    data: MaintenanceWindowData['PatchMaintenanceWindowApiV1MaintenanceWindowFieldPatch']
  ): CancelablePromise<unknown> {
    const { field, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/maintenance_window/{field}',
      path: {
        field,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
}

export class PagerService {
  /**
   * Get Pager
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getPagerApiV1PagerGet(): CancelablePromise<
    PagerDataResponse | SuccessResponse
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/pager',
    });
  }

  /**
   * Get Pager Automapping
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getPagerAutomappingApiV1PagerAutoMapGet(): CancelablePromise<
    Record<string, unknown> | SuccessResponse
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/pager/auto_map',
    });
  }

  /**
   * Get Pager Store Automapping
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getPagerStoreAutomappingApiV1PagerAutoMapStoreGet(): CancelablePromise<
    Record<string, unknown> | SuccessResponse
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/pager/auto_map/store',
    });
  }

  /**
   * Patch Pager Automapping
   * @returns SuccessResponse Successful Response
   * @throws ApiError
   */
  public static patchPagerAutomappingApiV1PagerAutoMapStorePatch(
    data: PagerData['PatchPagerAutomappingApiV1PagerAutoMapStorePatch']
  ): CancelablePromise<SuccessResponse> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/pager/auto_map/store',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }
}

export class SettingService {
  /**
   * Get Settings
   * @returns ApplicationData Successful Response
   * @throws ApiError
   */
  public static getSettingsApiV1SettingGet(): CancelablePromise<
    Array<ApplicationData>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/setting',
    });
  }

  /**
   * Get Setting
   * @returns ApplicationData Successful Response
   * @throws ApiError
   */
  public static getSettingApiV1SettingSettingNameGet(
    data: SettingData['GetSettingApiV1SettingSettingNameGet']
  ): CancelablePromise<ApplicationData> {
    const { settingName } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/setting/{setting_name}',
      path: {
        setting_name: settingName,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}

export class UsersService {
  /**
   * Read Users
   * Retrieve users.
   * @returns UsersPublic Successful Response
   * @throws ApiError
   */
  public static readUsersApiV1UsersGet(
    data: UsersData['ReadUsersApiV1UsersGet'] = {}
  ): CancelablePromise<UsersPublic> {
    const { skip = 0, limit = 100 } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users',
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Create User
   * Create new user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static createUserApiV1UsersPost(
    data: UsersData['CreateUserApiV1UsersPost']
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/users',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read User Me
   * Get current user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserMeApiV1UsersMeGet(): CancelablePromise<UserPublic> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/me',
    });
  }

  /**
   * Delete User Me
   * Delete own user.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUserMeApiV1UsersMeDelete(): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/users/me',
    });
  }

  /**
   * Update User Me
   * Update own user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static updateUserMeApiV1UsersMePatch(
    data: UsersData['UpdateUserMeApiV1UsersMePatch']
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/me',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Update Password Me
   * Update own password.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static updatePasswordMeApiV1UsersMePasswordPatch(
    data: UsersData['UpdatePasswordMeApiV1UsersMePasswordPatch']
  ): CancelablePromise<Message> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/me/password',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read User By Id
   * Get a specific user by id.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserByIdApiV1UsersUserIdGet(
    data: UsersData['ReadUserByIdApiV1UsersUserIdGet']
  ): CancelablePromise<UserPublic> {
    const { userId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/{user_id}',
      path: {
        user_id: userId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Update User
   * Update a user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static updateUserApiV1UsersUserIdPatch(
    data: UsersData['UpdateUserApiV1UsersUserIdPatch']
  ): CancelablePromise<UserPublic> {
    const { userId, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/{user_id}',
      path: {
        user_id: userId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Delete User
   * Delete a user.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUserApiV1UsersUserIdDelete(
    data: UsersData['DeleteUserApiV1UsersUserIdDelete']
  ): CancelablePromise<Message> {
    const { userId } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/users/{user_id}',
      path: {
        user_id: userId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
