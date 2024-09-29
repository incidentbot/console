import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';

import type {
  Body_login_login_access_token,
  IncidentCreate,
  Incident,
  Incidents,
  IncidentEvent,
  IncidentParticipant,
  JiraIssue,
  MaintenanceWindow,
  MaintenanceWindows,
  Message,
  NewPassword,
  Token,
  UpdatePassword,
  UserCreate,
  UserPublic,
  UserRegister,
  UserUpdate,
  UserUpdateMe,
  UsersPublic,
  MaintenanceWindowCreate,
  OpsgenieIncident,
  PagerDutyIncident,
  Postmortem,
  StatuspageIncident,
} from './models';

export type TDataLoginAccessToken = {
  formData: Body_login_login_access_token;
};
export type TDataRecoverPassword = {
  email: string;
};
export type TDataResetPassword = {
  requestBody: NewPassword;
};
export type TDataRecoverPasswordHtmlContent = {
  email: string;
};
export type TDataDeleteObject = {
  slug?: string | null;
  id?: string | null;
  requestBody?: Incident | IncidentEvent | MaintenanceWindow | UserPublic;
};

export class LoginService {
  /**
   * Login Access Token
   * OAuth2 compatible token login, get an access token for future requests
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static loginAccessToken(
    data: TDataLoginAccessToken
  ): CancelablePromise<Token> {
    const { formData } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/login/access-token',
      formData: formData,
      mediaType: 'application/x-www-form-urlencoded',
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Test Token
   * Test access token
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static testToken(): CancelablePromise<UserPublic> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/login/test-token',
    });
  }

  /**
   * Recover Password
   * Password Recovery
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static recoverPassword(
    data: TDataRecoverPassword
  ): CancelablePromise<Message> {
    const { email } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/password-recovery/{email}',
      path: {
        email,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Reset Password
   * Reset password
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static resetPassword(
    data: TDataResetPassword
  ): CancelablePromise<Message> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/reset-password/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Recover Password Html Content
   * HTML Content for Password Recovery
   * @returns string Successful Response
   * @throws ApiError
   */
  public static recoverPasswordHtmlContent(
    data: TDataRecoverPasswordHtmlContent
  ): CancelablePromise<string> {
    const { email } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/password-recovery-html-content/{email}',
      path: {
        email,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }
}

export type TDataReadUsers = {
  limit?: number;
  skip?: number;
};
export type TDataCreateUser = {
  requestBody: UserCreate;
};
export type TDataUpdateUserMe = {
  requestBody: UserUpdateMe;
};
export type TDataUpdatePasswordMe = {
  requestBody: UpdatePassword;
};
export type TDataRegisterUser = {
  requestBody: UserRegister;
};
export type TDataReadUserById = {
  userId: string;
};
export type TDataUpdateUser = {
  requestBody: UserUpdate;
  userId: string;
};

export class UsersService {
  /**
   * Read Users
   * Retrieve users.
   * @returns UsersPublic Successful Response
   * @throws ApiError
   */
  public static readUsers(
    data: TDataReadUsers = {}
  ): CancelablePromise<UsersPublic> {
    const { limit = 100, skip = 0 } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/',
      query: {
        skip,
        limit,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Create User
   * Create new user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static createUser(
    data: TDataCreateUser
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/users/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read User Me
   * Get current user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserMe(): CancelablePromise<UserPublic> {
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
  public static deleteUserMe(): CancelablePromise<Message> {
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
  public static updateUserMe(
    data: TDataUpdateUserMe
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/me',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Update Password Me
   * Update own password.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static updatePasswordMe(
    data: TDataUpdatePasswordMe
  ): CancelablePromise<Message> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/me/password',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Register User
   * Create new user without the need to be logged in.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static registerUser(
    data: TDataRegisterUser
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/users/signup',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read User By Id
   * Get a specific user by id.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserById(
    data: TDataReadUserById
  ): CancelablePromise<UserPublic> {
    const { userId } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/users/{user_id}',
      path: {
        user_id: userId,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Update User
   * Update a user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static updateUser(
    data: TDataUpdateUser
  ): CancelablePromise<UserPublic> {
    const { requestBody, userId } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/users/{user_id}',
      path: {
        user_id: userId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Delete User
   * Delete a user.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUser(
    data: TDataDeleteObject
  ): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/users/{user_id}',
      path: {
        user_id: data.requestBody?.id,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }
}

export type TDataTestEmail = {
  emailTo: string;
};

export class UtilsService {
  /**
   * Test Email
   * Test emails.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static testEmail(data: TDataTestEmail): CancelablePromise<Message> {
    const { emailTo } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/utils/test-email/',
      query: {
        email_to: emailTo,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }
}

export type TDataCreateIncident = {
  requestBody: IncidentCreate;
};
export type TDataReadIncident = {
  slug: string;
};
export type TDataReadIncidents = {
  limit?: number;
  skip?: number;
};
export type TDataReadIncidentEvents = {
  slug: string;
};
export type TDataReadIncidentEventImage = {
  slug: string;
  id: string;
};
export type TDataReadIncidentParticipants = {
  slug: string;
};
export type TDataReadJiraIssues = {
  slug: string;
};
export type TDataReadOpsgenieIncidents = {
  slug: string;
};
export type TDataReadPagerDutyIncidents = {
  slug: string;
};
export type TDataReadPostmortems = {
  slug: string;
};
export type TDataReadStatuspageIncidents = {
  slug: string;
};
export type TDataUpdateIncident = {
  field: string;
  requestBody: Incident;
};
export type TDataUpdateIncidentEvent = {
  id: string;
  slug: string;
  requestBody: IncidentEvent;
};

export class IncidentsService {
  /**
   * Create Incident
   * Create new incident.
   * @returns Incident Successful Response
   * @throws ApiError
   */
  public static createIncident(
    data: TDataCreateIncident
  ): CancelablePromise<Incident> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/incident',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Delete Incident
   * Delete an incident.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteIncident(
    data: TDataDeleteObject
  ): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/incident',
      body: data.requestBody,
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Delete Incident Event
   * Delete an incident event.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteIncidentEvent(
    data: TDataDeleteObject
  ): CancelablePromise<Message> {
    const { slug, id } = data;
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/incident/{slug}/events/{id}',
      path: {
        slug,
        id,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read Incident
   * Get incident by ID.
   * @returns Incident Successful Response
   * @throws ApiError
   */
  public static readIncident(
    data: TDataReadIncident
  ): CancelablePromise<Incident> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}',
      path: {
        slug,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read Incidents
   * Retrieve Incidents.
   * @returns Incidents Successful Response
   * @throws ApiError
   */
  public static readIncidents(
    data: TDataReadIncidents = {}
  ): CancelablePromise<Incidents> {
    const { limit = 100, skip = 0 } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident',
      query: {
        skip,
        limit,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read All Incidents
   * Retrieve All Incidents.
   * @returns Incidents Successful Response
   * @throws ApiError
   */
  public static readAllIncidents(): CancelablePromise<Incidents> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident',
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read Incident Events
   * Get incident events by incident slug.
   * @returns IncidentEvents Successful Response
   * @throws ApiError
   */
  public static readIncidentEvents(
    data: TDataReadIncidentEvents
  ): CancelablePromise<Array<IncidentEvent>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/events',
      path: {
        slug,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read Incident Event Image
   * Get incident event image by incident slug and event id.
   * @returns IncidentEvents Successful Response
   * @throws ApiError
   */
  public static readIncidentEventImage(
    data: TDataReadIncidentEventImage
  ): CancelablePromise<ArrayBuffer> {
    const { slug, id } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/events/image/{id}',
      path: {
        slug,
        id,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read Incident Participants
   * Get incident participants by incident slug.
   * @returns IncidentParticipants Successful Response
   * @throws ApiError
   */
  public static readIncidentParticipants(
    data: TDataReadIncidentParticipants
  ): CancelablePromise<Array<IncidentParticipant>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/participants',
      path: {
        slug,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read Incident Jira Issues
   * Get Jira issues associated with an incident.
   * @returns JiraIssues Successful Response
   * @throws ApiError
   */
  public static readIncidentJiraIssues(
    data: TDataReadJiraIssues
  ): CancelablePromise<Array<JiraIssue>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/jira',
      path: {
        slug,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read Incident Opsgenie Incidents
   * Get Opsgenie incidents associated with an incident.
   * @returns OpsgenieIncidents Successful Response
   * @throws ApiError
   */
  public static readIncidentOpsgenieIncidents(
    data: TDataReadOpsgenieIncidents
  ): CancelablePromise<Array<OpsgenieIncident>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/opsgenie',
      path: {
        slug,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read Incident PagerDuty Incidents
   * Get PagerDuty incidents associated with an incident.
   * @returns PagerDutyIncidents Successful Response
   * @throws ApiError
   */
  public static readIncidentPagerDutyIncidents(
    data: TDataReadPagerDutyIncidents
  ): CancelablePromise<Array<PagerDutyIncident>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/pagerduty',
      path: {
        slug,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read Incident Postmortems
   * Get postmortems associated with an incident.
   * @returns Postmortems Successful Response
   * @throws ApiError
   */
  public static readIncidentPostmortems(
    data: TDataReadPostmortems
  ): CancelablePromise<Array<Postmortem>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/postmortem',
      path: {
        slug,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read Incident Statuspage Incidents
   * Get Statuspage incidents associated with an incident.
   * @returns StatuspageIncident Successful Response
   * @throws ApiError
   */
  public static readIncidentStatuspageIncidents(
    data: TDataReadStatuspageIncidents
  ): CancelablePromise<Array<StatuspageIncident>> {
    const { slug } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/incident/{slug}/statuspage',
      path: {
        slug,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Update Incident
   * Update an incident.
   * @returns Incident Successful Response
   * @throws ApiError
   */
  public static updateIncident(
    data: TDataUpdateIncident
  ): CancelablePromise<Incident> {
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
        422: 'Validation Error',
      },
    });
  }

  /**
   * Update Incident Event
   * Update an incident event.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static updateIncidentEvent(
    data: TDataUpdateIncidentEvent
  ): CancelablePromise<Message> {
    const { slug, id, requestBody } = data;
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/incident/{slug}/events/{id}',
      path: {
        slug,
        id,
      },
      body: requestBody,
      errors: {
        422: 'Validation Error',
      },
    });
  }
}

export type TDataCreateMaintenanceWindow = {
  requestBody: MaintenanceWindowCreate;
};
export type TDataReadMaintenanceWindow = {
  id: string;
};
export type TDataReadMaintenanceWindows = {
  limit?: number;
  skip?: number;
};
export type TDataUpdateMaintenanceWindow = {
  field: string;
  requestBody: MaintenanceWindowCreate;
};

export class MaintenanceWindowService {
  /**
   * Create Maintenance Window
   * Create new maintenance window.
   * @returns MaintenanceWindow Successful Response
   * @throws ApiError
   */
  public static createMaintenanceWindow(
    data: TDataCreateMaintenanceWindow
  ): CancelablePromise<MaintenanceWindow> {
    const { requestBody } = data;
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/maintenance_window',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Delete Maintenance Window
   * Delete a maintenance window.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteMaintenceWindow(
    data: TDataDeleteObject
  ): CancelablePromise<MaintenanceWindow> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/maintenance_window',
      body: data.requestBody,
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read Maintenance Window
   * Get maintenance window by ID.
   * @returns MaintenanceWindow Successful Response
   * @throws ApiError
   */
  public static readMaintenanceWindow(
    data: TDataReadMaintenanceWindow
  ): CancelablePromise<MaintenanceWindow> {
    const { id } = data;
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/maintenance_window/{id}',
      path: {
        id,
      },
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Read Maintenance Windows
   * Retrieve maintenance windows.
   * @returns MaintenanceWindows Successful Response
   * @throws ApiError
   */
  public static readMaintenanceWindows(): CancelablePromise<MaintenanceWindows> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/maintenance_window',
      errors: {
        422: 'Validation Error',
      },
    });
  }

  /**
   * Update Maintenance Window
   * Update a maintenance window.
   * @returns MaintenanceWindow Successful Response
   * @throws ApiError
   */
  public static updateMaintenanceWindow(
    data: TDataUpdateMaintenanceWindow
  ): CancelablePromise<MaintenanceWindow> {
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
        422: 'Validation Error',
      },
    });
  }
}
