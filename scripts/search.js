'use strict';

hexo.extend.generator.register('giorgio-search', function (locals) {
  if (!hexo.theme.config.search || !hexo.theme.config.search.enable) return [];
  const root = hexo.config.root || '/';
  const posts = locals.posts.toArray().sort((a, b) => b.date - a.date).map(post => {
    const plain = String(post.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return {
      title: post.title || '',
      url: root.replace(/\/$/, '') + '/' + post.path.replace(/^\//, ''),
      date: post.date.format('YYYY-MM-DD'),
      categories: post.categories.toArray().map(category => category.name),
      tags: post.tags.toArray().map(tag => tag.name),
      text: plain.slice(0, 4000)
    };
  });
  return {path:'giorgio-search.json', data:JSON.stringify(posts)};
});
