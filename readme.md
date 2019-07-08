## 前端埋点监控

用于快速的实现前端的事件埋点统计，以及日常的网络监控

```html
  <script>
    window.cxmon = window.cxmon||{event:function(){(window.cxmon.event.q=window.cxmon.event.q||[]).push(arguments);},s:"站点id"};
  </script>
```

```javascript
  import mon from "mon.js";
  document.getElementById("btnNext").onclick=function(){
    window.cxmon.event('事件类型','目标名称','值');
  };
```

## 打包
npm run build

## 发布
npm version patch

npm publish

## 使用注意
必须指定 window.urlencode 