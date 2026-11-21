'use strict';

const { createHash } = require('crypto');
const { buffer } = require('stream/consumers');

hexo.extend.filter.register('after_generate', async function () {
  const route = hexo.route;
  const pages = route.list().filter(path => /^(books|movies|games)\/index\.html$/.test(path));
  const assets = new Set(route.list());
  const scriptPattern = /<script\b[^>]*\bsrc=(['"])data:application\/(?:x-)?javascript;base64,([a-z0-9+/=]+)\1[^>]*>\s*<\/script>/gi;
  const root = String(hexo.config.root || '/').replace(/\/?$/, '/');

  for (const page of pages) {
    const html = (await buffer(route.get(page))).toString();
    let changed = false;
    const output = html.replace(scriptPattern, (tag, quote, encoded) => {
      const script = Buffer.from(encoded, 'base64');
      const hash = createHash('sha256').update(script).digest('hex').slice(0, 16);
      const asset = `js/douban/${hash}.js`;
      if (!assets.has(asset)) {
        route.set(asset, script);
        assets.add(asset);
      }
      changed = true;
      return tag.replace(/data:application\/(?:x-)?javascript;base64,[a-z0-9+/=]+/i, `${root}${asset}`);
    });
    if (changed) route.set(page, output);
  }
});
