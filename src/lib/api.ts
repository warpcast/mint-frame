function mergeIntoDefaultOptions<T>({
  defaults,
  options,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaults: Record<any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<any, any>;
}): T {
  const mergedOptions = { ...defaults };

  for (const key in options) {
    if (options[key] !== undefined) {
      mergedOptions[key] = options[key];
    }
  }

  return mergedOptions as T;
}

// Adapted from https://github.com/sindresorhus/is-network-error/tree/main
const networkErrorMessages = new Set([
  'Failed to fetch', // Chrome
  'NetworkError when attempting to fetch resource.', // Firefox
  'The Internet connection appears to be offline.', // Safari 16
  'Load failed', // Safari 17+
  'Network request failed', // `cross-fetch`
]);

function isNetworkError(error: unknown) {
  const isValid =
    error &&
    isError(error) &&
    error.name === 'TypeError' &&
    typeof error.message === 'string';

  if (!isValid) {
    return false;
  }

  // We do an extra check for Safari 17+ as it has a very generic error message.
  // Network errors in Safari have no stack.
  if (error.message === 'Load failed') {
    return error.stack === undefined;
  }

  return networkErrorMessages.has(error.message);
}

type ApiError = {
  message: string;
  reason: string | undefined;
};

type ApiErrorBody = ApiError;

type ApiErrorResponse = {
  errors: ApiErrorBody[];
};

const isError = (error: unknown): error is Error => error instanceof Error;

type FarcasterErrorOptions<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends object = object,
> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: unknown;
} & T;

export class FarcasterError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly error?: unknown;
  public hasBeenTracked?: boolean;

  constructor(name: string, { error }: FarcasterErrorOptions) {
    super(name);
    this.error = error;
  }
}

export interface FetchErrorOptions {
  absoluteUrl: string | undefined;
  body: string | undefined;
  endpointName: EndpointName;
  hasTimedOut: boolean;
  isNetworkError: boolean;
  message: string;
  method: RequestMethod;
  relativeUrl: string;
  resolvedTimeout: number;
  response: Response | undefined;
  responseData: unknown | undefined;
  status?: number;
  timeout: number | undefined;
  error: unknown;
  isHandled: boolean;
  isOffline: boolean;
}

export class UnhandledFetchError extends FarcasterError {
  absoluteUrl: string | undefined;
  body: string | undefined;
  endpointName: EndpointName;
  hasTimedOut: boolean;
  isNetworkError: boolean;
  method: RequestMethod;
  relativeUrl: string;
  resolvedTimeout: number;
  response: Response | undefined;
  responseData: unknown | undefined;
  status: number | undefined;
  timeout: number | undefined;
  isOffline: boolean;

  constructor(options: FarcasterErrorOptions<FetchErrorOptions>) {
    super(options.message, options);
    this.name = 'Farcaster API Error';
    this.absoluteUrl = options.absoluteUrl;
    this.body = options.body;
    this.endpointName = options.endpointName;
    this.hasTimedOut = options.hasTimedOut;
    this.isNetworkError = options.isNetworkError;
    this.method = options.method;
    this.relativeUrl = options.relativeUrl;
    this.resolvedTimeout = options.resolvedTimeout;
    this.response = options.response;
    this.responseData = options.responseData;
    this.status = options.status;
    this.timeout = options.timeout;
    this.isOffline = options.isOffline;
  }
}

interface HandledFetchErrorOptions extends FetchErrorOptions {
  responseData: ApiErrorResponse;
  status: number;
}

export class HandledFetchError extends UnhandledFetchError {
  responseData: ApiErrorResponse;
  status: number;

  constructor(options: FarcasterErrorOptions<HandledFetchErrorOptions>) {
    super(options);
    this.responseData = options.responseData;
    this.status = options.status;
  }
}

type FetchError = HandledFetchError | UnhandledFetchError;

type RequestRelativeUrl = `/${string}`;

type RequestHeaders = Record<string, string>;

type RequestMethod = 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE';

type RequestParams = Record<
  string,
  string | number | boolean | null | undefined | (string | number | boolean)[]
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestData = any;

type EndpointName =
  | 'getCreatorRewardsForUser'
  | 'getCreatorRewardsLeaderboard'
  | 'getCreatorRewardsMetadata'
  | 'getCreatorRewardsEarningsHistory'
  | 'getCreatorRewardsPeriodSummary';

type Fetcher = typeof fetch;

export interface RequestInfo {
  absoluteUrl: string;
  body: RequestData;
  endpointName: EndpointName;
  method: RequestMethod;
  relativeUrl: string;
}

type OnFetchStart = (params: { requestInfo: RequestInfo }) => void;

type OnSuccess = (params: {
  requestInfo: RequestInfo;
  responseData: unknown;
  responseStatus: number;
}) => void;

type OnError = (params: {
  requestInfo: RequestInfo;
  error: FetchError;
  responseStatus: number | undefined;
}) => void;

type OnTimeout = (params: {
  requestInfo: RequestInfo;
  timeSinceRequestStart: number;
}) => void;

type AuthToken = {
  expiresAt: number;
  secret: string;
};

export interface FarcasterApiClientOptions {
  readonly baseUrl?: string;
  readonly fetch?: Fetcher;
  readonly getAuthToken?: () => Promise<AuthToken>;
  readonly mutateTimeout?: number;
  readonly onError?: OnError;
  readonly onFetchStart?: OnFetchStart;
  readonly onSuccess?: OnSuccess;
  readonly onTimeout?: OnTimeout;
  readonly readTimeout?: number;
  readonly timeoutRetryDecayFactor?: number;
  readonly checkOffline?: () => Promise<boolean>;
}

export interface FetchOptions {
  readonly baseUrl?: string;
  readonly body?: RequestData;
  readonly endpointName: EndpointName;
  readonly headers?: RequestHeaders;
  readonly method: RequestMethod;
  readonly params?: RequestParams;
  readonly timeout?: number;
}

type FetchOptionsWithoutMethod = Omit<FetchOptions, 'method'>;
type FetchOptionsWithoutMethodOrBody = Omit<FetchOptionsWithoutMethod, 'body'>;

type MutateFetchOptions = FetchOptionsWithoutMethod & {
  retryLimit?: number;
};

type DeleteOptions = MutateFetchOptions;
type GetOptions = FetchOptionsWithoutMethodOrBody;
type PatchOptions = MutateFetchOptions;
type PostOptions = MutateFetchOptions;
type PutOptions = MutateFetchOptions;

export interface FetchResponse<T> {
  readonly data: T;
  readonly status: number;
}

const defaultBaseUrl = 'https://client.warpcast.com';
const defaultReadTimeout = 20 * 1000;
const defaultMutateTimeout = 20 * 1000;

const globalFetch = globalThis.fetch
  ? globalThis.fetch.bind(globalThis)
  : undefined;

const getDefaultOptions = () => ({
  baseUrl: defaultBaseUrl,
  fetch: globalFetch,
  readTimeout: defaultReadTimeout,
  mutateTimeout: defaultMutateTimeout,
});

const generateIdempotencyKey = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
};

// This class helps reduce a request's timeout by a decay factor on retries.
// This can help reduce excessive load times on flaky networks.
// Currently only designed for GET requests since it tracks calls by URL and params only.
class TimeoutRetryDecayManager {
  private callCounts: Map<string, number> = new Map();
  private lastResetTimes: Map<string, number> = new Map();
  private RESET_INTERVAL_MS = 60000;

  private decayFactor: number;

  constructor(decayFactor: number = 0.3) {
    this.decayFactor = decayFactor;
  }

  getDecayFactor(url: string, params?: RequestParams): number {
    const now = Date.now();
    const key = params ? `${url}?${JSON.stringify(params)}` : url;
    if (!this.lastResetTimes.has(key)) {
      this.lastResetTimes.set(key, now);
    }
    const lastResetTime = this.lastResetTimes.get(key) || now;

    if (now - lastResetTime > this.RESET_INTERVAL_MS) {
      this.callCounts.delete(key);
      this.lastResetTimes.delete(key);
    }

    const currentCount = this.callCounts.get(key) || 0;
    this.callCounts.set(key, currentCount + 1);

    return Math.max(1 - currentCount * this.decayFactor, this.decayFactor);
  }
}

abstract class AbstractWarpcastApiClient {
  private options: FarcasterApiClientOptions;
  private defaultHeaders: RequestHeaders;
  private timeoutRetryDecayManager: TimeoutRetryDecayManager | undefined;

  constructor(options: FarcasterApiClientOptions = {}) {
    this.options = mergeIntoDefaultOptions<FarcasterApiClientOptions>({
      defaults: getDefaultOptions(),
      options,
    });

    this.timeoutRetryDecayManager = options.timeoutRetryDecayFactor
      ? new TimeoutRetryDecayManager(options.timeoutRetryDecayFactor)
      : undefined;

    this.defaultHeaders = {
      'Content-Type': 'application/json; charset=utf-8',
    };

    for (const key in this.defaultHeaders) {
      if (this.defaultHeaders[key] === '') {
        delete this.defaultHeaders[key];
      }
    }
  }

  public updateOptions(options: Partial<FarcasterApiClientOptions>) {
    this.options = mergeIntoDefaultOptions({ defaults: this.options, options });
  }

  private async fetch<T>(
    relativeUrl: RequestRelativeUrl,
    {
      baseUrl,
      body: rawBody,
      endpointName,
      headers: partialHeaders,
      method,
      params,
      timeout,
    }: FetchOptions,
  ): Promise<FetchResponse<T>> {
    let response: Response | undefined;
    let responseData: T | undefined;

    const stringifiedParams =
      typeof params !== 'undefined'
        ? new URLSearchParams(
            Object.entries(params).flatMap(([key, value]) =>
              Array.isArray(value)
                ? value.map((v) => [key, String(v)])
                : value !== null
                  ? [[key, String(value)]]
                  : [],
            ),
          ).toString()
        : '';
    const url = `${baseUrl || this.options.baseUrl}${relativeUrl}${
      stringifiedParams ? `?${stringifiedParams}` : ''
    }`;

    const headers = {
      ...this.defaultHeaders,
      ...partialHeaders,
    };
    const body = rawBody === undefined ? rawBody : JSON.stringify(rawBody);
    let hasTimedOut = false;

    const timeoutDecayFactor = this.timeoutRetryDecayManager
      ? this.timeoutRetryDecayManager.getDecayFactor(url, params)
      : 1;

    const resolvedTimeout =
      (() => {
        if (timeout !== undefined) {
          return timeout;
        }

        if (method === 'GET') {
          return this.options.readTimeout === undefined
            ? defaultReadTimeout
            : this.options.readTimeout;
        }

        return this.options.mutateTimeout === undefined
          ? defaultMutateTimeout
          : this.options.mutateTimeout;
      })() * timeoutDecayFactor;

    function buildErrorParams({
      originalError,
      isHandled,
      isOffline = false,
    }: {
      originalError: unknown;
      isHandled: boolean;
      isOffline?: boolean;
    }): FetchErrorOptions {
      return {
        absoluteUrl: url,
        body: body,
        endpointName,
        error: originalError,
        hasTimedOut,
        isHandled,
        message: isError(originalError)
          ? originalError.message
          : originalError
            ? String(originalError)
            : 'Farcaster API Client experienced an unexpected error.',
        isNetworkError: isNetworkError(originalError),
        method,
        relativeUrl,
        resolvedTimeout,
        response,
        responseData,
        status: response?.status,
        timeout,
        isOffline,
      };
    }

    function getRequestInfo(): RequestInfo {
      return {
        absoluteUrl: url,
        body,
        endpointName,
        method,
        relativeUrl,
      };
    }

    if (this.options.checkOffline) {
      const isOffline = await this.options.checkOffline();
      if (isOffline) {
        throw new UnhandledFetchError(
          buildErrorParams({
            originalError: 'Offline',
            isHandled: false,
            isOffline,
          }),
        );
      }
    }

    const controller = new AbortController();
    const requestStartedAt = Date.now();

    let timeoutId = resolvedTimeout
      ? setTimeout(() => {
          if (this.options.onTimeout) {
            this.options.onTimeout({
              requestInfo: getRequestInfo(),
              timeSinceRequestStart: Date.now() - requestStartedAt,
            });
          }
          hasTimedOut = true;
          controller.abort();
        }, resolvedTimeout)
      : undefined;

    try {
      const resolvedFetch = this.options.fetch || globalFetch;

      if (!resolvedFetch) {
        throw new Error(
          'Failed to find a resolved fetch method to make requests',
        );
      }

      if (this.options.onFetchStart) {
        this.options.onFetchStart({
          requestInfo: getRequestInfo(),
        });
      }

      response = await resolvedFetch(url, {
        body,
        headers,
        method,
        signal: controller.signal,
      });

      const contentType = (
        response.headers.get('content-type') ||
        'application/json; charset=utf-8'
      ).toLowerCase();
      const isJson = contentType.includes('json');
      const responseData: T = isJson
        ? await response.json()
        : await response.text();

      if (response.status >= 400) {
        const body = responseData as unknown as ApiErrorResponse;
        const message = `${endpointName} ${response.status} - ${body.errors
          .map((e) => e.message)
          .join(',')}`;
        const handledError = new HandledFetchError({
          ...buildErrorParams({ originalError: message, isHandled: true }),
          responseData: body,
          status: response.status,
        });

        throw handledError;
      }

      if (this.options.onSuccess) {
        this.options.onSuccess({
          requestInfo: getRequestInfo(),
          responseData,
          responseStatus: response.status,
        });
      }

      return { data: responseData, status: response.status };
    } catch (e) {
      const unhandledError = new UnhandledFetchError(
        buildErrorParams({ originalError: e, isHandled: false }),
      );

      if (this.options.onError) {
        this.options.onError({
          error: unhandledError,
          requestInfo: getRequestInfo(),
          responseStatus: response?.status,
        });
      }

      throw unhandledError;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private get baseUrl() {
    return this.options.baseUrl;
  }

  protected async authedGet<T>(
    url: RequestRelativeUrl,
    { headers, ...options }: GetOptions,
  ) {
    return this.fetch<T>(url, {
      ...options,
      method: 'GET',
      headers: await this.authorize(headers),
    });
  }

  protected async get<T>(url: RequestRelativeUrl, options: GetOptions) {
    return this.fetch<T>(url, { ...options, method: 'GET' });
  }

  protected async patch<T>(
    url: RequestRelativeUrl,
    { headers, ...options }: PatchOptions,
  ) {
    return this.fetch<T>(url, {
      ...options,
      method: 'PATCH',
      headers: await this.authorize(headers, true),
    });
  }

  protected async post<T>(
    url: RequestRelativeUrl,
    { headers, ...options }: PostOptions,
  ) {
    return this.fetch<T>(url, {
      ...options,
      method: 'POST',
      headers: await this.authorize(headers, true),
    });
  }

  protected async put<T>(
    url: RequestRelativeUrl,
    { headers, ...options }: PutOptions,
  ) {
    return this.fetch<T>(url, {
      ...options,
      method: 'PUT',
      headers: await this.authorize(headers, true),
    });
  }

  protected async delete<T>(
    url: RequestRelativeUrl,
    { headers, ...options }: DeleteOptions,
  ) {
    return this.fetch<T>(url, {
      ...options,
      method: 'DELETE',
      headers: await this.authorize(headers, true),
    });
  }

  protected async authorize(
    originalHeaders: RequestHeaders = {},
    idempotent = false,
  ) {
    let { Authorization } = originalHeaders;

    if (!Authorization && this.options.getAuthToken) {
      const token = await this.options.getAuthToken();

      if (token) {
        Authorization = `Bearer ${token.secret}`;
      }
    }

    const allHeaders: RequestHeaders = { ...originalHeaders, Authorization };
    if (idempotent) {
      allHeaders['Idempotency-Key'] = generateIdempotencyKey();
    }
    return allHeaders;
  }
}

type ApiNonNegativeInteger = number;

export type ApiTimestampMillis = number;

type ApiFid = number;

type ApiFname = string;

type ApiDisplayName = string;

type ApiPfp = {
  url: string;
};

type ApiProfile = {
  bio: {
    text: string;
  };
};

interface ApiUser {
  fid: ApiFid;
  username?: ApiFname;
  displayName: ApiDisplayName;
  pfp?: ApiPfp;
  profile: ApiProfile;
  followerCount: ApiNonNegativeInteger;
  followingCount: ApiNonNegativeInteger;
}

export type ApiCreatorRewardsMetadata = {
  lastUpdateTimestamp: ApiNonNegativeInteger;
  currentPeriodStartTimestamp: ApiNonNegativeInteger;
  currentPeriodEndTimestamp: ApiNonNegativeInteger;
};

export type ApiUserCreatorRewardsScores = {
  user: ApiUser;
  allTimeScore: ApiNonNegativeInteger;
  currentPeriodScore: ApiNonNegativeInteger;
  previousPeriodScore: ApiNonNegativeInteger;
  currentPeriodRank?: ApiNonNegativeInteger;
};

export type ApiCreatorRewardsLeaderboardUser = {
  user: ApiUser;
  score: ApiNonNegativeInteger;
  rank: ApiNonNegativeInteger;
};

export type ApiCreatorRewardsLeaderboard = {
  users: ApiCreatorRewardsLeaderboardUser[];
};

export type ApiCreatorRewardsEarnings = {
  periodStartDate: ApiTimestampMillis;
  periodEndDate: ApiTimestampMillis;
  amountCents: ApiNonNegativeInteger;
  rank: ApiNonNegativeInteger;
  numContenders: ApiNonNegativeInteger;
};

export type ApiCreatorRewardsEarningsHistory = {
  earnings: ApiCreatorRewardsEarnings[];
  totalEarningsCents: ApiNonNegativeInteger;
};

export type ApiCreatorRewardsPeriodSummary = {
  periodStartDate: ApiTimestampMillis;
  periodEndDate: ApiTimestampMillis;
  rewardCents: ApiNonNegativeInteger;
  score: ApiNonNegativeInteger;
  rank?: ApiNonNegativeInteger;
};

type ApiGetCreatorRewardsMetadata200Response = {
  result: {
    metadata: ApiCreatorRewardsMetadata;
  };
};

type ApiGetCreatorRewardsForUserQueryParamsCamelCase = {
  fid: number;
};

type ApiGetCreatorRewardsForUserQueryParams =
  ApiGetCreatorRewardsForUserQueryParamsCamelCase;

type ApiGetCreatorRewardsForUser200Response = {
  result: {
    scores: ApiUserCreatorRewardsScores;
  };
};

type ApiGetCreatorRewardsLeaderboardQueryParamsCamelCase = {
  cursor?: string;
  limit: number;
};

type ApiGetCreatorRewardsLeaderboardQueryParams =
  ApiGetCreatorRewardsLeaderboardQueryParamsCamelCase;

type ApiGetCreatorRewardsLeaderboard200Response = {
  result: {
    leaderboard: ApiCreatorRewardsLeaderboard;
  };
  next?: {
    cursor?: string;
  };
};

type ApiGetCreatorRewardsEarningsHistoryQueryParamsCamelCase = {
  fid: number;
  cursor?: string;
  limit: number;
};
type ApiGetCreatorRewardsEarningsHistoryQueryParams =
  ApiGetCreatorRewardsEarningsHistoryQueryParamsCamelCase;

type ApiGetCreatorRewardsEarningsHistory200Response = {
  result: {
    earnings: ApiCreatorRewardsEarningsHistory;
  };
  next?: {
    cursor?: string;
  };
};

export type ApiGetCreatorRewardsPeriodSummaryQueryParamsCamelCase = {
  fid: number;
};
export type ApiGetCreatorRewardsPeriodSummaryQueryParams =
  ApiGetCreatorRewardsPeriodSummaryQueryParamsCamelCase;

export type ApiGetCreatorRewardsPeriodSummary200Response = {
  result: {
    summary: ApiCreatorRewardsPeriodSummary;
  };
};

class WarpcastApiClient extends AbstractWarpcastApiClient {
  /**
   * Get creator rewards leaderboard
   */
  getCreatorRewardsLeaderboard(
    params: ApiGetCreatorRewardsLeaderboardQueryParams,
    { headers, timeout }: { headers?: RequestHeaders; timeout?: number } = {},
  ) {
    return this.authedGet<ApiGetCreatorRewardsLeaderboard200Response>(
      '/v1/creator-rewards-leaderboard',
      {
        headers,
        timeout,
        endpointName: 'getCreatorRewardsLeaderboard',
        params,
      },
    );
  }

  /**
   * Get creator rewards metadata
   */
  getCreatorRewardsMetadata({
    headers,
    timeout,
  }: { headers?: RequestHeaders; timeout?: number } = {}) {
    return this.authedGet<ApiGetCreatorRewardsMetadata200Response>(
      '/v1/creator-rewards-metadata',
      {
        headers,
        timeout,
        endpointName: 'getCreatorRewardsMetadata',
      },
    );
  }

  /**
   * Get creator rewards scores for a user
   */
  getCreatorRewardsForUser(
    params: ApiGetCreatorRewardsForUserQueryParams,
    { headers, timeout }: { headers?: RequestHeaders; timeout?: number } = {},
  ) {
    return this.authedGet<ApiGetCreatorRewardsForUser200Response>(
      '/v1/creator-rewards-scores-for-user',
      {
        headers,
        timeout,
        endpointName: 'getCreatorRewardsForUser',
        params,
      },
    );
  }

  /**
   * Get creator rewards earnings history
   */
  getCreatorRewardsEarningsHistory(
    params: ApiGetCreatorRewardsEarningsHistoryQueryParams,
    { headers, timeout }: { headers?: RequestHeaders; timeout?: number } = {},
  ) {
    return this.authedGet<ApiGetCreatorRewardsEarningsHistory200Response>(
      '/v1/creator-rewards-earnings-history',
      {
        headers,
        timeout,
        endpointName: 'getCreatorRewardsEarningsHistory',
        params,
      },
    );
  }

  /**
   * Get creator rewards period summary
   */
  getCreatorRewardsPeriodSummary(
    params: ApiGetCreatorRewardsPeriodSummaryQueryParams,
    { headers, timeout }: { headers?: RequestHeaders; timeout?: number } = {},
  ) {
    return this.authedGet<ApiGetCreatorRewardsPeriodSummary200Response>(
      '/v1/creator-rewards-period-summary',
      {
        headers,
        timeout,
        endpointName: 'getCreatorRewardsPeriodSummary',
        params,
      },
    );
  }
}

const api = new WarpcastApiClient();

export { api };
