运行系统命令

```js
const { exec } = require('child_process');
exec(`gen-project ${name}`, (err, stdout, stderr) => {
  if(err) {
      console.log(err);
      return;
  }
  console.log(`stdout: ${stdout}`);
})
```

运行自己封装的脚本用js 引入就好了