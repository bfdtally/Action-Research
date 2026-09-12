import{copyFileSync,mkdirSync}from'node:fs';
const routes=['welcome','dashboard','projects/new','instructor','help','auth/callback','auth/reset'];
for(const route of routes){const dir=`dist/${route}`;mkdirSync(dir,{recursive:true});copyFileSync('dist/index.html',`${dir}/index.html`)}
copyFileSync('dist/index.html','dist/404.html');
