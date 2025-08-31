// Mock implementation for @continuedev/fetch
export interface MockResponse {
  ok: boolean;
  status: number;
  statusText: string;
  text: () => Promise<string>;
  json: () => Promise<any>;
  [Symbol.asyncIterator]?: () => AsyncIterableIterator<string>;
}

export default function fetch(url: string | URL, options?: any): Promise<MockResponse> {
  const mockResponse: MockResponse = {
    ok: true,
    status: 200,
    statusText: 'OK',
    text: () => Promise.resolve(''),
    json: () => Promise.resolve({}),
    [Symbol.asyncIterator]: async function* () {
      yield '';
    }
  };
  return Promise.resolve(mockResponse);
}

export const fetchWithRequestOptions = fetch;
export function fetchwithRequestOptions(url: string | URL, init?: any, requestOptions?: any): Promise<MockResponse> {
  return fetch(url, init);
}

export function streamResponse(response: MockResponse): AsyncIterableIterator<string> {
  return response[Symbol.asyncIterator]?.() || (async function* () {
    yield '';
  })();
}

export function streamSse(response: MockResponse): AsyncIterableIterator<any> {
  return (async function* () {
    yield { type: 'data', data: '{}' };
  })();
}