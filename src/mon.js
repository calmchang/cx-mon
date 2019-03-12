  // <script>
  //   window.cxmon = window.cxmon||{event:function(){(window.cxmon.event.q=window.cxmon.event.q||[]).push(arguments);},s:"站点名称"};
  // </script>

const HOST="https://ccalm.cn/php/jrj";
const VERSION="1.0";
let SITEID="";
let USERINFO={
  USERID:"",
  PHONE:"",
};


//设置站点ID 然后加载初始化接口
SITEID=window.cxmon.s;
var spt = document.createElement('script');
spt.async = true;
spt.type = 'text/javascript';
spt.charset = "utf-8";
spt.onload=()=>{
  load();
};
spt.src=`${HOST}/init.php?id=${SITEID}&v=${VERSION}`;
document.getElementsByTagName('script')[0].appendChild(spt);



async function event(){
  let data={};
  let len = arguments.length;
  if( len<=0 ){return;}
  if( len===1 && typeof arguments[0] === 'object' ){
    data = arguments[0];
  }else{
    if(!arguments[0])return;
    
    data.t=arguments[0];
    if(arguments[1])data.k=arguments[1];
    if(arguments[2])data.v=arguments[2];
  }

  // switch(data.t){
  //   case 'set':{
  //     switch(data.k){
  //       case "site":{SITEID=data.v;}break;
  //     }
  //   }break;
  // }

  let sys={
    uuid:window.cxmonCookie.uuid,//用户uuid
    cv:VERSION,
    site:SITEID,
    tm:Date.now(),
    sid:window.cxmonCookie.sid,
  };
  data={...data,...sys};
  
  let msg= window.urlencode( JSON.stringify(data) );
  let ret = new Promise((reslove,reject)=>{
    let img = new Image(1, 1);
    img.onload=()=>{
      reslove(1);
    };
    img.onerror=()=>{
      reslove(0);
    }
    msg = window.urlencode(msg);
    img.src = `${HOST}/event.php?id=${SITEID}&d=${msg}&v=${VERSION}`;
  });
  await ret;
  return ret;
}

function load() {
  window.urlencode=window.urlencode||window.encodeURIComponent;
  
  if (window && window.cxmon) {
    window.cxmonCookieServer= JSON.stringify(window.cxmonCookie);
    //服务器分配的uuid
    window.cxmonCookie = window.cxmonCookie || {uuid:"",sid:"",isNewSID:true,isNewUUID:true,ver:"0.0.0"};
    
    try {
      var cookie = localStorage.getItem("cxmon");
      cookie = cookie?JSON.parse(cookie):window.cxmonCookie;
      if(window.cxmonCookie.ver.split(".")[0] > cookie.ver.split(".")[0]){
        cookie=window.cxmonCookie;
      }

      cookie.uuid = cookie.uuid||window.cxmonCookie.uuid;
      var session = sessionStorage.getItem("cxmon");
      if(session){
        session=session?JSON.parse(session):{};
        cookie.sid = session.sid||window.cxmonCookie.sid;
      }else{
        cookie.sid=window.cxmonCookie.sid;
      }

      localStorage.setItem("cxmon", JSON.stringify(cookie) );
      sessionStorage.setItem("cxmon", JSON.stringify(cookie) );
      window.cxmonCookie=cookie;

    } catch (ex) { console.log(ex.message); }
  

    //将队列内留存的事件发送出去
    if(window.cxmon.event.q){
      window.cxmon.event.q.map((item)=>{
        event(item);
      })
    }
    window.cxmon = {
      event:event,
      s:SITEID
    };
  }
}


export default {};





