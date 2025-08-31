import { vi } from "vitest";

export const fetchwithRequestOptions = vi.fn(
  async (url: any, options?: any, requestOptions?: any) => {
    console.log("Mocked fetch called with:", url, options, requestOptions);
    return {
      ok: true,
      status: 200,
      statusText: "OK",
    };
  },
);

export const streamSse = vi.fn().mockImplementation(function* () {
  yield "";
});
