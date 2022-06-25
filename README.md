# deno-libmagic

### methods

- `open(libpath: string): { errMsg?: string }` - opens libmagic and tries to obtain cookie necessary for further operations
- `file(path: string): { result?: string; errMsg?: string }` - returns mime type of a file
- `close(): void` - closes `libarchive` that was opened by the constructor

### dependencies for running

- `deno` - tested on 1.17 and up
- `libarchive.so` - for archives handling

### permissions

- `unstable`
- `allow-ffi`
