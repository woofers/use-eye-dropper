const themeScript =
  '!function(){try{var e,s,f,v,p,o=document,d=o.documentElement,c=o.cookie,k=`; ${c}`.split("; color=");if(2===k.length&&(e=k.pop().split(";").shift())){v=JSON.parse(e);if(typeof v==="string"&&v.length===7&&!isNaN(Number("0x"+v.substring(1)))){s=v;f=true}}if(!f)s="#0074e0";window.UED_COLOR=s;document.addEventListener("DOMContentLoaded",function(){document.getElementById("ued-color").setAttribute("data-text",s)})}catch(_){}}()'

export const ColorScript = () => (
  <script dangerouslySetInnerHTML={{ __html: themeScript }} />
)
