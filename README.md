# deno-libmagic

### methods

- `constructor(libpath?: string)` - initializes FFI with provided libpath. If path isn't provided, the hardcoded ldconfig path is used
- `init(): { errMsg?: string }` - tries to initialize LibMagic and obtain cookie necessary for further operations 
- `file(path: string): { result?: string; errMsg?: string }` - returns mime type of a file
- `close(): void` - closes `libarchive` that was opened by the constructor

### properties

- `libpath` - readonly path that to libmagic, either passed to the constructor or default one

### dependencies for running

- `deno` - tested on 1.17 and up
- `libarchive.so` - for archives handling

### permissions

- `unstable`
- `allow-ffi`
