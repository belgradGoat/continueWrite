// Mock implementation for vitest
export const describe = (name: string, fn: () => void) => {};
describe.skip = (name: string, fn?: () => void) => {};
export const it = (name: string, fn: () => void) => {
  const itObj = fn;
  return itObj;
};

// Add static properties to it and test
it.skip = (name: string, fn?: () => void) => {};
it.todo = (name: string, fn?: () => void) => {};
it.each = (cases: any[]) => (name: string, fn: (...args: any[]) => void) => {};
export const test = (name: string, fn: () => void) => {};

// Add static properties to test as well
test.skip = (name: string, fn?: () => void) => {};
test.todo = (name: string, fn?: () => void) => {};
test.each = (cases: any[]) => (name: string, fn: (...args: any[]) => void) => {};

// Export types
export type Mock = any;
export type MockedFunction<T = any> = T & {
  mockReturnValue: (value: any) => MockedFunction<T>;
  mockReturnValueOnce: (value: any) => MockedFunction<T>;
  mockImplementation: (impl: any) => MockedFunction<T>;
};

const expectMethods = {
  toBe: (expected: any) => expectMethods,
  toEqual: (expected: any) => expectMethods,
  toContain: (expected: any) => expectMethods,
  toContainEqual: (expected: any) => expectMethods,
  toMatch: (expected: any) => expectMethods,
  toBeUndefined: () => expectMethods,
  toBeNull: () => expectMethods,
  toBeTruthy: () => expectMethods,
  toBeFalsy: () => expectMethods,
  toBeDefined: () => expectMethods,
  toBeNaN: () => expectMethods,
  toBeGreaterThan: (expected: any) => expectMethods,
  toBeGreaterThanOrEqual: (expected: any) => expectMethods,
  toBeLessThan: (expected: any) => expectMethods,
  toBeLessThanOrEqual: (expected: any) => expectMethods,
  toHaveLength: (expected: any) => expectMethods,
  toHaveProperty: (expected: any) => expectMethods,
  toHaveBeenCalled: () => expectMethods,
  toHaveBeenCalledTimes: (expected: any) => expectMethods,
  toHaveBeenCalledWith: (...expected: any[]) => expectMethods,
  toHaveBeenCalledOnce: () => expectMethods,
  toHaveBeenNthCalledWith: (nth: number, ...expected: any[]) => expectMethods,
  toThrow: (expected?: any) => expectMethods,
  toThrowError: (expected?: any) => expectMethods,
  toBeInstanceOf: (expected: any) => expectMethods,
  includes: (expected: any) => expectMethods,
  any: (constructor: any) => constructor,
  objectContaining: (obj: any) => obj,
  arrayContaining: (arr: any[]) => arr,
  stringContaining: (str: string) => str,
};

const notMethods = {
  toBe: (expected: any) => expectMethods,
  toEqual: (expected: any) => expectMethods,
  toContain: (expected: any) => expectMethods,
  toBeUndefined: () => expectMethods,
  toBeDefined: () => expectMethods,
  toHaveBeenCalled: () => expectMethods,
  toBeInstanceOf: (expected: any) => expectMethods,
  toThrow: (expected?: any) => expectMethods,
};

export const expect = (value: any) => ({
  ...expectMethods,
  not: notMethods,
  resolves: {
    toBe: (expected: any) => expectMethods,
    toEqual: (expected: any) => expectMethods,
    toBeUndefined: () => expectMethods,
    not: notMethods,
  },
  rejects: {
    toThrow: (expected?: any) => expectMethods,
    toBe: (expected: any) => expectMethods,
  },
});

// Add static methods to expect
expect.any = (constructor: any) => constructor;
expect.objectContaining = (obj: any) => obj;
expect.arrayContaining = (arr: any[]) => arr;
expect.stringContaining = (str: string) => str;
export const vi = {
  fn: (impl?: any) => {
    const mockFn = impl ? impl : () => {};
    mockFn.mockReturnValue = (value: any) => mockFn;
    mockFn.mockReturnValueOnce = (value: any) => mockFn;
    mockFn.mockImplementation = (impl: any) => { Object.assign(mockFn, impl); return mockFn; };
    return mockFn;
  },
  mock: (moduleName: string, factory?: any) => {},
  mocked: (fn: any) => fn,
  resetModules: () => {},
  resetAllMocks: () => {},
  clearAllMocks: () => {},
  restoreAllMocks: () => {},
  spyOn: (obj: any, method: string) => vi.fn(),
  useFakeTimers: () => {},
  useRealTimers: () => {},
  advanceTimersByTime: (time: number) => {},
  clearAllTimers: () => {},
  stubEnv: (key: string, value: string) => {},
};
export const beforeEach = (fn: () => void) => {};
export const afterEach = (fn: () => void) => {};
export const beforeAll = (fn: () => void) => {};
export const afterAll = (fn: () => void) => {};