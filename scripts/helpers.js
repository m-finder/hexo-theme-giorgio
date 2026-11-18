'use strict';

hexo.extend.helper.register('giorgio_markdown', function (text) {
  return hexo.render.renderSync({ text: String(text || ''), engine: 'markdown' });
});

function shuoDateParts(value) {
  if (value instanceof Date) {
    const pad = number => String(number).padStart(2, '0');
    return [value.getUTCFullYear(), pad(value.getUTCMonth() + 1), pad(value.getUTCDate())].join('-') +
      ' ' + [pad(value.getUTCHours()), pad(value.getUTCMinutes()), pad(value.getUTCSeconds())].join(':');
  }
  return String(value || '').replace('T', ' ').replace(/(?:\.\d+)?Z$/, '');
}

hexo.extend.helper.register('giorgio_shuo_date', function (value) {
  return shuoDateParts(value).slice(0, 16);
});

hexo.extend.helper.register('giorgio_shuo_datetime', function (value) {
  return shuoDateParts(value).replace(' ', 'T');
});

hexo.extend.helper.register('giorgio_projects', function (content) {
  const html = String(content || '');
  const headings = Array.from(html.matchAll(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi));
  return headings.map((heading, index) => {
    const start = heading.index + heading[0].length;
    const end = index + 1 < headings.length ? headings[index + 1].index : html.length;
    let body = html.slice(start, end).trim();
    const image = body.match(/<p>\s*<img\b[^>]*>\s*<\/p>/i);
    if (image) body = body.replace(image[0], '').trim();
    return { heading: heading[0], image: image ? image[0] : '', content: body };
  });
});
