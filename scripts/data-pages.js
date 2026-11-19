'use strict';

hexo.extend.generator.register('giorgio-data-pages', function (locals) {
  const data = locals.data || {};
  const pages = [];
  const existingPaths = new Set(locals.pages.toArray().map(page => page.path));

  if (!existingPaths.has('404.html')) {
    pages.push({
      path: '404.html',
      layout: '404',
      data: { path: '404.html', layout: '404', title: '页面未找到' }
    });
  }

  if (data.link && !existingPaths.has('link/index.html')) {
    pages.push({
      path: 'link/index.html',
      layout: 'page',
      data: { path: 'link/index.html', layout: 'page', title: '友情链接', comments: true, content: '' }
    });
  }

  if (data.shuoshuo && Array.isArray(data.shuoshuo.entries)) {
    const configured = Number(hexo.theme.config.shuoshuo && hexo.theme.config.shuoshuo.per_page);
    const perPage = Number.isInteger(configured) && configured > 0 ? configured : 20;
    const total = Math.ceil(data.shuoshuo.entries.length / perPage);
    for (let current = 1; current <= Math.max(total, 1); current++) {
      const path = current === 1 ? 'shuo/index.html' : `shuo/page/${current}/index.html`;
      if (existingPaths.has(path)) continue;
      pages.push({
        path,
        layout: 'page',
        data: { path, layout: 'page', title: '说说', comments: current === 1, content: '', shuo_current: current }
      });
    }
  }

  return pages;
});
