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

  if (data.shuoshuo && Array.isArray(data.shuoshuo.entries) && !existingPaths.has('shuo/index.html')) {
    pages.push({
      path: 'shuo/index.html',
      layout: 'page',
      data: { path: 'shuo/index.html', layout: 'page', title: '说说', comments: true, content: '' }
    });
  }

  return pages;
});
