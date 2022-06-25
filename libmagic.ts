import { defaultLibmagicPath, MIME_TYPE } from "./consts.ts";
import { symbols } from "./symbols.ts";
import { makeCString } from "./utils.ts";

export class LibMagic {
  private lib: Deno.DynamicLibrary<typeof symbols>;
  private cookie?: Deno.UnsafePointer;

  constructor(public readonly libpath: string = defaultLibmagicPath) {
    this.lib = Deno.dlopen(libpath, symbols);
  }

  init(): { errMsg?: string } {
    this.cookie = this.lib.symbols.magic_open(
      new Int8Array([MIME_TYPE])[0],
    ) as Deno.UnsafePointer;
    if (this.cookie === null) {
      this.close();

      return {
        errMsg: "could not obtain libmagic cookie",
      };
    }

    const loaded = this.lib.symbols.magic_load(this.cookie, null);
    if (loaded === -1) {
      this.close();

      return {
        errMsg: "could not load default database entries for libmagic",
      };
    }

    return {};
  }

  file(path: string): { result?: string; errMsg?: string } {
    if (!this.lib || !this.cookie) {
      return {
        errMsg: `libmagic is not initialized`,
      };
    }

    const description = this.lib.symbols.magic_file(
      this.cookie,
      makeCString(path),
    ) as Deno.UnsafePointer;

    if (description === null) {
      this.close();

      return {
        errMsg: `could not analyze file ${path}`,
      };
    }

    const descriptionView = new Deno.UnsafePointerView(description)
      .getCString();

    return {
      result: descriptionView,
    };
  }

  close() {
    if (!this.lib) return;

    if (this.cookie) this.lib.symbols.magic_close(this.cookie);
    this.lib.close();
  }
}
