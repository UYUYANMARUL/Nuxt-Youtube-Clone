import { a as defineEventHandler } from './nitro/vercel.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';

const test = defineEventHandler(async (event) => {
  return {
    hello: `world`
  };
});

export { test as default };
//# sourceMappingURL=test.mjs.map
