const fs = require('fs');
const path = require('path');

// 读取环境变量
const ghToken = process.env.GH_TOKEN || '';

// 读取 index.html
const indexPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(indexPath, 'utf-8');

// 替换占位符
htmlContent = htmlContent.replace(
  /window\.ENV_GH_TOKEN\s*=\s*''/,
  `window.ENV_GH_TOKEN = '${ghToken}'`
);

// 写入构建目录
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

fs.writeFileSync(path.join(distPath, 'index.html'), htmlContent);

// 复制 config.json
const configPath = path.join(__dirname, 'config.json');
if (fs.existsSync(configPath)) {
  fs.copyFileSync(configPath, path.join(distPath, 'config.json'));
}

console.log('构建完成！GH_TOKEN 已注入到页面中。');
