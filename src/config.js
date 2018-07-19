module.exports = {
    title: 'React ghpages blog',
    description: 'React ghpages blog based on GitHub Pages.',
    author: 'zowiegong',
    keywords: 'bolg, web, javascript, react, zowiegong, 博客',

    domain: 'http://localhost:3000',

    baseURL: 'https://api.github.com',
    requestTimeOut: 20 * 1000,

    // 开启评论需修改 /public/oauth.html 的 client_id、client_secret 值，从 https://github.com/settings/applications/new 注册获取
    comment: true,

    owner: 'zowiegong',
    repo: 'blog',
    postsDir: 'posts',
    branch: 'master'
}