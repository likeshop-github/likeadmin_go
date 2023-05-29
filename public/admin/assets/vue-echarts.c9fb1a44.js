import{a as Z,r as $}from"./resize-detector.4e96b72b.js";import{i as G,t as J}from"./echarts.098cf7d6.js";import{d as K,s as k,D as A,ab as Q,e as b,i as V,w as z,l as P,j as X,F as Y,h as ee,u as te,n as ne}from"./@vue.a137a740.js";var d=function(){return d=Object.assign||function(e){for(var a,n=1,s=arguments.length;n<s;n++)for(var t in a=arguments[n])Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t]);return e},d.apply(this,arguments)},ae=["getWidth","getHeight","getDom","getOption","resize","dispatchAction","convertToPixel","convertFromPixel","containPixel","getDataURL","getConnectedDataURL","appendData","clear","isDisposed","dispose"];function re(e){return a=Object.create(null),ae.forEach(function(n){a[n]=function(s){return function(){for(var t=[],l=0;l<arguments.length;l++)t[l]=arguments[l];if(!e.value)throw new Error("ECharts is not initialized yet.");return e.value[s].apply(e.value,t)}}(n)}),a;var a}var oe={autoresize:Boolean},ie=/^on[^a-z]/,ue=function(e){return ie.test(e)};function T(e,a){var n=te(e);return n&&typeof n=="object"&&"value"in n?n.value||a:n||a}var se={loading:Boolean,loadingOptions:Object},y=null,R=[],_=[];(function(e,a){if(e&&typeof document<"u"){var n,s=a.prepend===!0?"prepend":"append",t=a.singleTag===!0,l=typeof a.container=="string"?document.querySelector(a.container):document.getElementsByTagName("head")[0];if(t){var p=R.indexOf(l);p===-1&&(p=R.push(l)-1,_[p]={}),n=_[p]&&_[p][s]?_[p][s]:_[p][s]=E()}else n=E();e.charCodeAt(0)===65279&&(e=e.substring(1)),n.styleSheet?n.styleSheet.cssText+=e:n.appendChild(document.createTextNode(e))}function E(){var O=document.createElement("style");if(O.setAttribute("type","text/css"),a.attributes)for(var g=Object.keys(a.attributes),m=0;m<g.length;m++)O.setAttribute(g[m],a.attributes[g[m]]);var D=s==="prepend"?"afterbegin":"beforeend";return l.insertAdjacentElement(D,O),O}})(`x-vue-echarts{display:block;width:100%;height:100%;min-width:0}
`,{});var ce=function(){if(y!=null)return y;if(typeof HTMLElement>"u"||typeof customElements>"u")return y=!1;try{new Function("tag",`class EChartsElement extends HTMLElement {
  __dispose = null;

  disconnectedCallback() {
    if (this.__dispose) {
      this.__dispose();
      this.__dispose = null;
    }
  }
}

if (customElements.get(tag) == null) {
  customElements.define(tag, EChartsElement);
}
`)("x-vue-echarts")}catch{return y=!1}return y=!0}(),ve=K({name:"echarts",props:d(d({option:Object,theme:{type:[Object,String]},initOptions:Object,updateOptions:Object,group:String,manualUpdate:Boolean},oe),se),emits:{},inheritAttrs:!1,setup:function(e,a){var n=a.attrs,s=k(),t=k(),l=k(),p=A("ecTheme",null),E=A("ecInitOptions",null),O=A("ecUpdateOptions",null),g=Q(e),m=g.autoresize,D=g.manualUpdate,F=g.loading,H=g.loadingOptions,I=b(function(){return l.value||e.option||null}),S=b(function(){return e.theme||T(p,{})}),B=b(function(){return e.initOptions||T(E,{})}),M=b(function(){return e.updateOptions||T(O,{})}),N=b(function(){return function(c){var r={};for(var u in c)ue(u)||(r[u]=c[u]);return r}(n)}),q=V().proxy.$listeners;function x(c){if(s.value){var r=t.value=G(s.value,S.value,B.value);e.group&&(r.group=e.group);var u=q;u||(u={},Object.keys(n).filter(function(i){return i.indexOf("on")===0&&i.length>2}).forEach(function(i){var o=i.charAt(2).toLowerCase()+i.slice(3);o.substring(o.length-4)==="Once"&&(o="~".concat(o.substring(0,o.length-4))),u[o]=n[i]})),Object.keys(u).forEach(function(i){var o=u[i];if(o){var f=i.toLowerCase();f.charAt(0)==="~"&&(f=f.substring(1),o.__once__=!0);var h=r;if(f.indexOf("zr:")===0&&(h=r.getZr(),f=f.substring(3)),o.__once__){delete o.__once__;var w=o;o=function(){for(var C=[],L=0;L<arguments.length;L++)C[L]=arguments[L];w.apply(void 0,C),h.off(f,o)}}h.on(f,o)}}),m.value?ne(function(){r&&!r.isDisposed()&&r.resize(),v()}):v()}function v(){var i=c||I.value;i&&r.setOption(i,M.value)}}function U(){t.value&&(t.value.dispose(),t.value=void 0)}var j=null;z(D,function(c){typeof j=="function"&&(j(),j=null),c||(j=z(function(){return e.option},function(r,u){r&&(t.value?t.value.setOption(r,d({notMerge:r.value!==(u==null?void 0:u.value)},M.value)):x())},{deep:!0}))},{immediate:!0}),z([S,B],function(){U(),x()},{deep:!0}),P(function(){e.group&&t.value&&(t.value.group=e.group)});var W=re(t);return function(c,r,u){var v=A("ecLoadingOptions",{}),i=b(function(){return d(d({},T(v,{})),u==null?void 0:u.value)});P(function(){var o=c.value;o&&(r.value?o.showLoading(i.value):o.hideLoading())})}(t,F,H),function(c,r,u){var v=null;z([u,c,r],function(i,o,f){var h=i[0],w=i[1],C=i[2];h&&w&&C&&(v=J(function(){w.resize()},100),Z(h,v)),f(function(){v&&h&&$(h,v)})})}(t,m,s),X(function(){x()}),Y(function(){ce&&s.value?s.value.__dispose=U:U()}),d({chart:t,root:s,setOption:function(c,r){e.manualUpdate&&(l.value=c),t.value?t.value.setOption(c,r||{}):x(c)},nonEventAttrs:N},W)},render:function(){var e=d({},this.nonEventAttrs);return e.ref="root",e.class=e.class?["echarts"].concat(e.class):"echarts",ee("x-vue-echarts",e)}});export{ve as S};
