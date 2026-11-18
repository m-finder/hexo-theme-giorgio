'use strict';

hexo.extend.generator.register('giorgio-data-pages', function (locals) {
  const data = locals.data || {};
  const pages = [];

  if (data.link) {
    pages.push({
      path: 'link/index.html',
      layout: 'page',
      data: { path: 'link/index.html', layout: 'page', title: '友情链接', comments: true, content: '' }
    });
  }

  if (data.shuoshuo && Array.isArray(data.shuoshuo.entries)) {
    pages.push({
      path: 'shuo/index.html',
      layout: 'page',
      data: { path: 'shuo/index.html', layout: 'page', title: '说说', comments: false, content: '' }
    });
  }

  return pages;
});
