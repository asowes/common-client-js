## 根目录

### package.json  
仅在此项目中运行时的配置，**跟打包无关**  

###lib  
打包出去的内容，build后自动生成

### originLib
这个文件夹下放的都是需要打包出去的代码  
比如 originLib/components/Button/index.jsx  
那么 引入的时候就是  import Button from @asow/common-client/components/button

### scripts
里面配置打包相关的脚本或者配置  
* package.json  
仅在打包时运行到里面的配置，dependencies里面的第三方包会跟着打包出去


* publish.js  
发布到npm的脚本


* rollup.config.js  
打包相关的配置