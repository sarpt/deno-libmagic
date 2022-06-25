export const symbols = {
  magic_open: {
    parameters: [
      "i8", // flags
    ] as Deno.NativeType[],
    result: "pointer" as Deno.NativeType, // cookie
  },
  magic_close: {
    parameters: [
      "pointer", // cookie
    ] as Deno.NativeType[],
    result: "void" as Deno.NativeType,
  },
  magic_file: {
    parameters: [
      "pointer", // cookie
      "pointer", // path as cstring
    ] as Deno.NativeType[],
    result: "pointer" as Deno.NativeType, // description as cstring
  },
  magic_load: {
    parameters: [
      "pointer", // cookie
      "pointer", // database path as cstring, null for default
    ] as Deno.NativeType[],
    result: "i8" as Deno.NativeType, // 0 on success, -1 on failure
  },
};
