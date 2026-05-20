var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(e&&(t=e(e=0)),t),s=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),c=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},l=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},u=(n,r,a)=>(a=n==null?{}:e(i(n)),l(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n)),d=e=>a.call(e,`module.exports`)?e[`module.exports`]:l(t({},`__esModule`,{value:!0}),e);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var f=s((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function te(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ne(e,t){return te(e.type,t,e.props)}function re(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ie(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ae=/\/+/g;function oe(e,t){return typeof e==`object`&&e&&e.key!=null?ie(``+e.key):t.toString(36)}function se(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ce(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ce(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+oe(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ae,`$&/`)+`/`),ce(o,r,i,``,function(e){return e})):o!=null&&(re(o)&&(o=ne(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ae,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+oe(a,u),c+=ce(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+oe(a,u++),c+=ce(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ce(se(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function le(e,t,n){if(e==null)return e;var r=[],i=0;return ce(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ue(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var T=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},E={map:le,forEach:function(e,t,n){le(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return le(e,function(){t++}),t},toArray:function(e){return le(e,function(e){return e})||[]},only:function(e){if(!re(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=E,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ee.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return te(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ee.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return te(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=re,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ue}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,T)}catch(e){T(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.4`})),p=s(((e,t)=>{t.exports=f()})),m=s((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,re());else{var t=n(l);t!==null&&oe(x,t.startTime-e)}}var S=!1,C=-1,w=5,ee=-1;function te(){return g?!0:!(e.unstable_now()-ee<w)}function ne(){if(g=!1,S){var t=e.unstable_now();ee=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&te());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&oe(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?re():S=!1}}}var re;if(typeof y==`function`)re=function(){y(ne)};else if(typeof MessageChannel<`u`){var ie=new MessageChannel,ae=ie.port2;ie.port1.onmessage=ne,re=function(){ae.postMessage(null)}}else re=function(){_(ne,0)};function oe(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,oe(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,re()))),r},e.unstable_shouldYield=te,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),h=s(((e,t)=>{t.exports=m()})),g=s((e=>{var t=p();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.4`})),_=s(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=s((e=>{var t=h(),n=p(),r=_();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function d(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=d(e),t!==null)return t;e=e.sibling}return null}var f=Object.assign,m=Symbol.for(`react.element`),g=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),ee=Symbol.for(`react.suspense`),te=Symbol.for(`react.suspense_list`),ne=Symbol.for(`react.memo`),re=Symbol.for(`react.lazy`),ie=Symbol.for(`react.activity`),ae=Symbol.for(`react.memo_cache_sentinel`),oe=Symbol.iterator;function se(e){return typeof e!=`object`||!e?null:(e=oe&&e[oe]||e[`@@iterator`],typeof e==`function`?e:null)}var ce=Symbol.for(`react.client.reference`);function le(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ce?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case ee:return`Suspense`;case te:return`SuspenseList`;case ie:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ne:return t=e.displayName||null,t===null?le(e.type)||`Memo`:t;case re:t=e._payload,e=e._init;try{return le(e(t))}catch{}}return null}var ue=Array.isArray,T=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,E=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,de={pending:!1,data:null,method:null,action:null},fe=[],pe=-1;function D(e){return{current:e}}function O(e){0>pe||(e.current=fe[pe],fe[pe]=null,pe--)}function k(e,t){pe++,fe[pe]=e.current,e.current=t}var me=D(null),he=D(null),ge=D(null),_e=D(null);function ve(e,t){switch(k(ge,t),k(he,e),k(me,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}O(me),k(me,e)}function ye(){O(me),O(he),O(ge)}function be(e){e.memoizedState!==null&&k(_e,e);var t=me.current,n=Hd(t,e.type);t!==n&&(k(he,e),k(me,n))}function xe(e){he.current===e&&(O(me),O(he)),_e.current===e&&(O(_e),Qf._currentValue=de)}var Se,Ce;function we(e){if(Se===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Se=t&&t[1]||``,Ce=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Se+e+Ce}var Te=!1;function Ee(e,t){if(!e||Te)return``;Te=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Te=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?we(n):``}function De(e,t){switch(e.tag){case 26:case 27:case 5:return we(e.type);case 16:return we(`Lazy`);case 13:return e.child!==t&&t!==null?we(`Suspense Fallback`):we(`Suspense`);case 19:return we(`SuspenseList`);case 0:case 15:return Ee(e.type,!1);case 11:return Ee(e.type.render,!1);case 1:return Ee(e.type,!0);case 31:return we(`Activity`);default:return``}}function Oe(e){try{var t=``,n=null;do t+=De(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var ke=Object.prototype.hasOwnProperty,Ae=t.unstable_scheduleCallback,je=t.unstable_cancelCallback,Me=t.unstable_shouldYield,Ne=t.unstable_requestPaint,Pe=t.unstable_now,Fe=t.unstable_getCurrentPriorityLevel,Ie=t.unstable_ImmediatePriority,Le=t.unstable_UserBlockingPriority,Re=t.unstable_NormalPriority,ze=t.unstable_LowPriority,Be=t.unstable_IdlePriority,A=t.log,Ve=t.unstable_setDisableYieldValue,He=null,Ue=null;function We(e){if(typeof A==`function`&&Ve(e),Ue&&typeof Ue.setStrictMode==`function`)try{Ue.setStrictMode(He,e)}catch{}}var Ge=Math.clz32?Math.clz32:Je,Ke=Math.log,qe=Math.LN2;function Je(e){return e>>>=0,e===0?32:31-(Ke(e)/qe|0)|0}var Ye=256,Xe=262144,Ze=4194304;function Qe(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function $e(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Qe(n))):i=Qe(o):i=Qe(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Qe(n))):i=Qe(o)):i=Qe(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function et(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function tt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function nt(){var e=Ze;return Ze<<=1,!(Ze&62914560)&&(Ze=4194304),e}function rt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function it(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function at(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Ge(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&ot(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function ot(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ge(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function st(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ge(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function ct(e,t){var n=t&-t;return n=n&42?1:lt(n),(n&(e.suspendedLanes|t))===0?n:0}function lt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ut(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function dt(){var e=E.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function ft(e,t){var n=E.p;try{return E.p=e,t()}finally{E.p=n}}var pt=Math.random().toString(36).slice(2),mt=`__reactFiber$`+pt,ht=`__reactProps$`+pt,gt=`__reactContainer$`+pt,j=`__reactEvents$`+pt,_t=`__reactListeners$`+pt,vt=`__reactHandles$`+pt,yt=`__reactResources$`+pt,bt=`__reactMarker$`+pt;function xt(e){delete e[mt],delete e[ht],delete e[j],delete e[_t],delete e[vt]}function St(e){var t=e[mt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[gt]||n[mt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[mt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function Ct(e){if(e=e[mt]||e[gt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function wt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Tt(e){var t=e[yt];return t||=e[yt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Et(e){e[bt]=!0}var Dt=new Set,Ot={};function kt(e,t){At(e,t),At(e+`Capture`,t)}function At(e,t){for(Ot[e]=t,e=0;e<t.length;e++)Dt.add(t[e])}var jt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Mt={},Nt={};function Pt(e){return ke.call(Nt,e)?!0:ke.call(Mt,e)?!1:jt.test(e)?Nt[e]=!0:(Mt[e]=!0,!1)}function Ft(e,t,n){if(Pt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function It(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Lt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Rt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function zt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Bt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function M(e){if(!e._valueTracker){var t=zt(e)?`checked`:`value`;e._valueTracker=Bt(e,t,``+e[t])}}function Vt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=zt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Ht(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Ut=/[\n"\\]/g;function Wt(e){return e.replace(Ut,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Gt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Rt(t)):e.value!==``+Rt(t)&&(e.value=``+Rt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):qt(e,o,Rt(n)):qt(e,o,Rt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Rt(s):e.removeAttribute(`name`)}function Kt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){M(e);return}n=n==null?``:``+Rt(n),t=t==null?n:``+Rt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),M(e)}function qt(e,t,n){t===`number`&&Ht(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Jt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Rt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Yt(e,t,n){if(t!=null&&(t=``+Rt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Rt(n)}function Xt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ue(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Rt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),M(e)}function Zt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Qt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function $t(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Qt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function en(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&$t(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&$t(e,o,t[o])}function tn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var nn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),rn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function an(e){return rn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function on(){}var N=null;function sn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var cn=null,ln=null;function un(e){var t=Ct(e);if(t&&(e=t.stateNode)){var n=e[ht]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Gt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Wt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[ht]||null;if(!a)throw Error(i(90));Gt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Vt(r)}break a;case`textarea`:Yt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Jt(e,!!n.multiple,t,!1)}}}var dn=!1;function fn(e,t,n){if(dn)return e(t,n);dn=!0;try{return e(t)}finally{if(dn=!1,(cn!==null||ln!==null)&&(xu(),cn&&(t=cn,e=ln,ln=cn=null,un(t),e)))for(t=0;t<e.length;t++)un(e[t])}}function pn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[ht]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var mn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),hn=!1;if(mn)try{var gn={};Object.defineProperty(gn,`passive`,{get:function(){hn=!0}}),window.addEventListener(`test`,gn,gn),window.removeEventListener(`test`,gn,gn)}catch{hn=!1}var _n=null,vn=null,yn=null;function bn(){if(yn)return yn;var e,t=vn,n=t.length,r,i=`value`in _n?_n.value:_n.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return yn=i.slice(e,1<r?1-r:void 0)}function xn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Sn(){return!0}function Cn(){return!1}function wn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Sn:Cn,this.isPropagationStopped=Cn,this}return f(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Sn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Sn)},persist:function(){},isPersistent:Sn}),t}var Tn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},En=wn(Tn),Dn=f({},Tn,{view:0,detail:0}),On=wn(Dn),kn,An,jn,Mn=f({},Dn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Un,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==jn&&(jn&&e.type===`mousemove`?(kn=e.screenX-jn.screenX,An=e.screenY-jn.screenY):An=kn=0,jn=e),kn)},movementY:function(e){return`movementY`in e?e.movementY:An}}),Nn=wn(Mn),Pn=wn(f({},Mn,{dataTransfer:0})),Fn=wn(f({},Dn,{relatedTarget:0})),In=wn(f({},Tn,{animationName:0,elapsedTime:0,pseudoElement:0})),Ln=wn(f({},Tn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Rn=wn(f({},Tn,{data:0})),zn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Bn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Vn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Hn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Vn[e])?!!t[e]:!1}function Un(){return Hn}var Wn=wn(f({},Dn,{key:function(e){if(e.key){var t=zn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=xn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Bn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Un,charCode:function(e){return e.type===`keypress`?xn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?xn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Gn=wn(f({},Mn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Kn=wn(f({},Dn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Un})),qn=wn(f({},Tn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Jn=wn(f({},Mn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Yn=wn(f({},Tn,{newState:0,oldState:0})),Xn=[9,13,27,32],Zn=mn&&`CompositionEvent`in window,Qn=null;mn&&`documentMode`in document&&(Qn=document.documentMode);var $n=mn&&`TextEvent`in window&&!Qn,er=mn&&(!Zn||Qn&&8<Qn&&11>=Qn),tr=` `,nr=!1;function rr(e,t){switch(e){case`keyup`:return Xn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function ir(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var ar=!1;function or(e,t){switch(e){case`compositionend`:return ir(t);case`keypress`:return t.which===32?(nr=!0,tr):null;case`textInput`:return e=t.data,e===tr&&nr?null:e;default:return null}}function sr(e,t){if(ar)return e===`compositionend`||!Zn&&rr(e,t)?(e=bn(),yn=vn=_n=null,ar=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return er&&t.locale!==`ko`?null:t.data;default:return null}}var cr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function lr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!cr[e.type]:t===`textarea`}function ur(e,t,n,r){cn?ln?ln.push(r):ln=[r]:cn=r,t=Ed(t,`onChange`),0<t.length&&(n=new En(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var dr=null,fr=null;function pr(e){yd(e,0)}function mr(e){if(Vt(wt(e)))return e}function hr(e,t){if(e===`change`)return t}var gr=!1;if(mn){var _r;if(mn){var vr=`oninput`in document;if(!vr){var yr=document.createElement(`div`);yr.setAttribute(`oninput`,`return;`),vr=typeof yr.oninput==`function`}_r=vr}else _r=!1;gr=_r&&(!document.documentMode||9<document.documentMode)}function br(){dr&&(dr.detachEvent(`onpropertychange`,xr),fr=dr=null)}function xr(e){if(e.propertyName===`value`&&mr(fr)){var t=[];ur(t,fr,e,sn(e)),fn(pr,t)}}function Sr(e,t,n){e===`focusin`?(br(),dr=t,fr=n,dr.attachEvent(`onpropertychange`,xr)):e===`focusout`&&br()}function Cr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return mr(fr)}function wr(e,t){if(e===`click`)return mr(t)}function Tr(e,t){if(e===`input`||e===`change`)return mr(t)}function Er(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Dr=typeof Object.is==`function`?Object.is:Er;function Or(e,t){if(Dr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ke.call(t,i)||!Dr(e[i],t[i]))return!1}return!0}function kr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ar(e,t){var n=kr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=kr(n)}}function jr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?jr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Mr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ht(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ht(e.document)}return t}function Nr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Pr=mn&&`documentMode`in document&&11>=document.documentMode,Fr=null,Ir=null,Lr=null,Rr=!1;function zr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Rr||Fr==null||Fr!==Ht(r)||(r=Fr,`selectionStart`in r&&Nr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Lr&&Or(Lr,r)||(Lr=r,r=Ed(Ir,`onSelect`),0<r.length&&(t=new En(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Fr)))}function Br(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Vr={animationend:Br(`Animation`,`AnimationEnd`),animationiteration:Br(`Animation`,`AnimationIteration`),animationstart:Br(`Animation`,`AnimationStart`),transitionrun:Br(`Transition`,`TransitionRun`),transitionstart:Br(`Transition`,`TransitionStart`),transitioncancel:Br(`Transition`,`TransitionCancel`),transitionend:Br(`Transition`,`TransitionEnd`)},Hr={},Ur={};mn&&(Ur=document.createElement(`div`).style,`AnimationEvent`in window||(delete Vr.animationend.animation,delete Vr.animationiteration.animation,delete Vr.animationstart.animation),`TransitionEvent`in window||delete Vr.transitionend.transition);function Wr(e){if(Hr[e])return Hr[e];if(!Vr[e])return e;var t=Vr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ur)return Hr[e]=t[n];return e}var Gr=Wr(`animationend`),Kr=Wr(`animationiteration`),qr=Wr(`animationstart`),Jr=Wr(`transitionrun`),Yr=Wr(`transitionstart`),Xr=Wr(`transitioncancel`),Zr=Wr(`transitionend`),Qr=new Map,$r=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);$r.push(`scrollEnd`);function ei(e,t){Qr.set(e,t),kt(t,[e])}var ti=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ni=[],ri=0,ii=0;function ai(){for(var e=ri,t=ii=ri=0;t<e;){var n=ni[t];ni[t++]=null;var r=ni[t];ni[t++]=null;var i=ni[t];ni[t++]=null;var a=ni[t];if(ni[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&li(n,i,a)}}function oi(e,t,n,r){ni[ri++]=e,ni[ri++]=t,ni[ri++]=n,ni[ri++]=r,ii|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function si(e,t,n,r){return oi(e,t,n,r),ui(e)}function ci(e,t){return oi(e,null,null,t),ui(e)}function li(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Ge(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ui(e){if(50<fu)throw fu=0,pu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var di={};function fi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function pi(e,t,n,r){return new fi(e,t,n,r)}function mi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function hi(e,t){var n=e.alternate;return n===null?(n=pi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function gi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function _i(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)mi(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,me.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case ie:return e=pi(31,n,t,a),e.elementType=ie,e.lanes=o,e;case y:return vi(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=pi(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case ee:return e=pi(13,n,t,a),e.elementType=ee,e.lanes=o,e;case te:return e=pi(19,n,t,a),e.elementType=te,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case ne:s=14;break a;case re:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=pi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function vi(e,t,n,r){return e=pi(7,e,r,t),e.lanes=n,e}function yi(e,t,n){return e=pi(6,e,null,t),e.lanes=n,e}function bi(e){var t=pi(18,null,null,0);return t.stateNode=e,t}function xi(e,t,n){return t=pi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Si=new WeakMap;function Ci(e,t){if(typeof e==`object`&&e){var n=Si.get(e);return n===void 0?(t={value:e,source:t,stack:Oe(t)},Si.set(e,t),t):n}return{value:e,source:t,stack:Oe(t)}}var wi=[],Ti=0,Ei=null,Di=0,Oi=[],ki=0,Ai=null,ji=1,Mi=``;function Ni(e,t){wi[Ti++]=Di,wi[Ti++]=Ei,Ei=e,Di=t}function Pi(e,t,n){Oi[ki++]=ji,Oi[ki++]=Mi,Oi[ki++]=Ai,Ai=e;var r=ji;e=Mi;var i=32-Ge(r)-1;r&=~(1<<i),n+=1;var a=32-Ge(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,ji=1<<32-Ge(t)+i|n<<i|r,Mi=a+e}else ji=1<<a|n<<i|r,Mi=e}function Fi(e){e.return!==null&&(Ni(e,1),Pi(e,1,0))}function Ii(e){for(;e===Ei;)Ei=wi[--Ti],wi[Ti]=null,Di=wi[--Ti],wi[Ti]=null;for(;e===Ai;)Ai=Oi[--ki],Oi[ki]=null,Mi=Oi[--ki],Oi[ki]=null,ji=Oi[--ki],Oi[ki]=null}function Li(e,t){Oi[ki++]=ji,Oi[ki++]=Mi,Oi[ki++]=Ai,ji=t.id,Mi=t.overflow,Ai=e}var Ri=null,P=null,F=!1,zi=null,Bi=!1,Vi=Error(i(519));function Hi(e){throw Ji(Ci(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Vi}function Ui(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[mt]=e,t[ht]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Kt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Xt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=on),t=!0):t=!1,t||Hi(e,!0)}function Wi(e){for(Ri=e.return;Ri;)switch(Ri.tag){case 5:case 31:case 13:Bi=!1;return;case 27:case 3:Bi=!0;return;default:Ri=Ri.return}}function Gi(e){if(e!==Ri)return!1;if(!F)return Wi(e),F=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&P&&Hi(e),Wi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));P=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));P=uf(e)}else t===27?(t=P,Zd(e.type)?(e=lf,lf=null,P=e):P=t):P=Ri?cf(e.stateNode.nextSibling):null;return!0}function Ki(){P=Ri=null,F=!1}function qi(){var e=zi;return e!==null&&(Ql===null?Ql=e:Ql.push.apply(Ql,e),zi=null),e}function Ji(e){zi===null?zi=[e]:zi.push(e)}var Yi=D(null),Xi=null,Zi=null;function Qi(e,t,n){k(Yi,t._currentValue),t._currentValue=n}function $i(e){e._currentValue=Yi.current,O(Yi)}function ea(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ta(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ea(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ea(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function na(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Dr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===_e.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&ta(t,e,n,r),t.flags|=262144}function ra(e){for(e=e.firstContext;e!==null;){if(!Dr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ia(e){Xi=e,Zi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function aa(e){return sa(Xi,e)}function oa(e,t){return Xi===null&&ia(e),sa(e,t)}function sa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Zi===null){if(e===null)throw Error(i(308));Zi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Zi=Zi.next=t;return n}var ca=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},la=t.unstable_scheduleCallback,ua=t.unstable_NormalPriority,I={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function da(){return{controller:new ca,data:new Map,refCount:0}}function fa(e){e.refCount--,e.refCount===0&&la(ua,function(){e.controller.abort()})}var pa=null,ma=0,ha=0,ga=null;function _a(e,t){if(pa===null){var n=pa=[];ma=0,ha=dd(),ga={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ma++,t.then(va,va),t}function va(){if(--ma===0&&pa!==null){ga!==null&&(ga.status=`fulfilled`);var e=pa;pa=null,ha=0,ga=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ya(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var ba=T.S;T.S=function(e,t){tu=Pe(),typeof t==`object`&&t&&typeof t.then==`function`&&_a(e,t),ba!==null&&ba(e,t)};var xa=D(null);function Sa(){var e=xa.current;return e===null?G.pooledCache:e}function Ca(e,t){t===null?k(xa,xa.current):k(xa,t.pool)}function wa(){var e=Sa();return e===null?null:{parent:I._currentValue,pool:e}}var Ta=Error(i(460)),Ea=Error(i(474)),Da=Error(i(542)),Oa={then:function(){}};function ka(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Aa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(on,on),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Pa(e),e;default:if(typeof t.status==`string`)t.then(on,on);else{if(e=G,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Pa(e),e}throw Ma=t,Ta}}function ja(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Ma=e,Ta):e}}var Ma=null;function Na(){if(Ma===null)throw Error(i(459));var e=Ma;return Ma=null,e}function Pa(e){if(e===Ta||e===Da)throw Error(i(483))}var Fa=null,Ia=0;function La(e){var t=Ia;return Ia+=1,Fa===null&&(Fa=[]),Aa(Fa,e,t)}function Ra(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function za(e,t){throw t.$$typeof===m?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ba(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=hi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=yi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===re&&ja(i)===t.type)?(t=a(t,n.props),Ra(t,n),t.return=e,t):(t=_i(n.type,n.key,n.props,null,e.mode,r),Ra(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=xi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=vi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=yi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case g:return n=_i(t.type,t.key,t.props,null,e.mode,n),Ra(n,t),n.return=e,n;case v:return t=xi(t,e.mode,n),t.return=e,t;case re:return t=ja(t),f(e,t,n)}if(ue(t)||se(t))return t=vi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,La(t),n);if(t.$$typeof===C)return f(e,oa(e,t),n);za(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case g:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case re:return n=ja(n),p(e,t,n,r)}if(ue(n)||se(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,La(n),r);if(n.$$typeof===C)return p(e,t,oa(e,n),r);za(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case g:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case re:return r=ja(r),m(e,t,n,r,i)}if(ue(r)||se(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,La(r),i);if(r.$$typeof===C)return m(e,t,n,oa(t,r),i);za(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),F&&Ni(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return F&&Ni(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),F&&Ni(i,h),l}function _(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),F&&Ni(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return F&&Ni(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),F&&Ni(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case g:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===re&&ja(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ra(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=vi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=_i(o.type,o.key,o.props,null,e.mode,c),Ra(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=xi(o,e.mode,c),c.return=e,e=c}return s(e);case re:return o=ja(o),b(e,r,o,c)}if(ue(o))return h(e,r,o,c);if(se(o)){if(l=se(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),_(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,La(o),c);if(o.$$typeof===C)return b(e,r,oa(e,o),c);za(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=yi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Ia=0;var i=b(e,t,n,r);return Fa=null,i}catch(t){if(t===Ta||t===Da)throw t;var a=pi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Va=Ba(!0),Ha=Ba(!1),Ua=!1;function Wa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ga(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ka(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function qa(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,W&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ui(e),li(e,null,n),t}return oi(e,r,t,n),ui(e)}function Ja(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,st(e,n)}}function Ya(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Xa=!1;function Za(){if(Xa){var e=ga;if(e!==null)throw e}}function Qa(e,t,n,r){Xa=!1;var i=e.updateQueue;Ua=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var p=s.lane&-536870913,m=p!==s.lane;if(m?(q&p)===p:(r&p)===p){p!==0&&p===ha&&(Xa=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;p=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,p);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,p=typeof h==`function`?h.call(_,d,p):h,p==null)break a;d=f({},d,p);break a;case 2:Ua=!0}}p=s.callback,p!==null&&(e.flags|=64,m&&(e.flags|=8192),m=i.callbacks,m===null?i.callbacks=[p]:m.push(p))}else m={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=m,c=d):u=u.next=m,o|=p;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;m=s,s=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Kl|=o,e.lanes=o,e.memoizedState=d}}function $a(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function eo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)$a(n[e],t)}var to=D(null),no=D(0);function ro(e,t){e=Gl,k(no,e),k(to,t),Gl=e|t.baseLanes}function io(){k(no,Gl),k(to,to.current)}function ao(){Gl=no.current,O(to),O(no)}var oo=D(null),so=null;function co(e){var t=e.alternate;k(L,L.current&1),k(oo,e),so===null&&(t===null||to.current!==null||t.memoizedState!==null)&&(so=e)}function lo(e){k(L,L.current),k(oo,e),so===null&&(so=e)}function uo(e){e.tag===22?(k(L,L.current),k(oo,e),so===null&&(so=e)):fo(e)}function fo(){k(L,L.current),k(oo,oo.current)}function po(e){O(oo),so===e&&(so=null),O(L)}var L=D(0);function mo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ho=0,R=null,z=null,go=null,_o=!1,vo=!1,yo=!1,bo=0,xo=0,So=null,Co=0;function B(){throw Error(i(321))}function wo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Dr(e[n],t[n]))return!1;return!0}function To(e,t,n,r,i,a){return ho=a,R=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,T.H=e===null||e.memoizedState===null?Hs:Us,yo=!1,a=n(r,i),yo=!1,vo&&(a=Do(t,n,r,i)),Eo(e),a}function Eo(e){T.H=Vs;var t=z!==null&&z.next!==null;if(ho=0,go=z=R=null,_o=!1,xo=0,So=null,t)throw Error(i(300));e===null||oc||(e=e.dependencies,e!==null&&ra(e)&&(oc=!0))}function Do(e,t,n,r){R=e;var a=0;do{if(vo&&(So=null),xo=0,vo=!1,25<=a)throw Error(i(301));if(a+=1,go=z=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}T.H=Ws,o=t(n,r)}while(vo);return o}function Oo(){var e=T.H,t=e.useState()[0];return t=typeof t.then==`function`?Fo(t):t,e=e.useState()[0],(z===null?null:z.memoizedState)!==e&&(R.flags|=1024),t}function ko(){var e=bo!==0;return bo=0,e}function Ao(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function jo(e){if(_o){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}_o=!1}ho=0,go=z=R=null,vo=!1,xo=bo=0,So=null}function Mo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return go===null?R.memoizedState=go=e:go=go.next=e,go}function No(){if(z===null){var e=R.alternate;e=e===null?null:e.memoizedState}else e=z.next;var t=go===null?R.memoizedState:go.next;if(t!==null)go=t,z=e;else{if(e===null)throw R.alternate===null?Error(i(467)):Error(i(310));z=e,e={memoizedState:z.memoizedState,baseState:z.baseState,baseQueue:z.baseQueue,queue:z.queue,next:null},go===null?R.memoizedState=go=e:go=go.next=e}return go}function Po(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Fo(e){var t=xo;return xo+=1,So===null&&(So=[]),e=Aa(So,e,t),t=R,(go===null?t.memoizedState:go.next)===null&&(t=t.alternate,T.H=t===null||t.memoizedState===null?Hs:Us),e}function Io(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Fo(e);if(e.$$typeof===C)return aa(e)}throw Error(i(438,String(e)))}function Lo(e){var t=null,n=R.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=R.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Po(),R.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ae;return t.index++,n}function Ro(e,t){return typeof t==`function`?t(e):t}function zo(e){return Bo(No(),z,e)}function Bo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(ho&f)===f:(q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ha&&(d=!0);else if((ho&p)===p){u=u.next,p===ha&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,R.lanes|=p,Kl|=p;f=u.action,yo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,R.lanes|=f,Kl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Dr(o,e.memoizedState)&&(oc=!0,d&&(n=ga,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Vo(e){var t=No(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Dr(o,t.memoizedState)||(oc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Ho(e,t,n){var r=R,a=No(),o=F;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Dr((z||a).memoizedState,n);if(s&&(a.memoizedState=n,oc=!0),a=a.queue,ps(Go.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||go!==null&&go.memoizedState.tag&1){if(r.flags|=2048,cs(9,{destroy:void 0},Wo.bind(null,r,a,n,t),null),G===null)throw Error(i(349));o||ho&127||Uo(r,t,n)}return n}function Uo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=R.updateQueue,t===null?(t=Po(),R.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Wo(e,t,n,r){t.value=n,t.getSnapshot=r,Ko(t)&&qo(e)}function Go(e,t,n){return n(function(){Ko(t)&&qo(e)})}function Ko(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Dr(e,n)}catch{return!0}}function qo(e){var t=ci(e,2);t!==null&&gu(t,e,2)}function Jo(e){var t=Mo();if(typeof e==`function`){var n=e;if(e=n(),yo){We(!0);try{n()}finally{We(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:e},t}function Yo(e,t,n,r){return e.baseState=n,Bo(e,z,typeof r==`function`?r:Ro)}function Xo(e,t,n,r,a){if(Rs(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};T.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Zo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Zo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=T.T,o={};T.T=o;try{var s=n(i,r),c=T.S;c!==null&&c(o,s),Qo(e,t,s)}catch(n){es(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),T.T=a}}else try{a=n(i,r),Qo(e,t,a)}catch(n){es(e,t,n)}}function Qo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){$o(e,t,n)},function(n){return es(e,t,n)}):$o(e,t,n)}function $o(e,t,n){t.status=`fulfilled`,t.value=n,ts(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Zo(e,n)))}function es(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,ts(t),t=t.next;while(t!==r)}e.action=null}function ts(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ns(e,t){return t}function rs(e,t){if(F){var n=G.formState;if(n!==null){a:{var r=R;if(F){if(P){b:{for(var i=P,a=Bi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){P=cf(i.nextSibling),r=i.data===`F!`;break a}}Hi(r)}r=!1}r&&(t=n[0])}}return n=Mo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ns,lastRenderedState:t},n.queue=r,n=Fs.bind(null,R,r),r.dispatch=n,r=Jo(!1),a=Ls.bind(null,R,!1,r.queue),r=Mo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Xo.bind(null,R,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function is(e){return as(No(),z,e)}function as(e,t,n){if(t=Bo(e,t,ns)[0],e=zo(Ro)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Fo(t)}catch(e){throw e===Ta?Da:e}else r=t;t=No();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(R.flags|=2048,cs(9,{destroy:void 0},os.bind(null,i,n),null)),[r,a,e]}function os(e,t){e.action=t}function ss(e){var t=No(),n=z;if(n!==null)return as(t,n,e);No(),t=t.memoizedState,n=No();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function cs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=R.updateQueue,t===null&&(t=Po(),R.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ls(){return No().memoizedState}function us(e,t,n,r){var i=Mo();R.flags|=e,i.memoizedState=cs(1|t,{destroy:void 0},n,r===void 0?null:r)}function ds(e,t,n,r){var i=No();r=r===void 0?null:r;var a=i.memoizedState.inst;z!==null&&r!==null&&wo(r,z.memoizedState.deps)?i.memoizedState=cs(t,a,n,r):(R.flags|=e,i.memoizedState=cs(1|t,a,n,r))}function fs(e,t){us(8390656,8,e,t)}function ps(e,t){ds(2048,8,e,t)}function ms(e){R.flags|=4;var t=R.updateQueue;if(t===null)t=Po(),R.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function hs(e){var t=No().memoizedState;return ms({ref:t,nextImpl:e}),function(){if(W&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function gs(e,t){return ds(4,2,e,t)}function _s(e,t){return ds(4,4,e,t)}function vs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ys(e,t,n){n=n==null?null:n.concat([e]),ds(4,4,vs.bind(null,t,e),n)}function bs(){}function xs(e,t){var n=No();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&wo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ss(e,t){var n=No();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&wo(t,r[1]))return r[0];if(r=e(),yo){We(!0);try{e()}finally{We(!1)}}return n.memoizedState=[r,t],r}function Cs(e,t,n){return n===void 0||ho&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=hu(),R.lanes|=e,Kl|=e,n)}function ws(e,t,n,r){return Dr(n,t)?n:to.current===null?!(ho&42)||ho&1073741824&&!(q&261930)?(oc=!0,e.memoizedState=n):(e=hu(),R.lanes|=e,Kl|=e,t):(e=Cs(e,n,r),Dr(e,t)||(oc=!0),e)}function Ts(e,t,n,r,i){var a=E.p;E.p=a!==0&&8>a?a:8;var o=T.T,s={};T.T=s,Ls(e,!1,t,n);try{var c=i(),l=T.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Is(e,t,ya(c,r),mu(e)):Is(e,t,r,mu(e))}catch(n){Is(e,t,{then:function(){},status:`rejected`,reason:n},mu())}finally{E.p=a,o!==null&&s.types!==null&&(o.types=s.types),T.T=o}}function Es(){}function Ds(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Os(e).queue;Ts(e,a,t,de,n===null?Es:function(){return ks(e),n(r)})}function Os(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:de,baseState:de,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:de},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ks(e){var t=Os(e);t.next===null&&(t=e.alternate.memoizedState),Is(e,t.next.queue,{},mu())}function As(){return aa(Qf)}function js(){return No().memoizedState}function Ms(){return No().memoizedState}function Ns(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=mu();e=Ka(n);var r=qa(t,e,n);r!==null&&(gu(r,t,n),Ja(r,t,n)),t={cache:da()},e.payload=t;return}t=t.return}}function Ps(e,t,n){var r=mu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Rs(e)?zs(t,n):(n=si(e,t,n,r),n!==null&&(gu(n,e,r),Bs(n,t,r)))}function Fs(e,t,n){Is(e,t,n,mu())}function Is(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Rs(e))zs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Dr(s,o))return oi(e,t,i,0),G===null&&ai(),!1}catch{}if(n=si(e,t,i,r),n!==null)return gu(n,e,r),Bs(n,t,r),!0}return!1}function Ls(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Rs(e)){if(t)throw Error(i(479))}else t=si(e,n,r,2),t!==null&&gu(t,e,2)}function Rs(e){var t=e.alternate;return e===R||t!==null&&t===R}function zs(e,t){vo=_o=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Bs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,st(e,n)}}var Vs={readContext:aa,use:Io,useCallback:B,useContext:B,useEffect:B,useImperativeHandle:B,useLayoutEffect:B,useInsertionEffect:B,useMemo:B,useReducer:B,useRef:B,useState:B,useDebugValue:B,useDeferredValue:B,useTransition:B,useSyncExternalStore:B,useId:B,useHostTransitionStatus:B,useFormState:B,useActionState:B,useOptimistic:B,useMemoCache:B,useCacheRefresh:B};Vs.useEffectEvent=B;var Hs={readContext:aa,use:Io,useCallback:function(e,t){return Mo().memoizedState=[e,t===void 0?null:t],e},useContext:aa,useEffect:fs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),us(4194308,4,vs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return us(4194308,4,e,t)},useInsertionEffect:function(e,t){us(4,2,e,t)},useMemo:function(e,t){var n=Mo();t=t===void 0?null:t;var r=e();if(yo){We(!0);try{e()}finally{We(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Mo();if(n!==void 0){var i=n(t);if(yo){We(!0);try{n(t)}finally{We(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ps.bind(null,R,e),[r.memoizedState,e]},useRef:function(e){var t=Mo();return e={current:e},t.memoizedState=e},useState:function(e){e=Jo(e);var t=e.queue,n=Fs.bind(null,R,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:bs,useDeferredValue:function(e,t){return Cs(Mo(),e,t)},useTransition:function(){var e=Jo(!1);return e=Ts.bind(null,R,e.queue,!0,!1),Mo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=R,a=Mo();if(F){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),G===null)throw Error(i(349));q&127||Uo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,fs(Go.bind(null,r,o,e),[e]),r.flags|=2048,cs(9,{destroy:void 0},Wo.bind(null,r,o,n,t),null),n},useId:function(){var e=Mo(),t=G.identifierPrefix;if(F){var n=Mi,r=ji;n=(r&~(1<<32-Ge(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=bo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Co++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:As,useFormState:rs,useActionState:rs,useOptimistic:function(e){var t=Mo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ls.bind(null,R,!0,n),n.dispatch=t,[e,t]},useMemoCache:Lo,useCacheRefresh:function(){return Mo().memoizedState=Ns.bind(null,R)},useEffectEvent:function(e){var t=Mo(),n={impl:e};return t.memoizedState=n,function(){if(W&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Us={readContext:aa,use:Io,useCallback:xs,useContext:aa,useEffect:ps,useImperativeHandle:ys,useInsertionEffect:gs,useLayoutEffect:_s,useMemo:Ss,useReducer:zo,useRef:ls,useState:function(){return zo(Ro)},useDebugValue:bs,useDeferredValue:function(e,t){return ws(No(),z.memoizedState,e,t)},useTransition:function(){var e=zo(Ro)[0],t=No().memoizedState;return[typeof e==`boolean`?e:Fo(e),t]},useSyncExternalStore:Ho,useId:js,useHostTransitionStatus:As,useFormState:is,useActionState:is,useOptimistic:function(e,t){return Yo(No(),z,e,t)},useMemoCache:Lo,useCacheRefresh:Ms};Us.useEffectEvent=hs;var Ws={readContext:aa,use:Io,useCallback:xs,useContext:aa,useEffect:ps,useImperativeHandle:ys,useInsertionEffect:gs,useLayoutEffect:_s,useMemo:Ss,useReducer:Vo,useRef:ls,useState:function(){return Vo(Ro)},useDebugValue:bs,useDeferredValue:function(e,t){var n=No();return z===null?Cs(n,e,t):ws(n,z.memoizedState,e,t)},useTransition:function(){var e=Vo(Ro)[0],t=No().memoizedState;return[typeof e==`boolean`?e:Fo(e),t]},useSyncExternalStore:Ho,useId:js,useHostTransitionStatus:As,useFormState:ss,useActionState:ss,useOptimistic:function(e,t){var n=No();return z===null?(n.baseState=e,[e,n.queue.dispatch]):Yo(n,z,e,t)},useMemoCache:Lo,useCacheRefresh:Ms};Ws.useEffectEvent=hs;function Gs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:f({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ks={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=mu(),i=Ka(r);i.payload=t,n!=null&&(i.callback=n),t=qa(e,i,r),t!==null&&(gu(t,e,r),Ja(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=mu(),i=Ka(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=qa(e,i,r),t!==null&&(gu(t,e,r),Ja(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=mu(),r=Ka(n);r.tag=2,t!=null&&(r.callback=t),t=qa(e,r,n),t!==null&&(gu(t,e,n),Ja(t,e,n))}};function qs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Or(n,r)||!Or(i,a):!0}function Js(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ks.enqueueReplaceState(t,t.state,null)}function Ys(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=f({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Xs(e){ti(e)}function Zs(e){console.error(e)}function Qs(e){ti(e)}function $s(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function ec(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function tc(e,t,n){return n=Ka(n),n.tag=3,n.payload={element:null},n.callback=function(){$s(e,t)},n}function nc(e){return e=Ka(e),e.tag=3,e}function rc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){ec(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){ec(t,n,r),typeof i!=`function`&&(iu===null?iu=new Set([this]):iu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function ic(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&na(t,n,a,!0),n=oo.current,n!==null){switch(n.tag){case 31:case 13:return so===null?Ou():n.alternate===null&&Y===0&&(Y=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Oa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Ku(e,r,a)),!1;case 22:return n.flags|=65536,r===Oa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Ku(e,r,a)),!1}throw Error(i(435,n.tag))}return Ku(e,r,a),Ou(),!1}if(F)return t=oo.current,t===null?(r!==Vi&&(t=Error(i(423),{cause:r}),Ji(Ci(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Ci(r,n),a=tc(e.stateNode,r,a),Ya(e,a),Y!==4&&(Y=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Vi&&(e=Error(i(422),{cause:r}),Ji(Ci(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Ci(o,n),Zl===null?Zl=[o]:Zl.push(o),Y!==4&&(Y=2),t===null)return!0;r=Ci(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=tc(n.stateNode,r,e),Ya(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(iu===null||!iu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=nc(a),rc(a,e,n,r),Ya(n,a),!1}n=n.return}while(n!==null);return!1}var ac=Error(i(461)),oc=!1;function sc(e,t,n,r){t.child=e===null?Ha(t,null,n,r):Va(t,e.child,n,r)}function cc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ia(t),r=To(e,t,n,o,a,i),s=ko(),e!==null&&!oc?(Ao(e,t,i),Mc(e,t,i)):(F&&s&&Fi(t),t.flags|=1,sc(e,t,r,i),t.child)}function lc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!mi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,uc(e,t,a,r,i)):(e=_i(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Nc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Or:n,n(o,r)&&e.ref===t.ref)return Mc(e,t,i)}return t.flags|=1,e=hi(a,r),e.ref=t.ref,e.return=t,t.child=e}function uc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Or(a,r)&&e.ref===t.ref)if(oc=!1,t.pendingProps=r=a,Nc(e,i))e.flags&131072&&(oc=!0);else return t.lanes=e.lanes,Mc(e,t,i)}return vc(e,t,n,r,i)}function dc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return pc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ca(t,a===null?null:a.cachePool),a===null?io():ro(t,a),uo(t);else return r=t.lanes=536870912,pc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ca(t,null),io(),fo(t)):(Ca(t,a.cachePool),ro(t,a),fo(t),t.memoizedState=null);return sc(e,t,i,n),t.child}function fc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function pc(e,t,n,r,i){var a=Sa();return a=a===null?null:{parent:I._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ca(t,null),io(),uo(t),e!==null&&na(e,t,r,!0),t.childLanes=i,null}function mc(e,t){return t=Dc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function hc(e,t,n){return Va(t,e.child,null,n),e=mc(t,t.pendingProps),e.flags|=2,po(t),t.memoizedState=null,e}function gc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(F){if(r.mode===`hidden`)return e=mc(t,r),t.lanes=536870912,fc(null,e);if(lo(t),(e=P)?(e=rf(e,Bi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ai===null?null:{id:ji,overflow:Mi},retryLane:536870912,hydrationErrors:null},n=bi(e),n.return=t,t.child=n,Ri=t,P=null)):e=null,e===null)throw Hi(t);return t.lanes=536870912,null}return mc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(lo(t),a)if(t.flags&256)t.flags&=-257,t=hc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(oc||na(e,t,n,!1),a=(n&e.childLanes)!==0,oc||a){if(r=G,r!==null&&(s=ct(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ci(e,s),gu(r,e,s),ac;Ou(),t=hc(e,t,n)}else e=o.treeContext,P=cf(s.nextSibling),Ri=t,F=!0,zi=null,Bi=!1,e!==null&&Li(t,e),t=mc(t,r),t.flags|=4096;return t}return e=hi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function _c(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function vc(e,t,n,r,i){return ia(t),n=To(e,t,n,r,void 0,i),r=ko(),e!==null&&!oc?(Ao(e,t,i),Mc(e,t,i)):(F&&r&&Fi(t),t.flags|=1,sc(e,t,n,i),t.child)}function yc(e,t,n,r,i,a){return ia(t),t.updateQueue=null,n=Do(t,r,n,i),Eo(e),r=ko(),e!==null&&!oc?(Ao(e,t,a),Mc(e,t,a)):(F&&r&&Fi(t),t.flags|=1,sc(e,t,n,a),t.child)}function bc(e,t,n,r,i){if(ia(t),t.stateNode===null){var a=di,o=n.contextType;typeof o==`object`&&o&&(a=aa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Ks,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Wa(t),o=n.contextType,a.context=typeof o==`object`&&o?aa(o):di,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Gs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Ks.enqueueReplaceState(a,a.state,null),Qa(t,r,a,i),Za(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Ys(n,s);a.props=c;var l=a.context,u=n.contextType;o=di,typeof u==`object`&&u&&(o=aa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Js(t,a,r,o),Ua=!1;var f=t.memoizedState;a.state=f,Qa(t,r,a,i),Za(),l=t.memoizedState,s||f!==l||Ua?(typeof d==`function`&&(Gs(t,n,d,r),l=t.memoizedState),(c=Ua||qs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ga(e,t),o=t.memoizedProps,u=Ys(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=di,typeof l==`object`&&l&&(c=aa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Js(t,a,r,c),Ua=!1,f=t.memoizedState,a.state=f,Qa(t,r,a,i),Za();var p=t.memoizedState;o!==d||f!==p||Ua||e!==null&&e.dependencies!==null&&ra(e.dependencies)?(typeof s==`function`&&(Gs(t,n,s,r),p=t.memoizedState),(u=Ua||qs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ra(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,_c(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Va(t,e.child,null,i),t.child=Va(t,null,n,i)):sc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Mc(e,t,i),e}function xc(e,t,n,r){return Ki(),t.flags|=256,sc(e,t,n,r),t.child}var Sc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Cc(e){return{baseLanes:e,cachePool:wa()}}function wc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Yl),e}function Tc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(L.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(F){if(a?co(t):fo(t),(e=P)?(e=rf(e,Bi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ai===null?null:{id:ji,overflow:Mi},retryLane:536870912,hydrationErrors:null},n=bi(e),n.return=t,t.child=n,Ri=t,P=null)):e=null,e===null)throw Hi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(fo(t),a=t.mode,c=Dc({mode:`hidden`,children:c},a),r=vi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=Cc(n),r.childLanes=wc(e,s,n),t.memoizedState=Sc,fc(null,r)):(co(t),Ec(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(co(t),t.flags&=-257,t=Oc(e,t,n)):t.memoizedState===null?(fo(t),c=r.fallback,a=t.mode,r=Dc({mode:`visible`,children:r.children},a),c=vi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Va(t,e.child,null,n),r=t.child,r.memoizedState=Cc(n),r.childLanes=wc(e,s,n),t.memoizedState=Sc,t=fc(null,r)):(fo(t),t.child=e.child,t.flags|=128,t=null);else if(co(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Ji({value:r,source:null,stack:null}),t=Oc(e,t,n)}else if(oc||na(e,t,n,!1),s=(n&e.childLanes)!==0,oc||s){if(s=G,s!==null&&(r=ct(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ci(e,r),gu(s,e,r),ac;af(c)||Ou(),t=Oc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,P=cf(c.nextSibling),Ri=t,F=!0,zi=null,Bi=!1,e!==null&&Li(t,e),t=Ec(t,r.children),t.flags|=4096);return t}return a?(fo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=hi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=vi(c,a,n,null),c.flags|=2):c=hi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,fc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=Cc(n):(a=c.cachePool,a===null?a=wa():(l=I._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=wc(e,s,n),t.memoizedState=Sc,fc(e.child,r)):(co(t),n=e.child,e=n.sibling,n=hi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function Ec(e,t){return t=Dc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Dc(e,t){return e=pi(22,e,null,t),e.lanes=0,e}function Oc(e,t,n){return Va(t,e.child,null,n),e=Ec(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function kc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ea(e.return,t,n)}function Ac(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function jc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=L.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,k(L,o),sc(e,t,r,n),r=F?Di:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&kc(e,n,t);else if(e.tag===19)kc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&mo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Ac(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&mo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Ac(t,!0,n,null,a,r);break;case`together`:Ac(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Mc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Kl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(na(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=hi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=hi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Nc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&ra(e))):!0}function Pc(e,t,n){switch(t.tag){case 3:ve(t,t.stateNode.containerInfo),Qi(t,I,e.memoizedState.cache),Ki();break;case 27:case 5:be(t);break;case 4:ve(t,t.stateNode.containerInfo);break;case 10:Qi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,lo(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(co(t),e=Mc(e,t,n),e===null?null:e.sibling):Tc(e,t,n):(co(t),t.flags|=128,null);co(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(na(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return jc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),k(L,L.current),r)break;return null;case 22:return t.lanes=0,dc(e,t,n,t.pendingProps);case 24:Qi(t,I,e.memoizedState.cache)}return Mc(e,t,n)}function Fc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)oc=!0;else{if(!Nc(e,n)&&!(t.flags&128))return oc=!1,Pc(e,t,n);oc=!!(e.flags&131072)}else oc=!1,F&&t.flags&1048576&&Pi(t,Di,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=ja(t.elementType),t.type=e,typeof e==`function`)mi(e)?(r=Ys(e,r),t.tag=1,t=bc(null,t,e,r,n)):(t.tag=0,t=vc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=cc(null,t,e,r,n);break a}else if(a===ne){t.tag=14,t=lc(null,t,e,r,n);break a}}throw t=le(e)||e,Error(i(306,t,``))}}return t;case 0:return vc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Ys(r,t.pendingProps),bc(e,t,r,a,n);case 3:a:{if(ve(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ga(e,t),Qa(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Qi(t,I,r),r!==o.cache&&ta(t,[I],n,!0),Za(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=xc(e,t,r,n);break a}else if(r!==a){a=Ci(Error(i(424)),t),Ji(a),t=xc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(P=cf(e.firstChild),Ri=t,F=!0,zi=null,Bi=!0,n=Ha(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ki(),r===a){t=Mc(e,t,n);break a}sc(e,t,r,n)}t=t.child}return t;case 26:return _c(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:F||(n=t.type,e=t.pendingProps,r=Bd(ge.current).createElement(n),r[mt]=t,r[ht]=e,Pd(r,n,e),Et(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return be(t),e===null&&F&&(r=t.stateNode=ff(t.type,t.pendingProps,ge.current),Ri=t,Bi=!0,a=P,Zd(t.type)?(lf=a,P=cf(r.firstChild)):P=a),sc(e,t,t.pendingProps.children,n),_c(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&F&&((a=r=P)&&(r=tf(r,t.type,t.pendingProps,Bi),r===null?a=!1:(t.stateNode=r,Ri=t,P=cf(r.firstChild),Bi=!1,a=!0)),a||Hi(t)),be(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=To(e,t,Oo,null,null,n),Qf._currentValue=a),_c(e,t),sc(e,t,r,n),t.child;case 6:return e===null&&F&&((e=n=P)&&(n=nf(n,t.pendingProps,Bi),n===null?e=!1:(t.stateNode=n,Ri=t,P=null,e=!0)),e||Hi(t)),null;case 13:return Tc(e,t,n);case 4:return ve(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Va(t,null,r,n):sc(e,t,r,n),t.child;case 11:return cc(e,t,t.type,t.pendingProps,n);case 7:return sc(e,t,t.pendingProps,n),t.child;case 8:return sc(e,t,t.pendingProps.children,n),t.child;case 12:return sc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Qi(t,t.type,r.value),sc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,ia(t),a=aa(a),r=r(a),t.flags|=1,sc(e,t,r,n),t.child;case 14:return lc(e,t,t.type,t.pendingProps,n);case 15:return uc(e,t,t.type,t.pendingProps,n);case 19:return jc(e,t,n);case 31:return gc(e,t,n);case 22:return dc(e,t,n,t.pendingProps);case 24:return ia(t),r=aa(I),e===null?(a=Sa(),a===null&&(a=G,o=da(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Wa(t),Qi(t,I,a)):((e.lanes&n)!==0&&(Ga(e,t),Qa(t,null,null,n),Za()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Qi(t,I,r),r!==a.cache&&ta(t,[I],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Qi(t,I,r))),sc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Ic(e){e.flags|=4}function Lc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(Tu())e.flags|=8192;else throw Ma=Oa,Ea}else e.flags&=-16777217}function Rc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(Tu())e.flags|=8192;else throw Ma=Oa,Ea}function zc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:nt(),e.lanes|=t,Xl|=t)}function Bc(e,t){if(!F)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function V(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Vc(e,t,n){var r=t.pendingProps;switch(Ii(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return V(t),null;case 1:return V(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),$i(I),ye(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Gi(t)?Ic(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,qi())),V(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Ic(t),o===null?(V(t),Lc(t,a,null,r,n)):(V(t),Rc(t,o))):o?o===e.memoizedState?(V(t),t.flags&=-16777217):(Ic(t),V(t),Rc(t,o)):(e=e.memoizedProps,e!==r&&Ic(t),V(t),Lc(t,a,e,r,n)),null;case 27:if(xe(t),n=ge.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Ic(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),null}e=me.current,Gi(t)?Ui(t,e):(e=ff(a,r,n),t.stateNode=e,Ic(t))}return V(t),null;case 5:if(xe(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Ic(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),null}if(o=me.current,Gi(t))Ui(t,o);else{var s=Bd(ge.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[mt]=t,o[ht]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Ic(t)}}return V(t),Lc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Ic(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=ge.current,Gi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Ri,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[mt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Hi(t,!0)}else e=Bd(e).createTextNode(r),e[mt]=t,t.stateNode=e}return V(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Gi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[mt]=t}else Ki(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),e=!1}else n=qi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(po(t),t):(po(t),null);if(t.flags&128)throw Error(i(558))}return V(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Gi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[mt]=t}else Ki(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),a=!1}else a=qi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(po(t),t):(po(t),null)}return po(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),zc(t,t.updateQueue),V(t),null);case 4:return ye(),e===null&&Sd(t.stateNode.containerInfo),V(t),null;case 10:return $i(t.type),V(t),null;case 19:if(O(L),r=t.memoizedState,r===null)return V(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Bc(r,!1);else{if(Y!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=mo(e),o!==null){for(t.flags|=128,Bc(r,!1),e=o.updateQueue,t.updateQueue=e,zc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)gi(n,e),n=n.sibling;return k(L,L.current&1|2),F&&Ni(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Pe()>nu&&(t.flags|=128,a=!0,Bc(r,!1),t.lanes=4194304)}else{if(!a)if(e=mo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,zc(t,e),Bc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!F)return V(t),null}else 2*Pe()-r.renderingStartTime>nu&&n!==536870912&&(t.flags|=128,a=!0,Bc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(V(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Pe(),e.sibling=null,n=L.current,k(L,a?n&1|2:n&1),F&&Ni(t,r.treeForkCount),e);case 22:case 23:return po(t),ao(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(V(t),t.subtreeFlags&6&&(t.flags|=8192)):V(t),n=t.updateQueue,n!==null&&zc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&O(xa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),$i(I),V(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Hc(e,t){switch(Ii(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return $i(I),ye(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return xe(t),null;case 31:if(t.memoizedState!==null){if(po(t),t.alternate===null)throw Error(i(340));Ki()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(po(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Ki()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return O(L),null;case 4:return ye(),null;case 10:return $i(t.type),null;case 22:case 23:return po(t),ao(),e!==null&&O(xa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return $i(I),null;case 25:return null;default:return null}}function Uc(e,t){switch(Ii(t),t.tag){case 3:$i(I),ye();break;case 26:case 27:case 5:xe(t);break;case 4:ye();break;case 31:t.memoizedState!==null&&po(t);break;case 13:po(t);break;case 19:O(L);break;case 10:$i(t.type);break;case 22:case 23:po(t),ao(),e!==null&&O(xa);break;case 24:$i(I)}}function Wc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){X(t,t.return,e)}}function Gc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){X(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){X(t,t.return,e)}}function Kc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{eo(t,n)}catch(t){X(e,e.return,t)}}}function qc(e,t,n){n.props=Ys(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){X(e,t,n)}}function Jc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){X(e,t,n)}}function Yc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){X(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){X(e,t,n)}else n.current=null}function Xc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){X(e,e.return,t)}}function Zc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[ht]=t}catch(t){X(e,e.return,t)}}function Qc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function $c(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Qc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function el(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=on));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(el(e,t,n),e=e.sibling;e!==null;)el(e,t,n),e=e.sibling}function tl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(tl(e,t,n),e=e.sibling;e!==null;)tl(e,t,n),e=e.sibling}function nl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[mt]=e,t[ht]=n}catch(t){X(e,e.return,t)}}var rl=!1,il=!1,al=!1,ol=typeof WeakSet==`function`?WeakSet:Set,H=null;function sl(e,t){if(e=e.containerInfo,Rd=sp,e=Mr(e),Nr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,H=t;H!==null;)if(t=H,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,H=e;else for(;H!==null;){switch(t=H,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Ys(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){X(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,H=e;break}H=t.return}}function cl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Sl(e,n),r&4&&Wc(5,n);break;case 1:if(Sl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){X(n,n.return,e)}else{var i=Ys(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){X(n,n.return,e)}}r&64&&Kc(n),r&512&&Jc(n,n.return);break;case 3:if(Sl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{eo(e,t)}catch(e){X(n,n.return,e)}}break;case 27:t===null&&r&4&&nl(n);case 26:case 5:Sl(e,n),t===null&&r&4&&Xc(n),r&512&&Jc(n,n.return);break;case 12:Sl(e,n);break;case 31:Sl(e,n),r&4&&pl(e,n);break;case 13:Sl(e,n),r&4&&ml(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Yu.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||rl,!r){t=t!==null&&t.memoizedState!==null||il,i=rl;var a=il;rl=r,(il=t)&&!a?wl(e,n,(n.subtreeFlags&8772)!=0):Sl(e,n),rl=i,il=a}break;case 30:break;default:Sl(e,n)}}function ll(e){var t=e.alternate;t!==null&&(e.alternate=null,ll(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&xt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var U=null,ul=!1;function dl(e,t,n){for(n=n.child;n!==null;)fl(e,t,n),n=n.sibling}function fl(e,t,n){if(Ue&&typeof Ue.onCommitFiberUnmount==`function`)try{Ue.onCommitFiberUnmount(He,n)}catch{}switch(n.tag){case 26:il||Yc(n,t),dl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:il||Yc(n,t);var r=U,i=ul;Zd(n.type)&&(U=n.stateNode,ul=!1),dl(e,t,n),pf(n.stateNode),U=r,ul=i;break;case 5:il||Yc(n,t);case 6:if(r=U,i=ul,U=null,dl(e,t,n),U=r,ul=i,U!==null)if(ul)try{(U.nodeType===9?U.body:U.nodeName===`HTML`?U.ownerDocument.body:U).removeChild(n.stateNode)}catch(e){X(n,t,e)}else try{U.removeChild(n.stateNode)}catch(e){X(n,t,e)}break;case 18:U!==null&&(ul?(e=U,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(U,n.stateNode));break;case 4:r=U,i=ul,U=n.stateNode.containerInfo,ul=!0,dl(e,t,n),U=r,ul=i;break;case 0:case 11:case 14:case 15:Gc(2,n,t),il||Gc(4,n,t),dl(e,t,n);break;case 1:il||(Yc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&qc(n,t,r)),dl(e,t,n);break;case 21:dl(e,t,n);break;case 22:il=(r=il)||n.memoizedState!==null,dl(e,t,n),il=r;break;default:dl(e,t,n)}}function pl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){X(t,t.return,e)}}}function ml(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){X(t,t.return,e)}}function hl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ol),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ol),t;default:throw Error(i(435,e.tag))}}function gl(e,t){var n=hl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Xu.bind(null,e,t);t.then(r,r)}})}function _l(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){U=c.stateNode,ul=!1;break a}break;case 5:U=c.stateNode,ul=!1;break a;case 3:case 4:U=c.stateNode.containerInfo,ul=!0;break a}c=c.return}if(U===null)throw Error(i(160));fl(o,s,a),U=null,ul=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)yl(t,e),t=t.sibling}var vl=null;function yl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:_l(t,e),bl(e),r&4&&(Gc(3,e,e.return),Wc(3,e),Gc(5,e,e.return));break;case 1:_l(t,e),bl(e),r&512&&(il||n===null||Yc(n,n.return)),r&64&&rl&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=vl;if(_l(t,e),bl(e),r&512&&(il||n===null||Yc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[bt]||o[mt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[mt]=e,Et(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[mt]=e,Et(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Zc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:_l(t,e),bl(e),r&512&&(il||n===null||Yc(n,n.return)),n!==null&&r&4&&Zc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(_l(t,e),bl(e),r&512&&(il||n===null||Yc(n,n.return)),e.flags&32){a=e.stateNode;try{Zt(a,``)}catch(t){X(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Zc(e,a,n===null?a:n.memoizedProps)),r&1024&&(al=!0);break;case 6:if(_l(t,e),bl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){X(e,e.return,t)}}break;case 3:if(Bf=null,a=vl,vl=gf(t.containerInfo),_l(t,e),vl=a,bl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){X(e,e.return,t)}al&&(al=!1,xl(e));break;case 4:r=vl,vl=gf(e.stateNode.containerInfo),_l(t,e),bl(e),vl=r;break;case 12:_l(t,e),bl(e);break;case 31:_l(t,e),bl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 13:_l(t,e),bl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(eu=Pe()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=rl,d=il;if(rl=u||a,il=d||l,_l(t,e),il=d,rl=u,bl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||rl||il||Cl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){X(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){X(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){X(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,gl(e,n))));break;case 19:_l(t,e),bl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,gl(e,r)));break;case 30:break;case 21:break;default:_l(t,e),bl(e)}}function bl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Qc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;tl(e,$c(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Zt(o,``),n.flags&=-33),tl(e,$c(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;el(e,$c(e),s);break;default:throw Error(i(161))}}catch(t){X(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function xl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;xl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Sl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)cl(e,t.alternate,t),t=t.sibling}function Cl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Gc(4,t,t.return),Cl(t);break;case 1:Yc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&qc(t,t.return,n),Cl(t);break;case 27:pf(t.stateNode);case 26:case 5:Yc(t,t.return),Cl(t);break;case 22:t.memoizedState===null&&Cl(t);break;case 30:Cl(t);break;default:Cl(t)}e=e.sibling}}function wl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:wl(i,a,n),Wc(4,a);break;case 1:if(wl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){X(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)$a(c[i],s)}catch(e){X(r,r.return,e)}}n&&o&64&&Kc(a),Jc(a,a.return);break;case 27:nl(a);case 26:case 5:wl(i,a,n),n&&r===null&&o&4&&Xc(a),Jc(a,a.return);break;case 12:wl(i,a,n);break;case 31:wl(i,a,n),n&&o&4&&pl(i,a);break;case 13:wl(i,a,n),n&&o&4&&ml(i,a);break;case 22:a.memoizedState===null&&wl(i,a,n),Jc(a,a.return);break;case 30:break;default:wl(i,a,n)}t=t.sibling}}function Tl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&fa(n))}function El(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&fa(e))}function Dl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ol(e,t,n,r),t=t.sibling}function Ol(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Dl(e,t,n,r),i&2048&&Wc(9,t);break;case 1:Dl(e,t,n,r);break;case 3:Dl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&fa(e)));break;case 12:if(i&2048){Dl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){X(t,t.return,e)}}else Dl(e,t,n,r);break;case 31:Dl(e,t,n,r);break;case 13:Dl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Dl(e,t,n,r):(a._visibility|=2,kl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Dl(e,t,n,r):Al(e,t),i&2048&&Tl(o,t);break;case 24:Dl(e,t,n,r),i&2048&&El(t.alternate,t);break;default:Dl(e,t,n,r)}}function kl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:kl(a,o,s,c,i),Wc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,kl(a,o,s,c,i)):u._visibility&2?kl(a,o,s,c,i):Al(a,o),i&&l&2048&&Tl(o.alternate,o);break;case 24:kl(a,o,s,c,i),i&&l&2048&&El(o.alternate,o);break;default:kl(a,o,s,c,i)}t=t.sibling}}function Al(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Al(n,r),i&2048&&Tl(r.alternate,r);break;case 24:Al(n,r),i&2048&&El(r.alternate,r);break;default:Al(n,r)}t=t.sibling}}var jl=8192;function Ml(e,t,n){if(e.subtreeFlags&jl)for(e=e.child;e!==null;)Nl(e,t,n),e=e.sibling}function Nl(e,t,n){switch(e.tag){case 26:Ml(e,t,n),e.flags&jl&&e.memoizedState!==null&&Gf(n,vl,e.memoizedState,e.memoizedProps);break;case 5:Ml(e,t,n);break;case 3:case 4:var r=vl;vl=gf(e.stateNode.containerInfo),Ml(e,t,n),vl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=jl,jl=16777216,Ml(e,t,n),jl=r):Ml(e,t,n));break;default:Ml(e,t,n)}}function Pl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];H=r,Rl(r,e)}Pl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Il(e),e=e.sibling}function Il(e){switch(e.tag){case 0:case 11:case 15:Fl(e),e.flags&2048&&Gc(9,e,e.return);break;case 3:Fl(e);break;case 12:Fl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ll(e)):Fl(e);break;default:Fl(e)}}function Ll(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];H=r,Rl(r,e)}Pl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Gc(8,t,t.return),Ll(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ll(t));break;default:Ll(t)}e=e.sibling}}function Rl(e,t){for(;H!==null;){var n=H;switch(n.tag){case 0:case 11:case 15:Gc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:fa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,H=r;else a:for(n=e;H!==null;){r=H;var i=r.sibling,a=r.return;if(ll(r),r===n){H=null;break a}if(i!==null){i.return=a,H=i;break a}H=a}}}var zl={getCacheForType:function(e){var t=aa(I),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return aa(I).controller.signal}},Bl=typeof WeakMap==`function`?WeakMap:Map,W=0,G=null,K=null,q=0,J=0,Vl=null,Hl=!1,Ul=!1,Wl=!1,Gl=0,Y=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=0,Zl=null,Ql=null,$l=!1,eu=0,tu=0,nu=1/0,ru=null,iu=null,au=0,ou=null,su=null,cu=0,lu=0,uu=null,du=null,fu=0,pu=null;function mu(){return W&2&&q!==0?q&-q:T.T===null?dt():dd()}function hu(){if(Yl===0)if(!(q&536870912)||F){var e=Xe;Xe<<=1,!(Xe&3932160)&&(Xe=262144),Yl=e}else Yl=536870912;return e=oo.current,e!==null&&(e.flags|=32),Yl}function gu(e,t,n){(e===G&&(J===2||J===9)||e.cancelPendingCommit!==null)&&(Cu(e,0),bu(e,q,Yl,!1)),it(e,n),(!(W&2)||e!==G)&&(e===G&&(!(W&2)&&(ql|=n),Y===4&&bu(e,q,Yl,!1)),rd(e))}function _u(e,t,n){if(W&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||et(e,t),a=r?ju(e,t):ku(e,t,!0),o=r;do{if(a===0){Ul&&!r&&bu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!yu(n)){a=ku(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Zl;var l=c.current.memoizedState.isDehydrated;if(l&&(Cu(c,s).flags|=256),s=ku(c,s,!1),s!==2){if(Wl&&!l){c.errorRecoveryDisabledLanes|=o,ql|=o,a=4;break a}o=Ql,Ql=a,o!==null&&(Ql===null?Ql=o:Ql.push.apply(Ql,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Cu(e,0),bu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:bu(r,t,Yl,!Hl);break a;case 2:Ql=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=eu+300-Pe(),10<a)){if(bu(r,t,Yl,!Hl),$e(r,0,!0)!==0)break a;cu=t,r.timeoutHandle=Kd(vu.bind(null,r,n,Ql,ru,$l,t,Yl,ql,Xl,Hl,o,`Throttled`,-0,0),a);break a}vu(r,n,Ql,ru,$l,t,Yl,ql,Xl,Hl,o,null,-0,0)}}break}while(1);rd(e)}function vu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:on},Nl(t,a,d);var m=(a&62914560)===a?eu-Pe():(a&4194048)===a?tu-Pe():0;if(m=qf(d,m),m!==null){cu=a,e.cancelPendingCommit=m(Ru.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),bu(e,a,o,!l);return}}Ru(e,t,a,n,r,i,o,s,c)}function yu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Dr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function bu(e,t,n,r){t&=~Jl,t&=~ql,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Ge(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&ot(e,n,t)}function xu(){return W&6?!0:(id(0,!1),!1)}function Su(){if(K!==null){if(J===0)var e=K.return;else e=K,Zi=Xi=null,jo(e),Fa=null,Ia=0,e=K;for(;e!==null;)Uc(e.alternate,e),e=e.return;K=null}}function Cu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),cu=0,Su(),G=e,K=n=hi(e.current,null),q=t,J=0,Vl=null,Hl=!1,Ul=et(e,t),Wl=!1,Xl=Yl=Jl=ql=Kl=Y=0,Ql=Zl=null,$l=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Ge(r),a=1<<i;t|=e[i],r&=~a}return Gl=t,ai(),n}function wu(e,t){R=null,T.H=Vs,t===Ta||t===Da?(t=Na(),J=3):t===Ea?(t=Na(),J=4):J=t===ac?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Vl=t,K===null&&(Y=1,$s(e,Ci(t,e.current)))}function Tu(){var e=oo.current;return e===null?!0:(q&4194048)===q?so===null:(q&62914560)===q||q&536870912?e===so:!1}function Eu(){var e=T.H;return T.H=Vs,e===null?Vs:e}function Du(){var e=T.A;return T.A=zl,e}function Ou(){Y=4,Hl||(q&4194048)!==q&&oo.current!==null||(Ul=!0),!(Kl&134217727)&&!(ql&134217727)||G===null||bu(G,q,Yl,!1)}function ku(e,t,n){var r=W;W|=2;var i=Eu(),a=Du();(G!==e||q!==t)&&(ru=null,Cu(e,t)),t=!1;var o=Y;a:do try{if(J!==0&&K!==null){var s=K,c=Vl;switch(J){case 8:Su(),o=6;break a;case 3:case 2:case 9:case 6:oo.current===null&&(t=!0);var l=J;if(J=0,Vl=null,Fu(e,s,c,l),n&&Ul){o=0;break a}break;default:l=J,J=0,Vl=null,Fu(e,s,c,l)}}Au(),o=Y;break}catch(t){wu(e,t)}while(1);return t&&e.shellSuspendCounter++,Zi=Xi=null,W=r,T.H=i,T.A=a,K===null&&(G=null,q=0,ai()),o}function Au(){for(;K!==null;)Nu(K)}function ju(e,t){var n=W;W|=2;var r=Eu(),a=Du();G!==e||q!==t?(ru=null,nu=Pe()+500,Cu(e,t)):Ul=et(e,t);a:do try{if(J!==0&&K!==null){t=K;var o=Vl;b:switch(J){case 1:J=0,Vl=null,Fu(e,t,o,1);break;case 2:case 9:if(ka(o)){J=0,Vl=null,Pu(t);break}t=function(){J!==2&&J!==9||G!==e||(J=7),rd(e)},o.then(t,t);break a;case 3:J=7;break a;case 4:J=5;break a;case 7:ka(o)?(J=0,Vl=null,Pu(t)):(J=0,Vl=null,Fu(e,t,o,7));break;case 5:var s=null;switch(K.tag){case 26:s=K.memoizedState;case 5:case 27:var c=K;if(s?Wf(s):c.stateNode.complete){J=0,Vl=null;var l=c.sibling;if(l!==null)K=l;else{var u=c.return;u===null?K=null:(K=u,Iu(u))}break b}}J=0,Vl=null,Fu(e,t,o,5);break;case 6:J=0,Vl=null,Fu(e,t,o,6);break;case 8:Su(),Y=6;break a;default:throw Error(i(462))}}Mu();break}catch(t){wu(e,t)}while(1);return Zi=Xi=null,T.H=r,T.A=a,W=n,K===null?(G=null,q=0,ai(),Y):0}function Mu(){for(;K!==null&&!Me();)Nu(K)}function Nu(e){var t=Fc(e.alternate,e,Gl);e.memoizedProps=e.pendingProps,t===null?Iu(e):K=t}function Pu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=yc(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=yc(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:jo(t);default:Uc(n,t),t=K=gi(t,Gl),t=Fc(n,t,Gl)}e.memoizedProps=e.pendingProps,t===null?Iu(e):K=t}function Fu(e,t,n,r){Zi=Xi=null,jo(t),Fa=null,Ia=0;var i=t.return;try{if(ic(e,i,t,n,q)){Y=1,$s(e,Ci(n,e.current)),K=null;return}}catch(t){if(i!==null)throw K=i,t;Y=1,$s(e,Ci(n,e.current)),K=null;return}t.flags&32768?(F||r===1?e=!0:Ul||q&536870912?e=!1:(Hl=e=!0,(r===2||r===9||r===3||r===6)&&(r=oo.current,r!==null&&r.tag===13&&(r.flags|=16384))),Lu(t,e)):Iu(t)}function Iu(e){var t=e;do{if(t.flags&32768){Lu(t,Hl);return}e=t.return;var n=Vc(t.alternate,t,Gl);if(n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Y===0&&(Y=5)}function Lu(e,t){do{var n=Hc(e.alternate,e);if(n!==null){n.flags&=32767,K=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=n}while(e!==null);Y=6,K=null}function Ru(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Uu();while(au!==0);if(W&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=ii,at(e,n,o,s,c,l),e===G&&(K=G=null,q=0),su=t,ou=e,cu=n,lu=o,uu=a,du=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Zu(Re,function(){return Wu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=T.T,T.T=null,a=E.p,E.p=2,s=W,W|=4;try{sl(e,t,n)}finally{W=s,E.p=a,T.T=r}}au=1,zu(),Bu(),Vu()}}function zu(){if(au===1){au=0;var e=ou,t=su,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=T.T,T.T=null;var r=E.p;E.p=2;var i=W;W|=4;try{yl(t,e);var a=zd,o=Mr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&jr(s.ownerDocument.documentElement,s)){if(c!==null&&Nr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Ar(s,h),v=Ar(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{W=i,E.p=r,T.T=n}}e.current=t,au=2}}function Bu(){if(au===2){au=0;var e=ou,t=su,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=T.T,T.T=null;var r=E.p;E.p=2;var i=W;W|=4;try{cl(e,t.alternate,t)}finally{W=i,E.p=r,T.T=n}}au=3}}function Vu(){if(au===4||au===3){au=0,Ne();var e=ou,t=su,n=cu,r=du;t.subtreeFlags&10256||t.flags&10256?au=5:(au=0,su=ou=null,Hu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(iu=null),ut(n),t=t.stateNode,Ue&&typeof Ue.onCommitFiberRoot==`function`)try{Ue.onCommitFiberRoot(He,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=T.T,i=E.p,E.p=2,T.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{T.T=t,E.p=i}}cu&3&&Uu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===pu?fu++:(fu=0,pu=e):fu=0,id(0,!1)}}function Hu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,fa(t)))}function Uu(){return zu(),Bu(),Vu(),Wu()}function Wu(){if(au!==5)return!1;var e=ou,t=lu;lu=0;var n=ut(cu),r=T.T,a=E.p;try{E.p=32>n?32:n,T.T=null,n=uu,uu=null;var o=ou,s=cu;if(au=0,su=ou=null,cu=0,W&6)throw Error(i(331));var c=W;if(W|=4,Il(o.current),Ol(o,o.current,s,n),W=c,id(0,!1),Ue&&typeof Ue.onPostCommitFiberRoot==`function`)try{Ue.onPostCommitFiberRoot(He,o)}catch{}return!0}finally{E.p=a,T.T=r,Hu(e,t)}}function Gu(e,t,n){t=Ci(n,t),t=tc(e.stateNode,t,2),e=qa(e,t,2),e!==null&&(it(e,2),rd(e))}function X(e,t,n){if(e.tag===3)Gu(e,e,n);else for(;t!==null;){if(t.tag===3){Gu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(iu===null||!iu.has(r))){e=Ci(n,e),n=nc(2),r=qa(t,n,2),r!==null&&(rc(n,r,t,e),it(r,2),rd(r));break}}t=t.return}}function Ku(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Bl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Wl=!0,i.add(n),e=qu.bind(null,e,t,n),t.then(e,e))}function qu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,G===e&&(q&n)===n&&(Y===4||Y===3&&(q&62914560)===q&&300>Pe()-eu?!(W&2)&&Cu(e,0):Jl|=n,Xl===q&&(Xl=0)),rd(e)}function Ju(e,t){t===0&&(t=nt()),e=ci(e,t),e!==null&&(it(e,t),rd(e))}function Yu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ju(e,n)}function Xu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ju(e,n)}function Zu(e,t){return Ae(e,t)}var Qu=null,$u=null,ed=!1,Z=!1,td=!1,nd=0;function rd(e){e!==$u&&e.next===null&&($u===null?Qu=$u=e:$u=$u.next=e),Z=!0,ed||(ed=!0,ud())}function id(e,t){if(!td&&Z){td=!0;do for(var n=!1,r=Qu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Ge(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=q,a=$e(r,r===G?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||et(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){Z=ed=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Pe(),n=null,r=Qu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Qu=i:n.next=i,i===null&&($u=n)):(n=r,(e!==0||a&3)&&(Z=!0)),r=i}au!==0&&au!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Ge(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=tt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=G,n=q,n=$e(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(J===2||J===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&je(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||et(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&je(r),ut(n)){case 2:case 8:n=Le;break;case 32:n=Re;break;case 268435456:n=Be;break;default:n=Re}return r=cd.bind(null,e),n=Ae(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&je(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(au!==0&&au!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Uu()&&e.callbackNode!==n)return null;var r=q;return r=$e(e,e===G?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(_u(e,r,t),sd(e,Pe()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Uu())return null;_u(e,t,!0)}function ud(){Yd(function(){W&6?Ae(Ie,ad):od()})}function dd(){if(nd===0){var e=ha;e===0&&(e=Ye,Ye<<=1,!(Ye&261888)&&(Ye=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:an(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[ht]||null).action),o=r.submitter;o&&(t=(t=o[ht]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new En(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Ds(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Ds(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<$r.length;hd++){var gd=$r[hd];ei(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}ei(Gr,`onAnimationEnd`),ei(Kr,`onAnimationIteration`),ei(qr,`onAnimationStart`),ei(`dblclick`,`onDoubleClick`),ei(`focusin`,`onFocus`),ei(`focusout`,`onBlur`),ei(Jr,`onTransitionRun`),ei(Yr,`onTransitionStart`),ei(Xr,`onTransitionCancel`),ei(Zr,`onTransitionEnd`),At(`onMouseEnter`,[`mouseout`,`mouseover`]),At(`onMouseLeave`,[`mouseout`,`mouseover`]),At(`onPointerEnter`,[`pointerout`,`pointerover`]),At(`onPointerLeave`,[`pointerout`,`pointerover`]),kt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),kt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),kt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),kt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),kt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),kt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ti(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ti(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[j];n===void 0&&(n=t[j]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,Dt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!hn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=St(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}fn(function(){var r=a,i=sn(n),s=[];a:{var c=Qr.get(e);if(c!==void 0){var l=En,u=e;switch(e){case`keypress`:if(xn(n)===0)break a;case`keydown`:case`keyup`:l=Wn;break;case`focusin`:u=`focus`,l=Fn;break;case`focusout`:u=`blur`,l=Fn;break;case`beforeblur`:case`afterblur`:l=Fn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Nn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Pn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Kn;break;case Gr:case Kr:case qr:l=In;break;case Zr:l=qn;break;case`scroll`:case`scrollend`:l=On;break;case`wheel`:l=Jn;break;case`copy`:case`cut`:case`paste`:l=Ln;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Gn;break;case`toggle`:case`beforetoggle`:l=Yn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=pn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==N&&(u=n.relatedTarget||n.fromElement)&&(St(u)||u[gt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?St(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Nn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Gn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:wt(l),h=u==null?c:wt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,St(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?wt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=hr;else if(lr(c))if(gr)v=Tr;else{v=Cr;var y=Sr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&tn(r.elementType)&&(v=hr):v=wr;if(v&&=v(e,r)){ur(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&qt(c,`number`,c.value)}switch(y=r?wt(r):window,e){case`focusin`:(lr(y)||y.contentEditable===`true`)&&(Fr=y,Ir=r,Lr=null);break;case`focusout`:Lr=Ir=Fr=null;break;case`mousedown`:Rr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Rr=!1,zr(s,n,i);break;case`selectionchange`:if(Pr)break;case`keydown`:case`keyup`:zr(s,n,i)}var b;if(Zn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else ar?rr(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(er&&n.locale!==`ko`&&(ar||x!==`onCompositionStart`?x===`onCompositionEnd`&&ar&&(b=bn()):(_n=i,vn=`value`in _n?_n.value:_n.textContent,ar=!0)),y=Ed(r,x),0<y.length&&(x=new Rn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=ir(n),b!==null&&(x.data=b)))),(b=$n?or(e,n):sr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Rn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=pn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=pn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=pn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=pn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Zt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Zt(e,``+r);break;case`className`:It(e,`class`,r);break;case`tabIndex`:It(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:It(e,n,r);break;case`style`:en(e,r,o);break;case`data`:if(t!==`object`){It(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=an(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=an(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=on);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=an(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Ft(e,`popover`,r);break;case`xlinkActuate`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Ft(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=nn.get(n)||n,Ft(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:en(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Zt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Zt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=on);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Ot.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[ht]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Ft(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Kt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Jt(e,!!r,n,!0):Jt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}Xt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(tn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Gt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Jt(e,!!n,n?[]:``,!1):Jt(e,!!n,t,!0)):Jt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Yt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(tn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[bt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),xt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[bt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);xt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=E.d;E.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=xu();return e||t}function yf(e){var t=Ct(e);t!==null&&t.tag===5&&t.type===`form`?ks(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Wt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),Et(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Wt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Wt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Wt(n.imageSizes)+`"]`)):i+=`[href="`+Wt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=f({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),Et(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Wt(r)+`"][href="`+Wt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=f({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),Et(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=Tt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=f({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);Et(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=Tt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=f({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Et(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=Tt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=f({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Et(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=ge.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=Tt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=Tt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=Tt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Wt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return f({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),Et(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Wt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Wt(n.href)+`"]`);if(r)return t.instance=r,Et(r),r;var a=f({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Et(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,Et(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),Et(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,Et(a),a):(r=n,(a=mf.get(o))&&(r=f({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Et(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[bt]||a[mt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Et(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),Et(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:de,_currentValue2:de,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=rt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=rt(0),this.hiddenUpdates=rt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=pi(3,null,null,t),e.current=a,a.stateNode=e,t=da(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Wa(a),e}function tp(e){return e?(e=di,e):di}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Ka(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=qa(e,r,t),n!==null&&(gu(n,e,t),Ja(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ci(e,67108864);t!==null&&gu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=mu();t=lt(t);var n=ci(e,t);n!==null&&gu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=T.T;T.T=null;var a=E.p;try{E.p=2,up(e,t,n,r)}finally{E.p=a,T.T=i}}function lp(e,t,n,r){var i=T.T;T.T=null;var a=E.p;try{E.p=8,up(e,t,n,r)}finally{E.p=a,T.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=Ct(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Qe(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Ge(o);s.entanglements[1]|=c,o&=~c}rd(a),!(W&6)&&(nu=Pe()+500,id(0,!1))}}break;case 31:case 13:s=ci(a,2),s!==null&&gu(s,a,2),xu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=sn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=St(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Fe()){case Ie:return 2;case Le:return 8;case Re:case ze:return 32;case Be:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ct(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=St(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,ft(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,ft(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);N=r,n.target.dispatchEvent(r),N=null}else return t=Ct(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=Ct(n);a!==null&&(e.splice(t,3),t-=3,Ds(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[ht]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[ht]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,mu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),xu(),t[gt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=dt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.4`)throw Error(i(527,Lp,`19.2.4`));E.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:d(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.4`,rendererPackageName:`react-dom`,currentDispatcherRef:T,reconcilerVersion:`19.2.4`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{He=zp.inject(Rp),Ue=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Xs,s=Zs,c=Qs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[gt]=t.current,Sd(e),new Fp(t)}})),y=s(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=v()})),b=u(p(),1),x=y(),S=s((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),C=s(((e,t)=>{t.exports=S()})),w=(0,b.createContext)({});function ee(e){let t=(0,b.useRef)(null);return t.current===null&&(t.current=e()),t.current}var te=typeof window<`u`?b.useLayoutEffect:b.useEffect,ne=(0,b.createContext)(null);function re(e,t){e.indexOf(t)===-1&&e.push(t)}function ie(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}var ae=(e,t,n)=>n>t?t:n<e?e:n,oe={},se=e=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);function ce(e){return typeof e==`object`&&!!e}var le=e=>/^0[^.\s]+$/u.test(e);function ue(e){let t;return()=>(t===void 0&&(t=e()),t)}var T=e=>e,E=(e,t)=>n=>t(e(n)),de=(...e)=>e.reduce(E),fe=(e,t,n)=>{let r=t-e;return r===0?1:(n-e)/r},pe=class{constructor(){this.subscriptions=[]}add(e){return re(this.subscriptions,e),()=>ie(this.subscriptions,e)}notify(e,t,n){let r=this.subscriptions.length;if(r)if(r===1)this.subscriptions[0](e,t,n);else for(let i=0;i<r;i++){let r=this.subscriptions[i];r&&r(e,t,n)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}},D=e=>e*1e3,O=e=>e/1e3;function k(e,t){return t?1e3/t*e:0}var me=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e,he=1e-7,ge=12;function _e(e,t,n,r,i){let a,o,s=0;do o=t+(n-t)/2,a=me(o,r,i)-e,a>0?n=o:t=o;while(Math.abs(a)>he&&++s<ge);return o}function ve(e,t,n,r){if(e===t&&n===r)return T;let i=t=>_e(t,0,1,e,n);return e=>e===0||e===1?e:me(i(e),t,r)}var ye=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,be=e=>t=>1-e(1-t),xe=ve(.33,1.53,.69,.99),Se=be(xe),Ce=ye(Se),we=e=>e>=1?1:(e*=2)<1?.5*Se(e):.5*(2-2**(-10*(e-1))),Te=e=>1-Math.sin(Math.acos(e)),Ee=be(Te),De=ye(Te),Oe=ve(.42,0,1,1),ke=ve(0,0,.58,1),Ae=ve(.42,0,.58,1),je=e=>Array.isArray(e)&&typeof e[0]!=`number`,Me=e=>Array.isArray(e)&&typeof e[0]==`number`,Ne={linear:T,easeIn:Oe,easeInOut:Ae,easeOut:ke,circIn:Te,circInOut:De,circOut:Ee,backIn:Se,backInOut:Ce,backOut:xe,anticipate:we},Pe=e=>typeof e==`string`,Fe=e=>{if(Me(e)){e.length;let[t,n,r,i]=e;return ve(t,n,r,i)}else if(Pe(e))return Ne[e],`${e}`,Ne[e];return e},Ie=[`setup`,`read`,`resolveKeyframes`,`preUpdate`,`update`,`preRender`,`render`,`postRender`],Le={value:null,addProjectionMetrics:null};function Re(e,t){let n=new Set,r=new Set,i=!1,a=!1,o=new WeakSet,s={delta:0,timestamp:0,isProcessing:!1},c=0;function l(t){o.has(t)&&(u.schedule(t),e()),c++,t(s)}let u={schedule:(e,t=!1,a=!1)=>{let s=a&&i?n:r;return t&&o.add(e),s.add(e),e},cancel:e=>{r.delete(e),o.delete(e)},process:e=>{if(s=e,i){a=!0;return}i=!0;let o=n;n=r,r=o,n.forEach(l),t&&Le.value&&Le.value.frameloop[t].push(c),c=0,n.clear(),i=!1,a&&(a=!1,u.process(e))}};return u}var ze=40;function Be(e,t){let n=!1,r=!0,i={delta:0,timestamp:0,isProcessing:!1},a=()=>n=!0,o=Ie.reduce((e,n)=>(e[n]=Re(a,t?n:void 0),e),{}),{setup:s,read:c,resolveKeyframes:l,preUpdate:u,update:d,preRender:f,render:p,postRender:m}=o,h=()=>{let a=oe.useManualTiming,o=a?i.timestamp:performance.now();n=!1,a||(i.delta=r?1e3/60:Math.max(Math.min(o-i.timestamp,ze),1)),i.timestamp=o,i.isProcessing=!0,s.process(i),c.process(i),l.process(i),u.process(i),d.process(i),f.process(i),p.process(i),m.process(i),i.isProcessing=!1,n&&t&&(r=!1,e(h))},g=()=>{n=!0,r=!0,i.isProcessing||e(h)};return{schedule:Ie.reduce((e,t)=>{let r=o[t];return e[t]=(e,t=!1,i=!1)=>(n||g(),r.schedule(e,t,i)),e},{}),cancel:e=>{for(let t=0;t<Ie.length;t++)o[Ie[t]].cancel(e)},state:i,steps:o}}var{schedule:A,cancel:Ve,state:He,steps:Ue}=Be(typeof requestAnimationFrame<`u`?requestAnimationFrame:T,!0),We;function Ge(){We=void 0}var Ke={now:()=>(We===void 0&&Ke.set(He.isProcessing||oe.useManualTiming?He.timestamp:performance.now()),We),set:e=>{We=e,queueMicrotask(Ge)}},qe={layout:0,mainThread:0,waapi:0},Je=e=>t=>typeof t==`string`&&t.startsWith(e),Ye=Je(`--`),Xe=Je(`var(--`),Ze=e=>Xe(e)?Qe.test(e.split(`/*`)[0].trim()):!1,Qe=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function $e(e){return typeof e==`string`?e.split(`/*`)[0].includes(`var(--`):!1}var et={test:e=>typeof e==`number`,parse:parseFloat,transform:e=>e},tt={...et,transform:e=>ae(0,1,e)},nt={...et,default:1},rt=e=>Math.round(e*1e5)/1e5,it=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function at(e){return e==null}var ot=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,st=(e,t)=>n=>!!(typeof n==`string`&&ot.test(n)&&n.startsWith(e)||t&&!at(n)&&Object.prototype.hasOwnProperty.call(n,t)),ct=(e,t,n)=>r=>{if(typeof r!=`string`)return r;let[i,a,o,s]=r.match(it);return{[e]:parseFloat(i),[t]:parseFloat(a),[n]:parseFloat(o),alpha:s===void 0?1:parseFloat(s)}},lt=e=>ae(0,255,e),ut={...et,transform:e=>Math.round(lt(e))},dt={test:st(`rgb`,`red`),parse:ct(`red`,`green`,`blue`),transform:({red:e,green:t,blue:n,alpha:r=1})=>`rgba(`+ut.transform(e)+`, `+ut.transform(t)+`, `+ut.transform(n)+`, `+rt(tt.transform(r))+`)`};function ft(e){let t=``,n=``,r=``,i=``;return e.length>5?(t=e.substring(1,3),n=e.substring(3,5),r=e.substring(5,7),i=e.substring(7,9)):(t=e.substring(1,2),n=e.substring(2,3),r=e.substring(3,4),i=e.substring(4,5),t+=t,n+=n,r+=r,i+=i),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:i?parseInt(i,16)/255:1}}var pt={test:st(`#`),parse:ft,transform:dt.transform},mt=e=>({test:t=>typeof t==`string`&&t.endsWith(e)&&t.split(` `).length===1,parse:parseFloat,transform:t=>`${t}${e}`}),ht=mt(`deg`),gt=mt(`%`),j=mt(`px`),_t=mt(`vh`),vt=mt(`vw`),yt={...gt,parse:e=>gt.parse(e)/100,transform:e=>gt.transform(e*100)},bt={test:st(`hsl`,`hue`),parse:ct(`hue`,`saturation`,`lightness`),transform:({hue:e,saturation:t,lightness:n,alpha:r=1})=>`hsla(`+Math.round(e)+`, `+gt.transform(rt(t))+`, `+gt.transform(rt(n))+`, `+rt(tt.transform(r))+`)`},xt={test:e=>dt.test(e)||pt.test(e)||bt.test(e),parse:e=>dt.test(e)?dt.parse(e):bt.test(e)?bt.parse(e):pt.parse(e),transform:e=>typeof e==`string`?e:e.hasOwnProperty(`red`)?dt.transform(e):bt.transform(e),getAnimatableNone:e=>{let t=xt.parse(e);return t.alpha=0,xt.transform(t)}},St=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function Ct(e){return isNaN(e)&&typeof e==`string`&&(e.match(it)?.length||0)+(e.match(St)?.length||0)>0}var wt=`number`,Tt=`color`,Et=`var`,Dt=`var(`,Ot="${}",kt=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function At(e){let t=e.toString(),n=[],r={color:[],number:[],var:[]},i=[],a=0;return{values:n,split:t.replace(kt,e=>(xt.test(e)?(r.color.push(a),i.push(Tt),n.push(xt.parse(e))):e.startsWith(Dt)?(r.var.push(a),i.push(Et),n.push(e)):(r.number.push(a),i.push(wt),n.push(parseFloat(e))),++a,Ot)).split(Ot),indexes:r,types:i}}function jt(e){return At(e).values}function Mt({split:e,types:t}){let n=e.length;return r=>{let i=``;for(let a=0;a<n;a++)if(i+=e[a],r[a]!==void 0){let e=t[a];e===wt?i+=rt(r[a]):e===Tt?i+=xt.transform(r[a]):i+=r[a]}return i}}function Nt(e){return Mt(At(e))}var Pt=e=>typeof e==`number`?0:xt.test(e)?xt.getAnimatableNone(e):e,Ft=(e,t)=>typeof e==`number`?t?.trim().endsWith(`/`)?e:0:Pt(e);function It(e){let t=At(e);return Mt(t)(t.values.map((e,n)=>Ft(e,t.split[n])))}var Lt={test:Ct,parse:jt,createTransformer:Nt,getAnimatableNone:It};function Rt(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function zt({hue:e,saturation:t,lightness:n,alpha:r}){e/=360,t/=100,n/=100;let i=0,a=0,o=0;if(!t)i=a=o=n;else{let r=n<.5?n*(1+t):n+t-n*t,s=2*n-r;i=Rt(s,r,e+1/3),a=Rt(s,r,e),o=Rt(s,r,e-1/3)}return{red:Math.round(i*255),green:Math.round(a*255),blue:Math.round(o*255),alpha:r}}function Bt(e,t){return n=>n>0?t:e}var M=(e,t,n)=>e+(t-e)*n,Vt=(e,t,n)=>{let r=e*e,i=n*(t*t-r)+r;return i<0?0:Math.sqrt(i)},Ht=[pt,dt,bt],Ut=e=>Ht.find(t=>t.test(e));function Wt(e){let t=Ut(e);if(`${e}`,!t)return!1;let n=t.parse(e);return t===bt&&(n=zt(n)),n}var Gt=(e,t)=>{let n=Wt(e),r=Wt(t);if(!n||!r)return Bt(e,t);let i={...n};return e=>(i.red=Vt(n.red,r.red,e),i.green=Vt(n.green,r.green,e),i.blue=Vt(n.blue,r.blue,e),i.alpha=M(n.alpha,r.alpha,e),dt.transform(i))},Kt=new Set([`none`,`hidden`]);function qt(e,t){return Kt.has(e)?n=>n<=0?e:t:n=>n>=1?t:e}function Jt(e,t){return n=>M(e,t,n)}function Yt(e){return typeof e==`number`?Jt:typeof e==`string`?Ze(e)?Bt:xt.test(e)?Gt:$t:Array.isArray(e)?Xt:typeof e==`object`?xt.test(e)?Gt:Zt:Bt}function Xt(e,t){let n=[...e],r=n.length,i=e.map((e,n)=>Yt(e)(e,t[n]));return e=>{for(let t=0;t<r;t++)n[t]=i[t](e);return n}}function Zt(e,t){let n={...e,...t},r={};for(let i in n)e[i]!==void 0&&t[i]!==void 0&&(r[i]=Yt(e[i])(e[i],t[i]));return e=>{for(let t in r)n[t]=r[t](e);return n}}function Qt(e,t){let n=[],r={color:0,var:0,number:0};for(let i=0;i<t.values.length;i++){let a=t.types[i],o=e.indexes[a][r[a]];n[i]=e.values[o]??0,r[a]++}return n}var $t=(e,t)=>{let n=Lt.createTransformer(t),r=At(e),i=At(t);return r.indexes.var.length===i.indexes.var.length&&r.indexes.color.length===i.indexes.color.length&&r.indexes.number.length>=i.indexes.number.length?Kt.has(e)&&!i.values.length||Kt.has(t)&&!r.values.length?qt(e,t):de(Xt(Qt(r,i),i.values),n):(`${e}${t}`,Bt(e,t))};function en(e,t,n){return typeof e==`number`&&typeof t==`number`&&typeof n==`number`?M(e,t,n):Yt(e)(e,t)}var tn=e=>{let t=({timestamp:t})=>e(t);return{start:(e=!0)=>A.update(t,e),stop:()=>Ve(t),now:()=>He.isProcessing?He.timestamp:Ke.now()}},nn=(e,t,n=10)=>{let r=``,i=Math.max(Math.round(t/n),2);for(let t=0;t<i;t++)r+=Math.round(e(t/(i-1))*1e4)/1e4+`, `;return`linear(${r.substring(0,r.length-2)})`},rn=2e4;function an(e){let t=0,n=e.next(t);for(;!n.done&&t<2e4;)t+=50,n=e.next(t);return t>=2e4?1/0:t}function on(e,t=100,n){let r=n({...e,keyframes:[0,t]}),i=Math.min(an(r),rn);return{type:`keyframes`,ease:e=>r.next(i*e).value/t,duration:O(i)}}var N={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function sn(e,t){return e*Math.sqrt(1-t*t)}var cn=12;function ln(e,t,n){let r=n;for(let n=1;n<cn;n++)r-=e(r)/t(r);return r}var un=.001;function dn({duration:e=N.duration,bounce:t=N.bounce,velocity:n=N.velocity,mass:r=N.mass}){let i,a;N.maxDuration;let o=1-t;o=ae(N.minDamping,N.maxDamping,o),e=ae(N.minDuration,N.maxDuration,O(e)),o<1?(i=t=>{let r=t*o,i=r*e,a=r-n,s=sn(t,o),c=Math.exp(-i);return un-a/s*c},a=t=>{let r=t*o*e,a=r*n+n,s=o**2*t**2*e,c=Math.exp(-r),l=sn(t**2,o);return(-i(t)+un>0?-1:1)*((a-s)*c)/l}):(i=t=>{let r=Math.exp(-t*e),i=(t-n)*e+1;return-un+r*i},a=t=>Math.exp(-t*e)*((n-t)*(e*e)));let s=5/e,c=ln(i,a,s);if(e=D(e),isNaN(c))return{stiffness:N.stiffness,damping:N.damping,duration:e};{let t=c**2*r;return{stiffness:t,damping:o*2*Math.sqrt(r*t),duration:e}}}var fn=[`duration`,`bounce`],pn=[`stiffness`,`damping`,`mass`];function mn(e,t){return t.some(t=>e[t]!==void 0)}function hn(e){let t={velocity:N.velocity,stiffness:N.stiffness,damping:N.damping,mass:N.mass,isResolvedFromDuration:!1,...e};if(!mn(e,pn)&&mn(e,fn))if(t.velocity=0,e.visualDuration){let n=e.visualDuration,r=2*Math.PI/(n*1.2),i=r*r,a=2*ae(.05,1,1-(e.bounce||0))*Math.sqrt(i);t={...t,mass:N.mass,stiffness:i,damping:a}}else{let n=dn({...e,velocity:0});t={...t,...n,mass:N.mass},t.isResolvedFromDuration=!0}return t}function gn(e=N.visualDuration,t=N.bounce){let n=typeof e==`object`?e:{visualDuration:e,keyframes:[0,1],bounce:t},{restSpeed:r,restDelta:i}=n,a=n.keyframes[0],o=n.keyframes[n.keyframes.length-1],s={done:!1,value:a},{stiffness:c,damping:l,mass:u,duration:d,velocity:f,isResolvedFromDuration:p}=hn({...n,velocity:-O(n.velocity||0)}),m=f||0,h=l/(2*Math.sqrt(c*u)),g=o-a,_=O(Math.sqrt(c/u)),v=Math.abs(g)<5;r||=v?N.restSpeed.granular:N.restSpeed.default,i||=v?N.restDelta.granular:N.restDelta.default;let y,b,x,S,C,w;if(h<1)x=sn(_,h),S=(m+h*_*g)/x,y=e=>o-Math.exp(-h*_*e)*(S*Math.sin(x*e)+g*Math.cos(x*e)),C=h*_*S+g*x,w=h*_*g-S*x,b=e=>Math.exp(-h*_*e)*(C*Math.sin(x*e)+w*Math.cos(x*e));else if(h===1){y=e=>o-Math.exp(-_*e)*(g+(m+_*g)*e);let e=m+_*g;b=t=>Math.exp(-_*t)*(_*e*t-m)}else{let e=_*Math.sqrt(h*h-1);y=t=>{let n=Math.exp(-h*_*t),r=Math.min(e*t,300);return o-n*((m+h*_*g)*Math.sinh(r)+e*g*Math.cosh(r))/e};let t=(m+h*_*g)/e,n=h*_*t-g*e,r=h*_*g-t*e;b=t=>{let i=Math.exp(-h*_*t),a=Math.min(e*t,300);return i*(n*Math.sinh(a)+r*Math.cosh(a))}}let ee={calculatedDuration:p&&d||null,velocity:e=>D(b(e)),next:e=>{if(!p&&h<1){let t=Math.exp(-h*_*e),n=Math.sin(x*e),a=Math.cos(x*e),c=o-t*(S*n+g*a),l=D(t*(C*n+w*a));return s.done=Math.abs(l)<=r&&Math.abs(o-c)<=i,s.value=s.done?o:c,s}let t=y(e);if(p)s.done=e>=d;else{let n=D(b(e));s.done=Math.abs(n)<=r&&Math.abs(o-t)<=i}return s.value=s.done?o:t,s},toString:()=>{let e=Math.min(an(ee),rn),t=nn(t=>ee.next(e*t).value,e,30);return e+`ms `+t},toTransition:()=>{}};return ee}gn.applyToOptions=e=>{let t=on(e,100,gn);return e.ease=t.ease,e.duration=D(t.duration),e.type=`keyframes`,e};var _n=5;function vn(e,t,n){let r=Math.max(t-_n,0);return k(n-e(r),t-r)}function yn({keyframes:e,velocity:t=0,power:n=.8,timeConstant:r=325,bounceDamping:i=10,bounceStiffness:a=500,modifyTarget:o,min:s,max:c,restDelta:l=.5,restSpeed:u}){let d=e[0],f={done:!1,value:d},p=e=>s!==void 0&&e<s||c!==void 0&&e>c,m=e=>s===void 0?c:c===void 0||Math.abs(s-e)<Math.abs(c-e)?s:c,h=n*t,g=d+h,_=o===void 0?g:o(g);_!==g&&(h=_-d);let v=e=>-h*Math.exp(-e/r),y=e=>_+v(e),b=e=>{let t=v(e),n=y(e);f.done=Math.abs(t)<=l,f.value=f.done?_:n},x,S,C=e=>{p(f.value)&&(x=e,S=gn({keyframes:[f.value,m(f.value)],velocity:vn(y,e,f.value),damping:i,stiffness:a,restDelta:l,restSpeed:u}))};return C(0),{calculatedDuration:null,next:e=>{let t=!1;return!S&&x===void 0&&(t=!0,b(e),C(e)),x!==void 0&&e>=x?S.next(e-x):(!t&&b(e),f)}}}function bn(e,t,n){let r=[],i=n||oe.mix||en,a=e.length-1;for(let n=0;n<a;n++){let a=i(e[n],e[n+1]);t&&(a=de(Array.isArray(t)?t[n]||T:t,a)),r.push(a)}return r}function xn(e,t,{clamp:n=!0,ease:r,mixer:i}={}){let a=e.length;if(t.length,a===1)return()=>t[0];if(a===2&&t[0]===t[1])return()=>t[1];let o=e[0]===e[1];e[0]>e[a-1]&&(e=[...e].reverse(),t=[...t].reverse());let s=bn(t,r,i),c=s.length,l=n=>{if(o&&n<e[0])return t[0];let r=0;if(c>1)for(;r<e.length-2&&!(n<e[r+1]);r++);let i=fe(e[r],e[r+1],n);return s[r](i)};return n?t=>l(ae(e[0],e[a-1],t)):l}function Sn(e,t){let n=e[e.length-1];for(let r=1;r<=t;r++){let i=fe(0,t,r);e.push(M(n,1,i))}}function Cn(e){let t=[0];return Sn(t,e.length-1),t}function wn(e,t){return e.map(e=>e*t)}function Tn(e,t){return e.map(()=>t||Ae).splice(0,e.length-1)}function En({duration:e=300,keyframes:t,times:n,ease:r=`easeInOut`}){let i=je(r)?r.map(Fe):Fe(r),a={done:!1,value:t[0]},o=xn(wn(n&&n.length===t.length?n:Cn(t),e),t,{ease:Array.isArray(i)?i:Tn(t,i)});return{calculatedDuration:e,next:t=>(a.value=o(t),a.done=t>=e,a)}}var Dn=e=>e!==null;function On(e,{repeat:t,repeatType:n=`loop`},r,i=1){let a=e.filter(Dn),o=i<0||t&&n!==`loop`&&t%2==1?0:a.length-1;return!o||r===void 0?a[o]:r}var kn={decay:yn,inertia:yn,tween:En,keyframes:En,spring:gn};function An(e){typeof e.type==`string`&&(e.type=kn[e.type])}var jn=class{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(e=>{this.resolve=e})}notifyFinished(){this.resolve()}then(e,t){return this.finished.then(e,t)}},Mn=e=>e/100,Nn=class extends jn{constructor(e){super(),this.state=`idle`,this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{let{motionValue:e}=this.options;e&&e.updatedAt!==Ke.now()&&this.tick(Ke.now()),this.isStopped=!0,this.state!==`idle`&&(this.teardown(),this.options.onStop?.())},qe.mainThread++,this.options=e,this.initAnimation(),this.play(),e.autoplay===!1&&this.pause()}initAnimation(){let{options:e}=this;An(e);let{type:t=En,repeat:n=0,repeatDelay:r=0,repeatType:i,velocity:a=0}=e,{keyframes:o}=e,s=t||En;s!==En&&typeof o[0]!=`number`&&(this.mixKeyframes=de(Mn,en(o[0],o[1])),o=[0,100]);let c=s({...e,keyframes:o});i===`mirror`&&(this.mirroredGenerator=s({...e,keyframes:[...o].reverse(),velocity:-a})),c.calculatedDuration===null&&(c.calculatedDuration=an(c));let{calculatedDuration:l}=c;this.calculatedDuration=l,this.resolvedDuration=l+r,this.totalDuration=this.resolvedDuration*(n+1)-r,this.generator=c}updateTime(e){let t=Math.round(e-this.startTime)*this.playbackSpeed;this.holdTime===null?this.currentTime=t:this.currentTime=this.holdTime}tick(e,t=!1){let{generator:n,totalDuration:r,mixKeyframes:i,mirroredGenerator:a,resolvedDuration:o,calculatedDuration:s}=this;if(this.startTime===null)return n.next(0);let{delay:c=0,keyframes:l,repeat:u,repeatType:d,repeatDelay:f,type:p,onUpdate:m,finalKeyframe:h}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-r/this.speed,this.startTime)),t?this.currentTime=e:this.updateTime(e);let g=this.currentTime-c*(this.playbackSpeed>=0?1:-1),_=this.playbackSpeed>=0?g<0:g>r;this.currentTime=Math.max(g,0),this.state===`finished`&&this.holdTime===null&&(this.currentTime=r);let v=this.currentTime,y=n;if(u){let e=Math.min(this.currentTime,r)/o,t=Math.floor(e),n=e%1;!n&&e>=1&&(n=1),n===1&&t--,t=Math.min(t,u+1),t%2&&(d===`reverse`?(n=1-n,f&&(n-=f/o)):d===`mirror`&&(y=a)),v=ae(0,1,n)*o}let b;_?(this.delayState.value=l[0],b=this.delayState):b=y.next(v),i&&!_&&(b.value=i(b.value));let{done:x}=b;!_&&s!==null&&(x=this.playbackSpeed>=0?this.currentTime>=r:this.currentTime<=0);let S=this.holdTime===null&&(this.state===`finished`||this.state===`running`&&x);return S&&p!==yn&&(b.value=On(l,this.options,h,this.speed)),m&&m(b.value),S&&this.finish(),b}then(e,t){return this.finished.then(e,t)}get duration(){return O(this.calculatedDuration)}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+O(e)}get time(){return O(this.currentTime)}set time(e){e=D(e),this.currentTime=e,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state=`paused`,this.holdTime=e,this.tick(e))}getGeneratorVelocity(){let e=this.currentTime;if(e<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(e);let t=this.generator.next(e).value;return vn(e=>this.generator.next(e).value,e,t)}get speed(){return this.playbackSpeed}set speed(e){let t=this.playbackSpeed!==e;t&&this.driver&&this.updateTime(Ke.now()),this.playbackSpeed=e,t&&this.driver&&(this.time=O(this.currentTime))}play(){if(this.isStopped)return;let{driver:e=tn,startTime:t}=this.options;this.driver||=e(e=>this.tick(e)),this.options.onPlay?.();let n=this.driver.now();this.state===`finished`?(this.updateFinished(),this.startTime=n):this.holdTime===null?this.startTime||=t??n:this.startTime=n-this.holdTime,this.state===`finished`&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state=`running`,this.driver.start()}pause(){this.state=`paused`,this.updateTime(Ke.now()),this.holdTime=this.currentTime}complete(){this.state!==`running`&&this.play(),this.state=`finished`,this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state=`finished`,this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state=`idle`,this.stopDriver(),this.startTime=this.holdTime=null,qe.mainThread--}stopDriver(){this.driver&&=(this.driver.stop(),void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}attachTimeline(e){return this.options.allowFlatten&&(this.options.type=`keyframes`,this.options.ease=`linear`,this.initAnimation()),this.driver?.stop(),e.observe(this)}};function Pn(e){for(let t=1;t<e.length;t++)e[t]??(e[t]=e[t-1])}var Fn=e=>e*180/Math.PI,In=e=>Rn(Fn(Math.atan2(e[1],e[0]))),Ln={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:e=>(Math.abs(e[0])+Math.abs(e[3]))/2,rotate:In,rotateZ:In,skewX:e=>Fn(Math.atan(e[1])),skewY:e=>Fn(Math.atan(e[2])),skew:e=>(Math.abs(e[1])+Math.abs(e[2]))/2},Rn=e=>(e%=360,e<0&&(e+=360),e),zn=In,Bn=e=>Math.sqrt(e[0]*e[0]+e[1]*e[1]),Vn=e=>Math.sqrt(e[4]*e[4]+e[5]*e[5]),Hn={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:Bn,scaleY:Vn,scale:e=>(Bn(e)+Vn(e))/2,rotateX:e=>Rn(Fn(Math.atan2(e[6],e[5]))),rotateY:e=>Rn(Fn(Math.atan2(-e[2],e[0]))),rotateZ:zn,rotate:zn,skewX:e=>Fn(Math.atan(e[4])),skewY:e=>Fn(Math.atan(e[1])),skew:e=>(Math.abs(e[1])+Math.abs(e[4]))/2};function Un(e){return e.includes(`scale`)?1:0}function Wn(e,t){if(!e||e===`none`)return Un(t);let n=e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u),r,i;if(n)r=Hn,i=n;else{let t=e.match(/^matrix\(([-\d.e\s,]+)\)$/u);r=Ln,i=t}if(!i)return Un(t);let a=r[t],o=i[1].split(`,`).map(Kn);return typeof a==`function`?a(o):o[a]}var Gn=(e,t)=>{let{transform:n=`none`}=getComputedStyle(e);return Wn(n,t)};function Kn(e){return parseFloat(e.trim())}var qn=[`transformPerspective`,`x`,`y`,`z`,`translateX`,`translateY`,`translateZ`,`scale`,`scaleX`,`scaleY`,`rotate`,`rotateX`,`rotateY`,`rotateZ`,`skew`,`skewX`,`skewY`],Jn=new Set(qn),Yn=e=>e===et||e===j,Xn=new Set([`x`,`y`,`z`]),Zn=qn.filter(e=>!Xn.has(e));function Qn(e){let t=[];return Zn.forEach(n=>{let r=e.getValue(n);r!==void 0&&(t.push([n,r.get()]),r.set(n.startsWith(`scale`)?1:0))}),t}var $n={width:({x:e},{paddingLeft:t=`0`,paddingRight:n=`0`,boxSizing:r})=>{let i=e.max-e.min;return r===`border-box`?i:i-parseFloat(t)-parseFloat(n)},height:({y:e},{paddingTop:t=`0`,paddingBottom:n=`0`,boxSizing:r})=>{let i=e.max-e.min;return r===`border-box`?i:i-parseFloat(t)-parseFloat(n)},top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:(e,{transform:t})=>Wn(t,`x`),y:(e,{transform:t})=>Wn(t,`y`)};$n.translateX=$n.x,$n.translateY=$n.y;var er=new Set,tr=!1,nr=!1,rr=!1;function ir(){if(nr){let e=Array.from(er).filter(e=>e.needsMeasurement),t=new Set(e.map(e=>e.element)),n=new Map;t.forEach(e=>{let t=Qn(e);t.length&&(n.set(e,t),e.render())}),e.forEach(e=>e.measureInitialState()),t.forEach(e=>{e.render();let t=n.get(e);t&&t.forEach(([t,n])=>{e.getValue(t)?.set(n)})}),e.forEach(e=>e.measureEndState()),e.forEach(e=>{e.suspendedScrollY!==void 0&&window.scrollTo(0,e.suspendedScrollY)})}nr=!1,tr=!1,er.forEach(e=>e.complete(rr)),er.clear()}function ar(){er.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(nr=!0)})}function or(){rr=!0,ar(),ir(),rr=!1}var sr=class{constructor(e,t,n,r,i,a=!1){this.state=`pending`,this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...e],this.onComplete=t,this.name=n,this.motionValue=r,this.element=i,this.isAsync=a}scheduleResolve(){this.state=`scheduled`,this.isAsync?(er.add(this),tr||(tr=!0,A.read(ar),A.resolveKeyframes(ir))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:e,name:t,element:n,motionValue:r}=this;if(e[0]===null){let i=r?.get(),a=e[e.length-1];if(i!==void 0)e[0]=i;else if(n&&t){let r=n.readValue(t,a);r!=null&&(e[0]=r)}e[0]===void 0&&(e[0]=a),r&&i===void 0&&r.set(e[0])}Pn(e)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(e=!1){this.state=`complete`,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,e),er.delete(this)}cancel(){this.state===`scheduled`&&(er.delete(this),this.state=`pending`)}resume(){this.state===`pending`&&this.scheduleResolve()}},cr=e=>e.startsWith(`--`);function lr(e,t,n){cr(t)?e.style.setProperty(t,n):e.style[t]=n}var ur={};function dr(e,t){let n=ue(e);return()=>ur[t]??n()}var fr=dr(()=>window.ScrollTimeline!==void 0,`scrollTimeline`),pr=dr(()=>{try{document.createElement(`div`).animate({opacity:0},{easing:`linear(0, 1)`})}catch{return!1}return!0},`linearEasing`),mr=([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`,hr={linear:`linear`,ease:`ease`,easeIn:`ease-in`,easeOut:`ease-out`,easeInOut:`ease-in-out`,circIn:mr([0,.65,.55,1]),circOut:mr([.55,0,1,.45]),backIn:mr([.31,.01,.66,-.59]),backOut:mr([.33,1.53,.69,.99])};function gr(e,t){if(e)return typeof e==`function`?pr()?nn(e,t):`ease-out`:Me(e)?mr(e):Array.isArray(e)?e.map(e=>gr(e,t)||hr.easeOut):hr[e]}function _r(e,t,n,{delay:r=0,duration:i=300,repeat:a=0,repeatType:o=`loop`,ease:s=`easeOut`,times:c}={},l=void 0){let u={[t]:n};c&&(u.offset=c);let d=gr(s,i);Array.isArray(d)&&(u.easing=d),Le.value&&qe.waapi++;let f={delay:r,duration:i,easing:Array.isArray(d)?`linear`:d,fill:`both`,iterations:a+1,direction:o===`reverse`?`alternate`:`normal`};l&&(f.pseudoElement=l);let p=e.animate(u,f);return Le.value&&p.finished.finally(()=>{qe.waapi--}),p}function vr(e){return typeof e==`function`&&`applyToOptions`in e}function yr({type:e,...t}){return vr(e)&&pr()?e.applyToOptions(t):(t.duration??=300,t.ease??=`easeOut`,t)}var br=class extends jn{constructor(e){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!e)return;let{element:t,name:n,keyframes:r,pseudoElement:i,allowFlatten:a=!1,finalKeyframe:o,onComplete:s}=e;this.isPseudoElement=!!i,this.allowFlatten=a,this.options=e,e.type;let c=yr(e);this.animation=_r(t,n,r,c,i),c.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!i){let e=On(r,this.options,o,this.speed);this.updateMotionValue&&this.updateMotionValue(e),lr(t,n,e),this.animation.cancel()}s?.(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state===`finished`&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;let{state:e}=this;e===`idle`||e===`finished`||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){let e=this.options?.element;!this.isPseudoElement&&e?.isConnected&&this.animation.commitStyles?.()}get duration(){let e=this.animation.effect?.getComputedTiming?.().duration||0;return O(Number(e))}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+O(e)}get time(){return O(Number(this.animation.currentTime)||0)}set time(e){let t=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=D(e),t&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(e){e<0&&(this.finishedTime=null),this.animation.playbackRate=e}get state(){return this.finishedTime===null?this.animation.playState:`finished`}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(e){this.manualStartTime=this.animation.startTime=e}attachTimeline({timeline:e,rangeStart:t,rangeEnd:n,observe:r}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:`linear`}),this.animation.onfinish=null,e&&fr()?(this.animation.timeline=e,t&&(this.animation.rangeStart=t),n&&(this.animation.rangeEnd=n),T):r(this)}},xr={anticipate:we,backInOut:Ce,circInOut:De};function Sr(e){return e in xr}function Cr(e){typeof e.ease==`string`&&Sr(e.ease)&&(e.ease=xr[e.ease])}var wr=10,Tr=class extends br{constructor(e){Cr(e),An(e),super(e),e.startTime!==void 0&&e.autoplay!==!1&&(this.startTime=e.startTime),this.options=e}updateMotionValue(e){let{motionValue:t,onUpdate:n,onComplete:r,element:i,...a}=this.options;if(!t)return;if(e!==void 0){t.set(e);return}let o=new Nn({...a,autoplay:!1}),s=Math.max(wr,Ke.now()-this.startTime),c=ae(0,wr,s-wr),l=o.sample(s).value,{name:u}=this.options;i&&u&&lr(i,u,l),t.setWithVelocity(o.sample(Math.max(0,s-c)).value,l,c),o.stop()}},Er=(e,t)=>t===`zIndex`?!1:!!(typeof e==`number`||Array.isArray(e)||typeof e==`string`&&(Lt.test(e)||e===`0`)&&!e.startsWith(`url(`));function Dr(e){let t=e[0];if(e.length===1)return!0;for(let n=0;n<e.length;n++)if(e[n]!==t)return!0}function Or(e,t,n,r){let i=e[0];if(i===null)return!1;if(t===`display`||t===`visibility`)return!0;let a=e[e.length-1],o=Er(i,t),s=Er(a,t);return`${t}${i}${a}${o?a:i}`,!o||!s?!1:Dr(e)||(n===`spring`||vr(n))&&r}function kr(e){e.duration=0,e.type=`keyframes`}var Ar=new Set([`opacity`,`clipPath`,`filter`,`transform`]),jr=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function Mr(e){for(let t=0;t<e.length;t++)if(typeof e[t]==`string`&&jr.test(e[t]))return!0;return!1}var Nr=new Set([`color`,`backgroundColor`,`outlineColor`,`fill`,`stroke`,`borderColor`,`borderTopColor`,`borderRightColor`,`borderBottomColor`,`borderLeftColor`]),Pr=ue(()=>Object.hasOwnProperty.call(Element.prototype,`animate`));function Fr(e){let{motionValue:t,name:n,repeatDelay:r,repeatType:i,damping:a,type:o,keyframes:s}=e;if(!(t?.owner?.current instanceof HTMLElement))return!1;let{onUpdate:c,transformTemplate:l}=t.owner.getProps();return Pr()&&n&&(Ar.has(n)||Nr.has(n)&&Mr(s))&&(n!==`transform`||!l)&&!c&&!r&&i!==`mirror`&&a!==0&&o!==`inertia`}var Ir=40,Lr=class extends jn{constructor({autoplay:e=!0,delay:t=0,type:n=`keyframes`,repeat:r=0,repeatDelay:i=0,repeatType:a=`loop`,keyframes:o,name:s,motionValue:c,element:l,...u}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=Ke.now();let d={autoplay:e,delay:t,type:n,repeat:r,repeatDelay:i,repeatType:a,name:s,motionValue:c,element:l,...u};this.keyframeResolver=new(l?.KeyframeResolver||sr)(o,(e,t,n)=>this.onKeyframesResolved(e,t,d,!n),s,c,l),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(e,t,n,r){this.keyframeResolver=void 0;let{name:i,type:a,velocity:o,delay:s,isHandoff:c,onUpdate:l}=n;this.resolvedAt=Ke.now();let u=!0;Or(e,i,a,o)||(u=!1,(oe.instantAnimations||!s)&&l?.(On(e,n,t)),e[0]=e[e.length-1],kr(n),n.repeat=0);let d={startTime:r?this.resolvedAt&&this.resolvedAt-this.createdAt>Ir?this.resolvedAt:this.createdAt:void 0,finalKeyframe:t,...n,keyframes:e},f=u&&!c&&Fr(d),p=d.motionValue?.owner?.current,m;if(f)try{m=new Tr({...d,element:p})}catch{m=new Nn(d)}else m=new Nn(d);m.finished.then(()=>{this.notifyFinished()}).catch(T),this.pendingTimeline&&=(this.stopTimeline=m.attachTimeline(this.pendingTimeline),void 0),this._animation=m}get finished(){return this._animation?this.animation.finished:this._finished}then(e,t){return this.finished.finally(e).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),or()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(e){this.animation.time=e}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(e){this.animation.speed=e}get startTime(){return this.animation.startTime}attachTimeline(e){return this._animation?this.stopTimeline=this.animation.attachTimeline(e):this.pendingTimeline=e,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}};function Rr(e,t,n,r=0,i=1){let a=Array.from(e).sort((e,t)=>e.sortNodePosition(t)).indexOf(t),o=e.size,s=(o-1)*r;return typeof n==`function`?n(a,o):i===1?a*r:s-a*r}var zr=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function Br(e){let t=zr.exec(e);if(!t)return[,];let[,n,r,i]=t;return[`--${n??r}`,i]}function Vr(e,t,n=1){`${e}`;let[r,i]=Br(e);if(!r)return;let a=window.getComputedStyle(t).getPropertyValue(r);if(a){let e=a.trim();return se(e)?parseFloat(e):e}return Ze(i)?Vr(i,t,n+1):i}var Hr={type:`spring`,stiffness:500,damping:25,restSpeed:10},Ur=e=>({type:`spring`,stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),Wr={type:`keyframes`,duration:.8},Gr={type:`keyframes`,ease:[.25,.1,.35,1],duration:.3},Kr=(e,{keyframes:t})=>t.length>2?Wr:Jn.has(e)?e.startsWith(`scale`)?Ur(t[1]):Hr:Gr;function qr(e,t){if(e?.inherit&&t){let{inherit:n,...r}=e;return{...t,...r}}return e}function Jr(e,t){let n=e?.[t]??e?.default??e;return n===e?n:qr(n,e)}var Yr=new Set([`when`,`delay`,`delayChildren`,`staggerChildren`,`staggerDirection`,`repeat`,`repeatType`,`repeatDelay`,`from`,`elapsed`]);function Xr(e){for(let t in e)if(!Yr.has(t))return!0;return!1}var Zr=(e,t,n,r={},i,a)=>o=>{let s=Jr(r,e)||{},c=s.delay||r.delay||0,{elapsed:l=0}=r;l-=D(c);let u={keyframes:Array.isArray(n)?n:[null,n],ease:`easeOut`,velocity:t.getVelocity(),...s,delay:-l,onUpdate:e=>{t.set(e),s.onUpdate&&s.onUpdate(e)},onComplete:()=>{o(),s.onComplete&&s.onComplete()},name:e,motionValue:t,element:a?void 0:i};Xr(s)||Object.assign(u,Kr(e,u)),u.duration&&=D(u.duration),u.repeatDelay&&=D(u.repeatDelay),u.from!==void 0&&(u.keyframes[0]=u.from);let d=!1;if((u.type===!1||u.duration===0&&!u.repeatDelay)&&(kr(u),u.delay===0&&(d=!0)),(oe.instantAnimations||oe.skipAnimations||i?.shouldSkipAnimations)&&(d=!0,kr(u),u.delay=0),u.allowFlatten=!s.type&&!s.ease,d&&!a&&t.get()!==void 0){let e=On(u.keyframes,s);if(e!==void 0){A.update(()=>{u.onUpdate(e),u.onComplete()});return}}return s.isSync?new Nn(u):new Lr(u)};function Qr(e){let t=[{},{}];return e?.values.forEach((e,n)=>{t[0][n]=e.get(),t[1][n]=e.getVelocity()}),t}function $r(e,t,n,r){if(typeof t==`function`){let[i,a]=Qr(r);t=t(n===void 0?e.custom:n,i,a)}if(typeof t==`string`&&(t=e.variants&&e.variants[t]),typeof t==`function`){let[i,a]=Qr(r);t=t(n===void 0?e.custom:n,i,a)}return t}function ei(e,t,n){let r=e.getProps();return $r(r,t,n===void 0?r.custom:n,e)}var ti=new Set([`width`,`height`,`top`,`left`,`right`,`bottom`,...qn]),ni=30,ri=e=>!isNaN(parseFloat(e)),ii={current:void 0},ai=class{constructor(e,t={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=e=>{let t=Ke.now();if(this.updatedAt!==t&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(e),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(let e of this.dependents)e.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=t.owner}setCurrent(e){this.current=e,this.updatedAt=Ke.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=ri(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on(`change`,e)}on(e,t){this.events[e]||(this.events[e]=new pe);let n=this.events[e].add(t);return e===`change`?()=>{n(),A.read(()=>{this.events.change.getSize()||this.stop()})}:n}clearListeners(){for(let e in this.events)this.events[e].clear()}attach(e,t){this.passiveEffect=e,this.stopPassiveEffect=t}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,t,n){this.set(t),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-n}jump(e,t=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,t&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(e){this.dependents||=new Set,this.dependents.add(e)}removeDependent(e){this.dependents&&this.dependents.delete(e)}get(){return ii.current&&ii.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let e=Ke.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>ni)return 0;let t=Math.min(this.updatedAt-this.prevUpdatedAt,ni);return k(parseFloat(this.current)-parseFloat(this.prevFrameValue),t)}start(e){return this.stop(),new Promise(t=>{this.hasAnimated=!0,this.animation=e(t),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}};function oi(e,t){return new ai(e,t)}var si=e=>Array.isArray(e);function ci(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,oi(n))}function li(e){return si(e)?e[e.length-1]||0:e}function ui(e,t){let{transitionEnd:n={},transition:r={},...i}=ei(e,t)||{};i={...i,...n};for(let t in i)ci(e,t,li(i[t]))}var di=e=>!!(e&&e.getVelocity);function fi(e){return!!(di(e)&&e.add)}function pi(e,t){let n=e.getValue(`willChange`);if(fi(n))return n.add(t);if(!n&&oe.WillChange){let n=new oe.WillChange(`auto`);e.addValue(`willChange`,n),n.add(t)}}function mi(e){return e.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`)}var hi=`data-`+mi(`framerAppearId`);function gi(e){return e.props[hi]}function _i({protectedKeys:e,needsAnimating:t},n){let r=e.hasOwnProperty(n)&&t[n]!==!0;return t[n]=!1,r}function vi(e,t,{delay:n=0,transitionOverride:r,type:i}={}){let{transition:a,transitionEnd:o,...s}=t,c=e.getDefaultTransition();a=a?qr(a,c):c;let l=a?.reduceMotion;r&&(a=r);let u=[],d=i&&e.animationState&&e.animationState.getState()[i];for(let t in s){let r=e.getValue(t,e.latestValues[t]??null),i=s[t];if(i===void 0||d&&_i(d,t))continue;let o={delay:n,...Jr(a||{},t)},c=r.get();if(c!==void 0&&!r.isAnimating()&&!Array.isArray(i)&&i===c&&!o.velocity){A.update(()=>r.set(i));continue}let f=!1;if(window.MotionHandoffAnimation){let n=gi(e);if(n){let e=window.MotionHandoffAnimation(n,t,A);e!==null&&(o.startTime=e,f=!0)}}pi(e,t);let p=l??e.shouldReduceMotion;r.start(Zr(t,r,i,p&&ti.has(t)?{type:!1}:o,e,f));let m=r.animation;m&&u.push(m)}if(o){let t=()=>A.update(()=>{o&&ui(e,o)});u.length?Promise.all(u).then(t):t()}return u}function yi(e,t,n={}){let r=ei(e,t,n.type===`exit`?e.presenceContext?.custom:void 0),{transition:i=e.getDefaultTransition()||{}}=r||{};n.transitionOverride&&(i=n.transitionOverride);let a=r?()=>Promise.all(vi(e,r,n)):()=>Promise.resolve(),o=e.variantChildren&&e.variantChildren.size?(r=0)=>{let{delayChildren:a=0,staggerChildren:o,staggerDirection:s}=i;return bi(e,t,r,a,o,s,n)}:()=>Promise.resolve(),{when:s}=i;if(s){let[e,t]=s===`beforeChildren`?[a,o]:[o,a];return e().then(()=>t())}else return Promise.all([a(),o(n.delay)])}function bi(e,t,n=0,r=0,i=0,a=1,o){let s=[];for(let c of e.variantChildren)c.notify(`AnimationStart`,t),s.push(yi(c,t,{...o,delay:n+(typeof r==`function`?0:r)+Rr(e.variantChildren,c,r,i,a)}).then(()=>c.notify(`AnimationComplete`,t)));return Promise.all(s)}function xi(e,t,n={}){e.notify(`AnimationStart`,t);let r;if(Array.isArray(t)){let i=t.map(t=>yi(e,t,n));r=Promise.all(i)}else if(typeof t==`string`)r=yi(e,t,n);else{let i=typeof t==`function`?ei(e,t,n.custom):t;r=Promise.all(vi(e,i,n))}return r.then(()=>{e.notify(`AnimationComplete`,t)})}var Si={test:e=>e===`auto`,parse:e=>e},Ci=e=>t=>t.test(e),wi=[et,j,gt,ht,vt,_t,Si],Ti=e=>wi.find(Ci(e));function Ei(e){return typeof e==`number`?e===0:e===null?!0:e===`none`||e===`0`||le(e)}var Di=new Set([`brightness`,`contrast`,`saturate`,`opacity`]);function Oi(e){let[t,n]=e.slice(0,-1).split(`(`);if(t===`drop-shadow`)return e;let[r]=n.match(it)||[];if(!r)return e;let i=n.replace(r,``),a=Di.has(t)?1:0;return r!==n&&(a*=100),t+`(`+a+i+`)`}var ki=/\b([a-z-]*)\(.*?\)/gu,Ai={...Lt,getAnimatableNone:e=>{let t=e.match(ki);return t?t.map(Oi).join(` `):e}},ji={...Lt,getAnimatableNone:e=>{let t=Lt.parse(e);return Lt.createTransformer(e)(t.map(e=>typeof e==`number`?0:typeof e==`object`?{...e,alpha:1}:e))}},Mi={...et,transform:Math.round},Ni={borderWidth:j,borderTopWidth:j,borderRightWidth:j,borderBottomWidth:j,borderLeftWidth:j,borderRadius:j,borderTopLeftRadius:j,borderTopRightRadius:j,borderBottomRightRadius:j,borderBottomLeftRadius:j,width:j,maxWidth:j,height:j,maxHeight:j,top:j,right:j,bottom:j,left:j,inset:j,insetBlock:j,insetBlockStart:j,insetBlockEnd:j,insetInline:j,insetInlineStart:j,insetInlineEnd:j,padding:j,paddingTop:j,paddingRight:j,paddingBottom:j,paddingLeft:j,paddingBlock:j,paddingBlockStart:j,paddingBlockEnd:j,paddingInline:j,paddingInlineStart:j,paddingInlineEnd:j,margin:j,marginTop:j,marginRight:j,marginBottom:j,marginLeft:j,marginBlock:j,marginBlockStart:j,marginBlockEnd:j,marginInline:j,marginInlineStart:j,marginInlineEnd:j,fontSize:j,backgroundPositionX:j,backgroundPositionY:j,rotate:ht,rotateX:ht,rotateY:ht,rotateZ:ht,scale:nt,scaleX:nt,scaleY:nt,scaleZ:nt,skew:ht,skewX:ht,skewY:ht,distance:j,translateX:j,translateY:j,translateZ:j,x:j,y:j,z:j,perspective:j,transformPerspective:j,opacity:tt,originX:yt,originY:yt,originZ:j,zIndex:Mi,fillOpacity:tt,strokeOpacity:tt,numOctaves:Mi},Pi={...Ni,color:xt,backgroundColor:xt,outlineColor:xt,fill:xt,stroke:xt,borderColor:xt,borderTopColor:xt,borderRightColor:xt,borderBottomColor:xt,borderLeftColor:xt,filter:Ai,WebkitFilter:Ai,mask:ji,WebkitMask:ji},Fi=e=>Pi[e],Ii=new Set([Ai,ji]);function Li(e,t){let n=Fi(e);return Ii.has(n)||(n=Lt),n.getAnimatableNone?n.getAnimatableNone(t):void 0}var Ri=new Set([`auto`,`none`,`0`]);function P(e,t,n){let r=0,i;for(;r<e.length&&!i;){let t=e[r];typeof t==`string`&&!Ri.has(t)&&At(t).values.length&&(i=e[r]),r++}if(i&&n)for(let r of t)e[r]=Li(n,i)}var F=class extends sr{constructor(e,t,n,r,i){super(e,t,n,r,i,!0)}readKeyframes(){let{unresolvedKeyframes:e,element:t,name:n}=this;if(!t||!t.current)return;super.readKeyframes();for(let n=0;n<e.length;n++){let r=e[n];if(typeof r==`string`&&(r=r.trim(),Ze(r))){let i=Vr(r,t.current);i!==void 0&&(e[n]=i),n===e.length-1&&(this.finalKeyframe=r)}}if(this.resolveNoneKeyframes(),!ti.has(n)||e.length!==2)return;let[r,i]=e,a=Ti(r),o=Ti(i);if($e(r)!==$e(i)&&$n[n]){this.needsMeasurement=!0;return}if(a!==o)if(Yn(a)&&Yn(o))for(let t=0;t<e.length;t++){let n=e[t];typeof n==`string`&&(e[t]=parseFloat(n))}else $n[n]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){let{unresolvedKeyframes:e,name:t}=this,n=[];for(let t=0;t<e.length;t++)(e[t]===null||Ei(e[t]))&&n.push(t);n.length&&P(e,n,t)}measureInitialState(){let{element:e,unresolvedKeyframes:t,name:n}=this;if(!e||!e.current)return;n===`height`&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=$n[n](e.measureViewportBox(),window.getComputedStyle(e.current)),t[0]=this.measuredOrigin;let r=t[t.length-1];r!==void 0&&e.getValue(n,r).jump(r,!1)}measureEndState(){let{element:e,name:t,unresolvedKeyframes:n}=this;if(!e||!e.current)return;let r=e.getValue(t);r&&r.jump(this.measuredOrigin,!1);let i=n.length-1,a=n[i];n[i]=$n[t](e.measureViewportBox(),window.getComputedStyle(e.current)),a!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=a),this.removedTransforms?.length&&this.removedTransforms.forEach(([t,n])=>{e.getValue(t).set(n)}),this.resolveNoneKeyframes()}};function zi(e,t,n){if(e==null)return[];if(e instanceof EventTarget)return[e];if(typeof e==`string`){let r=document;t&&(r=t.current);let i=n?.[e]??r.querySelectorAll(e);return i?Array.from(i):[]}return Array.from(e).filter(e=>e!=null)}var Bi=(e,t)=>t&&typeof e==`number`?t.transform(e):e;function Vi(e){return ce(e)&&`offsetHeight`in e&&!(`ownerSVGElement`in e)}var{schedule:Hi,cancel:Ui}=Be(queueMicrotask,!1),Wi={x:!1,y:!1};function Gi(){return Wi.x||Wi.y}function Ki(e){return e===`x`||e===`y`?Wi[e]?null:(Wi[e]=!0,()=>{Wi[e]=!1}):Wi.x||Wi.y?null:(Wi.x=Wi.y=!0,()=>{Wi.x=Wi.y=!1})}function qi(e,t){let n=zi(e),r=new AbortController;return[n,{passive:!0,...t,signal:r.signal},()=>r.abort()]}function Ji(e){return!(e.pointerType===`touch`||Gi())}function Yi(e,t,n={}){let[r,i,a]=qi(e,n);return r.forEach(e=>{let n=!1,r=!1,a,o=()=>{e.removeEventListener(`pointerleave`,u)},s=e=>{a&&=(a(e),void 0),o()},c=e=>{n=!1,window.removeEventListener(`pointerup`,c),window.removeEventListener(`pointercancel`,c),r&&(r=!1,s(e))},l=()=>{n=!0,window.addEventListener(`pointerup`,c,i),window.addEventListener(`pointercancel`,c,i)},u=e=>{if(e.pointerType!==`touch`){if(n){r=!0;return}s(e)}};e.addEventListener(`pointerenter`,n=>{if(!Ji(n))return;r=!1;let o=t(e,n);typeof o==`function`&&(a=o,e.addEventListener(`pointerleave`,u,i))},i),e.addEventListener(`pointerdown`,l,i)}),a}var Xi=(e,t)=>t?e===t?!0:Xi(e,t.parentElement):!1,Zi=e=>e.pointerType===`mouse`?typeof e.button!=`number`||e.button<=0:e.isPrimary!==!1,Qi=new Set([`BUTTON`,`INPUT`,`SELECT`,`TEXTAREA`,`A`]);function $i(e){return Qi.has(e.tagName)||e.isContentEditable===!0}var ea=new Set([`INPUT`,`SELECT`,`TEXTAREA`]);function ta(e){return ea.has(e.tagName)||e.isContentEditable===!0}var na=new WeakSet;function ra(e){return t=>{t.key===`Enter`&&e(t)}}function ia(e,t){e.dispatchEvent(new PointerEvent(`pointer`+t,{isPrimary:!0,bubbles:!0}))}var aa=(e,t)=>{let n=e.currentTarget;if(!n)return;let r=ra(()=>{if(na.has(n))return;ia(n,`down`);let e=ra(()=>{ia(n,`up`)});n.addEventListener(`keyup`,e,t),n.addEventListener(`blur`,()=>ia(n,`cancel`),t)});n.addEventListener(`keydown`,r,t),n.addEventListener(`blur`,()=>n.removeEventListener(`keydown`,r),t)};function oa(e){return Zi(e)&&!Gi()}var sa=new WeakSet;function ca(e,t,n={}){let[r,i,a]=qi(e,n),o=e=>{let r=e.currentTarget;if(!oa(e)||sa.has(e))return;na.add(r),n.stopPropagation&&sa.add(e);let a=t(r,e),o=(e,t)=>{window.removeEventListener(`pointerup`,s),window.removeEventListener(`pointercancel`,c),na.has(r)&&na.delete(r),oa(e)&&typeof a==`function`&&a(e,{success:t})},s=e=>{o(e,r===window||r===document||n.useGlobalTarget||Xi(r,e.target))},c=e=>{o(e,!1)};window.addEventListener(`pointerup`,s,i),window.addEventListener(`pointercancel`,c,i)};return r.forEach(e=>{(n.useGlobalTarget?window:e).addEventListener(`pointerdown`,o,i),Vi(e)&&(e.addEventListener(`focus`,e=>aa(e,i)),!$i(e)&&!e.hasAttribute(`tabindex`)&&(e.tabIndex=0))}),a}function la(e){return ce(e)&&`ownerSVGElement`in e}var ua=new WeakMap,I,da=(e,t,n)=>(r,i)=>i&&i[0]?i[0][e+`Size`]:la(r)&&`getBBox`in r?r.getBBox()[t]:r[n],fa=da(`inline`,`width`,`offsetWidth`),pa=da(`block`,`height`,`offsetHeight`);function ma({target:e,borderBoxSize:t}){ua.get(e)?.forEach(n=>{n(e,{get width(){return fa(e,t)},get height(){return pa(e,t)}})})}function ha(e){e.forEach(ma)}function ga(){typeof ResizeObserver>`u`||(I=new ResizeObserver(ha))}function _a(e,t){I||ga();let n=zi(e);return n.forEach(e=>{let n=ua.get(e);n||(n=new Set,ua.set(e,n)),n.add(t),I?.observe(e)}),()=>{n.forEach(e=>{let n=ua.get(e);n?.delete(t),n?.size||I?.unobserve(e)})}}var va=new Set,ya;function ba(){ya=()=>{let e={get width(){return window.innerWidth},get height(){return window.innerHeight}};va.forEach(t=>t(e))},window.addEventListener(`resize`,ya)}function xa(e){return va.add(e),ya||ba(),()=>{va.delete(e),!va.size&&typeof ya==`function`&&(window.removeEventListener(`resize`,ya),ya=void 0)}}function Sa(e,t){return typeof e==`function`?xa(e):_a(e,t)}function Ca(e){return la(e)&&e.tagName===`svg`}var wa=[...wi,xt,Lt],Ta=e=>wa.find(Ci(e)),Ea=()=>({translate:0,scale:1,origin:0,originPoint:0}),Da=()=>({x:Ea(),y:Ea()}),Oa=()=>({min:0,max:0}),ka=()=>({x:Oa(),y:Oa()}),Aa=new WeakMap;function ja(e){return typeof e==`object`&&!!e&&typeof e.start==`function`}function Ma(e){return typeof e==`string`||Array.isArray(e)}var Na=[`animate`,`whileInView`,`whileFocus`,`whileHover`,`whileTap`,`whileDrag`,`exit`],Pa=[`initial`,...Na];function Fa(e){return ja(e.animate)||Pa.some(t=>Ma(e[t]))}function Ia(e){return!!(Fa(e)||e.variants)}function La(e,t,n){for(let r in t){let i=t[r],a=n[r];if(di(i))e.addValue(r,i);else if(di(a))e.addValue(r,oi(i,{owner:e}));else if(a!==i)if(e.hasValue(r)){let t=e.getValue(r);t.liveStyle===!0?t.jump(i):t.hasAnimated||t.set(i)}else{let t=e.getStaticValue(r);e.addValue(r,oi(t===void 0?i:t,{owner:e}))}}for(let r in n)t[r]===void 0&&e.removeValue(r);return t}var Ra={current:null},za={current:!1},Ba=typeof window<`u`;function Va(){if(za.current=!0,Ba)if(window.matchMedia){let e=window.matchMedia(`(prefers-reduced-motion)`),t=()=>Ra.current=e.matches;e.addEventListener(`change`,t),t()}else Ra.current=!1}var Ha=[`AnimationStart`,`AnimationComplete`,`Update`,`BeforeLayoutMeasure`,`LayoutMeasure`,`LayoutAnimationStart`,`LayoutAnimationComplete`],Ua={};function Wa(e){Ua=e}function Ga(){return Ua}var Ka=class{scrapeMotionValuesFromProps(e,t,n){return{}}constructor({parent:e,props:t,presenceContext:n,reducedMotionConfig:r,skipAnimations:i,blockInitialAnimation:a,visualState:o},s={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=sr,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify(`Update`,this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let e=Ke.now();this.renderScheduledAt<e&&(this.renderScheduledAt=e,A.render(this.render,!1,!0))};let{latestValues:c,renderState:l}=o;this.latestValues=c,this.baseTarget={...c},this.initialValues=t.initial?{...c}:{},this.renderState=l,this.parent=e,this.props=t,this.presenceContext=n,this.depth=e?e.depth+1:0,this.reducedMotionConfig=r,this.skipAnimationsConfig=i,this.options=s,this.blockInitialAnimation=!!a,this.isControllingVariants=Fa(t),this.isVariantNode=Ia(t),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);let{willChange:u,...d}=this.scrapeMotionValuesFromProps(t,{},this);for(let e in d){let t=d[e];c[e]!==void 0&&di(t)&&t.set(c[e])}}mount(e){if(this.hasBeenMounted)for(let e in this.initialValues)this.values.get(e)?.jump(this.initialValues[e]),this.latestValues[e]=this.initialValues[e];this.current=e,Aa.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((e,t)=>this.bindToMotionValue(t,e)),this.reducedMotionConfig===`never`?this.shouldReduceMotion=!1:this.reducedMotionConfig===`always`?this.shouldReduceMotion=!0:(za.current||Va(),this.shouldReduceMotion=Ra.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,this.parent?.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){this.projection&&this.projection.unmount(),Ve(this.notifyUpdate),Ve(this.render),this.valueSubscriptions.forEach(e=>e()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent?.removeChild(this);for(let e in this.events)this.events[e].clear();for(let e in this.features){let t=this.features[e];t&&(t.unmount(),t.isMounted=!1)}this.current=null}addChild(e){this.children.add(e),this.enteringChildren??=new Set,this.enteringChildren.add(e)}removeChild(e){this.children.delete(e),this.enteringChildren&&this.enteringChildren.delete(e)}bindToMotionValue(e,t){if(this.valueSubscriptions.has(e)&&this.valueSubscriptions.get(e)(),t.accelerate&&Ar.has(e)&&this.current instanceof HTMLElement){let{factory:n,keyframes:r,times:i,ease:a,duration:o}=t.accelerate,s=new br({element:this.current,name:e,keyframes:r,times:i,ease:a,duration:D(o)}),c=n(s);this.valueSubscriptions.set(e,()=>{c(),s.cancel()});return}let n=Jn.has(e);n&&this.onBindTransform&&this.onBindTransform();let r=t.on(`change`,t=>{this.latestValues[e]=t,this.props.onUpdate&&A.preRender(this.notifyUpdate),n&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()}),i;typeof window<`u`&&window.MotionCheckAppearSync&&(i=window.MotionCheckAppearSync(this,e,t)),this.valueSubscriptions.set(e,()=>{r(),i&&i(),t.owner&&t.stop()})}sortNodePosition(e){return!this.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}updateFeatures(){let e=`animation`;for(e in Ua){let t=Ua[e];if(!t)continue;let{isEnabled:n,Feature:r}=t;if(!this.features[e]&&r&&n(this.props)&&(this.features[e]=new r(this)),this.features[e]){let t=this.features[e];t.isMounted?t.update():(t.mount(),t.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):ka()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,t){this.latestValues[e]=t}update(e,t){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=t;for(let t=0;t<Ha.length;t++){let n=Ha[t];this.propEventSubscriptions[n]&&(this.propEventSubscriptions[n](),delete this.propEventSubscriptions[n]);let r=e[`on`+n];r&&(this.propEventSubscriptions[n]=this.on(n,r))}this.prevMotionValues=La(this,this.scrapeMotionValuesFromProps(e,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(e){let t=this.getClosestVariantNode();if(t)return t.variantChildren&&t.variantChildren.add(e),()=>t.variantChildren.delete(e)}addValue(e,t){let n=this.values.get(e);t!==n&&(n&&this.removeValue(e),this.bindToMotionValue(e,t),this.values.set(e,t),this.latestValues[e]=t.get())}removeValue(e){this.values.delete(e);let t=this.valueSubscriptions.get(e);t&&(t(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,t){if(this.props.values&&this.props.values[e])return this.props.values[e];let n=this.values.get(e);return n===void 0&&t!==void 0&&(n=oi(t===null?void 0:t,{owner:this}),this.addValue(e,n)),n}readValue(e,t){let n=this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:this.getBaseTargetFromProps(this.props,e)??this.readValueFromInstance(this.current,e,this.options);return n!=null&&(typeof n==`string`&&(se(n)||le(n))?n=parseFloat(n):!Ta(n)&&Lt.test(t)&&(n=Li(e,t)),this.setBaseTarget(e,di(n)?n.get():n)),di(n)?n.get():n}setBaseTarget(e,t){this.baseTarget[e]=t}getBaseTarget(e){let{initial:t}=this.props,n;if(typeof t==`string`||typeof t==`object`){let r=$r(this.props,t,this.presenceContext?.custom);r&&(n=r[e])}if(t&&n!==void 0)return n;let r=this.getBaseTargetFromProps(this.props,e);return r!==void 0&&!di(r)?r:this.initialValues[e]!==void 0&&n===void 0?void 0:this.baseTarget[e]}on(e,t){return this.events[e]||(this.events[e]=new pe),this.events[e].add(t)}notify(e,...t){this.events[e]&&this.events[e].notify(...t)}scheduleRenderMicrotask(){Hi.render(this.render)}},qa=class extends Ka{constructor(){super(...arguments),this.KeyframeResolver=F}sortInstanceNodePosition(e,t){return e.compareDocumentPosition(t)&2?1:-1}getBaseTargetFromProps(e,t){let n=e.style;return n?n[t]:void 0}removeValueFromRenderState(e,{vars:t,style:n}){delete t[e],delete n[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:e}=this.props;di(e)&&(this.childSubscription=e.on(`change`,e=>{this.current&&(this.current.textContent=`${e}`)}))}},Ja=class{constructor(e){this.isMounted=!1,this.node=e}update(){}};function Ya({top:e,left:t,right:n,bottom:r}){return{x:{min:t,max:n},y:{min:e,max:r}}}function Xa({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}function Za(e,t){if(!t)return e;let n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}function Qa(e){return e===void 0||e===1}function $a({scale:e,scaleX:t,scaleY:n}){return!Qa(e)||!Qa(t)||!Qa(n)}function eo(e){return $a(e)||to(e)||e.z||e.rotate||e.rotateX||e.rotateY||e.skewX||e.skewY}function to(e){return no(e.x)||no(e.y)}function no(e){return e&&e!==`0%`}function ro(e,t,n){return n+t*(e-n)}function io(e,t,n,r,i){return i!==void 0&&(e=ro(e,i,r)),ro(e,n,r)+t}function ao(e,t=0,n=1,r,i){e.min=io(e.min,t,n,r,i),e.max=io(e.max,t,n,r,i)}function oo(e,{x:t,y:n}){ao(e.x,t.translate,t.scale,t.originPoint),ao(e.y,n.translate,n.scale,n.originPoint)}var so=.999999999999,co=1.0000000000001;function lo(e,t,n,r=!1){let i=n.length;if(!i)return;t.x=t.y=1;let a,o;for(let s=0;s<i;s++){a=n[s],o=a.projectionDelta;let{visualElement:i}=a.options;i&&i.props.style&&i.props.style.display===`contents`||(r&&a.options.layoutScroll&&a.scroll&&a!==a.root&&(uo(e.x,-a.scroll.offset.x),uo(e.y,-a.scroll.offset.y)),o&&(t.x*=o.x.scale,t.y*=o.y.scale,oo(e,o)),r&&eo(a.latestValues)&&L(e,a.latestValues,a.layout?.layoutBox))}t.x<co&&t.x>so&&(t.x=1),t.y<co&&t.y>so&&(t.y=1)}function uo(e,t){e.min+=t,e.max+=t}function fo(e,t,n,r,i=.5){ao(e,t,n,M(e.min,e.max,i),r)}function po(e,t){return typeof e==`string`?parseFloat(e)/100*(t.max-t.min):e}function L(e,t,n){let r=n??e;fo(e.x,po(t.x,r.x),t.scaleX,t.scale,t.originX),fo(e.y,po(t.y,r.y),t.scaleY,t.scale,t.originY)}function mo(e,t){return Ya(Za(e.getBoundingClientRect(),t))}function ho(e,t,n){let r=mo(e,n),{scroll:i}=t;return i&&(uo(r.x,i.offset.x),uo(r.y,i.offset.y)),r}var R={x:`translateX`,y:`translateY`,z:`translateZ`,transformPerspective:`perspective`},z=qn.length;function go(e,t,n){let r=``,i=!0;for(let a=0;a<z;a++){let o=qn[a],s=e[o];if(s===void 0)continue;let c=!0;if(typeof s==`number`)c=s===(o.startsWith(`scale`)?1:0);else{let e=parseFloat(s);c=o.startsWith(`scale`)?e===1:e===0}if(!c||n){let e=Bi(s,Ni[o]);if(!c){i=!1;let t=R[o]||o;r+=`${t}(${e}) `}n&&(t[o]=e)}}return r=r.trim(),n?r=n(t,i?``:r):i&&(r=`none`),r}function _o(e,t,n){let{style:r,vars:i,transformOrigin:a}=e,o=!1,s=!1;for(let e in t){let n=t[e];if(Jn.has(e)){o=!0;continue}else if(Ye(e)){i[e]=n;continue}else{let t=Bi(n,Ni[e]);e.startsWith(`origin`)?(s=!0,a[e]=t):r[e]=t}}if(t.transform||(o||n?r.transform=go(t,e.transform,n):r.transform&&=`none`),s){let{originX:e=`50%`,originY:t=`50%`,originZ:n=0}=a;r.transformOrigin=`${e} ${t} ${n}`}}function vo(e,{style:t,vars:n},r,i){let a=e.style,o;for(o in t)a[o]=t[o];for(o in i?.applyProjectionStyles(a,r),n)a.setProperty(o,n[o])}function yo(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}var bo={correct:(e,t)=>{if(!t.target)return e;if(typeof e==`string`)if(j.test(e))e=parseFloat(e);else return e;return`${yo(e,t.target.x)}% ${yo(e,t.target.y)}%`}},xo={correct:(e,{treeScale:t,projectionDelta:n})=>{let r=e,i=Lt.parse(e);if(i.length>5)return r;let a=Lt.createTransformer(e),o=typeof i[0]==`number`?0:1,s=n.x.scale*t.x,c=n.y.scale*t.y;i[0+o]/=s,i[1+o]/=c;let l=M(s,c,.5);return typeof i[2+o]==`number`&&(i[2+o]/=l),typeof i[3+o]==`number`&&(i[3+o]/=l),a(i)}},So={borderRadius:{...bo,applyTo:[`borderTopLeftRadius`,`borderTopRightRadius`,`borderBottomLeftRadius`,`borderBottomRightRadius`]},borderTopLeftRadius:bo,borderTopRightRadius:bo,borderBottomLeftRadius:bo,borderBottomRightRadius:bo,boxShadow:xo};function Co(e,{layout:t,layoutId:n}){return Jn.has(e)||e.startsWith(`origin`)||(t||n!==void 0)&&(!!So[e]||e===`opacity`)}function B(e,t,n){let r=e.style,i=t?.style,a={};if(!r)return a;for(let t in r)(di(r[t])||i&&di(i[t])||Co(t,e)||n?.getValue(t)?.liveStyle!==void 0)&&(a[t]=r[t]);return a}function wo(e){return window.getComputedStyle(e)}var To=class extends qa{constructor(){super(...arguments),this.type=`html`,this.renderInstance=vo}readValueFromInstance(e,t){if(Jn.has(t))return this.projection?.isProjecting?Un(t):Gn(e,t);{let n=wo(e),r=(Ye(t)?n.getPropertyValue(t):n[t])||0;return typeof r==`string`?r.trim():r}}measureInstanceViewportBox(e,{transformPagePoint:t}){return mo(e,t)}build(e,t,n){_o(e,t,n.transformTemplate)}scrapeMotionValuesFromProps(e,t,n){return B(e,t,n)}},Eo={offset:`stroke-dashoffset`,array:`stroke-dasharray`},Do={offset:`strokeDashoffset`,array:`strokeDasharray`};function Oo(e,t,n=1,r=0,i=!0){e.pathLength=1;let a=i?Eo:Do;e[a.offset]=`${-r}`,e[a.array]=`${t} ${n}`}var ko=[`offsetDistance`,`offsetPath`,`offsetRotate`,`offsetAnchor`];function Ao(e,{attrX:t,attrY:n,attrScale:r,pathLength:i,pathSpacing:a=1,pathOffset:o=0,...s},c,l,u){if(_o(e,s,l),c){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};let{attrs:d,style:f}=e;d.transform&&(f.transform=d.transform,delete d.transform),(f.transform||d.transformOrigin)&&(f.transformOrigin=d.transformOrigin??`50% 50%`,delete d.transformOrigin),f.transform&&(f.transformBox=u?.transformBox??`fill-box`,delete d.transformBox);for(let e of ko)d[e]!==void 0&&(f[e]=d[e],delete d[e]);t!==void 0&&(d.x=t),n!==void 0&&(d.y=n),r!==void 0&&(d.scale=r),i!==void 0&&Oo(d,i,a,o,!1)}var jo=new Set([`baseFrequency`,`diffuseConstant`,`kernelMatrix`,`kernelUnitLength`,`keySplines`,`keyTimes`,`limitingConeAngle`,`markerHeight`,`markerWidth`,`numOctaves`,`targetX`,`targetY`,`surfaceScale`,`specularConstant`,`specularExponent`,`stdDeviation`,`tableValues`,`viewBox`,`gradientTransform`,`pathLength`,`startOffset`,`textLength`,`lengthAdjust`]),Mo=e=>typeof e==`string`&&e.toLowerCase()===`svg`;function No(e,t,n,r){vo(e,t,void 0,r);for(let n in t.attrs)e.setAttribute(jo.has(n)?n:mi(n),t.attrs[n])}function Po(e,t,n){let r=B(e,t,n);for(let n in e)if(di(e[n])||di(t[n])){let t=qn.indexOf(n)===-1?n:`attr`+n.charAt(0).toUpperCase()+n.substring(1);r[t]=e[n]}return r}var Fo=class extends qa{constructor(){super(...arguments),this.type=`svg`,this.isSVGTag=!1,this.measureInstanceViewportBox=ka}getBaseTargetFromProps(e,t){return e[t]}readValueFromInstance(e,t){if(Jn.has(t)){let e=Fi(t);return e&&e.default||0}return t=jo.has(t)?t:mi(t),e.getAttribute(t)}scrapeMotionValuesFromProps(e,t,n){return Po(e,t,n)}build(e,t,n){Ao(e,t,this.isSVGTag,n.transformTemplate,n.style)}renderInstance(e,t,n,r){No(e,t,n,r)}mount(e){this.isSVGTag=Mo(e.tagName),super.mount(e)}},Io=Pa.length;function Lo(e){if(!e)return;if(!e.isControllingVariants){let t=e.parent&&Lo(e.parent)||{};return e.props.initial!==void 0&&(t.initial=e.props.initial),t}let t={};for(let n=0;n<Io;n++){let r=Pa[n],i=e.props[r];(Ma(i)||i===!1)&&(t[r]=i)}return t}function Ro(e,t){if(!Array.isArray(t))return!1;let n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}var zo=[...Na].reverse(),Bo=Na.length;function Vo(e){return t=>Promise.all(t.map(({animation:t,options:n})=>xi(e,t,n)))}function Ho(e){let t=Vo(e),n=Go(),r=!0,i=!1,a=t=>(n,r)=>{let i=ei(e,r,t===`exit`?e.presenceContext?.custom:void 0);if(i){let{transition:e,transitionEnd:t,...r}=i;n={...n,...r,...t}}return n};function o(n){t=n(e)}function s(o){let{props:s}=e,c=Lo(e.parent)||{},l=[],u=new Set,d={},f=1/0;for(let t=0;t<Bo;t++){let p=zo[t],m=n[p],h=s[p]===void 0?c[p]:s[p],g=Ma(h),_=p===o?m.isActive:null;_===!1&&(f=t);let v=h===c[p]&&h!==s[p]&&g;if(v&&(r||i)&&e.manuallyAnimateOnMount&&(v=!1),m.protectedKeys={...d},!m.isActive&&_===null||!h&&!m.prevProp||ja(h)||typeof h==`boolean`)continue;if(p===`exit`&&m.isActive&&_!==!0){m.prevResolvedValues&&(d={...d,...m.prevResolvedValues});continue}let y=Uo(m.prevProp,h),b=y||p===o&&m.isActive&&!v&&g||t>f&&g,x=!1,S=Array.isArray(h)?h:[h],C=S.reduce(a(p),{});_===!1&&(C={});let{prevResolvedValues:w={}}=m,ee={...w,...C},te=t=>{b=!0,u.has(t)&&(x=!0,u.delete(t)),m.needsAnimating[t]=!0;let n=e.getValue(t);n&&(n.liveStyle=!1)};for(let e in ee){let t=C[e],n=w[e];if(d.hasOwnProperty(e))continue;let r=!1;r=si(t)&&si(n)?!Ro(t,n):t!==n,r?t==null?u.add(e):te(e):t!==void 0&&u.has(e)?te(e):m.protectedKeys[e]=!0}m.prevProp=h,m.prevResolvedValues=C,m.isActive&&(d={...d,...C}),(r||i)&&e.blockInitialAnimation&&(b=!1);let ne=v&&y;b&&(!ne||x)&&l.push(...S.map(t=>{let n={type:p};if(typeof t==`string`&&(r||i)&&!ne&&e.manuallyAnimateOnMount&&e.parent){let{parent:r}=e,i=ei(r,t);if(r.enteringChildren&&i){let{delayChildren:t}=i.transition||{};n.delay=Rr(r.enteringChildren,e,t)}}return{animation:t,options:n}}))}if(u.size){let t={};if(typeof s.initial!=`boolean`){let n=ei(e,Array.isArray(s.initial)?s.initial[0]:s.initial);n&&n.transition&&(t.transition=n.transition)}u.forEach(n=>{let r=e.getBaseTarget(n),i=e.getValue(n);i&&(i.liveStyle=!0),t[n]=r??null}),l.push({animation:t})}let p=!!l.length;return r&&(s.initial===!1||s.initial===s.animate)&&!e.manuallyAnimateOnMount&&(p=!1),r=!1,i=!1,p?t(l):Promise.resolve()}function c(t,r){if(n[t].isActive===r)return Promise.resolve();e.variantChildren?.forEach(e=>e.animationState?.setActive(t,r)),n[t].isActive=r;let i=s(t);for(let e in n)n[e].protectedKeys={};return i}return{animateChanges:s,setActive:c,setAnimateFunction:o,getState:()=>n,reset:()=>{n=Go(),i=!0}}}function Uo(e,t){return typeof t==`string`?t!==e:Array.isArray(t)?!Ro(t,e):!1}function Wo(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Go(){return{animate:Wo(!0),whileInView:Wo(),whileHover:Wo(),whileTap:Wo(),whileDrag:Wo(),whileFocus:Wo(),exit:Wo()}}function Ko(e,t){e.min=t.min,e.max=t.max}function qo(e,t){Ko(e.x,t.x),Ko(e.y,t.y)}function Jo(e,t){e.translate=t.translate,e.scale=t.scale,e.originPoint=t.originPoint,e.origin=t.origin}var Yo=1e-4,Xo=1-Yo,Zo=1+Yo,Qo=.01,$o=0-Qo,es=0+Qo;function ts(e){return e.max-e.min}function ns(e,t,n){return Math.abs(e-t)<=n}function rs(e,t,n,r=.5){e.origin=r,e.originPoint=M(t.min,t.max,e.origin),e.scale=ts(n)/ts(t),e.translate=M(n.min,n.max,e.origin)-e.originPoint,(e.scale>=Xo&&e.scale<=Zo||isNaN(e.scale))&&(e.scale=1),(e.translate>=$o&&e.translate<=es||isNaN(e.translate))&&(e.translate=0)}function is(e,t,n,r){rs(e.x,t.x,n.x,r?r.originX:void 0),rs(e.y,t.y,n.y,r?r.originY:void 0)}function as(e,t,n,r=0){e.min=(r?M(n.min,n.max,r):n.min)+t.min,e.max=e.min+ts(t)}function os(e,t,n,r){as(e.x,t.x,n.x,r?.x),as(e.y,t.y,n.y,r?.y)}function ss(e,t,n,r=0){let i=r?M(n.min,n.max,r):n.min;e.min=t.min-i,e.max=e.min+ts(t)}function cs(e,t,n,r){ss(e.x,t.x,n.x,r?.x),ss(e.y,t.y,n.y,r?.y)}function ls(e,t,n,r,i){return e-=t,e=ro(e,1/n,r),i!==void 0&&(e=ro(e,1/i,r)),e}function us(e,t=0,n=1,r=.5,i,a=e,o=e){if(gt.test(t)&&(t=parseFloat(t),t=M(o.min,o.max,t/100)-o.min),typeof t!=`number`)return;let s=M(a.min,a.max,r);e===a&&(s-=t),e.min=ls(e.min,t,n,s,i),e.max=ls(e.max,t,n,s,i)}function ds(e,t,[n,r,i],a,o){us(e,t[n],t[r],t[i],t.scale,a,o)}var fs=[`x`,`scaleX`,`originX`],ps=[`y`,`scaleY`,`originY`];function ms(e,t,n,r){ds(e.x,t,fs,n?n.x:void 0,r?r.x:void 0),ds(e.y,t,ps,n?n.y:void 0,r?r.y:void 0)}function hs(e){return e.translate===0&&e.scale===1}function gs(e){return hs(e.x)&&hs(e.y)}function _s(e,t){return e.min===t.min&&e.max===t.max}function vs(e,t){return _s(e.x,t.x)&&_s(e.y,t.y)}function ys(e,t){return Math.round(e.min)===Math.round(t.min)&&Math.round(e.max)===Math.round(t.max)}function bs(e,t){return ys(e.x,t.x)&&ys(e.y,t.y)}function xs(e){return ts(e.x)/ts(e.y)}function Ss(e,t){return e.translate===t.translate&&e.scale===t.scale&&e.originPoint===t.originPoint}function Cs(e){return[e(`x`),e(`y`)]}function ws(e,t,n){let r=``,i=e.x.translate/t.x,a=e.y.translate/t.y,o=n?.z||0;if((i||a||o)&&(r=`translate3d(${i}px, ${a}px, ${o}px) `),(t.x!==1||t.y!==1)&&(r+=`scale(${1/t.x}, ${1/t.y}) `),n){let{transformPerspective:e,rotate:t,rotateX:i,rotateY:a,skewX:o,skewY:s}=n;e&&(r=`perspective(${e}px) ${r}`),t&&(r+=`rotate(${t}deg) `),i&&(r+=`rotateX(${i}deg) `),a&&(r+=`rotateY(${a}deg) `),o&&(r+=`skewX(${o}deg) `),s&&(r+=`skewY(${s}deg) `)}let s=e.x.scale*t.x,c=e.y.scale*t.y;return(s!==1||c!==1)&&(r+=`scale(${s}, ${c})`),r||`none`}var Ts=[`borderTopLeftRadius`,`borderTopRightRadius`,`borderBottomLeftRadius`,`borderBottomRightRadius`],Es=Ts.length,Ds=e=>typeof e==`string`?parseFloat(e):e,Os=e=>typeof e==`number`||j.test(e);function ks(e,t,n,r,i,a){i?(e.opacity=M(0,n.opacity??1,js(r)),e.opacityExit=M(t.opacity??1,0,Ms(r))):a&&(e.opacity=M(t.opacity??1,n.opacity??1,r));for(let i=0;i<Es;i++){let a=Ts[i],o=As(t,a),s=As(n,a);o===void 0&&s===void 0||(o||=0,s||=0,o===0||s===0||Os(o)===Os(s)?(e[a]=Math.max(M(Ds(o),Ds(s),r),0),(gt.test(s)||gt.test(o))&&(e[a]+=`%`)):e[a]=s)}(t.rotate||n.rotate)&&(e.rotate=M(t.rotate||0,n.rotate||0,r))}function As(e,t){return e[t]===void 0?e.borderRadius:e[t]}var js=Ns(0,.5,Ee),Ms=Ns(.5,.95,T);function Ns(e,t,n){return r=>r<e?0:r>t?1:n(fe(e,t,r))}function Ps(e,t,n){let r=di(e)?e:oi(e);return r.start(Zr(``,r,t,n)),r.animation}function Fs(e,t,n,r={passive:!0}){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n)}var Is=(e,t)=>e.depth-t.depth,Ls=class{constructor(){this.children=[],this.isDirty=!1}add(e){re(this.children,e),this.isDirty=!0}remove(e){ie(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(Is),this.isDirty=!1,this.children.forEach(e)}};function Rs(e,t){let n=Ke.now(),r=({timestamp:i})=>{let a=i-n;a>=t&&(Ve(r),e(a-t))};return A.setup(r,!0),()=>Ve(r)}function zs(e){return di(e)?e.get():e}var Bs=class{constructor(){this.members=[]}add(e){re(this.members,e);for(let t=this.members.length-1;t>=0;t--){let n=this.members[t];if(n===e||n===this.lead||n===this.prevLead)continue;let r=n.instance;(!r||r.isConnected===!1)&&!n.snapshot&&(ie(this.members,n),n.unmount())}e.scheduleRender()}remove(e){if(ie(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){let e=this.members[this.members.length-1];e&&this.promote(e)}}relegate(e){for(let t=this.members.indexOf(e)-1;t>=0;t--){let e=this.members[t];if(e.isPresent!==!1&&e.instance?.isConnected!==!1)return this.promote(e),!0}return!1}promote(e,t){let n=this.lead;if(e!==n&&(this.prevLead=n,this.lead=e,e.show(),n)){n.updateSnapshot(),e.scheduleRender();let{layoutDependency:r}=n.options,{layoutDependency:i}=e.options;(r===void 0||r!==i)&&(e.resumeFrom=n,t&&(n.preserveOpacity=!0),n.snapshot&&(e.snapshot=n.snapshot,e.snapshot.latestValues=n.animationValues||n.latestValues),e.root?.isUpdating&&(e.isLayoutDirty=!0)),e.options.crossfade===!1&&n.hide()}}exitAnimationComplete(){this.members.forEach(e=>{e.options.onExitComplete?.(),e.resumingFrom?.options.onExitComplete?.()})}scheduleRender(){this.members.forEach(e=>e.instance&&e.scheduleRender(!1))}removeLeadSnapshot(){this.lead?.snapshot&&(this.lead.snapshot=void 0)}},Vs={hasAnimatedSinceResize:!0,hasEverUpdated:!1},Hs={nodes:0,calculatedTargetDeltas:0,calculatedProjections:0},Us=[``,`X`,`Y`,`Z`],Ws=1e3,Gs=0;function Ks(e,t,n,r){let{latestValues:i}=t;i[e]&&(n[e]=i[e],t.setStaticValue(e,0),r&&(r[e]=0))}function qs(e){if(e.hasCheckedOptimisedAppear=!0,e.root===e)return;let{visualElement:t}=e.options;if(!t)return;let n=gi(t);if(window.MotionHasOptimisedAnimation(n,`transform`)){let{layout:t,layoutId:r}=e.options;window.MotionCancelOptimisedAnimation(n,`transform`,A,!(t||r))}let{parent:r}=e;r&&!r.hasCheckedOptimisedAppear&&qs(r)}function Js({attachResizeListener:e,defaultParent:t,measureScroll:n,checkIsScrollRoot:r,resetTransform:i}){return class{constructor(e={},n=t?.()){this.id=Gs++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,Le.value&&(Hs.nodes=Hs.calculatedTargetDeltas=Hs.calculatedProjections=0),this.nodes.forEach(Zs),this.nodes.forEach(oc),this.nodes.forEach(sc),this.nodes.forEach(Qs),Le.addProjectionMetrics&&Le.addProjectionMetrics(Hs)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=e,this.root=n?n.root||n:this,this.path=n?[...n.path,n]:[],this.parent=n,this.depth=n?n.depth+1:0;for(let e=0;e<this.path.length;e++)this.path[e].shouldResetTransform=!0;this.root===this&&(this.nodes=new Ls)}addEventListener(e,t){return this.eventHandlers.has(e)||this.eventHandlers.set(e,new pe),this.eventHandlers.get(e).add(t)}notifyListeners(e,...t){let n=this.eventHandlers.get(e);n&&n.notify(...t)}hasListeners(e){return this.eventHandlers.has(e)}mount(t){if(this.instance)return;this.isSVG=la(t)&&!Ca(t),this.instance=t;let{layoutId:n,layout:r,visualElement:i}=this.options;if(i&&!i.current&&i.mount(t),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(r||n)&&(this.isLayoutDirty=!0),e){let n,r=0,i=()=>this.root.updateBlockedByResize=!1;A.read(()=>{r=window.innerWidth}),e(t,()=>{let e=window.innerWidth;e!==r&&(r=e,this.root.updateBlockedByResize=!0,n&&n(),n=Rs(i,250),Vs.hasAnimatedSinceResize&&(Vs.hasAnimatedSinceResize=!1,this.nodes.forEach(ac)))})}n&&this.root.registerSharedNode(n,this),this.options.animate!==!1&&i&&(n||r)&&this.addEventListener(`didUpdate`,({delta:e,hasLayoutChanged:t,hasRelativeLayoutChanged:n,layout:r})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}let a=this.options.transition||i.getDefaultTransition()||mc,{onLayoutAnimationStart:o,onLayoutAnimationComplete:s}=i.getProps(),c=!this.targetLayout||!bs(this.targetLayout,r),l=!t&&n;if(this.options.layoutRoot||this.resumeFrom||l||t&&(c||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);let t={...Jr(a,`layout`),onPlay:o,onComplete:s};(i.shouldReduceMotion||this.options.layoutRoot)&&(t.delay=0,t.type=!1),this.startAnimation(t),this.setAnimationOrigin(e,l)}else t||ac(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=r})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);let e=this.getStack();e&&e.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),Ve(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(cc),this.animationId++)}getTransformTemplate(){let{visualElement:e}=this.options;return e&&e.getProps().transformTemplate}willUpdate(e=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&qs(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let e=0;e<this.path.length;e++){let t=this.path[e];t.shouldResetTransform=!0,(typeof t.latestValues.x==`string`||typeof t.latestValues.y==`string`)&&(t.isLayoutDirty=!0),t.updateScroll(`snapshot`),t.options.layoutRoot&&t.willUpdate(!1)}let{layoutId:t,layout:n}=this.options;if(t===void 0&&!n)return;let r=this.getTransformTemplate();this.prevTransformTemplateValue=r?r(this.latestValues,``):void 0,this.updateSnapshot(),e&&this.notifyListeners(`willUpdate`)}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){let e=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),e&&this.nodes.forEach(tc),this.nodes.forEach(ec);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(nc);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(rc),this.nodes.forEach(ic),this.nodes.forEach(Ys),this.nodes.forEach(Xs)):this.nodes.forEach(nc),this.clearAllSnapshots();let e=Ke.now();He.delta=ae(0,1e3/60,e-He.timestamp),He.timestamp=e,He.isProcessing=!0,Ue.update.process(He),Ue.preRender.process(He),Ue.render.process(He),He.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Hi.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach($s),this.sharedNodes.forEach(lc)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,A.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){A.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!ts(this.snapshot.measuredBox.x)&&!ts(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let e=0;e<this.path.length;e++)this.path[e].updateScroll();let e=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||=ka(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners(`measure`,this.layout.layoutBox);let{visualElement:t}=this.options;t&&t.notify(`LayoutMeasure`,this.layout.layoutBox,e?e.layoutBox:void 0)}updateScroll(e=`measure`){let t=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===e&&(t=!1),t&&this.instance){let t=r(this.instance);this.scroll={animationId:this.root.animationId,phase:e,isRoot:t,offset:n(this.instance),wasRoot:this.scroll?this.scroll.isRoot:t}}}resetTransform(){if(!i)return;let e=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,t=this.projectionDelta&&!gs(this.projectionDelta),n=this.getTransformTemplate(),r=n?n(this.latestValues,``):void 0,a=r!==this.prevTransformTemplateValue;e&&this.instance&&(t||eo(this.latestValues)||a)&&(i(this.instance,r),this.shouldResetTransform=!1,this.scheduleRender())}measure(e=!0){let t=this.measurePageBox(),n=this.removeElementScroll(t);return e&&(n=this.removeTransform(n)),vc(n),{animationId:this.root.animationId,measuredBox:t,layoutBox:n,latestValues:{},source:this.id}}measurePageBox(){let{visualElement:e}=this.options;if(!e)return ka();let t=e.measureViewportBox();if(!(this.scroll?.wasRoot||this.path.some(bc))){let{scroll:e}=this.root;e&&(uo(t.x,e.offset.x),uo(t.y,e.offset.y))}return t}removeElementScroll(e){let t=ka();if(qo(t,e),this.scroll?.wasRoot)return t;for(let n=0;n<this.path.length;n++){let r=this.path[n],{scroll:i,options:a}=r;r!==this.root&&i&&a.layoutScroll&&(i.wasRoot&&qo(t,e),uo(t.x,i.offset.x),uo(t.y,i.offset.y))}return t}applyTransform(e,t=!1,n){let r=n||ka();qo(r,e);for(let e=0;e<this.path.length;e++){let n=this.path[e];!t&&n.options.layoutScroll&&n.scroll&&n!==n.root&&(uo(r.x,-n.scroll.offset.x),uo(r.y,-n.scroll.offset.y)),eo(n.latestValues)&&L(r,n.latestValues,n.layout?.layoutBox)}return eo(this.latestValues)&&L(r,this.latestValues,this.layout?.layoutBox),r}removeTransform(e){let t=ka();qo(t,e);for(let e=0;e<this.path.length;e++){let n=this.path[e];if(!eo(n.latestValues))continue;let r;n.instance&&($a(n.latestValues)&&n.updateSnapshot(),r=ka(),qo(r,n.measurePageBox())),ms(t,n.latestValues,n.snapshot?.layoutBox,r)}return eo(this.latestValues)&&ms(t,this.latestValues),t}setTargetDelta(e){this.targetDelta=e,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(e){this.options={...this.options,...e,crossfade:e.crossfade===void 0?!0:e.crossfade}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==He.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(e=!1){let t=this.getLead();this.isProjectionDirty||=t.isProjectionDirty,this.isTransformDirty||=t.isTransformDirty,this.isSharedProjectionDirty||=t.isSharedProjectionDirty;let n=!!this.resumingFrom||this!==t;if(!(e||n&&this.isSharedProjectionDirty||this.isProjectionDirty||this.parent?.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;let{layout:r,layoutId:i}=this.options;if(!this.layout||!(r||i))return;this.resolvedRelativeTargetAt=He.timestamp;let a=this.getClosestProjectingParent();a&&this.linkedParentVersion!==a.layoutVersion&&!a.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&a&&a.layout?this.createRelativeTarget(a,this.layout.layoutBox,a.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=ka(),this.targetWithTransforms=ka()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),os(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):qo(this.target,this.layout.layoutBox),oo(this.target,this.targetDelta)):qo(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&a&&!!a.resumingFrom==!!this.resumingFrom&&!a.options.layoutScroll&&a.target&&this.animationProgress!==1?this.createRelativeTarget(a,this.target,a.target):this.relativeParent=this.relativeTarget=void 0),Le.value&&Hs.calculatedTargetDeltas++)}getClosestProjectingParent(){if(!(!this.parent||$a(this.parent.latestValues)||to(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(e,t,n){this.relativeParent=e,this.linkedParentVersion=e.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=ka(),this.relativeTargetOrigin=ka(),cs(this.relativeTargetOrigin,t,n,this.options.layoutAnchor||void 0),qo(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){let e=this.getLead(),t=!!this.resumingFrom||this!==e,n=!0;if((this.isProjectionDirty||this.parent?.isProjectionDirty)&&(n=!1),t&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(n=!1),this.resolvedRelativeTargetAt===He.timestamp&&(n=!1),n)return;let{layout:r,layoutId:i}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(r||i))return;qo(this.layoutCorrected,this.layout.layoutBox);let a=this.treeScale.x,o=this.treeScale.y;lo(this.layoutCorrected,this.treeScale,this.path,t),e.layout&&!e.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(e.target=e.layout.layoutBox,e.targetWithTransforms=ka());let{target:s}=e;if(!s){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Jo(this.prevProjectionDelta.x,this.projectionDelta.x),Jo(this.prevProjectionDelta.y,this.projectionDelta.y)),is(this.projectionDelta,this.layoutCorrected,s,this.latestValues),(this.treeScale.x!==a||this.treeScale.y!==o||!Ss(this.projectionDelta.x,this.prevProjectionDelta.x)||!Ss(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners(`projectionUpdate`,s)),Le.value&&Hs.calculatedProjections++}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(e=!0){if(this.options.visualElement?.scheduleRender(),e){let e=this.getStack();e&&e.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Da(),this.projectionDelta=Da(),this.projectionDeltaWithTransform=Da()}setAnimationOrigin(e,t=!1){let n=this.snapshot,r=n?n.latestValues:{},i={...this.latestValues},a=Da();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!t;let o=ka(),s=(n?n.source:void 0)!==(this.layout?this.layout.source:void 0),c=this.getStack(),l=!c||c.members.length<=1,u=!!(s&&!l&&this.options.crossfade===!0&&!this.path.some(pc));this.animationProgress=0;let d;this.mixTargetDelta=t=>{let n=t/1e3;uc(a.x,e.x,n),uc(a.y,e.y,n),this.setTargetDelta(a),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(cs(o,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),fc(this.relativeTarget,this.relativeTargetOrigin,o,n),d&&vs(this.relativeTarget,d)&&(this.isProjectionDirty=!1),d||=ka(),qo(d,this.relativeTarget)),s&&(this.animationValues=i,ks(i,r,this.latestValues,n,u,l)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=n},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(e){this.notifyListeners(`animationStart`),this.currentAnimation?.stop(),this.resumingFrom?.currentAnimation?.stop(),this.pendingAnimation&&=(Ve(this.pendingAnimation),void 0),this.pendingAnimation=A.update(()=>{Vs.hasAnimatedSinceResize=!0,qe.layout++,this.motionValue||=oi(0),this.motionValue.jump(0,!1),this.currentAnimation=Ps(this.motionValue,[0,1e3],{...e,velocity:0,isSync:!0,onUpdate:t=>{this.mixTargetDelta(t),e.onUpdate&&e.onUpdate(t)},onStop:()=>{qe.layout--},onComplete:()=>{qe.layout--,e.onComplete&&e.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);let e=this.getStack();e&&e.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners(`animationComplete`)}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(Ws),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){let e=this.getLead(),{targetWithTransforms:t,target:n,layout:r,latestValues:i}=e;if(!(!t||!n||!r)){if(this!==e&&this.layout&&r&&yc(this.options.animationType,this.layout.layoutBox,r.layoutBox)){n=this.target||ka();let t=ts(this.layout.layoutBox.x);n.x.min=e.target.x.min,n.x.max=n.x.min+t;let r=ts(this.layout.layoutBox.y);n.y.min=e.target.y.min,n.y.max=n.y.min+r}qo(t,n),L(t,i),is(this.projectionDeltaWithTransform,this.layoutCorrected,t,i)}}registerSharedNode(e,t){this.sharedNodes.has(e)||this.sharedNodes.set(e,new Bs),this.sharedNodes.get(e).add(t);let n=t.options.initialPromotionConfig;t.promote({transition:n?n.transition:void 0,preserveFollowOpacity:n&&n.shouldPreserveFollowOpacity?n.shouldPreserveFollowOpacity(t):void 0})}isLead(){let e=this.getStack();return e?e.lead===this:!0}getLead(){let{layoutId:e}=this.options;return e&&this.getStack()?.lead||this}getPrevLead(){let{layoutId:e}=this.options;return e?this.getStack()?.prevLead:void 0}getStack(){let{layoutId:e}=this.options;if(e)return this.root.sharedNodes.get(e)}promote({needsReset:e,transition:t,preserveFollowOpacity:n}={}){let r=this.getStack();r&&r.promote(this,n),e&&(this.projectionDelta=void 0,this.needsReset=!0),t&&this.setOptions({transition:t})}relegate(){let e=this.getStack();return e?e.relegate(this):!1}resetSkewAndRotation(){let{visualElement:e}=this.options;if(!e)return;let t=!1,{latestValues:n}=e;if((n.z||n.rotate||n.rotateX||n.rotateY||n.rotateZ||n.skewX||n.skewY)&&(t=!0),!t)return;let r={};n.z&&Ks(`z`,e,r,this.animationValues);for(let t=0;t<Us.length;t++)Ks(`rotate${Us[t]}`,e,r,this.animationValues),Ks(`skew${Us[t]}`,e,r,this.animationValues);e.render();for(let t in r)e.setStaticValue(t,r[t]),this.animationValues&&(this.animationValues[t]=r[t]);e.scheduleRender()}applyProjectionStyles(e,t){if(!this.instance||this.isSVG)return;if(!this.isVisible){e.visibility=`hidden`;return}let n=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,e.visibility=``,e.opacity=``,e.pointerEvents=zs(t?.pointerEvents)||``,e.transform=n?n(this.latestValues,``):`none`;return}let r=this.getLead();if(!this.projectionDelta||!this.layout||!r.target){this.options.layoutId&&(e.opacity=this.latestValues.opacity===void 0?1:this.latestValues.opacity,e.pointerEvents=zs(t?.pointerEvents)||``),this.hasProjected&&!eo(this.latestValues)&&(e.transform=n?n({},``):`none`,this.hasProjected=!1);return}e.visibility=``;let i=r.animationValues||r.latestValues;this.applyTransformsToTarget();let a=ws(this.projectionDeltaWithTransform,this.treeScale,i);n&&(a=n(i,a)),e.transform=a;let{x:o,y:s}=this.projectionDelta;e.transformOrigin=`${o.origin*100}% ${s.origin*100}% 0`,r.animationValues?e.opacity=r===this?i.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:i.opacityExit:e.opacity=r===this?i.opacity===void 0?``:i.opacity:i.opacityExit===void 0?0:i.opacityExit;for(let t in So){if(i[t]===void 0)continue;let{correct:n,applyTo:o,isCSSVariable:s}=So[t],c=a===`none`?i[t]:n(i[t],r);if(o){let t=o.length;for(let n=0;n<t;n++)e[o[n]]=c}else s?this.options.visualElement.renderState.vars[t]=c:e[t]=c}this.options.layoutId&&(e.pointerEvents=r===this?zs(t?.pointerEvents)||``:`none`)}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(e=>e.currentAnimation?.stop()),this.root.nodes.forEach(ec),this.root.sharedNodes.clear()}}}function Ys(e){e.updateLayout()}function Xs(e){let t=e.resumeFrom?.snapshot||e.snapshot;if(e.isLead()&&e.layout&&t&&e.hasListeners(`didUpdate`)){let{layoutBox:n,measuredBox:r}=e.layout,{animationType:i}=e.options,a=t.source!==e.layout.source;if(i===`size`)Cs(e=>{let r=a?t.measuredBox[e]:t.layoutBox[e],i=ts(r);r.min=n[e].min,r.max=r.min+i});else if(i===`x`||i===`y`){let e=i===`x`?`y`:`x`;Ko(a?t.measuredBox[e]:t.layoutBox[e],n[e])}else yc(i,t.layoutBox,n)&&Cs(r=>{let i=a?t.measuredBox[r]:t.layoutBox[r],o=ts(n[r]);i.max=i.min+o,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[r].max=e.relativeTarget[r].min+o)});let o=Da();is(o,n,t.layoutBox);let s=Da();a?is(s,e.applyTransform(r,!0),t.measuredBox):is(s,n,t.layoutBox);let c=!gs(o),l=!1;if(!e.resumeFrom){let r=e.getClosestProjectingParent();if(r&&!r.resumeFrom){let{snapshot:i,layout:a}=r;if(i&&a){let o=e.options.layoutAnchor||void 0,s=ka();cs(s,t.layoutBox,i.layoutBox,o);let c=ka();cs(c,n,a.layoutBox,o),bs(s,c)||(l=!0),r.options.layoutRoot&&(e.relativeTarget=c,e.relativeTargetOrigin=s,e.relativeParent=r)}}}e.notifyListeners(`didUpdate`,{layout:n,snapshot:t,delta:s,layoutDelta:o,hasLayoutChanged:c,hasRelativeLayoutChanged:l})}else if(e.isLead()){let{onExitComplete:t}=e.options;t&&t()}e.options.transition=void 0}function Zs(e){Le.value&&Hs.nodes++,e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty),e.isTransformDirty||=e.parent.isTransformDirty)}function Qs(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function $s(e){e.clearSnapshot()}function ec(e){e.clearMeasurements()}function tc(e){e.isLayoutDirty=!0,e.updateLayout()}function nc(e){e.isLayoutDirty=!1}function rc(e){e.isAnimationBlocked&&e.layout&&!e.isLayoutDirty&&(e.snapshot=e.layout,e.isLayoutDirty=!0)}function ic(e){let{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify(`BeforeLayoutMeasure`),e.resetTransform()}function ac(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function oc(e){e.resolveTargetDelta()}function sc(e){e.calcProjection()}function cc(e){e.resetSkewAndRotation()}function lc(e){e.removeLeadSnapshot()}function uc(e,t,n){e.translate=M(t.translate,0,n),e.scale=M(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function dc(e,t,n,r){e.min=M(t.min,n.min,r),e.max=M(t.max,n.max,r)}function fc(e,t,n,r){dc(e.x,t.x,n.x,r),dc(e.y,t.y,n.y,r)}function pc(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}var mc={duration:.45,ease:[.4,0,.1,1]},hc=e=>typeof navigator<`u`&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(e),gc=hc(`applewebkit/`)&&!hc(`chrome/`)?Math.round:T;function _c(e){e.min=gc(e.min),e.max=gc(e.max)}function vc(e){_c(e.x),_c(e.y)}function yc(e,t,n){return e===`position`||e===`preserve-aspect`&&!ns(xs(t),xs(n),.2)}function bc(e){return e!==e.root&&e.scroll?.wasRoot}var xc=Js({attachResizeListener:(e,t)=>Fs(e,`resize`,t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body?.scrollLeft||0,y:document.documentElement.scrollTop||document.body?.scrollTop||0}),checkIsScrollRoot:()=>!0}),Sc={current:void 0},Cc=Js({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!Sc.current){let e=new xc({});e.mount(window),e.setOptions({layoutScroll:!0}),Sc.current=e}return Sc.current},resetTransform:(e,t)=>{e.style.transform=t===void 0?`none`:t},checkIsScrollRoot:e=>window.getComputedStyle(e).position===`fixed`}),wc=(0,b.createContext)({transformPagePoint:e=>e,isStatic:!1,reducedMotion:`never`});function Tc(e=!0){let t=(0,b.useContext)(ne);if(t===null)return[!0,null];let{isPresent:n,onExitComplete:r,register:i}=t,a=(0,b.useId)();(0,b.useEffect)(()=>{if(e)return i(a)},[e]);let o=(0,b.useCallback)(()=>e&&r&&r(a),[a,r,e]);return!n&&r?[!1,o]:[!0]}var Ec=(0,b.createContext)({strict:!1}),Dc={animation:[`animate`,`variants`,`whileHover`,`whileTap`,`exit`,`whileInView`,`whileFocus`,`whileDrag`],exit:[`exit`],drag:[`drag`,`dragControls`],focus:[`whileFocus`],hover:[`whileHover`,`onHoverStart`,`onHoverEnd`],tap:[`whileTap`,`onTap`,`onTapStart`,`onTapCancel`],pan:[`onPan`,`onPanStart`,`onPanSessionStart`,`onPanEnd`],inView:[`whileInView`,`onViewportEnter`,`onViewportLeave`],layout:[`layout`,`layoutId`]},Oc=!1;function kc(){if(Oc)return;let e={};for(let t in Dc)e[t]={isEnabled:e=>Dc[t].some(t=>!!e[t])};Wa(e),Oc=!0}function Ac(){return kc(),Ga()}function jc(e){let t=Ac();for(let n in e)t[n]={...t[n],...e[n]};Wa(t)}var Mc=new Set(`animate.exit.variants.initial.style.values.variants.transition.transformTemplate.custom.inherit.onBeforeLayoutMeasure.onAnimationStart.onAnimationComplete.onUpdate.onDragStart.onDrag.onDragEnd.onMeasureDragConstraints.onDirectionLock.onDragTransitionEnd._dragX._dragY.onHoverStart.onHoverEnd.onViewportEnter.onViewportLeave.globalTapTarget.propagate.ignoreStrict.viewport`.split(`.`));function Nc(e){return e.startsWith(`while`)||e.startsWith(`drag`)&&e!==`draggable`||e.startsWith(`layout`)||e.startsWith(`onTap`)||e.startsWith(`onPan`)||e.startsWith(`onLayout`)||Mc.has(e)}var Pc=c({default:()=>Fc}),Fc,Ic=o((()=>{throw Fc={},Error(`Could not resolve "@emotion/is-prop-valid" imported by "framer-motion". Is it installed?`)})),Lc=e=>!Nc(e);function Rc(e){typeof e==`function`&&(Lc=t=>t.startsWith(`on`)?!Nc(t):e(t))}try{Rc((Ic(),d(Pc)).default)}catch{}function zc(e,t,n){let r={};for(let i in e)i===`values`&&typeof e.values==`object`||di(e[i])||(Lc(i)||n===!0&&Nc(i)||!t&&!Nc(i)||e.draggable&&i.startsWith(`onDrag`))&&(r[i]=e[i]);return r}var Bc=(0,b.createContext)({});function V(e,t){if(Fa(e)){let{initial:t,animate:n}=e;return{initial:t===!1||Ma(t)?t:void 0,animate:Ma(n)?n:void 0}}return e.inherit===!1?{}:t}function Vc(e){let{initial:t,animate:n}=V(e,(0,b.useContext)(Bc));return(0,b.useMemo)(()=>({initial:t,animate:n}),[Hc(t),Hc(n)])}function Hc(e){return Array.isArray(e)?e.join(` `):e}var Uc=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Wc(e,t,n){for(let r in t)!di(t[r])&&!Co(r,n)&&(e[r]=t[r])}function Gc({transformTemplate:e},t){return(0,b.useMemo)(()=>{let n=Uc();return _o(n,t,e),Object.assign({},n.vars,n.style)},[t])}function Kc(e,t){let n=e.style||{},r={};return Wc(r,n,e),Object.assign(r,Gc(e,t)),r}function qc(e,t){let n={},r=Kc(e,t);return e.drag&&e.dragListener!==!1&&(n.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout=`none`,r.touchAction=e.drag===!0?`none`:`pan-${e.drag===`x`?`y`:`x`}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(n.tabIndex=0),n.style=r,n}var Jc=()=>({...Uc(),attrs:{}});function Yc(e,t,n,r){let i=(0,b.useMemo)(()=>{let n=Jc();return Ao(n,t,Mo(r),e.transformTemplate,e.style),{...n.attrs,style:{...n.style}}},[t]);if(e.style){let t={};Wc(t,e.style,e),i.style={...t,...i.style}}return i}var Xc=[`animate`,`circle`,`defs`,`desc`,`ellipse`,`g`,`image`,`line`,`filter`,`marker`,`mask`,`metadata`,`path`,`pattern`,`polygon`,`polyline`,`rect`,`stop`,`switch`,`symbol`,`svg`,`text`,`tspan`,`use`,`view`];function Zc(e){return typeof e!=`string`||e.includes(`-`)?!1:!!(Xc.indexOf(e)>-1||/[A-Z]/u.test(e))}function Qc(e,t,n,{latestValues:r},i,a=!1,o){let s=(o??Zc(e)?Yc:qc)(t,r,i,e),c=zc(t,typeof e==`string`,a),l=e===b.Fragment?{}:{...c,...s,ref:n},{children:u}=t,d=(0,b.useMemo)(()=>di(u)?u.get():u,[u]);return(0,b.createElement)(e,{...l,children:d})}function $c({scrapeMotionValuesFromProps:e,createRenderState:t},n,r,i){return{latestValues:el(n,r,i,e),renderState:t()}}function el(e,t,n,r){let i={},a=r(e,{});for(let e in a)i[e]=zs(a[e]);let{initial:o,animate:s}=e,c=Fa(e),l=Ia(e);t&&l&&!c&&e.inherit!==!1&&(o===void 0&&(o=t.initial),s===void 0&&(s=t.animate));let u=n?n.initial===!1:!1;u||=o===!1;let d=u?s:o;if(d&&typeof d!=`boolean`&&!ja(d)){let t=Array.isArray(d)?d:[d];for(let n=0;n<t.length;n++){let r=$r(e,t[n]);if(r){let{transitionEnd:e,transition:t,...n}=r;for(let e in n){let t=n[e];if(Array.isArray(t)){let e=u?t.length-1:0;t=t[e]}t!==null&&(i[e]=t)}for(let t in e)i[t]=e[t]}}}return i}var tl=e=>(t,n)=>{let r=(0,b.useContext)(Bc),i=(0,b.useContext)(ne),a=()=>$c(e,t,r,i);return n?a():ee(a)},nl=tl({scrapeMotionValuesFromProps:B,createRenderState:Uc}),rl=tl({scrapeMotionValuesFromProps:Po,createRenderState:Jc}),il=Symbol.for(`motionComponentSymbol`);function al(e,t,n){let r=(0,b.useRef)(n);(0,b.useInsertionEffect)(()=>{r.current=n});let i=(0,b.useRef)(null);return(0,b.useCallback)(n=>{n&&e.onMount?.(n);let a=r.current;if(typeof a==`function`)if(n){let e=a(n);typeof e==`function`&&(i.current=e)}else i.current?(i.current(),i.current=null):a(n);else a&&(a.current=n);t&&(n?t.mount(n):t.unmount())},[t])}var ol=(0,b.createContext)({});function H(e){return e&&typeof e==`object`&&Object.prototype.hasOwnProperty.call(e,`current`)}function sl(e,t,n,r,i,a){let{visualElement:o}=(0,b.useContext)(Bc),s=(0,b.useContext)(Ec),c=(0,b.useContext)(ne),l=(0,b.useContext)(wc),u=l.reducedMotion,d=l.skipAnimations,f=(0,b.useRef)(null),p=(0,b.useRef)(!1);r||=s.renderer,!f.current&&r&&(f.current=r(e,{visualState:t,parent:o,props:n,presenceContext:c,blockInitialAnimation:c?c.initial===!1:!1,reducedMotionConfig:u,skipAnimations:d,isSVG:a}),p.current&&f.current&&(f.current.manuallyAnimateOnMount=!0));let m=f.current,h=(0,b.useContext)(ol);m&&!m.projection&&i&&(m.type===`html`||m.type===`svg`)&&cl(f.current,n,i,h);let g=(0,b.useRef)(!1);(0,b.useInsertionEffect)(()=>{m&&g.current&&m.update(n,c)});let _=n[hi],v=(0,b.useRef)(!!_&&typeof window<`u`&&!window.MotionHandoffIsComplete?.(_)&&window.MotionHasOptimisedAnimation?.(_));return te(()=>{p.current=!0,m&&(g.current=!0,window.MotionIsMounted=!0,m.updateFeatures(),m.scheduleRenderMicrotask(),v.current&&m.animationState&&m.animationState.animateChanges())}),(0,b.useEffect)(()=>{m&&(!v.current&&m.animationState&&m.animationState.animateChanges(),v.current&&=(queueMicrotask(()=>{window.MotionHandoffMarkAsComplete?.(_)}),!1),m.enteringChildren=void 0)}),m}function cl(e,t,n,r){let{layoutId:i,layout:a,drag:o,dragConstraints:s,layoutScroll:c,layoutRoot:l,layoutAnchor:u,layoutCrossfade:d}=t;e.projection=new n(e.latestValues,t[`data-framer-portal-id`]?void 0:ll(e.parent)),e.projection.setOptions({layoutId:i,layout:a,alwaysMeasureLayout:!!o||s&&H(s),visualElement:e,animationType:typeof a==`string`?a:`both`,initialPromotionConfig:r,crossfade:d,layoutScroll:c,layoutRoot:l,layoutAnchor:u})}function ll(e){if(e)return e.options.allowProjection===!1?ll(e.parent):e.projection}var U=C();function ul(e,{forwardMotionProps:t=!1,type:n}={},r,i){r&&jc(r);let a=n?n===`svg`:Zc(e),o=a?rl:nl;function s(n,s){let c,l={...(0,b.useContext)(wc),...n,layoutId:dl(n)},{isStatic:u}=l,d=Vc(n),f=o(n,u);if(!u&&typeof window<`u`){fl(l,r);let t=pl(l);c=t.MeasureLayout,d.visualElement=sl(e,f,l,i,t.ProjectionNode,a)}return(0,U.jsxs)(Bc.Provider,{value:d,children:[c&&d.visualElement?(0,U.jsx)(c,{visualElement:d.visualElement,...l}):null,Qc(e,n,al(f,d.visualElement,s),f,u,t,a)]})}s.displayName=`motion.${typeof e==`string`?e:`create(${e.displayName??e.name??``})`}`;let c=(0,b.forwardRef)(s);return c[il]=e,c}function dl({layoutId:e}){let t=(0,b.useContext)(w).id;return t&&e!==void 0?t+`-`+e:e}function fl(e,t){(0,b.useContext)(Ec).strict}function pl(e){let{drag:t,layout:n}=Ac();if(!t&&!n)return{};let r={...t,...n};return{MeasureLayout:t?.isEnabled(e)||n?.isEnabled(e)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}function ml(e,t){if(typeof Proxy>`u`)return ul;let n=new Map,r=(n,r)=>ul(n,r,e,t);return new Proxy((e,t)=>r(e,t),{get:(i,a)=>a===`create`?r:(n.has(a)||n.set(a,ul(a,void 0,e,t)),n.get(a))})}var hl=(e,t)=>t.isSVG??Zc(e)?new Fo(t):new To(t,{allowProjection:e!==b.Fragment}),gl=class extends Ja{constructor(e){super(e),e.animationState||=Ho(e)}updateAnimationControlsSubscription(){let{animate:e}=this.node.getProps();ja(e)&&(this.unmountControls=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){let{animate:e}=this.node.getProps(),{animate:t}=this.node.prevProps||{};e!==t&&this.updateAnimationControlsSubscription()}unmount(){this.node.animationState.reset(),this.unmountControls?.()}},_l=0,vl={animation:{Feature:gl},exit:{Feature:class extends Ja{constructor(){super(...arguments),this.id=_l++,this.isExitComplete=!1}update(){if(!this.node.presenceContext)return;let{isPresent:e,onExitComplete:t}=this.node.presenceContext,{isPresent:n}=this.node.prevPresenceContext||{};if(!this.node.animationState||e===n)return;if(e&&n===!1){if(this.isExitComplete){let{initial:e,custom:t}=this.node.getProps();if(typeof e==`string`){let n=ei(this.node,e,t);if(n){let{transition:e,transitionEnd:t,...r}=n;for(let e in r)this.node.getValue(e)?.jump(r[e])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive(`exit`,!1);this.isExitComplete=!1;return}let r=this.node.animationState.setActive(`exit`,!e);t&&!e&&r.then(()=>{this.isExitComplete=!0,t(this.id)})}mount(){let{register:e,onExitComplete:t}=this.node.presenceContext||{};t&&t(this.id),e&&(this.unmount=e(this.id))}unmount(){}}}};function yl(e){return{point:{x:e.pageX,y:e.pageY}}}var bl=e=>t=>Zi(t)&&e(t,yl(t));function xl(e,t,n,r){return Fs(e,t,bl(n),r)}var Sl=({current:e})=>e?e.ownerDocument.defaultView:null,Cl=(e,t)=>Math.abs(e-t);function wl(e,t){let n=Cl(e.x,t.x),r=Cl(e.y,t.y);return Math.sqrt(n**2+r**2)}var Tl=new Set([`auto`,`scroll`]),El=class{constructor(e,t,{transformPagePoint:n,contextWindow:r=window,dragSnapToOrigin:i=!1,distanceThreshold:a=3,element:o}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=e=>{this.handleScroll(e.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Dl(this.lastRawMoveEventInfo,this.transformPagePoint));let e=kl(this.lastMoveEventInfo,this.history),t=this.startEvent!==null,n=wl(e.offset,{x:0,y:0})>=this.distanceThreshold;if(!t&&!n)return;let{point:r}=e,{timestamp:i}=He;this.history.push({...r,timestamp:i});let{onStart:a,onMove:o}=this.handlers;t||(a&&a(this.lastMoveEvent,e),this.startEvent=this.lastMoveEvent),o&&o(this.lastMoveEvent,e)},this.handlePointerMove=(e,t)=>{this.lastMoveEvent=e,this.lastRawMoveEventInfo=t,this.lastMoveEventInfo=Dl(t,this.transformPagePoint),A.update(this.updatePoint,!0)},this.handlePointerUp=(e,t)=>{this.end();let{onEnd:n,onSessionEnd:r,resumeAnimation:i}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&i&&i(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;let a=kl(e.type===`pointercancel`?this.lastMoveEventInfo:Dl(t,this.transformPagePoint),this.history);this.startEvent&&n&&n(e,a),r&&r(e,a)},!Zi(e))return;this.dragSnapToOrigin=i,this.handlers=t,this.transformPagePoint=n,this.distanceThreshold=a,this.contextWindow=r||window;let s=Dl(yl(e),this.transformPagePoint),{point:c}=s,{timestamp:l}=He;this.history=[{...c,timestamp:l}];let{onSessionStart:u}=t;u&&u(e,kl(s,this.history)),this.removeListeners=de(xl(this.contextWindow,`pointermove`,this.handlePointerMove),xl(this.contextWindow,`pointerup`,this.handlePointerUp),xl(this.contextWindow,`pointercancel`,this.handlePointerUp)),o&&this.startScrollTracking(o)}startScrollTracking(e){let t=e.parentElement;for(;t;){let e=getComputedStyle(t);(Tl.has(e.overflowX)||Tl.has(e.overflowY))&&this.scrollPositions.set(t,{x:t.scrollLeft,y:t.scrollTop}),t=t.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener(`scroll`,this.onElementScroll,{capture:!0}),window.addEventListener(`scroll`,this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener(`scroll`,this.onElementScroll,{capture:!0}),window.removeEventListener(`scroll`,this.onWindowScroll)}}handleScroll(e){let t=this.scrollPositions.get(e);if(!t)return;let n=e===window,r=n?{x:window.scrollX,y:window.scrollY}:{x:e.scrollLeft,y:e.scrollTop},i={x:r.x-t.x,y:r.y-t.y};i.x===0&&i.y===0||(n?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=i.x,this.lastMoveEventInfo.point.y+=i.y):this.history.length>0&&(this.history[0].x-=i.x,this.history[0].y-=i.y),this.scrollPositions.set(e,r),A.update(this.updatePoint,!0))}updateHandlers(e){this.handlers=e}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),Ve(this.updatePoint)}};function Dl(e,t){return t?{point:t(e.point)}:e}function Ol(e,t){return{x:e.x-t.x,y:e.y-t.y}}function kl({point:e},t){return{point:e,delta:Ol(e,jl(t)),offset:Ol(e,Al(t)),velocity:Ml(t,.1)}}function Al(e){return e[0]}function jl(e){return e[e.length-1]}function Ml(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,r=null,i=jl(e);for(;n>=0&&(r=e[n],!(i.timestamp-r.timestamp>D(t)));)n--;if(!r)return{x:0,y:0};r===e[0]&&e.length>2&&i.timestamp-r.timestamp>D(t)*2&&(r=e[1]);let a=O(i.timestamp-r.timestamp);if(a===0)return{x:0,y:0};let o={x:(i.x-r.x)/a,y:(i.y-r.y)/a};return o.x===1/0&&(o.x=0),o.y===1/0&&(o.y=0),o}function Nl(e,{min:t,max:n},r){return t!==void 0&&e<t?e=r?M(t,e,r.min):Math.max(e,t):n!==void 0&&e>n&&(e=r?M(n,e,r.max):Math.min(e,n)),e}function Pl(e,t,n){return{min:t===void 0?void 0:e.min+t,max:n===void 0?void 0:e.max+n-(e.max-e.min)}}function Fl(e,{top:t,left:n,bottom:r,right:i}){return{x:Pl(e.x,n,i),y:Pl(e.y,t,r)}}function Il(e,t){let n=t.min-e.min,r=t.max-e.max;return t.max-t.min<e.max-e.min&&([n,r]=[r,n]),{min:n,max:r}}function Ll(e,t){return{x:Il(e.x,t.x),y:Il(e.y,t.y)}}function Rl(e,t){let n=.5,r=ts(e),i=ts(t);return i>r?n=fe(t.min,t.max-r,e.min):r>i&&(n=fe(e.min,e.max-i,t.min)),ae(0,1,n)}function zl(e,t){let n={};return t.min!==void 0&&(n.min=t.min-e.min),t.max!==void 0&&(n.max=t.max-e.min),n}var Bl=.35;function W(e=Bl){return e===!1?e=0:e===!0&&(e=Bl),{x:G(e,`left`,`right`),y:G(e,`top`,`bottom`)}}function G(e,t,n){return{min:K(e,t),max:K(e,n)}}function K(e,t){return typeof e==`number`?e:e[t]||0}var q=new WeakMap,J=class{constructor(e){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=ka(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=e}start(e,{snapToCursor:t=!1,distanceThreshold:n}={}){let{presenceContext:r}=this.visualElement;if(r&&r.isPresent===!1)return;let i=e=>{t&&this.snapToCursor(yl(e).point),this.stopAnimation()},a=(e,t)=>{let{drag:n,dragPropagation:r,onDragStart:i}=this.getProps();if(n&&!r&&(this.openDragLock&&this.openDragLock(),this.openDragLock=Ki(n),!this.openDragLock))return;this.latestPointerEvent=e,this.latestPanInfo=t,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),Cs(e=>{let t=this.getAxisMotionValue(e).get()||0;if(gt.test(t)){let{projection:n}=this.visualElement;if(n&&n.layout){let r=n.layout.layoutBox[e];r&&(t=ts(r)*(parseFloat(t)/100))}}this.originPoint[e]=t}),i&&A.update(()=>i(e,t),!1,!0),pi(this.visualElement,`transform`);let{animationState:a}=this.visualElement;a&&a.setActive(`whileDrag`,!0)},o=(e,t)=>{this.latestPointerEvent=e,this.latestPanInfo=t;let{dragPropagation:n,dragDirectionLock:r,onDirectionLock:i,onDrag:a}=this.getProps();if(!n&&!this.openDragLock)return;let{offset:o}=t;if(r&&this.currentDirection===null){this.currentDirection=Wl(o),this.currentDirection!==null&&i&&i(this.currentDirection);return}this.updateAxis(`x`,t.point,o),this.updateAxis(`y`,t.point,o),this.visualElement.render(),a&&A.update(()=>a(e,t),!1,!0)},s=(e,t)=>{this.latestPointerEvent=e,this.latestPanInfo=t,this.stop(e,t),this.latestPointerEvent=null,this.latestPanInfo=null},c=()=>{let{dragSnapToOrigin:e}=this.getProps();(e||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:l}=this.getProps();this.panSession=new El(e,{onSessionStart:i,onStart:a,onMove:o,onSessionEnd:s,resumeAnimation:c},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:l,distanceThreshold:n,contextWindow:Sl(this.visualElement),element:this.visualElement.current})}stop(e,t){let n=e||this.latestPointerEvent,r=t||this.latestPanInfo,i=this.isDragging;if(this.cancel(),!i||!r||!n)return;let{velocity:a}=r;this.startAnimation(a);let{onDragEnd:o}=this.getProps();o&&A.postRender(()=>o(n,r))}cancel(){this.isDragging=!1;let{projection:e,animationState:t}=this.visualElement;e&&(e.isAnimationBlocked=!1),this.endPanSession();let{dragPropagation:n}=this.getProps();!n&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),t&&t.setActive(`whileDrag`,!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(e,t,n){let{drag:r}=this.getProps();if(!n||!Ul(e,r,this.currentDirection))return;let i=this.getAxisMotionValue(e),a=this.originPoint[e]+n[e];this.constraints&&this.constraints[e]&&(a=Nl(a,this.constraints[e],this.elastic[e])),i.set(a)}resolveConstraints(){let{dragConstraints:e,dragElastic:t}=this.getProps(),n=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):this.visualElement.projection?.layout,r=this.constraints;e&&H(e)?this.constraints||=this.resolveRefConstraints():e&&n?this.constraints=Fl(n.layoutBox,e):this.constraints=!1,this.elastic=W(t),r!==this.constraints&&!H(e)&&n&&this.constraints&&!this.hasMutatedConstraints&&Cs(e=>{this.constraints!==!1&&this.getAxisMotionValue(e)&&(this.constraints[e]=zl(n.layoutBox[e],this.constraints[e]))})}resolveRefConstraints(){let{dragConstraints:e,onMeasureDragConstraints:t}=this.getProps();if(!e||!H(e))return!1;let n=e.current,{projection:r}=this.visualElement;if(!r||!r.layout)return!1;let i=ho(n,r.root,this.visualElement.getTransformPagePoint()),a=Ll(r.layout.layoutBox,i);if(t){let e=t(Xa(a));this.hasMutatedConstraints=!!e,e&&(a=Ya(e))}return a}startAnimation(e){let{drag:t,dragMomentum:n,dragElastic:r,dragTransition:i,dragSnapToOrigin:a,onDragTransitionEnd:o}=this.getProps(),s=this.constraints||{},c=Cs(o=>{if(!Ul(o,t,this.currentDirection))return;let c=s&&s[o]||{};(a===!0||a===o)&&(c={min:0,max:0});let l=r?200:1e6,u=r?40:1e7,d={type:`inertia`,velocity:n?e[o]:0,bounceStiffness:l,bounceDamping:u,timeConstant:750,restDelta:1,restSpeed:10,...i,...c};return this.startAxisValueAnimation(o,d)});return Promise.all(c).then(o)}startAxisValueAnimation(e,t){let n=this.getAxisMotionValue(e);return pi(this.visualElement,e),n.start(Zr(e,n,0,t,this.visualElement,!1))}stopAnimation(){Cs(e=>this.getAxisMotionValue(e).stop())}getAxisMotionValue(e){let t=`_drag${e.toUpperCase()}`,n=this.visualElement.getProps();return n[t]||this.visualElement.getValue(e,(n.initial?n.initial[e]:void 0)||0)}snapToCursor(e){Cs(t=>{let{drag:n}=this.getProps();if(!Ul(t,n,this.currentDirection))return;let{projection:r}=this.visualElement,i=this.getAxisMotionValue(t);if(r&&r.layout){let{min:n,max:a}=r.layout.layoutBox[t],o=i.get()||0;i.set(e[t]-M(n,a,.5)+o)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;let{drag:e,dragConstraints:t}=this.getProps(),{projection:n}=this.visualElement;if(!H(t)||!n||!this.constraints)return;this.stopAnimation();let r={x:0,y:0};Cs(e=>{let t=this.getAxisMotionValue(e);if(t&&this.constraints!==!1){let n=t.get();r[e]=Rl({min:n,max:n},this.constraints[e])}});let{transformTemplate:i}=this.visualElement.getProps();this.visualElement.current.style.transform=i?i({},``):`none`,n.root&&n.root.updateScroll(),n.updateLayout(),this.constraints=!1,this.resolveConstraints(),Cs(t=>{if(!Ul(t,e,null))return;let n=this.getAxisMotionValue(t),{min:i,max:a}=this.constraints[t];n.set(M(i,a,r[t]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;q.set(this.visualElement,this);let e=this.visualElement.current,t=xl(e,`pointerdown`,t=>{let{drag:n,dragListener:r=!0}=this.getProps(),i=t.target,a=i!==e&&ta(i);n&&r&&!a&&this.start(t)}),n,r=()=>{let{dragConstraints:t}=this.getProps();H(t)&&t.current&&(this.constraints=this.resolveRefConstraints(),n||=Hl(e,t.current,()=>this.scalePositionWithinConstraints()))},{projection:i}=this.visualElement,a=i.addEventListener(`measure`,r);i&&!i.layout&&(i.root&&i.root.updateScroll(),i.updateLayout()),A.read(r);let o=Fs(window,`resize`,()=>this.scalePositionWithinConstraints()),s=i.addEventListener(`didUpdate`,(({delta:e,hasLayoutChanged:t})=>{this.isDragging&&t&&(Cs(t=>{let n=this.getAxisMotionValue(t);n&&(this.originPoint[t]+=e[t].translate,n.set(n.get()+e[t].translate))}),this.visualElement.render())}));return()=>{o(),t(),a(),s&&s(),n&&n()}}getProps(){let e=this.visualElement.getProps(),{drag:t=!1,dragDirectionLock:n=!1,dragPropagation:r=!1,dragConstraints:i=!1,dragElastic:a=Bl,dragMomentum:o=!0}=e;return{...e,drag:t,dragDirectionLock:n,dragPropagation:r,dragConstraints:i,dragElastic:a,dragMomentum:o}}};function Vl(e){let t=!0;return()=>{if(t){t=!1;return}e()}}function Hl(e,t,n){let r=Sa(e,Vl(n)),i=Sa(t,Vl(n));return()=>{r(),i()}}function Ul(e,t,n){return(t===!0||t===e)&&(n===null||n===e)}function Wl(e,t=10){let n=null;return Math.abs(e.y)>t?n=`y`:Math.abs(e.x)>t&&(n=`x`),n}var Gl=class extends Ja{constructor(e){super(e),this.removeGroupControls=T,this.removeListeners=T,this.controls=new J(e)}mount(){let{dragControls:e}=this.node.getProps();e&&(this.removeGroupControls=e.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||T}update(){let{dragControls:e}=this.node.getProps(),{dragControls:t}=this.node.prevProps||{};e!==t&&(this.removeGroupControls(),e&&(this.removeGroupControls=e.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}},Y=e=>(t,n)=>{e&&A.update(()=>e(t,n),!1,!0)},Kl=class extends Ja{constructor(){super(...arguments),this.removePointerDownListener=T}onPointerDown(e){this.session=new El(e,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Sl(this.node)})}createPanHandlers(){let{onPanSessionStart:e,onPanStart:t,onPan:n,onPanEnd:r}=this.node.getProps();return{onSessionStart:Y(e),onStart:Y(t),onMove:Y(n),onEnd:(e,t)=>{delete this.session,r&&A.postRender(()=>r(e,t))}}}mount(){this.removePointerDownListener=xl(this.node.current,`pointerdown`,e=>this.onPointerDown(e))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}},ql=!1,Jl=class extends b.Component{componentDidMount(){let{visualElement:e,layoutGroup:t,switchLayoutGroup:n,layoutId:r}=this.props,{projection:i}=e;i&&(t.group&&t.group.add(i),n&&n.register&&r&&n.register(i),ql&&i.root.didUpdate(),i.addEventListener(`animationComplete`,()=>{this.safeToRemove()}),i.setOptions({...i.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Vs.hasEverUpdated=!0}getSnapshotBeforeUpdate(e){let{layoutDependency:t,visualElement:n,drag:r,isPresent:i}=this.props,{projection:a}=n;return a?(a.isPresent=i,e.layoutDependency!==t&&a.setOptions({...a.options,layoutDependency:t}),ql=!0,r||e.layoutDependency!==t||t===void 0||e.isPresent!==i?a.willUpdate():this.safeToRemove(),e.isPresent!==i&&(i?a.promote():a.relegate()||A.postRender(()=>{let e=a.getStack();(!e||!e.members.length)&&this.safeToRemove()})),null):null}componentDidUpdate(){let{visualElement:e,layoutAnchor:t}=this.props,{projection:n}=e;n&&(n.options.layoutAnchor=t,n.root.didUpdate(),Hi.postRender(()=>{!n.currentAnimation&&n.isLead()&&this.safeToRemove()}))}componentWillUnmount(){let{visualElement:e,layoutGroup:t,switchLayoutGroup:n}=this.props,{projection:r}=e;ql=!0,r&&(r.scheduleCheckAfterUnmount(),t&&t.group&&t.group.remove(r),n&&n.deregister&&n.deregister(r))}safeToRemove(){let{safeToRemove:e}=this.props;e&&e()}render(){return null}};function Yl(e){let[t,n]=Tc(),r=(0,b.useContext)(w);return(0,U.jsx)(Jl,{...e,layoutGroup:r,switchLayoutGroup:(0,b.useContext)(ol),isPresent:t,safeToRemove:n})}var Xl={pan:{Feature:Kl},drag:{Feature:Gl,ProjectionNode:Cc,MeasureLayout:Yl}};function Zl(e,t,n){let{props:r}=e;e.animationState&&r.whileHover&&e.animationState.setActive(`whileHover`,n===`Start`);let i=r[`onHover`+n];i&&A.postRender(()=>i(t,yl(t)))}var Ql=class extends Ja{mount(){let{current:e}=this.node;e&&(this.unmount=Yi(e,(e,t)=>(Zl(this.node,t,`Start`),e=>Zl(this.node,e,`End`))))}unmount(){}},$l=class extends Ja{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(`:focus-visible`)}catch{e=!0}!e||!this.node.animationState||(this.node.animationState.setActive(`whileFocus`,!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive(`whileFocus`,!1),this.isActive=!1)}mount(){this.unmount=de(Fs(this.node.current,`focus`,()=>this.onFocus()),Fs(this.node.current,`blur`,()=>this.onBlur()))}unmount(){}};function eu(e,t,n){let{props:r}=e;if(e.current instanceof HTMLButtonElement&&e.current.disabled)return;e.animationState&&r.whileTap&&e.animationState.setActive(`whileTap`,n===`Start`);let i=r[`onTap`+(n===`End`?``:n)];i&&A.postRender(()=>i(t,yl(t)))}var tu=class extends Ja{mount(){let{current:e}=this.node;if(!e)return;let{globalTapTarget:t,propagate:n}=this.node.props;this.unmount=ca(e,(e,t)=>(eu(this.node,t,`Start`),(e,{success:t})=>eu(this.node,e,t?`End`:`Cancel`)),{useGlobalTarget:t,stopPropagation:n?.tap===!1})}unmount(){}},nu=new WeakMap,ru=new WeakMap,iu=e=>{let t=nu.get(e.target);t&&t(e)},au=e=>{e.forEach(iu)};function ou({root:e,...t}){let n=e||document;ru.has(n)||ru.set(n,{});let r=ru.get(n),i=JSON.stringify(t);return r[i]||(r[i]=new IntersectionObserver(au,{root:e,...t})),r[i]}function su(e,t,n){let r=ou(t);return nu.set(e,n),r.observe(e),()=>{nu.delete(e),r.unobserve(e)}}var cu={some:0,all:1},lu=class extends Ja{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.stopObserver?.();let{viewport:e={}}=this.node.getProps(),{root:t,margin:n,amount:r=`some`,once:i}=e,a={root:t?t.current:void 0,rootMargin:n,threshold:typeof r==`number`?r:cu[r]};this.stopObserver=su(this.node.current,a,e=>{let{isIntersecting:t}=e;if(this.isInView===t||(this.isInView=t,i&&!t&&this.hasEnteredView))return;t&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive(`whileInView`,t);let{onViewportEnter:n,onViewportLeave:r}=this.node.getProps(),a=t?n:r;a&&a(e)})}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>`u`)return;let{props:e,prevProps:t}=this.node;[`amount`,`margin`,`root`].some(uu(e,t))&&this.startObserver()}unmount(){this.stopObserver?.(),this.hasEnteredView=!1,this.isInView=!1}};function uu({viewport:e={}},{viewport:t={}}={}){return n=>e[n]!==t[n]}var du={inView:{Feature:lu},tap:{Feature:tu},focus:{Feature:$l},hover:{Feature:Ql}},fu={layout:{ProjectionNode:Cc,MeasureLayout:Yl}},pu=ml({...vl,...du,...Xl,...fu},hl),mu=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),hu=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),gu=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),_u=e=>{let t=gu(e);return t.charAt(0).toUpperCase()+t.slice(1)},vu={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},yu=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},bu=(0,b.createContext)({}),xu=()=>(0,b.useContext)(bu),Su=(0,b.forwardRef)(({color:e,size:t,strokeWidth:n,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>{let{size:l=24,strokeWidth:u=2,absoluteStrokeWidth:d=!1,color:f=`currentColor`,className:p=``}=xu()??{},m=r??d?Number(n??u)*24/Number(t??l):n??u;return(0,b.createElement)(`svg`,{ref:c,...vu,width:t??l??vu.width,height:t??l??vu.height,stroke:e??f,strokeWidth:m,className:mu(`lucide`,p,i),...!a&&!yu(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,b.createElement)(e,t)),...Array.isArray(a)?a:[a]])}),Cu=(e,t)=>{let n=(0,b.forwardRef)(({className:n,...r},i)=>(0,b.createElement)(Su,{ref:i,iconNode:t,className:mu(`lucide-${hu(_u(e))}`,`lucide-${e}`,n),...r}));return n.displayName=_u(e),n},wu=Cu(`bot`,[[`path`,{d:`M12 8V4H8`,key:`hb8ula`}],[`rect`,{width:`16`,height:`12`,x:`4`,y:`8`,rx:`2`,key:`enze0r`}],[`path`,{d:`M2 14h2`,key:`vft8re`}],[`path`,{d:`M20 14h2`,key:`4cs60a`}],[`path`,{d:`M15 13v2`,key:`1xurst`}],[`path`,{d:`M9 13v2`,key:`rq6x2g`}]]),Tu=Cu(`chevron-down`,[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]),Eu=Cu(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),Du=Cu(`circle-x`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m15 9-6 6`,key:`1uzhvr`}],[`path`,{d:`m9 9 6 6`,key:`z0biqf`}]]),Ou=Cu(`file-braces-corner`,[[`path`,{d:`M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6`,key:`14cnrg`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1`,key:`sr0ebq`}],[`path`,{d:`M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1`,key:`w793db`}]]),ku=Cu(`git-branch`,[[`path`,{d:`M15 6a9 9 0 0 0-9 9V3`,key:`1cii5b`}],[`circle`,{cx:`18`,cy:`6`,r:`3`,key:`1h7g24`}],[`circle`,{cx:`6`,cy:`18`,r:`3`,key:`fqmcym`}]]),Au=Cu(`network`,[[`rect`,{x:`16`,y:`16`,width:`6`,height:`6`,rx:`1`,key:`4q2zg0`}],[`rect`,{x:`2`,y:`16`,width:`6`,height:`6`,rx:`1`,key:`8cvhb9`}],[`rect`,{x:`9`,y:`2`,width:`6`,height:`6`,rx:`1`,key:`1egb70`}],[`path`,{d:`M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3`,key:`1jsf9p`}],[`path`,{d:`M12 12V8`,key:`2874zd`}]]),ju=Cu(`route`,[[`circle`,{cx:`6`,cy:`19`,r:`3`,key:`1kj8tv`}],[`path`,{d:`M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15`,key:`1d8sl`}],[`circle`,{cx:`18`,cy:`5`,r:`3`,key:`gq8acd`}]]);sd(`general: |
        ### General Implementation Requirements
        1. Language & Environment:
        - Target Language: Python 3.10+
        - Standard Libraries: \`argparse\`, \`sys\`, \`json\`, \`logging\`, \`collections\`, \`random\`, \`simpy\`, \`xdevs\`.

        2. Input Interface (Arguments & Stdin):
        - **CLI Arguments:** You MUST use the \`argparse\` library to handle configuration parameters.
        - **Data Stream:** If dynamic input is required, read from \`sys.stdin\` line-by-line.

        3. Output Interface:
        - Stream 1: KPI Data (sys.stdout)
            - You MUST print ONLY the required event records to Standard Output.
            - Format: JSONL. Each line is a valid, independent JSON object representing a key event.
            - Schema: Each JSON object MUST follow this structure:
            ---
            {
                "time": <float>,
                "entity": <str>,
                "event": <str>,
                "payload": <dict>
            }
            ---
            - Example: \`print(json.dumps({"time": 10.5, "entity": "sender", "event": "packet_sent", "payload": {"seq_num": 1, "bit": 0, "is_retry": false}}))\`, or use your customized logger.
        - Stream 2: Any other data (sys.stderr)
            - Print any other information to Standard Error.

        4. Time Format & Units:
        - Absolute Time: All time values in the output JSONL MUST be floats. The "time" field represents the absolute simulation time starting from \`0.0\`.
        - Precision: Keep at least 2 decimal places.

    scenario: |
        ### Scenario: Reliable Data Transfer with Deterministic Noise Interference
        1. System Objective: Design a communication system consisting of a Sender, a Receiver, and two uni-directional transmission channels (Subnets). The goal is to transmit a sequence of packets reliably using an Alternating Bit Protocol (ABP) despite deterministic packet loss in the channels.

        2. Entity Behaviors:
        The Sender:
            - Accepts a single control input at the start of simulation: the total number of packets to send.
            - Before sending each packet, the Sender must undergo a preparation delay (default 10ms, configurable via --sender_delay).
            - The Receiver must maintain a buffer with capacity 1. During the busy period, it must buffer the only received packet, and process the packet immediately after the busy processing delay. When multiple packets arrive, only the first one is stored.
            - Sends packets sequentially through Subnet1. Each packet contains a sequence number (1, 2, ...) and a control bit (alternating between 0 and 1). The first bit is 0.
            - After sending a packet, it starts a timer (default 20ms, configurable via --timeout).
            - Stop-and-Wait Logic: It must not send the next packet until it receives a correct Acknowledgment (ACK) for the current one.
            - Retransmission: If the timer expires before a valid ACK is received, the Sender retransmits the same packet and restarts the timer.
            - Validation: An ACK is valid only if its bit matches the control bit of the current packet.
            - After sending the specified total number of packets, the Sender stops automatically.

        The Receiver:
            - Upon receiving a packet, it undergoes a processing delay (default 10ms, configurable via --receiver_delay) before processing.
            - The Receiver must maintain a buffer with capacity 1. During the busy period, it must buffer the only received packet, and process the packet immediately after the busy processing delay. When multiple packets arrive, only the first one is stored.
            - After the processing delay, it extracts the control bit and immediately sends back an ACK packet containing that same bit through Subnet2.

        The Subnets (Channels):
            - There are two independent channels: Subnet1 (Sender -> Receiver) and Subnet2 (Receiver -> Sender).
            - Latency: Every packet takes exactly 3ms (configurable via --channel_delay) to traverse.
            - Deterministic Noise & Loss Model: Each subnet independently simulates interference using a deterministic formula.
                - Each Subnet maintains an internal "noise level" value x, initialized to exactly the seed value (provided via --seed).
                - Packet Fate Determination: When a packet arrives at a subnet, calculate a new noise level: x_new = (17 * x_old + 11) mod 100.
                - If x_new < 10, the interference is too high, and the packet is dropped (vanishes). Otherwise, it is transmitted normally after the channel delay.
                - After determination, update the noise level for the next packet: x_old = x_new.
                - Timing: The noise calculation and fate determination happen immediately when the packet arrives at the subnet.

        3. Scenario Constraints:
            - Time Unit Mapping: 1.0 simulation time unit = 1 Millisecond (ms).
            - System starts at time 0.0 with all components initialized to idle states.

    args_input_output: |
        1. Command Line Arguments:
        The script must accept the following named arguments:
        * \`--total_packets\` (int): The total number of packets the Sender intends to send in one session triggered by a START_BATCH command.
        * \`--seed\` (int): The initialization seed for the noise generator of both sides (the \`x\` value in the LCG formula). Default: 42.
        * \`--timeout\` (int): Sender's timeout duration in ms. Default: 20.
        * \`--sender_delay\` (int): Sender preparation delay in ms. Default: 10.
        * \`--receiver_delay\` (int): Receiver processing delay in ms. Default: 10.
        * \`--channel_delay\` (int): Subnet transmission delay in ms. Default: 3.
        * \`--simulate_time\` (int): The total simulation time to run in ms. Default: 1000.

        2. stdin Format:
        * No stdin input is required for this simulation. The system uses command line arguments for configuration.

        3. **Standard Output (stdout)**:
        * Format: JSONL, one independent JSON object per line
        * Each record MUST follow the format: \`{"time": <float>, "entity": <str>, "event": <str>, "payload": <dict>}\`
        * **Event Types and Formats**:
            Sender Events:
            - event: \`delay_start\` (Sender starts preparation delay)
            - time: Sender's current time
            - entity: "sender"
            - payload: \`{"type": "preparation", "duration": <float>}\`
            - Trigger: When Sender starts preparing a packet

            - event: \`packet_sent\` (Packet sent)
            - time: Sender's current time
            - entity: "sender"
            - payload: \`{"seq_num": <int>, "bit": <0|1>, "is_retry": <bool>}\`
            - Trigger: When Sender completes preparation delay and hands packet to subnet

            - event: \`ack_received\` (ACK received)
            - time: Sender's current time
            - entity: "sender"
            - payload: \`{"ack_bit": <0|1>, "is_valid": <bool>}\`
            - Trigger: When Sender receives an ACK

            Receiver Events:
            - event: \`delay_start\` (Receiver starts processing delay)
            - time: Receiver's current time
            - entity: "receiver"
            - payload: \`{"type": "processing", "duration": <float>}\`
            - Trigger: When Receiver starts processing a received packet

            - event: \`packet_received\` (Packet successfully received)
            - time: Receiver's current time
            - entity: "receiver"
            - payload: \`{"seq_num": <int>, "bit": <0|1>}\`
            - Trigger: When Receiver completes processing delay and successfully receives packet

            Subnet Events:
            - event: \`packet_get\` (Packet fate determined)
            - time: Subnet's current time
            - entity: "subnet"
            - payload: \`{"behavior": <"drop"|"pass">, "channel": <"forward"|"backward">, "noise_value": <int>}\`
            - Trigger: When packet arrives at subnet, before transmission delay starts
            - Note: "forward" for Sender->Receiver channel, "backward" for Receiver->Sender channel`);var Mu=`general: |
        ### General Implementation Requirements
        1. Language and environment:
        - Target Language: Python 3.10+
        - Standard Libraries: argparse, sys, json, logging, collections, random, xdevs.

        2. Input interface:
        - Use argparse for all runtime parameters.
        - No stdin is required in this benchmark case.

        3. Output interface:
        - stdout must contain JSONL event records only.
        - Each record uses: {time, entity, event, payload}.
        - stderr can contain non-KPI diagnostics.

    scenario: |
        ### Scenario: Strategic Airfreight Logistics
        Objective:
        Simulate a cargo logistics system with continuous pallet generation, FIFO queueing, aircraft assignment, delivery, return, and maintenance.

        Entities:
        - Facility: generates pallets at fixed intervals with unique ID and absolute expiration_time.
        - Loading Queue: holds pallets and performs active expiration while pallets remain in queue.
        - Fleet Coordinator: assigns next FIFO pallet whenever queue has cargo and aircraft is idle.
        - Aircraft: cyclic states: idle -> load(0s) -> fly -> unload -> return -> maintenance -> idle.
        - Destination: records pallet_delivered events and latency.

        Rules:
        - Time unit: seconds.
        - Pallet deadline while queued: generation_time + pallet_expiration_time.
        - Load time is zero.
        - Capacity per aircraft trip is one pallet.
        - No preemption after departure.
        - Fair assignment uses FIFO.

    args_input_output: |
        Command line args:
        - --duration (float)
        - --num_aircraft (int)
        - --pallet_interval (float)
        - --pallet_expiration_time (float)
        - --flight_time (float)
        - --unload_time (float)
        - --return_time (float)
        - --maintenance_time (float)

        stdin:
        - Not required.

        stdout JSONL schema:
        {
          "time": <float>,
          "entity": <"facility"|"queue"|"coordinator"|"aircraft"|"destination">,
          "event": <str>,
          "payload": <dict>
        }

        Required event family includes:
        - facility: pallet_generated
        - queue: pallet_queued, pallet_expired
        - coordinator: assignment_created
        - aircraft: depart, return, maintenance_start, maintenance_end
        - destination: pallet_delivered`,Nu=sd(Mu),Pu=`v_i = I(ExitCode=0) * I(NoTimeout) * I(ValidSchema(T_i))
Score_ope = (1/N) * sum_i v_i

c_i = (1/2) * v_i * (
  sum_{r in R_micro} r(T_i) / |R_micro| +
  sum_{r in R_macro} r(T_i) / |R_macro|
)
Score_beh = (1/N) * sum_i c_i`,Fu=`You are covering a simplified ICU overnight. A patient with suspected sepsis has six hours until the next full team review, and you need to choose the best treatment plan to maximize the patient's condition at the end of that period.

Right now the patient has low blood pressure, a high infection burden, mild kidney stress, and low fluid overload risk. You may use three kinds of interventions during the first three hours: vasopressors, IV fluids, and antibiotics. Vasopressors raise blood pressure immediately; kidney stress worsening is more likely when vasopressor exposure is repeated. IV fluids do not help immediately, but they usually improve blood pressure starting one hour later and continue helping for about two hours (sometimes closer to three). Antibiotics do not reduce the infection right away; they usually begin lowering infection burden about two hours after they are given. If infection stays high while blood pressure is low, kidney stress gets worse over time. Repeated fluid use can also create fluid overload, which harms the patient later.

You are considering three plans:
- Plan 1: vasopressor at hour 0, vasopressor at hour 1, then wait
- Plan 2: antibiotic at hour 0, IV fluids at hour 1, then wait
- Plan 3: IV fluids at hour 0, vasopressor at hour 1, antibiotic at hour 2

At the end of hour 6, the patient is scored as follows: stable blood pressure is worth 40 points; infection burden contributes 30 points if low, 15 if medium, and 0 if high; kidney stress gives a penalty of 0 for mild, 15 for moderate, and 35 for severe; fluid overload gives an additional 10-point penalty.

Write a description of the patient-treatment dynamics that should be modeled, then decide which plan is best.`,Iu=`model: GPT-5.4`,Lu=`model: GPT-5.4`,Ru=`1) Final decision

Plan 2 is best: antibiotic at hour 0, IV fluids at hour 1, then wait.

2) Key reasoning steps

Patient-treatment dynamics to model:
- State variables over time:
  - Blood pressure: currently low; needs to be stable by hour 6 for +40.
  - Infection burden: currently high; antibiotics lower it only after about 2 hours.
  - Kidney stress: currently mild; worsens if low BP and high infection persist together, and repeated vasopressors also increase risk.
  - Fluid overload: currently low risk; repeated fluids can create a later 10-point penalty.
- Action effects:
  - Vasopressor:
    - Immediate BP improvement in the hour given.
    - Benefit is short-lived.
    - Repeated exposure raises chance kidney stress worsens.
  - IV fluids:
    - No immediate BP benefit.
    - Usually start helping about 1 hour later.
    - Benefit persists about 2 hours, sometimes nearly 3.
    - Repeated use risks later fluid overload.
  - Antibiotics:
    - No immediate effect.
    - Usually begin lowering infection about 2 hours after administration.
- Interaction effect:
  - If infection remains high while BP is low, kidney stress worsens over time.

Plan comparison:
- Plan 1: vasopressor at 0, vasopressor at 1, then wait
  - BP improves early, but likely not sustained to hour 6.
  - No antibiotic, so infection stays high.
  - High infection plus later low BP likely worsens kidney stress.
  - Repeated vasopressors add kidney risk.
  - Likely final profile: unstable BP, high infection, at least moderate kidney stress.
- Plan 3: IV fluids at 0, vasopressor at 1, antibiotic at 2
  - Fluids help starting around hour 1 and may last to hour 3, maybe 4.
  - Vasopressor helps at hour 1 only.
  - Antibiotic given at 2 likely starts helping around hour 4, so infection may improve by hour 6.
  - But there is an early window at hour 0 with low BP and high infection, and BP support may fade before hour 6.
  - Better than Plan 1 on infection, but less reliable than Plan 2 for avoiding kidney worsening and achieving later stability.
- Plan 2: antibiotic at 0, fluids at 1, then wait
  - Antibiotic starts reducing infection around hour 2, giving the longest infection-control window by hour 6.
  - Fluids at 1 start supporting BP around hour 2 and often continue through hours 3-4, sometimes near 5.
  - This reduces the duration of simultaneous low BP and high infection, limiting kidney injury progression.
  - Only one fluid dose, so overload penalty is unlikely.
  - Among the options, this gives the best balance of later BP support, lowest infection by hour 6, and less kidney harm.

Why Plan 2 wins under the scoring:
- Infection score is very important: early antibiotics make low or at least medium infection by hour 6 most plausible.
- Kidney penalty likely lowest in Plan 2 because it avoids repeated vasopressors and shortens the dangerous high-infection/low-BP overlap.
- BP at hour 6 is somewhat uncertain in all plans, but Plan 1 clearly lacks durable support and Plan 3 delays antibiotics too much.
- So expected total score is highest for Plan 2.

3) Fragile assumptions

- I assume “stable blood pressure at hour 6” depends mainly on whether prior fluid benefit can still be present near that time, even though the stated fluid duration is usually only about 2 hours and sometimes closer to 3. If interpreted strictly, none of the plans may reliably secure BP stability at hour 6.
- I assume antibiotics at hour 0 are early enough to lower infection burden by hour 6 more than antibiotics at hour 2.
- I assume kidney stress progression depends on cumulative time with both low BP and high infection, not just a single threshold event.
- I assume one fluid dose does not trigger the 10-point overload penalty.
- I assume repeated vasopressors in Plan 1 meaningfully increase kidney risk relative to the other plans.

4) Confidence (0-1)

0.69`,zu=`1) final decision
Plan 3.

2) concise reasoning trace
- I executed plan_1, plan_2, and plan_3 as separate tool calls on the same model and compared final_score from each result event.
- Returned scores:
  - plan_1: -35
  - plan_2: -5
  - plan_3: 15
- Plan 3 is highest.

3) stdin payload used
- command_args: --simulate_time 6
- one-plan payload per call, e.g. for plan_3:
{"horizon_hours":6,"initial_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"mild","fluid_overload":false},"plans":[{"plan_id":"plan_3","action_timeline":{"0":["iv_fluids"],"1":["vasopressor"],"2":["antibiotic"]}}]}

4) evidence from tool calls
- plan_1 result: {"event":"result","plans":[{"plan_id":"plan_1","final_score":-35,"score_breakdown":{"blood_pressure_points":0,"infection_points":0,"kidney_penalty":35,"fluid_overload_penalty":0}}],"best_plan_id":"plan_1"}
- plan_2 result: {"event":"result","plans":[{"plan_id":"plan_2","final_score":-5,"score_breakdown":{"blood_pressure_points":0,"infection_points":30,"kidney_penalty":35,"fluid_overload_penalty":0}}],"best_plan_id":"plan_2"}
- plan_3 result: {"event":"result","plans":[{"plan_id":"plan_3","final_score":15,"score_breakdown":{"blood_pressure_points":0,"infection_points":30,"kidney_penalty":15,"fluid_overload_penalty":0}}],"best_plan_id":"plan_3"}`,Bu=`root_model_name: icu_sepsis_treatment
requirements:
  general: |
    Build a reusable, action-driven DEVS simulation model for a simplified ICU sepsis treatment problem over a fixed 6-hour horizon. The model must represent one patient state evolving over time under exogenous treatment actions supplied entirely at runtime. Do not encode any candidate plans, named strategies, or plan-specific logic in the model. The same world model must be able to evaluate any valid action timeline using the same transition rules. The simulation must be deterministic: given the same stdin payload, it must always emit the same stdout trace and final result. If the implementation includes uncertainty wording from the narrative such as 'usually' or 'sometimes', resolve it into explicit deterministic rules and parameters documented in the model spec rather than random sampling. Time should be modeled in whole hours with a clear event order within each hour. The model should simulate at least hours 0 through 6 inclusive for tracing, with terminal scoring at the end of hour 6 after all effects due by that time have been applied. The DEVS design should separate concerns into reusable components such as action input handling, patient state evolution, delayed effect scheduling/application, scoring, and trace emission. All state transitions must be explainable from explicit rules. The generated code should be executable from stdin/stdout without requiring interactive input.
  scenario: |
    Model a single ICU patient with the following initial qualitative state at hour 0: blood pressure is low, infection burden is high, kidney stress is mild, and fluid overload risk/status is low/absent. Available intervention types are vasopressor, iv_fluids, and antibiotic. Interventions may be scheduled only during hours 0, 1, and 2 by input actions, but the world model should not hardcode this restriction internally unless driven by scenario validation rules from stdin; the engine should still be generic enough to process any action_timeline within the horizon. Required patient-treatment dynamics: (1) Vasopressor effect: raises blood pressure immediately in the hour it is given. Repeated vasopressor exposure increases the chance/risk of kidney stress worsening; for deterministic modeling, define a concrete rule such as cumulative vasopressor exposures causing kidney stress escalation when exposure count reaches specified thresholds. (2) IV fluids effect: no immediate blood pressure benefit in the same hour they are given; blood pressure support begins one hour later and lasts about two hours, with the builder note implying longer support should be captured, so define a deterministic duration that is explicitly documented and consistent with the note about longer fluid support. Repeated fluid use should accumulate toward fluid overload, with a deterministic rule for when overload becomes present and when its penalty applies. (3) Antibiotic effect: no immediate infection reduction; infection burden begins improving two hours after administration. Define deterministic infection burden transitions over time, such as high to medium to low after explicit delays/exposures, while preserving delayed causality. (4) Ongoing harm interaction: if infection burden remains high while blood pressure is low, kidney stress worsens over time. Define the exact per-hour escalation rule and event ordering needed to determine when this interaction applies. (5) State representation should use discrete categories sufficient for scoring: blood pressure at least low vs stable, infection burden as high/medium/low, kidney stress as mild/moderate/severe, and fluid overload as absent/present. (6) End-of-horizon scoring at the end of hour 6: stable blood pressure = 40 points, otherwise 0; infection burden low = 30, medium = 15, high = 0; kidney stress penalty mild = 0, moderate = 15, severe = 35; fluid overload present = additional 10-point penalty, absent = 0. Final score = blood pressure points + infection points - kidney penalty - fluid overload penalty. The model should also report the final categorical state. The model must be suitable for evaluating any supplied action timeline, though the task narrative mentions three example plans. The checker can supply those plans externally through stdin and compare resulting final scores. The model description should make it possible for generated code to evaluate which externally supplied plan is best without embedding those plans into the simulation logic.
  args_input_output: |
    Input must be a single batch JSON object read from stdin. It must contain an action_timeline field encoding time-indexed actions for the full run. Recommended schema: {"horizon_hours": 6, "initial_state": {"blood_pressure": "low", "infection_burden": "high", "kidney_stress": "mild", "fluid_overload": false}, "action_timeline": [{"time": 0, "actions": ["vasopressor"]}, {"time": 1, "actions": ["vasopressor"]}], "model_params": {...optional deterministic override parameters...}}. Actions for a given hour may be an array of zero or more intervention names. If multiple actions occur in the same hour, define and document deterministic handling. The implementation may support either a single patient run or multiple runs in one payload, but at minimum it must support one complete action_timeline per invocation. Output must be JSONL on stdout: one JSON object per line. Emit structured trace events during execution, for example an initial event, per-hour events, delayed-effect application events, state update events, and a terminal result event. Each trace event should include at least an event type, simulation time, and enough state detail to reconstruct why the final score occurred. The final line must be a result event JSON object containing at least: event="result", horizon_hours, final_state, score_breakdown, total_score, and the normalized action_timeline used. No markdown or explanatory prose should be printed to stdout. Error handling should also use JSONL with a final error event if input is invalid. Determinism requirement: the same stdin payload, including any optional model_params, must always reproduce the identical output trace and final result. The event ordering within each hour must be explicitly defined, for example: apply newly scheduled immediate actions for that hour, apply delayed effects becoming active at that hour, update ongoing interaction harms, compute/post state snapshot. The exact ordering chosen must be documented and used consistently by both simulator and checker.
base_folder: examples/icu_sepsis_treatment
skip_simulation_check: false
only_ensure_executable: false`,Vu=`You are running a small biology lab for an 8-hour day (hour 0..8).

Each sample X, Y, Z must follow:
1) Preparation (1 hour, technician)
2) Incubation (2 hours, incubator)
3) Assay (1 hour, assay machine)

Base rules:
- One technician, one incubator, one assay machine (capacity 1 each)
- Different resources can run in parallel
- No preemption; strict stage order per sample
- At same hour boundary, stage completions are processed before new starts

Additional biosafety lockout (delayed):
- If an incubation starts at hour s, preparation is allowed at hour s
- Preparation is blocked only at hour s+1
- Blocked prep attempts are invalid and do not change state

Scoring:
- completed_by_8 = number of samples whose assay finishes by hour 8
- prep_bonus = +1 for each sample with preparation finished by hour 3
- composite_score = 10 * completed_by_8 + prep_bonus
- tie-breaker: fewer invalid actions

Strategies are evaluated as fixed scripts (no rescheduling inside a strategy):
- Strategy A: serial X then Y then Z
- Strategy B: prepare X/Y/Z first, then downstream stages
- Strategy C: pipelined script with overlap attempts at hours 1/2/3/5/7

Task: choose the best strategy among fixed scripts and explain why.`,Hu=`system_prompt = (
    "You are a careful planning assistant. Solve the task directly without external tools. "
    "Be explicit about assumptions and produce a concise but complete answer."
)
user_prompt = (
    f"Task: {scene.title}\\n\\n"
    f"{scene.task_prompt}\\n\\n"
    "Return format:\\n"
    "1) Final decision\\n"
    "2) Key reasoning steps\\n"
    "3) Fragile assumptions\\n"
    "4) Confidence (0-1)"
)`,Uu=`You are a careful planning assistant. Solve the task directly without external tools. Be explicit about assumptions and produce a concise but complete answer.`,Wu=`Return format:
1) Final decision
2) Key reasoning steps
3) Fragile assumptions
4) Confidence (0-1)`,Gu=`model: GPT-5.4`,X=`model: GPT-5.4`,Ku=`prompt = (
    f"Task title: {scene.title}\\n\\n"
    f"Task prompt:\\n{scene.task_prompt}\\n\\n"
    "You can call \`run_devs_model\` to test hypotheses or plans. "
    "Use batch stdin mode: provide a full action timeline payload in one run.\\n\\n"
    f"Model spec (YAML):\\n{spec_text}\\n\\n"
    "Required procedure:\\n"
    "1) Propose a complete action timeline.\\n"
    "2) Send it as stdin_content in one tool call.\\n"
    "3) Read trace/final events. If needed, revise and resubmit a new full timeline.\\n\\n"
    "Return:\\n"
    "1) final decision\\n"
    "2) concise reasoning trace\\n"
    "3) stdin payload used\\n"
    "4) evidence from tool calls"
)`,qu=`1) Final decision

Choose Strategy C.

2) Key reasoning steps

Workflow to model
- Each sample X, Y, Z must do:
  1. Preparation: 1 hour on the technician
  2. Incubation: 2 hours on the incubator
  3. Assay: 1 hour on the assay machine
- Order is strict: prep → incubation → assay.
- One technician, one incubator, one assay machine; capacity 1 each.
- Different resources may run in parallel.
- No preemption.
- Samples may wait between stages.
- At each integer hour:
  1. Finish any stages ending at that hour
  2. Then attempt that hour’s scripted starts
- Biosafety lockout rule:
  - If an incubation starts at hour s, preparation is still allowed at hour s.
  - Preparation is blocked at hour s+1, i.e. during the second hour of that incubation.
  - For a 2-hour incubation [s,s+2), prep is blocked only on [s+1,s+2).

Evaluate strategies

Strategy A
- 0–1 prep X
- 1–3 incubate X
- 3–4 assay X
- 4–5 prep Y
- 5–7 incubate Y
- 7–8 assay Y
- 8–9 prep Z
All valid.
Completed by 8:
- X finishes assay at 4
- Y finishes assay at 8
- Z not completed
=> completed_by_8 = 2

Prep finished by hour 3:
- X only
=> prep_bonus = 1

Composite = 10*2 + 1 = 21

Invalid actions: 0

Strategy B
- 0–1 prep X
- 1–2 prep Y
- 2–3 prep Z
- 3–5 incubate X
- 5–6 assay X and 5–7 incubate Y
- 7–8 assay Y and 7–9 incubate Z
All valid.
Completed by 8:
- X at 6
- Y at 8
- Z not by 8
=> completed_by_8 = 2

Prep finished by hour 3:
- X at 1, Y at 2, Z at 3
=> prep_bonus = 3

Composite = 10*2 + 3 = 23

Invalid actions: 0

Strategy C
- 0–1 prep X
- At hour 1, X prep completes, then start incubate X and start prep Y
  - This is valid because lockout is not immediate at incubation start.
- 1–2 prep Y, 1–3 incubate X
- Hour 2: attempt prep Z
  - Invalid, because X’s incubation has already run one full hour, so prep is blocked during 2–3.
- Hour 3: X incubation completes, then start assay X and incubate Y
- 3–4 assay X, 3–5 incubate Y
- Hour 5: start assay Y and incubate Z
- 5–6 assay Y, 5–7 incubate Z
- Hour 7: start assay Z
- 7–8 assay Z

Completed by 8:
- X at 4
- Y at 6
- Z at 8
=> completed_by_8 = 3

Prep finished by hour 3:
- X at 1, Y at 2, Z never prepared successfully
=> prep_bonus = 2

Composite = 10*3 + 2 = 32

Invalid actions: 1 (prep Z at hour 2), but no tie on composite, so irrelevant.

Best strategy
- A: 21
- B: 23
- C: 32

So Strategy C is best despite one invalid action, because it completes all three assays by hour 8 under the fixed script evaluation.

3) Fragile assumptions

- I interpret “fixed candidate script” to mean:
  - actions listed at a given hour are attempted exactly then,
  - invalid attempted actions simply fail,
  - later scripted actions are still attempted even if prerequisites were not successfully completed earlier.
- I assume the only extra biosafety restriction is on preparation, not on assay.
- I assume a failed preparation attempt for Z in Strategy C does not somehow prevent the later scripted incubate/assay starts from being evaluated; however, those later starts are treated as valid only if prerequisites are satisfied. Here the script only works if Z is considered prepared before incubation, so this is the one point to watch.
- If strict prerequisite enforcement is applied to every attempted start, then in Strategy C:
  - prep Z at hour 2 is invalid,
  - incubate Z at hour 5 would also be invalid because Z was never prepared,
  - assay Z at hour 7 would also be invalid,
  which would reduce C to only 2 completed samples. Under that stricter reading, Strategy B would win.
- Because the problem emphasizes the lockout timing as the “easy to miss” rule, I judged the intended comparison to focus on that rule, but prerequisite validity remains the main ambiguity.

4) Confidence (0-1)

0.63`,Ju=`1) final decision
Strategy B.

2) concise reasoning trace
- I used the executable model as the decision source and ran A/B/C as three separate episodes.
- Score summary from model outputs:
  - A: composite_score=21, completed_by_8=2, prep_bonus=1, invalid_action_count=0
  - B: composite_score=23, completed_by_8=2, prep_bonus=3, invalid_action_count=0
  - C: composite_score=22, completed_by_8=2, prep_bonus=2, invalid_action_count=3
- Ranking is B > C > A, so B is selected.

3) stdin payload used
Correct DEVS model usage method:
- Run one strategy per tool call (single episode each), not a mixed multi-strategy payload.
- Use payload keys:
  - episode_id: string
  - horizon: int
  - samples: ["X","Y","Z"]
  - action_timeline: [{"hour": int, "actions": [{"type":"start_stage","sample":"X|Y|Z","stage":"prepare|incubate|assay"}]}]
- Use command args: --simulate_time 9

Example (Strategy B):
{"episode_id":"B","horizon":8,"samples":["X","Y","Z"],"action_timeline":[{"hour":0,"actions":[{"type":"start_stage","sample":"X","stage":"prepare"}]},{"hour":1,"actions":[{"type":"start_stage","sample":"Y","stage":"prepare"}]},{"hour":2,"actions":[{"type":"start_stage","sample":"Z","stage":"prepare"}]},{"hour":3,"actions":[{"type":"start_stage","sample":"X","stage":"incubate"}]},{"hour":5,"actions":[{"type":"start_stage","sample":"X","stage":"assay"},{"type":"start_stage","sample":"Y","stage":"incubate"}]},{"hour":7,"actions":[{"type":"start_stage","sample":"Y","stage":"assay"},{"type":"start_stage","sample":"Z","stage":"incubate"}]}]}

4) evidence from tool calls
- Tool call A returned event="result" with composite_score=21 and overall_valid=true.
- Tool call B returned event="result" with composite_score=23 and overall_valid=true.
- Tool call C returned event="result" with composite_score=22 and invalid_action_count=3.
- Decision uses these executable results directly.`,Yu=`system_prompt = (
    "You are an expert DEVS modeling assistant. Convert the task into a strict YAML-ready model spec. "
    "The world model must be reusable and action-driven (no hardcoded candidate plans). "
    "Runtime control comes from one batch stdin payload containing a full action timeline. "
    "Return JSON only (no markdown fences)."
)
user_prompt = (
    "Given the task below, output one JSON object with exactly these top-level keys:
"
    "- root_model_name (string)
"
    "- requirements (object with keys: general, scenario, args_input_output)
"
    "- base_folder (string)
"
    "- skip_simulation_check (boolean)
"
    "- only_ensure_executable (boolean)

"
    "Write requirements in clear English and complete enough for code generation and checker design.
"
    "Hard constraints:
"
    "1) Do not hardcode candidate plans/strategies inside the DEVS world model.
"
    "2) Define stdin as one batch JSON payload with an action_timeline (time-indexed actions).
"
    "3) Define stdout JSONL trace events and a final result event.
"
    "4) Same stdin payload must always reproduce the same output trace/result.

"
    f"Task title: {scene.title}
"
    f"Task prompt:
{scene.task_prompt}

"
    f"Builder note:
{scene.builder_note}"
)`,Xu=`root_model_name: wet_lab_assay_scheduling
requirements:
  general: |-
    Build a reusable, deterministic, action-driven DEVS world model for one 8-hour wet-lab day.
    The model must evaluate externally supplied action timelines and must not hardcode strategy-choice logic.
    The same stdin payload must always produce the same stdout trace/final result.
  scenario: |-
    Samples: X, Y, Z.
    Stage order per sample: prepare (1h, technician) -> incubate (2h, incubator) -> assay (1h, assay_machine).
    Resource capacities: technician=1, incubator=1, assay_machine=1.
    No preemption. Stage prerequisites must hold.
    Completions at each integer hour are processed before starts at that hour.

    Additional biosafety lockout:
    - If incubation starts at hour s, preparation is allowed at hour s.
    - Preparation is blocked at hour s+1 only (lockout activates after one full hour of that incubation).
    - Blocked preparation attempts are invalid and do not change state.

    Strategy comparison in this scene is based on fixed candidate scripts supplied as action timelines.
  args_input_output: |-
    stdin: one JSON object in batch mode.
    Supported payload schemas:

    1) grouped timeline
    {
      "episode_id": "strategy_A",
      "horizon": 8,
      "samples": ["X","Y","Z"],
      "action_timeline": [
        {"hour": 0, "actions": [{"type":"start_stage","sample":"X","stage":"prepare"}]}
      ]
    }

    stdout: JSONL trace and final \`event="result"\` record.
  expected_io_behavior: |-
    The final result must include:
    - completed_samples_by_deadline (count of assay_end <= 8)
    - completed_sample_ids_by_deadline
    - prep_bonus (count of samples with preparation_end <= 3)
    - composite_score = 10 * completed_samples_by_deadline + prep_bonus
    - invalid_action_count
    - score_formula text

    Tie-breaking for strategy comparison:
    1) higher composite_score is better
    2) if tied, fewer invalid_action_count is better
base_folder: tasks/wet_lab_assay_scheduling`,Zu=`You are an agent for model-based task solving.
You must follow this exact workflow and keep it explicit in your trace:
1) Parse the task and extract state variables, actions, delays, constraints, and scoring rules.
2) Draft a full DEVS model spec directly in your own output (YAML text). Do NOT call any tool for spec writing.
3) Call construct_devs_model(spec_yaml=...) exactly once to compile the drafted spec into an executable DEVS project.
4) Read tool return fields carefully (entrypoint, CLI args/stdin schema, stdout contract, example run) and use them as the execution contract.
5) Before final decision, run multiple what-if experiments with run_devs_model.
   - For fixed-script comparison tasks, run at least three candidates (A/B/C or equivalent).
   - Keep inputs valid under the returned schema.
6) In reasoning, cite model outputs (scores, traces, violations) instead of relying only on narrative intuition.
7) Produce final answer with: chosen option, concise evidence chain, and major assumptions.`,Qu={wetlab:{commandArgs:`--simulate_time 9`,constructCall:`construct_devs_model(spec_yaml=<assistant_drafted_spec_yaml>)`,constructResult:`{"status":"ok","entrypoint_module":"devs_project.run_wet_lab_assay_scheduling","required_command_args":"--simulate_time 9","call_mode":"stdin_batch_json_one_episode_per_run","stdin_schema":{"episode_id":"string","horizon":"int","samples":"list[str]","action_timeline":"[{hour, actions:[{type:start_stage, sample, stage:prepare|incubate|assay}]}]"},"stdout_contract":"jsonl trace + final {event:"result"}","example_run":"python -m devs_project.run_wet_lab_assay_scheduling --simulate_time 9 < payload.json"}`,firstUserPrompt:`${Vu}\n\nAdditional instructions for model-spec generation:\n- Output one reusable DEVS world model spec (no hardcoded fixed winner).\n- Output keys must be: root_model_name, requirements{general,scenario,args_input_output}, base_folder, skip_simulation_check, only_ensure_executable.\n- Define stdin as one batch JSON payload with timeline actions.\n- Define stdout JSONL traces plus one final result event.\n- Determinism is required: same stdin must reproduce identical trace/result.`,reasoningBeforeRuns:`I have a valid invocation contract from construct_devs_model. I will run A/B/C as three separate episodes with --simulate_time 9, using stage values prepare|incubate|assay, then compare composite_score and invalid_action_count.`,runAInput:`run_devs_model(command_args="--simulate_time 9", stdin_content='{"episode_id":"A","horizon":8,"samples":["X","Y","Z"],"action_timeline":[{"hour":0,"actions":[{"type":"start_stage","sample":"X","stage":"prepare"}]},{"hour":1,"actions":[{"type":"start_stage","sample":"X","stage":"incubate"}]},{"hour":3,"actions":[{"type":"start_stage","sample":"X","stage":"assay"}]},{"hour":4,"actions":[{"type":"start_stage","sample":"Y","stage":"prepare"}]},{"hour":5,"actions":[{"type":"start_stage","sample":"Y","stage":"incubate"}]},{"hour":7,"actions":[{"type":"start_stage","sample":"Y","stage":"assay"}]},{"hour":8,"actions":[{"type":"start_stage","sample":"Z","stage":"prepare"}]}]}')`,runAResult:`{"event":"result","episode_id":"A","completed_samples_by_deadline":2,"completed_sample_ids_by_deadline":["X","Y"],"prep_bonus":1,"prep_bonus_sample_ids":["X"],"score_formula":"composite_score = 10 * completed_samples_by_deadline + prep_bonus; tie-breaker fewer invalid_action_count","composite_score":21,"score":21,"invalid_action_count":0,"overall_valid":true,"per_sample_final_status":{"X":"completed","Y":"completed","Z":"preparing"},"horizon":8}`,runBInput:`run_devs_model(command_args="--simulate_time 9", stdin_content='{"episode_id":"B","horizon":8,"samples":["X","Y","Z"],"action_timeline":[{"hour":0,"actions":[{"type":"start_stage","sample":"X","stage":"prepare"}]},{"hour":1,"actions":[{"type":"start_stage","sample":"Y","stage":"prepare"}]},{"hour":2,"actions":[{"type":"start_stage","sample":"Z","stage":"prepare"}]},{"hour":3,"actions":[{"type":"start_stage","sample":"X","stage":"incubate"}]},{"hour":5,"actions":[{"type":"start_stage","sample":"X","stage":"assay"},{"type":"start_stage","sample":"Y","stage":"incubate"}]},{"hour":7,"actions":[{"type":"start_stage","sample":"Y","stage":"assay"},{"type":"start_stage","sample":"Z","stage":"incubate"}]}]}')`,runBResult:`{"event":"result","episode_id":"B","completed_samples_by_deadline":2,"completed_sample_ids_by_deadline":["X","Y"],"prep_bonus":3,"prep_bonus_sample_ids":["X","Y","Z"],"score_formula":"composite_score = 10 * completed_samples_by_deadline + prep_bonus; tie-breaker fewer invalid_action_count","composite_score":23,"score":23,"invalid_action_count":0,"overall_valid":true,"per_sample_final_status":{"X":"completed","Y":"completed","Z":"incubating"},"horizon":8}`,runCInput:`run_devs_model(command_args="--simulate_time 9", stdin_content='{"episode_id":"C","horizon":8,"samples":["X","Y","Z"],"action_timeline":[{"hour":0,"actions":[{"type":"start_stage","sample":"X","stage":"prepare"}]},{"hour":1,"actions":[{"type":"start_stage","sample":"X","stage":"incubate"},{"type":"start_stage","sample":"Y","stage":"prepare"}]},{"hour":2,"actions":[{"type":"start_stage","sample":"Z","stage":"prepare"}]},{"hour":3,"actions":[{"type":"start_stage","sample":"X","stage":"assay"},{"type":"start_stage","sample":"Y","stage":"incubate"}]},{"hour":5,"actions":[{"type":"start_stage","sample":"Y","stage":"assay"},{"type":"start_stage","sample":"Z","stage":"incubate"}]},{"hour":7,"actions":[{"type":"start_stage","sample":"Z","stage":"assay"}]}]}')`,runCResult:`{"event":"result","episode_id":"C","completed_samples_by_deadline":2,"completed_sample_ids_by_deadline":["X","Y"],"prep_bonus":2,"prep_bonus_sample_ids":["X","Y"],"score_formula":"composite_score = 10 * completed_samples_by_deadline + prep_bonus; tie-breaker fewer invalid_action_count","composite_score":22,"score":22,"invalid_action_count":3,"overall_valid":false,"per_sample_final_status":{"X":"completed","Y":"completed","Z":"not_started"},"horizon":8}`,reasoningAfterRuns:`Executable comparison gives A=21, B=23, C=22.
B is best by primary metric (composite_score), and also has zero invalid actions.
C loses because lockout-driven invalid actions reduce effective completion quality.`},icu:{commandArgs:`--simulate_time 6`,constructCall:`construct_devs_model(spec_yaml=<assistant_drafted_spec_yaml>)`,constructResult:`{"status":"ok","entrypoint_module":"devs_project.run_icu_sepsis_treatment","required_command_args":"--simulate_time 6","call_mode":"stdin_batch_json_single_or_multi_plan","stdin_schema":{"horizon_hours":"int","initial_state":"dict","plans":"[{plan_id, action_timeline}]"},"stdout_contract":"jsonl trace + final {event:"result", plans:[...], best_plan_id}"}`,firstUserPrompt:`${Fu}\n\nAdditional instructions for model-spec generation:\n- Build one reusable action-driven DEVS world model (not plan-specific logic).\n- Output keys must be: root_model_name, requirements{general,scenario,args_input_output}, base_folder, skip_simulation_check, only_ensure_executable.\n- Define stdin as one batch payload containing initial state + candidate action timelines.\n- Define stdout as JSONL trace + final result event with score breakdown.\n- Resolve narrative uncertainty into explicit deterministic transition rules.`,reasoningBeforeRuns:`I will run the three candidate plans under the same constructed model and compare final_score plus score_breakdown from each result event.`,runAInput:`run_devs_model(command_args="--simulate_time 6", stdin_content='{"horizon_hours":6,"initial_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"mild","fluid_overload":false},"plans":[{"plan_id":"plan_1","action_timeline":{"0":["vasopressor"],"1":["vasopressor"]}}]}')`,runAResult:`{"event":"result","simulation_id":"icu_sepsis_treatment_run","horizon_hours":6,"plans":[{"plan_id":"plan_1","final_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"severe","fluid_overload":false},"final_score":-35,"score_breakdown":{"blood_pressure_points":0,"infection_points":0,"kidney_penalty":35,"fluid_overload_penalty":0}}],"best_plan_id":"plan_1"}`,runBInput:`run_devs_model(command_args="--simulate_time 6", stdin_content='{"horizon_hours":6,"initial_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"mild","fluid_overload":false},"plans":[{"plan_id":"plan_2","action_timeline":{"0":["antibiotic"],"1":["iv_fluids"]}}]}')`,runBResult:`{"event":"result","simulation_id":"icu_sepsis_treatment_run","horizon_hours":6,"plans":[{"plan_id":"plan_2","final_state":{"blood_pressure":"low","infection_burden":"low","kidney_stress":"severe","fluid_overload":false},"final_score":-5,"score_breakdown":{"blood_pressure_points":0,"infection_points":30,"kidney_penalty":35,"fluid_overload_penalty":0}}],"best_plan_id":"plan_2"}`,runCInput:`run_devs_model(command_args="--simulate_time 6", stdin_content='{"horizon_hours":6,"initial_state":{"blood_pressure":"low","infection_burden":"high","kidney_stress":"mild","fluid_overload":false},"plans":[{"plan_id":"plan_3","action_timeline":{"0":["iv_fluids"],"1":["vasopressor"],"2":["antibiotic"]}}]}')`,runCResult:`{"event":"result","simulation_id":"icu_sepsis_treatment_run","horizon_hours":6,"plans":[{"plan_id":"plan_3","final_state":{"blood_pressure":"low","infection_burden":"low","kidney_stress":"moderate","fluid_overload":false},"final_score":15,"score_breakdown":{"blood_pressure_points":0,"infection_points":30,"kidney_penalty":15,"fluid_overload_penalty":0}}],"best_plan_id":"plan_3"}`,reasoningAfterRuns:`Model outputs rank plan_3 (15) > plan_2 (-5) > plan_1 (-35).
plan_3 is the only one that reaches low infection with moderate kidney penalty under these deterministic delays.`}},$u=[{id:`sa`,title:`Strategic Airlift (SA) Case`,tag:`Benchmark example from devs_fast + gpt-5.2 run artifact.`,inputText:Mu,sources:{input:`benchmark/SA/SA.yaml`,plan:`devs_tester2/active_runs/devs_fast_gpt-5.2/SA_example/strategic_airlift/devs_project/_analysis_logs/snapshot_stage_2_construction.json`,code:`devs_tester2/active_runs/devs_fast_gpt-5.2/SA_example/strategic_airlift/devs_project/`,eval:`devs_tester2/active_runs/devs_fast_gpt-5.2/SA_example/strategic_airlift_eval_results/summary.json + benchmark/SA/checker.py`},planTree:{id:`sa-root`,name:`StrategicAirlift_D0`,type:`coupled`,summary:`Facility generation -> queue/coordinator assignment -> fleet cycles -> destination delivery logs`,initArgs:[`total_duration`,`num_aircraft`,`pallet_interval`,`pallet_expiration_time`,`flight_time`,`unload_time`,`return_time`,`maintenance_time`],initArgsTyped:[{name:`total_duration`,type:`float`},{name:`num_aircraft`,type:`int`},{name:`pallet_interval`,type:`float`},{name:`pallet_expiration_time`,type:`float`},{name:`flight_time`,type:`float`},{name:`unload_time`,type:`float`},{name:`return_time`,type:`float`},{name:`maintenance_time`,type:`float`}],ports:{input:[],output:[]},portsTyped:{input:[],output:[]},details:{function:`Top-level coupled model wires four major subsystems: FacilityGenerator, OpsCenterQueueCoordinator, AircraftFleet, and DestinationSink.`,logging:`Root container itself does not emit KPI logs; required events are produced by submodels (facility, queue, coordinator, aircraft, destination).`,schemas:`No boundary ports. Config args define deterministic timing and fleet size. Event schema is enforced by checker on generated JSONL records.`},children:[{id:`sa-facility`,name:`FacilityGenerator`,type:`atomic`,summary:`Deterministic pallet source at t=0 and fixed interval thereafter`,initArgs:[`pallet_interval`,`pallet_expiration_time`],initArgsTyped:[{name:`pallet_interval`,type:`float`},{name:`pallet_expiration_time`,type:`float`}],ports:{input:[],output:[`pallet_out`]},portsTyped:{input:[],output:[{name:`pallet_out`,type:`dict`}]},details:{function:`Emits pallet_out={pallet_id,gen_time,expiration_time}. expiration_time is absolute and equals gen_time + pallet_expiration_time.`,logging:`Logs pallet_generated with payload {pallet_id, expiration_time}.`,schemas:`pallet_out carries full pallet tuple for queue insertion and deadline checks.`},children:[]},{id:`sa-ops`,name:`OpsCenterQueueCoordinator`,type:`coupled`,summary:`Queue with active expiration + idle-aircraft assignment coordinator`,initArgs:[`num_aircraft`],initArgsTyped:[{name:`num_aircraft`,type:`int`}],ports:{input:[`pallet_in`,`aircraft_idle_in`],output:[`assignment_out`]},portsTyped:{input:[{name:`pallet_in`,type:`dict`},{name:`aircraft_idle_in`,type:`dict`}],output:[{name:`assignment_out`,type:`dict`}]},details:{function:`Couples LoadingQueueWithExpiration and IdleAssignmentCoordinator through dequeue request/response and queue status signals.`,logging:`assignment_created is emitted by IdleAssignmentCoordinator; queue logs are emitted by LoadingQueueWithExpiration.`,schemas:`assignment_out={aircraft_id,pallet}; queue status and dequeue handshake are internal couplings.`},children:[{id:`sa-queue`,name:`LoadingQueueWithExpiration`,type:`atomic`,summary:`FIFO queue with exact expiration at expiration_time`,initArgs:[],initArgsTyped:[],ports:{input:[`pallet_in`,`dequeue_req_in`],output:[`pallet_out`,`queue_status_out`]},portsTyped:{input:[{name:`pallet_in`,type:`dict`},{name:`dequeue_req_in`,type:`dict`}],output:[{name:`pallet_out`,type:`dict`},{name:`queue_status_out`,type:`dict`}]},details:{function:`Applies arrival->expiration->dequeue ordering at same timestamp. Emits queue_size updates after enqueue/expire/dequeue.`,logging:`Logs pallet_queued and pallet_expired with required payload fields.`,schemas:`pallet_in={pallet_id,gen_time,expiration_time}; dequeue_req_in={request:"next"}; pallet_out excludes expiration_time by design.`},children:[]},{id:`sa-assign`,name:`IdleAssignmentCoordinator`,type:`atomic`,summary:`Matches lowest-id idle aircraft with next FIFO pallet`,initArgs:[`num_aircraft`],initArgsTyped:[{name:`num_aircraft`,type:`int`}],ports:{input:[`aircraft_idle_in`,`queue_status_in`,`pallet_in`],output:[`assignment_out`,`dequeue_req_out`]},portsTyped:{input:[{name:`aircraft_idle_in`,type:`dict`},{name:`queue_status_in`,type:`dict`},{name:`pallet_in`,type:`dict`}],output:[{name:`assignment_out`,type:`dict`},{name:`dequeue_req_out`,type:`dict`}]},details:{function:`Tracks known idle aircraft and queue size; dispatches dequeue request then emits assignment_created when pallet arrives.`,logging:`Logs assignment_created plus model lifecycle diagnostics.`,schemas:`assignment_out={aircraft_id,pallet:{pallet_id,gen_time}}; dequeue_req_out={request:"next"}.`},children:[]}]},{id:`sa-fleet`,name:`AircraftFleet`,type:`coupled`,summary:`Fleet-level broadcast + per-aircraft mission/maintenance cycles + event mux`,initArgs:[`num_aircraft`,`flight_time`,`unload_time`,`return_time`,`maintenance_time`],initArgsTyped:[{name:`num_aircraft`,type:`int`},{name:`flight_time`,type:`float`},{name:`unload_time`,type:`float`},{name:`return_time`,type:`float`},{name:`maintenance_time`,type:`float`}],ports:{input:[`assignment_in`],output:[`aircraft_idle_out`,`delivery_out`]},portsTyped:{input:[{name:`assignment_in`,type:`dict`}],output:[{name:`aircraft_idle_out`,type:`dict`},{name:`delivery_out`,type:`dict`}]},details:{function:`Broadcasts assignments to AircraftUnit instances, merges idle/delivery events, and seeds initial idle signals.`,logging:`Aircraft mission and maintenance events are emitted by child atomic models.`,schemas:`delivery_out={pallet_id,aircraft_id,latency}; aircraft_idle_out={aircraft_id}.`},children:[{id:`sa-fleet-mux`,name:`FleetEventMux`,type:`atomic`,summary:`Fleet-level idle/delivery mux; seeds initial idle aircraft notifications`,initArgs:[`num_aircraft`],initArgsTyped:[{name:`num_aircraft`,type:`int`}],ports:{input:[`aircraft_idle_in`,`delivery_in`],output:[`aircraft_idle_out`,`delivery_out`]},portsTyped:{input:[{name:`aircraft_idle_in`,type:`dict`},{name:`delivery_in`,type:`dict`}],output:[{name:`aircraft_idle_out`,type:`dict`},{name:`delivery_out`,type:`dict`}]},details:{function:`Collects per-aircraft idle/delivery events and forwards them as fleet-level outputs.`,logging:`Seeds initial idle events for aircraft_id=1..num_aircraft at t=0.`,schemas:`aircraft_idle_out={aircraft_id}; delivery_out={pallet_id,aircraft_id,latency}.`},children:[]},{id:`sa-aircraft-unit-template`,name:`AircraftUnit (per aircraft instance)`,type:`coupled`,summary:`Each aircraft_i has a mission controller + maintenance controller`,initArgs:[`aircraft_id`,`flight_time`,`unload_time`,`return_time`,`maintenance_time`],initArgsTyped:[{name:`aircraft_id`,type:`int`},{name:`flight_time`,type:`float`},{name:`unload_time`,type:`float`},{name:`return_time`,type:`float`},{name:`maintenance_time`,type:`float`}],ports:{input:[`assignment_in`],output:[`idle_out`,`delivery_out`]},portsTyped:{input:[{name:`assignment_in`,type:`dict`}],output:[{name:`idle_out`,type:`dict`},{name:`delivery_out`,type:`dict`}]},details:{function:`assignment_in enters mission controller; maintenance_start and maintenance_done are coupled internally; idle_out and delivery_out are exported upward.`,logging:`Mission controller emits depart/return/maintenance_start; maintenance controller emits maintenance_end.`,schemas:`delivery_out={pallet_id,aircraft_id,latency}; idle_out={aircraft_id}.`},children:[{id:`sa-aircraft-mission`,name:`AircraftMissionController`,type:`coupled`,summary:`Mission phase logic with MissionStateMachine + MissionLogEmitter`,initArgs:[`aircraft_id`,`flight_time`,`unload_time`,`return_time`],initArgsTyped:[{name:`aircraft_id`,type:`int`},{name:`flight_time`,type:`float`},{name:`unload_time`,type:`float`},{name:`return_time`,type:`float`}],ports:{input:[`assignment_in`,`maintenance_done_in`],output:[`delivery_out`,`maintenance_start_out`]},portsTyped:{input:[{name:`assignment_in`,type:`dict`},{name:`maintenance_done_in`,type:`dict`}],output:[{name:`delivery_out`,type:`dict`},{name:`maintenance_start_out`,type:`dict`}]},details:{function:`Runs mission state transitions: IDLE -> FLYING -> UNLOADING -> RETURNING.`,logging:`Emits mission event records via log_out to MissionLogEmitter.`,schemas:`delivery_out includes latency; maintenance_start_out triggers maintenance controller.`},children:[{id:`sa-aircraft-mission-sm`,name:`MissionStateMachine`,type:`atomic`,summary:`Core mission DEVS state machine for depart/unload/return timing`,initArgs:[`aircraft_id`,`flight_time`,`unload_time`,`return_time`],initArgsTyped:[{name:`aircraft_id`,type:`int`},{name:`flight_time`,type:`float`},{name:`unload_time`,type:`float`},{name:`return_time`,type:`float`}],ports:{input:[`assignment_in`,`maintenance_done_in`],output:[`delivery_out`,`maintenance_start_out`,`log_out`]},portsTyped:{input:[{name:`assignment_in`,type:`dict`},{name:`maintenance_done_in`,type:`dict`}],output:[{name:`delivery_out`,type:`dict`},{name:`maintenance_start_out`,type:`dict`},{name:`log_out`,type:`dict`}]},details:{function:`Generates depart/return/maintenance_start events and delivery payloads with checker-consistent cycle timing.`,logging:`Mission events are emitted as log records through log_out port.`,schemas:`delivery_out={pallet_id,aircraft_id,latency}; log_out={time,entity,event,payload}.`},children:[]},{id:`sa-aircraft-mission-log`,name:`MissionLogEmitter`,type:`atomic`,summary:`Consumes log_out records and writes standardized mission logs`,initArgs:[],initArgsTyped:[],ports:{input:[`log_in`],output:[]},portsTyped:{input:[{name:`log_in`,type:`dict`}],output:[]},details:{function:`Writes mission event records to simulation logger without altering payload semantics.`,logging:`No additional transformation; pass-through logging behavior.`,schemas:`log_in uses event schema {time,entity,event,payload}.`},children:[]}]},{id:`sa-aircraft-maint`,name:`AircraftMaintenanceController`,type:`atomic`,summary:`Maintenance phase, then idle signal emission`,initArgs:[`aircraft_id`,`maintenance_time`],initArgsTyped:[{name:`aircraft_id`,type:`int`},{name:`maintenance_time`,type:`float`}],ports:{input:[`maintenance_start_in`],output:[`idle_out`,`maintenance_done_out`]},portsTyped:{input:[{name:`maintenance_start_in`,type:`dict`}],output:[{name:`idle_out`,type:`dict`},{name:`maintenance_done_out`,type:`dict`}]},details:{function:`On maintenance_start_in, runs for maintenance_time then emits idle_out and maintenance_done_out.`,logging:`Logs maintenance_end at maintenance completion time.`,schemas:`idle_out={aircraft_id}; maintenance_done_out={aircraft_id}.`},children:[]}]}]},{id:`sa-dst`,name:`DestinationSink`,type:`atomic`,summary:`Records pallet_delivered events and final delivered count`,initArgs:[],initArgsTyped:[],ports:{input:[`delivery_in`],output:[]},portsTyped:{input:[{name:`delivery_in`,type:`dict`}],output:[]},details:{function:`On each delivery_in message, logs pallet_delivered at current simulation time.`,logging:`Logs model_created, model_initialized, pallet_delivered, model_finalized.`,schemas:`delivery_in payload: {pallet_id:int, aircraft_id:int, latency:float}.`},children:[]}]},codeGraph:{nodes:[{id:`n1`,label:`StrategicAirlift_D0 (coupled)`,modelType:`coupled`,x:480,y:46,ports:{in:[],out:[]},portsTyped:{in:[],out:[]},file:`StrategicAirlift_D0.py`,methods:{__init__:`    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        total_duration: float,
        num_aircraft: int,
        pallet_interval: float,
        pallet_expiration_time: float,
        flight_time: float,
        unload_time: float,
        return_time: float,
        maintenance_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            total_duration (float): Total simulation time horizon in seconds (controller stops at this time).
            num_aircraft (int): Number of aircraft (>=1). Aircraft IDs are 1..num_aircraft.
            pallet_interval (float): Seconds between pallet generations.
            pallet_expiration_time (float): Seconds after generation when a pallet expires if still in queue.
            flight_time (float): Seconds for aircraft to fly facility -> destination.
            unload_time (float): Seconds to unload at destination; delivery recorded at end of this interval.
            return_time (float): Seconds for aircraft to fly destination -> facility.
            maintenance_time (float): Seconds aircraft spends in maintenance after returning.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Internal/hardcoded parameters (not part of public ports)
        self.param: dict = {
            "model_path": "StrategicAirlift_D0.StrategicAirlift_D0",
        }

        # Normalize configuration
        total_duration_n = float(total_duration)
        num_aircraft_n = int(num_aircraft)
        pallet_interval_n = float(pallet_interval)
        pallet_expiration_time_n = float(pallet_expiration_time)
        flight_time_n = float(flight_time)
        unload_time_n = float(unload_time)
        return_time_n = float(return_time)
        maintenance_time_n = float(maintenance_time)

        # No boundary ports (self-contained model).

        # Instantiate sub-components
        facility = FacilityGenerator(
            name="facility",
            parent=self,
            pallet_interval=pallet_interval_n,
            pallet_expiration_time=pallet_expiration_time_n,
        )

        ops_center = OpsCenterQueueCoordinator(
            name="ops_center",
            parent=self,
            num_aircraft=num_aircraft_n,
        )

        fleet = AircraftFleet(
            name="fleet",
            parent=self,
            num_aircraft=num_aircraft_n,
            flight_time=flight_time_n,
            unload_time=unload_time_n,
            return_time=return_time_n,
            maintenance_time=maintenance_time_n,
        )

        destination = DestinationSink(
            name="destination",
            parent=self,
        )

        # Register components
        self.add_component(facility)
        self.add_component(ops_center)
        self.add_component(fleet)
        self.add_component(destination)

        # Define internal couplings (IC)
        # Facility -> Ops Center (pallets)
        self.add_coupling(facility.output["pallet_out"], ops_center.input["pallet_in"])

        # Fleet -> Ops Center (idle aircraft notifications)
        self.add_coupling(fleet.output["aircraft_idle_out"], ops_center.input["aircraft_idle_in"])

        # Ops Center -> Fleet (assignment commands)
        self.add_coupling(ops_center.output["assignment_out"], fleet.input["assignment_in"])

        # Fleet -> Destination (delivery notifications)
        self.add_coupling(fleet.output["delivery_out"], destination.input["delivery_in"])`}},{id:`n2`,label:`FacilityGenerator`,modelType:`atomic`,x:90,y:140,ports:{in:[],out:[`pallet_out`]},portsTyped:{in:[],out:[{name:`pallet_out`,type:`dict`}]},file:`StrategicAirlift_D0_libs/FacilityGenerator.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None, pallet_interval: float, pallet_expiration_time: float):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            pallet_interval (float): Seconds between pallet generations; next_generation_time increments by this value.
            pallet_expiration_time (float): Seconds after generation when a pallet expires if still in queue;
                expiration_time = gen_time + pallet_expiration_time.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        if not isinstance(pallet_interval, float):
            raise TypeError("pallet_interval must be a float")
        if not isinstance(pallet_expiration_time, float):
            raise TypeError("pallet_expiration_time must be a float")
        if pallet_interval <= 0.0:
            raise ValueError("pallet_interval must be > 0.0")
        if pallet_expiration_time < 0.0:
            raise ValueError("pallet_expiration_time must be >= 0.0")

        # Output port
        self.add_out_port(Port(dict, "pallet_out"))

        # Configuration
        self.pallet_interval = pallet_interval
        self.pallet_expiration_time = pallet_expiration_time

        # Internal hardcoded parameters
        self.param = {
            "phase_emit": "EMIT"
        }

        # Internal state
        self.next_pallet_id = 1
        self.next_generation_time = 0.0

        # Prepared output for next lambdaf (dict)
        # structure:
        #   pallet_id (int)
        #   gen_time (float)
        #   expiration_time (float)
        self._out_pallet_prepared = {}`,initialize:`    def initialize(self):
        # Initial state required by specification
        self.next_pallet_id = 1
        self.next_generation_time = 0.0

        # Prepare the very first pallet to be emitted at T=0.0
        gen_time = 0.0
        self._out_pallet_prepared = {
            "pallet_id": int(self.next_pallet_id),
            "gen_time": float(gen_time),
            "expiration_time": float(gen_time + self.pallet_expiration_time),
        }

        # Update "next" pointers (deterministic)
        self.next_pallet_id += 1
        self.next_generation_time = gen_time + self.pallet_interval

        # Schedule immediate output at T=0.0
        self.hold_in(self.param["phase_emit"], 0.0)`,lambdaf:`    def lambdaf(self):
        # Output only (no state changes, no logging)
        if self.phase == self.param["phase_emit"]:
            self.output["pallet_out"].add(self._out_pallet_prepared)`,deltint:`    def deltint(self):
        # Called right after lambdaf at the same simulation time
        if self.phase == self.param["phase_emit"]:
            t_now = float(get_current_time())

            # Log the pallet that was generated/emitted at this time
            self.logger.info(
                {
                    "time": t_now,
                    "entity": "facility",
                    "event": "pallet_generated",
                    "payload": {
                        "pallet_id": int(self._out_pallet_prepared["pallet_id"]),
                        "expiration_time": float(self._out_pallet_prepared["expiration_time"]),
                    },
                },
                log_type="PROCESS",
            )

            # Prepare the next pallet, scheduled at self.next_generation_time
            next_gen_time = float(self.next_generation_time)
            self._out_pallet_prepared = {
                "pallet_id": int(self.next_pallet_id),
                "gen_time": float(next_gen_time),
                "expiration_time": float(next_gen_time + self.pallet_expiration_time),
            }

            # Advance deterministic schedule
            self.next_pallet_id += 1
            self.next_generation_time = next_gen_time + self.pallet_interval

            # Schedule next internal event after exactly pallet_interval seconds
            sigma = max(0.0, next_gen_time - t_now)
            self.hold_in(self.param["phase_emit"], sigma)
        else:
            # Should not happen; remain passive
            self.hold_in(self.phase, float("inf"))`,deltext:`    def deltext(self, e: float):
        # No external inputs required by specification; keep current schedule
        remaining = self.ta() - float(e)
        self.hold_in(self.phase, max(0.0, remaining))`,exit:`    def exit(self):
        # No extra stdout logs beyond required event logs
        return`}},{id:`n3`,label:`OpsCenterQueueCoordinator (coupled)`,modelType:`coupled`,x:300,y:140,ports:{in:[`pallet_in`,`aircraft_idle_in`],out:[`assignment_out`]},portsTyped:{in:[{name:`pallet_in`,type:`dict`},{name:`aircraft_idle_in`,type:`dict`}],out:[{name:`assignment_out`,type:`dict`}]},file:`StrategicAirlift_D0_libs/OpsCenterQueueCoordinator.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None, num_aircraft: int):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            num_aircraft (int): Number of aircraft in the fleet (>=1).
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Hardcoded internal parameters (none required for this coupled container).
        self.param: dict = {
            "container_role": "queue_and_assignment_coupler"
        }

        # System boundary ports
        self.add_in_port(Port(dict, "pallet_in"))
        self.add_in_port(Port(dict, "aircraft_idle_in"))
        self.add_out_port(Port(dict, "assignment_out"))

        # Sub-model instances
        loading_queue = LoadingQueueWithExpiration(
            name="loading_queue",
            parent=self,
        )

        idle_assignment_coordinator = IdleAssignmentCoordinator(
            name="idle_assignment_coordinator",
            parent=self,
            num_aircraft=num_aircraft,
        )

        # Register components
        self.add_component(loading_queue)
        self.add_component(idle_assignment_coordinator)

        # Couplings
        # EIC: external inputs -> internal submodels
        self.add_coupling(self.input["pallet_in"], loading_queue.input["pallet_in"])
        self.add_coupling(self.input["aircraft_idle_in"], idle_assignment_coordinator.input["aircraft_idle_in"])

        # IC: queue <-> coordinator request/response loop + queue status feedback
        self.add_coupling(idle_assignment_coordinator.output["dequeue_req_out"], loading_queue.input["dequeue_req_in"])
        self.add_coupling(loading_queue.output["pallet_out"], idle_assignment_coordinator.input["pallet_in"])
        self.add_coupling(loading_queue.output["queue_status_out"], idle_assignment_coordinator.input["queue_status_in"])

        # EOC: internal outputs -> external outputs
        self.add_coupling(idle_assignment_coordinator.output["assignment_out"], self.output["assignment_out"])`}},{id:`n4`,label:`LoadingQueueWithExpiration`,modelType:`atomic`,x:220,y:265,ports:{in:[`pallet_in`,`dequeue_req_in`],out:[`pallet_out`,`queue_status_out`]},portsTyped:{in:[{name:`pallet_in`,type:`dict`},{name:`dequeue_req_in`,type:`dict`}],out:[{name:`pallet_out`,type:`dict`},{name:`queue_status_out`,type:`dict`}]},file:`StrategicAirlift_D0_libs/OpsCenterQueueCoordinator_libs/LoadingQueueWithExpiration.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "pallet_in"))
        self.add_in_port(Port(dict, "dequeue_req_in"))
        self.add_out_port(Port(dict, "pallet_out"))
        self.add_out_port(Port(dict, "queue_status_out"))

        # Internal hardcoded parameters
        self.param = {
            "infinity": math.inf
        }

        # State
        # queue: list[dict]
        #   - (dict): pallet
        #       pallet_id (int): Unique pallet identifier
        #       gen_time (float): Generation time
        #       expiration_time (float): Absolute expiration time while in queue
        self.queue = []
        self.total_expired = 0

        # Pending outputs to be emitted in phase EMIT
        self._pending_pallet_out = []         # list[dict] each: {'pallet_id': int, 'gen_time': float}
        self._pending_queue_status_out = []   # list[dict] each: {'queue_size': int}

        # Initialize phase (will be set in initialize())
        self.hold_in("WAIT", self.param["infinity"])`,initialize:`    def initialize(self):
        self.queue = []
        self.total_expired = 0
        self._pending_pallet_out = []
        self._pending_queue_status_out = []
        self._schedule_next(t_now=get_current_time())`,exit:`    def exit(self):
        # No additional stdout events beyond the required operational events.
        return`,lambdaf:`    def lambdaf(self):
        if self.phase == "EMIT":
            for msg in self._pending_pallet_out:
                self.output["pallet_out"].add(msg)
            for msg in self._pending_queue_status_out:
                self.output["queue_status_out"].add(msg)`,deltint:`    def deltint(self):
        t_now = get_current_time()
        old_phase = self.phase

        if old_phase == "WAIT":
            # Internal timeout corresponds to the next expiration time
            expired_any = self._expire_at_time(t_now=t_now)
            if expired_any:
                # One queue status update after the expiration removals batch (size changed)
                self._pending_queue_status_out.append({"queue_size": int(len(self.queue))})

        elif old_phase == "EMIT":
            # Outputs have already been emitted in lambdaf; now clear pending output buffers.
            self._pending_pallet_out = []
            self._pending_queue_status_out = []

        self._schedule_next(t_now=t_now)`,deltext:`    def deltext(self, e: float):
        t_now = get_current_time()

        # Same-timestamp ordering requirement (queue-side):
        # 1) arrivals/enqueue first
        # 2) expiration removals for expiration_time == t_now
        # Dequeue requests are processed after expiration to prevent assignment of expired pallets.
        self._process_arrivals(t_now=t_now)
        self._process_expirations_due_now(t_now=t_now)
        self._process_dequeue_requests(t_now=t_now)

        self._schedule_next(t_now=t_now)`,deltcon:`    def deltcon(self):
        """
        Confluent transition:
            - For phase WAIT (expiration-driven internal events), process external first to guarantee:
              arrivals/enqueue happen before expiration at the same timestamp.
            - For phase EMIT (sigma=0), process internal first to clear pending outputs already emitted by lambdaf,
              then process external.
        Note: In DEVS, lambdaf is executed before deltcon when an internal event is scheduled.
        """
        t_now = get_current_time()
        old_phase = self.phase

        if old_phase == "WAIT":
            # External first
            self._process_arrivals(t_now=t_now)
            self._process_expirations_due_now(t_now=t_now)
            self._process_dequeue_requests(t_now=t_now)

            # Then internal (may attempt expiration again; should be no-ops if already expired in external processing)
            expired_any = self._expire_at_time(t_now=t_now)
            if expired_any:
                self._pending_queue_status_out.append({"queue_size": int(len(self.queue))})

        else:
            # Internal first (especially important for EMIT to avoid re-emitting already-emitted pending messages)
            if old_phase == "EMIT":
                self._pending_pallet_out = []
                self._pending_queue_status_out = []

            # Then external
            self._process_arrivals(t_now=t_now)
            self._process_expirations_due_now(t_now=t_now)
            self._process_dequeue_requests(t_now=t_now)

        self._schedule_next(t_now=t_now)`,_process_arrivals:`    def _process_arrivals(self, t_now: float):
        for pallet in self.input["pallet_in"].values:
            # Expected structure:
            # pallet_id (int), gen_time (float), expiration_time (float)
            self.queue.append(
                {
                    "pallet_id": int(pallet["pallet_id"]),
                    "gen_time": float(pallet["gen_time"]),
                    "expiration_time": float(pallet["expiration_time"]),
                }
            )

            self.logger.info(
                {
                    "time": float(t_now),
                    "entity": "queue",
                    "event": "pallet_queued",
                    "payload": {
                        "pallet_id": int(pallet["pallet_id"]),
                        "queue_size": int(len(self.queue)),
                    },
                },
                log_type="PROCESS",
            )

            # After enqueue, queue size changed -> status update
            self._pending_queue_status_out.append({"queue_size": int(len(self.queue))})`,_process_expirations_due_now:`    def _process_expirations_due_now(self, t_now: float):
        # Apply the required "active expiration" check at current timestamp for external transitions.
        expired_any = self._expire_at_time(t_now=t_now)
        if expired_any:
            # One status update after expiration removals batch
            self._pending_queue_status_out.append({"queue_size": int(len(self.queue))})`,_process_dequeue_requests:`    def _process_dequeue_requests(self, t_now: float):
        for req in self.input["dequeue_req_in"].values:
            # Expected structure:
            # request (str): "next"
            if str(req.get("request", "")) != "next":
                continue

            if len(self.queue) > 0:
                pallet = self.queue.pop(0)
                self._pending_pallet_out.append(
                    {"pallet_id": int(pallet["pallet_id"]), "gen_time": float(pallet["gen_time"])}
                )
                # Successful dequeue changes queue size -> status update
                self._pending_queue_status_out.append({"queue_size": int(len(self.queue))})`,_expire_at_time:`    def _expire_at_time(self, t_now: float) -> bool:
        """
        Remove and log every pallet whose expiration_time equals t_now.
        Returns:
            (bool): True if at least one pallet expired.
        """
        if not self.queue:
            return False

        expired = []
        kept = []
        for pallet in self.queue:
            if float(pallet["expiration_time"]) == float(t_now):
                expired.append(pallet)
            else:
                kept.append(pallet)

        if not expired:
            return False

        self.queue = kept
        for pallet in expired:
            self.total_expired += 1
            self.logger.info(
                {
                    "time": float(t_now),
                    "entity": "queue",
                    "event": "pallet_expired",
                    "payload": {
                        "pallet_id": int(pallet["pallet_id"]),
                        "total_expired": int(self.total_expired),
                    },
                },
                log_type="PROCESS",
            )
        return True`,_next_expiration_time:`    def _next_expiration_time(self) -> float:
        if not self.queue:
            return self.param["infinity"]
        return min(float(p["expiration_time"]) for p in self.queue)`,_schedule_next:`    def _schedule_next(self, t_now: float):
        # If there are pending outputs, emit them immediately.
        if self._pending_pallet_out or self._pending_queue_status_out:
            self.hold_in("EMIT", 0.0)
            return

        # Otherwise, wait until next expiration (or infinity if empty).
        next_exp = self._next_expiration_time()
        if next_exp == self.param["infinity"]:
            self.hold_in("WAIT", self.param["infinity"])
            return

        sigma = float(next_exp) - float(t_now)
        # Guard against tiny negative due to float representation; keep exactness by scheduling immediate only if needed.
        if sigma < 0.0:
            sigma = 0.0
        self.hold_in("WAIT", sigma)`}},{id:`n5`,label:`IdleAssignmentCoordinator`,modelType:`atomic`,x:380,y:265,ports:{in:[`aircraft_idle_in`,`queue_status_in`,`pallet_in`],out:[`assignment_out`,`dequeue_req_out`]},portsTyped:{in:[{name:`aircraft_idle_in`,type:`dict`},{name:`queue_status_in`,type:`dict`},{name:`pallet_in`,type:`dict`}],out:[{name:`assignment_out`,type:`dict`},{name:`dequeue_req_out`,type:`dict`}]},file:`StrategicAirlift_D0_libs/OpsCenterQueueCoordinator_libs/IdleAssignmentCoordinator.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None, num_aircraft: int):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            num_aircraft (int): Number of aircraft (>=1). Used for aircraft_id domain and deterministic tie-breaker.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "aircraft_idle_in"))
        self.add_in_port(Port(dict, "queue_status_in"))
        self.add_in_port(Port(dict, "pallet_in"))
        self.add_out_port(Port(dict, "assignment_out"))
        self.add_out_port(Port(dict, "dequeue_req_out"))

        # Config
        self.num_aircraft = int(num_aircraft)

        # Internal hardcoded parameters
        self.param = {
            "passive_sigma": float("inf")
        }

        # Internal state
        self.idle_aircraft_ids = set()  # set[int]
        self.queue_size = 0  # int

        # Dequeue/assignment cycle tracking
        self.request_in_flight = False  # bool
        self.pending_aircraft_id = None  # int | None

        # Prepared outputs (used only by lambdaf)
        self._out_dequeue_req = None  # dict | None
        self._out_assignment = None  # dict | None

        # KPIs
        self.total_assignments = 0  # int

        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "coordinator",
                "event": "model_created",
                "payload": {
                    "num_aircraft": int(self.num_aircraft)
                },
            },
            log_type="PROCESS",
        )`,initialize:`    def initialize(self):
        self.idle_aircraft_ids = set()
        self.queue_size = 0

        self.request_in_flight = False
        self.pending_aircraft_id = None
        self._out_dequeue_req = None
        self._out_assignment = None

        self.total_assignments = 0

        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "coordinator",
                "event": "model_initialized",
                "payload": {
                    "num_aircraft": int(self.num_aircraft),
                    "queue_size": int(self.queue_size),
                    "known_idle_aircraft": int(len(self.idle_aircraft_ids)),
                },
            },
            log_type="PROCESS",
        )

        self.hold_in("IDLE", self.param["passive_sigma"])`,_log_error:`    def _log_error(self, message: str, payload: dict):
        err_payload = {"message": str(message)}
        for k, v in payload.items():
            err_payload[str(k)] = v
        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "coordinator",
                "event": "error",
                "payload": err_payload,
            },
            log_type="ERROR",
        )`,_validate_aircraft_id:`    def _validate_aircraft_id(self, aircraft_id: int) -> bool:
        if not isinstance(aircraft_id, int):
            return False
        return 1 <= aircraft_id <= self.num_aircraft`,_maybe_start_dequeue_request:`    def _maybe_start_dequeue_request(self) -> bool:
        """
        Start one dequeue request if:
          - no request is currently in flight
          - there is at least one known IDLE aircraft
          - queue_size > 0
        Deterministically selects the lowest aircraft_id among IDLE aircraft.
        """
        if self.request_in_flight:
            return False
        if self.pending_aircraft_id is not None:
            return False
        if self.queue_size <= 0:
            return False
        if len(self.idle_aircraft_ids) == 0:
            return False

        aircraft_id = min(self.idle_aircraft_ids)
        if not self._validate_aircraft_id(int(aircraft_id)):
            self._log_error(
                "invalid_aircraft_id_in_idle_set",
                {"aircraft_id": int(aircraft_id), "num_aircraft": int(self.num_aircraft)},
            )
            # Remove it to avoid stalling forever
            try:
                self.idle_aircraft_ids.remove(aircraft_id)
            except KeyError:
                pass
            return False

        self.pending_aircraft_id = int(aircraft_id)
        self.request_in_flight = True
        self._out_dequeue_req = {"request": "next"}
        return True`,deltext:`    def deltext(self, e: float):
        # Keep DEVS elapsed-time semantics (though we mostly use inf/0)
        _ = float(e)

        # 1) Incorporate queue availability updates first
        for msg in self.input["queue_status_in"].values:
            if not isinstance(msg, dict) or "queue_size" not in msg:
                self._log_error("malformed_queue_status_in", {"received": str(msg)})
                continue
            qsz = msg.get("queue_size")
            if not isinstance(qsz, int) or qsz < 0:
                self._log_error("invalid_queue_size", {"queue_size": qsz})
                continue
            self.queue_size = int(qsz)

        # 2) Incorporate fleet transition inputs that imply aircraft IDLE
        for msg in self.input["aircraft_idle_in"].values:
            if not isinstance(msg, dict) or "aircraft_id" not in msg:
                self._log_error("malformed_aircraft_idle_in", {"received": str(msg)})
                continue
            aid = msg.get("aircraft_id")
            if not isinstance(aid, int):
                self._log_error("invalid_aircraft_id_type", {"aircraft_id": str(aid)})
                continue
            if not self._validate_aircraft_id(int(aid)):
                self._log_error(
                    "aircraft_id_out_of_range",
                    {"aircraft_id": int(aid), "num_aircraft": int(self.num_aircraft)},
                )
                continue
            self.idle_aircraft_ids.add(int(aid))

        # 3) Handle dequeued pallet inputs (response to request)
        got_pallet_for_assignment = False
        for msg in self.input["pallet_in"].values:
            if not isinstance(msg, dict) or ("pallet_id" not in msg) or ("gen_time" not in msg):
                self._log_error("malformed_pallet_in", {"received": str(msg)})
                continue
            if not self.request_in_flight or self.pending_aircraft_id is None:
                self._log_error(
                    "unexpected_pallet_without_request",
                    {"pallet_id": msg.get("pallet_id", -1)},
                )
                continue

            pallet_id = msg.get("pallet_id")
            gen_time = msg.get("gen_time")
            if not isinstance(pallet_id, int) or not isinstance(gen_time, float):
                self._log_error(
                    "invalid_pallet_fields",
                    {"pallet_id": str(pallet_id), "gen_time": str(gen_time)},
                )
                continue

            aircraft_id = int(self.pending_aircraft_id)

            # Create assignment payload for output (used by lambdaf)
            self._out_assignment = {
                "aircraft_id": int(aircraft_id),
                "pallet": {"pallet_id": int(pallet_id), "gen_time": float(gen_time)},
            }

            # Logging required event (assignment_created)
            self.logger.info(
                {
                    "time": float(get_current_time()),
                    "entity": "coordinator",
                    "event": "assignment_created",
                    "payload": {"aircraft_id": int(aircraft_id), "pallet_id": int(pallet_id)},
                },
                log_type="PROCESS",
            )

            # Update internal tracking immediately (assignment created now; output will happen at same sim time)
            self.total_assignments += 1
            if aircraft_id in self.idle_aircraft_ids:
                self.idle_aircraft_ids.remove(aircraft_id)
            self.request_in_flight = False
            self.pending_aircraft_id = None

            # Locally decrement queue size to enable same-timestamp loop continuation without waiting for a status update
            if self.queue_size > 0:
                self.queue_size = max(0, int(self.queue_size) - 1)

            got_pallet_for_assignment = True

            # Only one assignment can be output per internal event; if multiple pallets arrive, it's an error.
            # We will ignore additional pallets in this same transition after first valid one.
            break

        # Decide next phase
        if got_pallet_for_assignment:
            self.hold_in("SEND_ASSIGNMENT", 0.0)
            return

        # If we are not emitting an assignment now, try to start a dequeue request (assignment loop step)
        if self._maybe_start_dequeue_request():
            self.hold_in("SEND_DEQUEUE_REQ", 0.0)
            return

        # Otherwise, remain passive
        self.hold_in("IDLE", self.param["passive_sigma"])`,lambdaf:`    def lambdaf(self):
        # Output only; no state changes here.
        if self.phase == "SEND_DEQUEUE_REQ":
            if isinstance(self._out_dequeue_req, dict):
                self.output["dequeue_req_out"].add(self._out_dequeue_req)
        elif self.phase == "SEND_ASSIGNMENT":
            if isinstance(self._out_assignment, dict):
                self.output["assignment_out"].add(self._out_assignment)`,deltint:`    def deltint(self):
        # Internal transition after outputs have been emitted.
        if self.phase == "SEND_DEQUEUE_REQ":
            self._out_dequeue_req = None
            # Wait for pallet_in (response)
            self.hold_in("IDLE", self.param["passive_sigma"])
            return

        if self.phase == "SEND_ASSIGNMENT":
            self._out_assignment = None
            # Continue loop: request next pallet if possible
            if self._maybe_start_dequeue_request():
                self.hold_in("SEND_DEQUEUE_REQ", 0.0)
            else:
                self.hold_in("IDLE", self.param["passive_sigma"])
            return

        # IDLE (passive): remain passive
        self.hold_in("IDLE", self.param["passive_sigma"])`,exit:`    def exit(self):
        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "coordinator",
                "event": "model_exit",
                "payload": {
                    "total_assignments": int(self.total_assignments),
                    "final_queue_size": int(self.queue_size),
                    "known_idle_aircraft": int(len(self.idle_aircraft_ids)),
                    "request_in_flight": bool(self.request_in_flight),
                },
            },
            log_type="RESULT",
        )`}},{id:`n6`,label:`AircraftFleet (coupled)`,modelType:`coupled`,x:760,y:130,ports:{in:[`assignment_in`],out:[`aircraft_idle_out`,`delivery_out`]},portsTyped:{in:[{name:`assignment_in`,type:`dict`}],out:[{name:`aircraft_idle_out`,type:`dict`},{name:`delivery_out`,type:`dict`}]},file:`StrategicAirlift_D0_libs/AircraftFleet.py`,methods:{__init__:`    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        num_aircraft: int,
        flight_time: float,
        unload_time: float,
        return_time: float,
        maintenance_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): The parent model. If None, the model is a root model.
            num_aircraft (int): Number of aircraft in the fleet (>=1). Aircraft IDs are 1..num_aircraft.
            flight_time (float): Seconds for aircraft to fly facility -> destination.
            unload_time (float): Seconds to unload at destination.
            return_time (float): Seconds for aircraft to fly destination -> facility.
            maintenance_time (float): Seconds aircraft spends in maintenance after returning.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.param: dict = {
            "model_path": "StrategicAirlift_D0.AircraftFleet.AircraftFleet"
        }

        # Normalize configuration
        num_aircraft_n: int = int(num_aircraft)
        flight_time_n: float = float(flight_time)
        unload_time_n: float = float(unload_time)
        return_time_n: float = float(return_time)
        maintenance_time_n: float = float(maintenance_time)

        # Define boundary ports
        self.add_in_port(Port(dict, "assignment_in"))
        self.add_out_port(Port(dict, "aircraft_idle_out"))
        self.add_out_port(Port(dict, "delivery_out"))

        # Instantiate event mux (seeds initial idle and forwards events)
        event_mux = FleetEventMux(
            name="event_mux",
            parent=self,
            num_aircraft=num_aircraft_n,
        )
        self.add_component(event_mux)

        # Instantiate aircraft units and couple
        aircraft_units: list[AircraftUnit] = []
        for aircraft_id in range(1, num_aircraft_n + 1):
            unit = AircraftUnit(
                name=f"aircraft_{aircraft_id}",
                parent=self,
                aircraft_id=int(aircraft_id),
                flight_time=flight_time_n,
                unload_time=unload_time_n,
                return_time=return_time_n,
                maintenance_time=maintenance_time_n,
            )
            self.add_component(unit)
            aircraft_units.append(unit)

            # EIC: broadcast assignments to each aircraft unit
            self.add_coupling(self.input["assignment_in"], unit.input["assignment_in"])

            # IC: per-aircraft events to mux inputs
            self.add_coupling(unit.output["idle_out"], event_mux.input["aircraft_idle_in"])
            self.add_coupling(unit.output["delivery_out"], event_mux.input["delivery_in"])

        # EOC: mux outputs to fleet outputs
        self.add_coupling(event_mux.output["aircraft_idle_out"], self.output["aircraft_idle_out"])
        self.add_coupling(event_mux.output["delivery_out"], self.output["delivery_out"])

        self.logger.info(
            {
                "event": "Model Created",
                "model": "AircraftFleet",
                "num_aircraft": num_aircraft_n,
                "timings": {
                    "flight_time": flight_time_n,
                    "unload_time": unload_time_n,
                    "return_time": return_time_n,
                    "maintenance_time": maintenance_time_n,
                },
                "params": {
                    "model_path": self.param["model_path"],
                },
            },
            log_type="PROCESS",
        )`}},{id:`n7`,label:`FleetEventMux`,modelType:`atomic`,x:760,y:255,ports:{in:[`aircraft_idle_in`,`delivery_in`],out:[`aircraft_idle_out`,`delivery_out`]},portsTyped:{in:[{name:`aircraft_idle_in`,type:`dict`},{name:`delivery_in`,type:`dict`}],out:[{name:`aircraft_idle_out`,type:`dict`},{name:`delivery_out`,type:`dict`}]},file:`StrategicAirlift_D0_libs/AircraftFleet_libs/FleetEventMux.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None, num_aircraft: int):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            num_aircraft (int): Number of aircraft (>=1). Used only to emit initial IDLE notifications for aircraft IDs
                1..num_aircraft at T=0.0.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "aircraft_idle_in"))
        self.add_in_port(Port(dict, "delivery_in"))
        self.add_out_port(Port(dict, "aircraft_idle_out"))
        self.add_out_port(Port(dict, "delivery_out"))

        # Internal hardcoded parameters
        self.param = {
            "phase_seed": "SEED",
            "phase_forward": "FORWARD",
            "phase_passive": "PASSIVE",
        }

        # Config
        self.num_aircraft = int(num_aircraft)

        # Internal buffers (prepared in initialize/deltint/deltext; emitted in lambdaf)
        self._seed_msgs: list[dict] = []
        self._idle_buf: list[dict] = []
        self._delivery_buf: list[dict] = []

        self._seed_done: bool = False`,initialize:`    def initialize(self):
        self._idle_buf = []
        self._delivery_buf = []

        n = self.num_aircraft if self.num_aircraft > 0 else 0
        self._seed_msgs = [{"aircraft_id": int(i)} for i in range(1, n + 1)]
        self._seed_done = False

        # Schedule seeding output at T=0.0
        self.hold_in(self.param["phase_seed"], 0.0)`,lambdaf:`    def lambdaf(self):
        # Output only; no state changes here
        if self.phase == self.param["phase_seed"]:
            for msg in self._seed_msgs:
                self.output["aircraft_idle_out"].add(msg)

        elif self.phase == self.param["phase_forward"]:
            for msg in self._idle_buf:
                self.output["aircraft_idle_out"].add(msg)
            for msg in self._delivery_buf:
                self.output["delivery_out"].add(msg)`,deltint:`    def deltint(self):
        # Internal transition occurs immediately after lambdaf (output already emitted)
        if self.phase == self.param["phase_seed"]:
            self._seed_done = True
            self._seed_msgs = []

            if self._idle_buf or self._delivery_buf:
                self.hold_in(self.param["phase_forward"], 0.0)
            else:
                self.hold_in(self.param["phase_passive"], float("inf"))
            return

        if self.phase == self.param["phase_forward"]:
            # Clear forwarded buffers after emission
            self._idle_buf = []
            self._delivery_buf = []
            self.hold_in(self.param["phase_passive"], float("inf"))
            return

        # PASSIVE should not timeout, but keep it safe
        self.hold_in(self.param["phase_passive"], float("inf"))`,deltext:`    def deltext(self, e: float):
        # External transition: buffer inputs; schedule immediate forwarding if appropriate.
        # NOTE: Must not override SEED at T=0.0 (seeding must happen).
        has_any = False

        for msg in self.input["aircraft_idle_in"].values:
            # Expected structure: {"aircraft_id": int}
            if isinstance(msg, dict):
                self._idle_buf.append(msg)
                has_any = True

        for msg in self.input["delivery_in"].values:
            # Expected structure: {"pallet_id": int, "aircraft_id": int, "latency": float}
            if isinstance(msg, dict):
                self._delivery_buf.append(msg)
                has_any = True

        if not has_any:
            # No new information: just reduce remaining time (if any)
            remaining = self.ta()
            if remaining != float("inf"):
                remaining = max(0.0, remaining - float(e))
            self.hold_in(self.phase, remaining)
            return

        # If we are still in SEED (e.g., confluent at t=0), do not preempt seeding.
        if (not self._seed_done) and self.phase == self.param["phase_seed"]:
            remaining = self.ta()
            remaining = max(0.0, remaining - float(e))
            self.hold_in(self.param["phase_seed"], remaining)
            return

        # Otherwise, forward immediately at the same simulation time
        self.hold_in(self.param["phase_forward"], 0.0)`,exit:`    def exit(self):
        # No additional logging or results required by specification.
        pass`}},{id:`n8`,label:`AircraftUnit aircraft_1 (coupled)`,modelType:`coupled`,x:560,y:255,ports:{in:[`assignment_in`],out:[`idle_out`,`delivery_out`]},portsTyped:{in:[{name:`assignment_in`,type:`dict`}],out:[{name:`idle_out`,type:`dict`},{name:`delivery_out`,type:`dict`}]},file:`StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit.py`,methods:{__init__:`    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        aircraft_id: int,
        flight_time: float,
        unload_time: float,
        return_time: float,
        maintenance_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            aircraft_id (int): This unit's aircraft identifier.
            flight_time (float): Seconds for facility -> destination flight.
            unload_time (float): Seconds to unload at destination.
            return_time (float): Seconds for destination -> facility return flight.
            maintenance_time (float): Seconds aircraft spends in maintenance after returning.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.param = {
            "model_path": "StrategicAirlift_D0.AircraftFleet.AircraftUnit",
        }

        # External boundary ports
        self.add_in_port(Port(dict, "assignment_in"))
        self.add_out_port(Port(dict, "idle_out"))
        self.add_out_port(Port(dict, "delivery_out"))

        # Normalize/cast configuration (primitives only)
        aircraft_id_i = int(aircraft_id)
        flight_time_f = float(flight_time)
        unload_time_f = float(unload_time)
        return_time_f = float(return_time)
        maintenance_time_f = float(maintenance_time)

        # Sub-components
        aircraft_mission = AircraftMissionController(
            name="aircraft_mission",
            parent=self,
            aircraft_id=aircraft_id_i,
            flight_time=flight_time_f,
            unload_time=unload_time_f,
            return_time=return_time_f,
        )
        aircraft_maintenance = AircraftMaintenanceController(
            name="aircraft_maintenance",
            parent=self,
            aircraft_id=aircraft_id_i,
            maintenance_time=maintenance_time_f,
        )

        self.add_component(aircraft_mission)
        self.add_component(aircraft_maintenance)

        # Couplings
        # EIC: external -> internal
        self.add_coupling(self.input["assignment_in"], aircraft_mission.input["assignment_in"])

        # IC: internal -> internal
        self.add_coupling(
            aircraft_mission.output["maintenance_start_out"],
            aircraft_maintenance.input["maintenance_start_in"],
        )
        self.add_coupling(
            aircraft_maintenance.output["maintenance_done_out"],
            aircraft_mission.input["maintenance_done_in"],
        )

        # EOC: internal -> external
        self.add_coupling(aircraft_maintenance.output["idle_out"], self.output["idle_out"])
        self.add_coupling(aircraft_mission.output["delivery_out"], self.output["delivery_out"])

        self.logger.info(
            {
                "event": "Model Created",
                "model": "AircraftUnit",
                "aircraft_id": aircraft_id_i,
                "timings": {
                    "flight_time": flight_time_f,
                    "unload_time": unload_time_f,
                    "return_time": return_time_f,
                    "maintenance_time": maintenance_time_f,
                },
                "params": {
                    "model_path": self.param["model_path"],
                },
            },
            log_type="PROCESS",
        )`}},{id:`n9`,label:`AircraftUnit aircraft_2 (coupled)`,modelType:`coupled`,x:950,y:255,ports:{in:[`assignment_in`],out:[`idle_out`,`delivery_out`]},portsTyped:{in:[{name:`assignment_in`,type:`dict`}],out:[{name:`idle_out`,type:`dict`},{name:`delivery_out`,type:`dict`}]},file:`StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit.py`,methods:{__init__:`    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        aircraft_id: int,
        flight_time: float,
        unload_time: float,
        return_time: float,
        maintenance_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            aircraft_id (int): This unit's aircraft identifier.
            flight_time (float): Seconds for facility -> destination flight.
            unload_time (float): Seconds to unload at destination.
            return_time (float): Seconds for destination -> facility return flight.
            maintenance_time (float): Seconds aircraft spends in maintenance after returning.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.param = {
            "model_path": "StrategicAirlift_D0.AircraftFleet.AircraftUnit",
        }

        # External boundary ports
        self.add_in_port(Port(dict, "assignment_in"))
        self.add_out_port(Port(dict, "idle_out"))
        self.add_out_port(Port(dict, "delivery_out"))

        # Normalize/cast configuration (primitives only)
        aircraft_id_i = int(aircraft_id)
        flight_time_f = float(flight_time)
        unload_time_f = float(unload_time)
        return_time_f = float(return_time)
        maintenance_time_f = float(maintenance_time)

        # Sub-components
        aircraft_mission = AircraftMissionController(
            name="aircraft_mission",
            parent=self,
            aircraft_id=aircraft_id_i,
            flight_time=flight_time_f,
            unload_time=unload_time_f,
            return_time=return_time_f,
        )
        aircraft_maintenance = AircraftMaintenanceController(
            name="aircraft_maintenance",
            parent=self,
            aircraft_id=aircraft_id_i,
            maintenance_time=maintenance_time_f,
        )

        self.add_component(aircraft_mission)
        self.add_component(aircraft_maintenance)

        # Couplings
        # EIC: external -> internal
        self.add_coupling(self.input["assignment_in"], aircraft_mission.input["assignment_in"])

        # IC: internal -> internal
        self.add_coupling(
            aircraft_mission.output["maintenance_start_out"],
            aircraft_maintenance.input["maintenance_start_in"],
        )
        self.add_coupling(
            aircraft_maintenance.output["maintenance_done_out"],
            aircraft_mission.input["maintenance_done_in"],
        )

        # EOC: internal -> external
        self.add_coupling(aircraft_maintenance.output["idle_out"], self.output["idle_out"])
        self.add_coupling(aircraft_mission.output["delivery_out"], self.output["delivery_out"])

        self.logger.info(
            {
                "event": "Model Created",
                "model": "AircraftUnit",
                "aircraft_id": aircraft_id_i,
                "timings": {
                    "flight_time": flight_time_f,
                    "unload_time": unload_time_f,
                    "return_time": return_time_f,
                    "maintenance_time": maintenance_time_f,
                },
                "params": {
                    "model_path": self.param["model_path"],
                },
            },
            log_type="PROCESS",
        )`}},{id:`n10`,label:`AircraftUnit aircraft_3...N (omitted)`,modelType:`coupled`,x:1165,y:255,ports:{in:[`assignment_in`],out:[`idle_out`,`delivery_out`]},portsTyped:{in:[{name:`assignment_in`,type:`dict`}],out:[{name:`idle_out`,type:`dict`},{name:`delivery_out`,type:`dict`}]},file:`StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit.py`,methods:{__init__:`    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        aircraft_id: int,
        flight_time: float,
        unload_time: float,
        return_time: float,
        maintenance_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            aircraft_id (int): This unit's aircraft identifier.
            flight_time (float): Seconds for facility -> destination flight.
            unload_time (float): Seconds to unload at destination.
            return_time (float): Seconds for destination -> facility return flight.
            maintenance_time (float): Seconds aircraft spends in maintenance after returning.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.param = {
            "model_path": "StrategicAirlift_D0.AircraftFleet.AircraftUnit",
        }

        # External boundary ports
        self.add_in_port(Port(dict, "assignment_in"))
        self.add_out_port(Port(dict, "idle_out"))
        self.add_out_port(Port(dict, "delivery_out"))

        # Normalize/cast configuration (primitives only)
        aircraft_id_i = int(aircraft_id)
        flight_time_f = float(flight_time)
        unload_time_f = float(unload_time)
        return_time_f = float(return_time)
        maintenance_time_f = float(maintenance_time)

        # Sub-components
        aircraft_mission = AircraftMissionController(
            name="aircraft_mission",
            parent=self,
            aircraft_id=aircraft_id_i,
            flight_time=flight_time_f,
            unload_time=unload_time_f,
            return_time=return_time_f,
        )
        aircraft_maintenance = AircraftMaintenanceController(
            name="aircraft_maintenance",
            parent=self,
            aircraft_id=aircraft_id_i,
            maintenance_time=maintenance_time_f,
        )

        self.add_component(aircraft_mission)
        self.add_component(aircraft_maintenance)

        # Couplings
        # EIC: external -> internal
        self.add_coupling(self.input["assignment_in"], aircraft_mission.input["assignment_in"])

        # IC: internal -> internal
        self.add_coupling(
            aircraft_mission.output["maintenance_start_out"],
            aircraft_maintenance.input["maintenance_start_in"],
        )
        self.add_coupling(
            aircraft_maintenance.output["maintenance_done_out"],
            aircraft_mission.input["maintenance_done_in"],
        )

        # EOC: internal -> external
        self.add_coupling(aircraft_maintenance.output["idle_out"], self.output["idle_out"])
        self.add_coupling(aircraft_mission.output["delivery_out"], self.output["delivery_out"])

        self.logger.info(
            {
                "event": "Model Created",
                "model": "AircraftUnit",
                "aircraft_id": aircraft_id_i,
                "timings": {
                    "flight_time": flight_time_f,
                    "unload_time": unload_time_f,
                    "return_time": return_time_f,
                    "maintenance_time": maintenance_time_f,
                },
                "params": {
                    "model_path": self.param["model_path"],
                },
            },
            log_type="PROCESS",
        )`}},{id:`n11`,label:`A1 AircraftMissionController (coupled)`,modelType:`coupled`,x:560,y:370,ports:{in:[`assignment_in`,`maintenance_done_in`],out:[`delivery_out`,`maintenance_start_out`]},portsTyped:{in:[{name:`assignment_in`,type:`dict`},{name:`maintenance_done_in`,type:`dict`}],out:[{name:`delivery_out`,type:`dict`},{name:`maintenance_start_out`,type:`dict`}]},file:`StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit_libs/AircraftMissionController.py`,methods:{__init__:`    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        aircraft_id: int,
        flight_time: float,
        unload_time: float,
        return_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): The parent model. If None, the model is a root model.
            aircraft_id (int): This unit’s aircraft ID (1..num_aircraft).
            flight_time (float): Seconds for aircraft to fly facility -> destination.
            unload_time (float): Seconds to unload at destination; delivery recorded at end of this interval.
            return_time (float): Seconds for aircraft to fly destination -> facility.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.param = {
            "model_path": "StrategicAirlift_D0.AircraftFleet.AircraftUnit.AircraftMissionController",
        }

        # External boundary ports
        self.add_in_port(Port(dict, "assignment_in"))
        self.add_in_port(Port(dict, "maintenance_done_in"))

        self.add_out_port(Port(dict, "delivery_out"))
        self.add_out_port(Port(dict, "maintenance_start_out"))

        # Sub-models
        mission_sm = MissionStateMachine(
            name="mission_sm",
            parent=self,
            aircraft_id=int(aircraft_id),
            flight_time=float(flight_time),
            unload_time=float(unload_time),
            return_time=float(return_time),
        )
        mission_log_emitter = MissionLogEmitter(
            name="mission_log_emitter",
            parent=self,
        )

        self.add_component(mission_sm)
        self.add_component(mission_log_emitter)

        # Couplings
        # EIC: inputs to mission state machine
        self.add_coupling(self.input["assignment_in"], mission_sm.input["assignment_in"])
        self.add_coupling(self.input["maintenance_done_in"], mission_sm.input["maintenance_done_in"])

        # IC: mission logs to logger-emitter
        self.add_coupling(mission_sm.output["log_out"], mission_log_emitter.input["log_in"])

        # EOC: outputs from mission state machine
        self.add_coupling(mission_sm.output["delivery_out"], self.output["delivery_out"])
        self.add_coupling(mission_sm.output["maintenance_start_out"], self.output["maintenance_start_out"])

        self.logger.info(
            {
                "event": "Model Created",
                "model": "AircraftMissionController",
                "aircraft_id": int(aircraft_id),
                "timings": {
                    "flight_time": float(flight_time),
                    "unload_time": float(unload_time),
                    "return_time": float(return_time),
                },
                "params": self.param,
            },
            log_type="PROCESS",
        )`}},{id:`n12`,label:`A1 MissionStateMachine`,modelType:`atomic`,x:500,y:470,ports:{in:[`assignment_in`,`maintenance_done_in`],out:[`delivery_out`,`maintenance_start_out`,`log_out`]},portsTyped:{in:[{name:`assignment_in`,type:`dict`},{name:`maintenance_done_in`,type:`dict`}],out:[{name:`delivery_out`,type:`dict`},{name:`maintenance_start_out`,type:`dict`},{name:`log_out`,type:`dict`}]},file:`StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit_libs/AircraftMissionController_libs/MissionStateMachine.py`,methods:{__init__:`    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        aircraft_id: int,
        flight_time: float,
        unload_time: float,
        return_time: float,
    ):
        """
        Args:
            name (str): The unique name of the model (e.g., 'aircraft_1_mission_sm').
            parent (Coupled | None): The parent model. If None, the model is a root model.
            aircraft_id (int): This unit’s aircraft ID (1..num_aircraft).
            flight_time (float): Seconds for aircraft to fly facility -> destination.
            unload_time (float): Seconds to unload at destination; delivery recorded at end of this interval.
            return_time (float): Seconds for aircraft to fly destination -> facility.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "assignment_in"))
        self.add_in_port(Port(dict, "maintenance_done_in"))
        self.add_out_port(Port(dict, "delivery_out"))
        self.add_out_port(Port(dict, "maintenance_start_out"))
        self.add_out_port(Port(dict, "log_out"))

        # Configuration
        self.aircraft_id = int(aircraft_id)
        self.flight_time = float(flight_time)
        self.unload_time = float(unload_time)
        self.return_time = float(return_time)

        # Mission-related state (per spec)
        self.current_pallet = None  # None | {'pallet_id': int, 'gen_time': float}
        self.next_phase_time = None  # float | None (absolute)

        # Internal control flags / pending outputs (prepared before lambdaf)
        self._waiting_for_maintenance = False

        self._emit_depart_now = False
        self._pending_depart_log = None  # dict | None

        self._pending_delivery = None  # dict | None

        self._pending_return_logs = []  # list[dict]
        self._pending_maintenance_start = None  # dict | None

        # Initial DEVS state (finalized in initialize)
        self.hold_in("IDLE", float("inf"))`,initialize:`    def initialize(self):
        # Initial mission state (per spec)
        self.current_pallet = None
        self.next_phase_time = None

        self._waiting_for_maintenance = False

        self._emit_depart_now = False
        self._pending_depart_log = None

        self._pending_delivery = None

        self._pending_return_logs = []
        self._pending_maintenance_start = None

        self.hold_in("IDLE", float("inf"))`,_make_log_record:`    def _make_log_record(self, event: str, payload: dict) -> dict:
        """
        Args:
            event (str): One of {'depart','return','maintenance_start'}.
            payload (dict): Event payload, must be JSON-serializable and composed only of atomic primitives/dict/list.
                (for 'depart') aircraft_id (int), pallet_id (int)
                (for 'return') aircraft_id (int)
                (for 'maintenance_start') aircraft_id (int)

        Returns:
            (dict): Log record with keys: time (float), entity (str), event (str), payload (dict)
        """
        return {
            "time": float(get_current_time()),
            "entity": "aircraft",
            "event": str(event),
            "payload": payload,
        }`,lambdaf:`    def lambdaf(self):
        # Output only. Do not mutate state here.
        if self.phase == "FLYING" and self._emit_depart_now and self._pending_depart_log is not None:
            self.output["log_out"].add(self._pending_depart_log)

        if self.phase == "UNLOADING" and self._pending_delivery is not None:
            self.output["delivery_out"].add(self._pending_delivery)

        if self.phase == "RETURNING":
            # RETURNING completion outputs
            if self._pending_return_logs:
                for rec in self._pending_return_logs:
                    self.output["log_out"].add(rec)
            if self._pending_maintenance_start is not None:
                self.output["maintenance_start_out"].add(self._pending_maintenance_start)`,deltint:`    def deltint(self):
        old_phase = self.phase
        _old_ta = self.ta()
        now = float(get_current_time())

        if old_phase == "IDLE":
            # No internal events should happen in IDLE (sigma=inf), but keep safe.
            self.hold_in("IDLE", float("inf"))
            return

        if old_phase == "FLYING":
            # Two cases:
            #   (A) Immediate 'depart' emission (sigma=0) when starting flight
            #   (B) Flight completion (sigma=flight_time)
            if self._emit_depart_now:
                # (A) depart has been emitted in lambdaf; now schedule actual flight completion
                self._emit_depart_now = False
                self._pending_depart_log = None

                # next_phase_time was already set at assignment acceptance
                if self.next_phase_time is None:
                    # Defensive fallback: schedule with configured flight_time
                    self.next_phase_time = now + self.flight_time

                remaining = max(0.0, float(self.next_phase_time) - now)
                self.hold_in("FLYING", remaining)
                return

            # (B) Flight completed: transition to UNLOADING and prepare delivery payload for UNLOADING completion
            self.phase = "UNLOADING"
            self.next_phase_time = now + self.unload_time

            if self.current_pallet is not None:
                pallet_id = int(self.current_pallet["pallet_id"])
                gen_time = float(self.current_pallet["gen_time"])
                delivery_time = now + self.unload_time
                latency = float(delivery_time - gen_time)
                self._pending_delivery = {
                    "pallet_id": pallet_id,
                    "aircraft_id": int(self.aircraft_id),
                    "latency": latency,
                }
            else:
                # Should not happen, but keep schema-safe
                self._pending_delivery = None

            self.hold_in("UNLOADING", max(0.0, self.unload_time))
            return

        if old_phase == "UNLOADING":
            # Delivery has been emitted in lambdaf; now transition to RETURNING and prepare RETURNING completion outputs.
            self._pending_delivery = None

            self.phase = "RETURNING"
            self.next_phase_time = now + self.return_time

            # Prepare RETURNING completion outputs (to be emitted at end of RETURNING)
            self._pending_return_logs = [
                self._make_log_record("return", {"aircraft_id": int(self.aircraft_id)}),
                self._make_log_record("maintenance_start", {"aircraft_id": int(self.aircraft_id)}),
            ]
            self._pending_maintenance_start = {"aircraft_id": int(self.aircraft_id)}

            self.hold_in("RETURNING", max(0.0, self.return_time))
            return

        if old_phase == "RETURNING":
            # RETURNING completion outputs have been emitted in lambdaf; now park and wait for maintenance_done_in.
            self._pending_return_logs = []
            self._pending_maintenance_start = None

            # Clear/park mission timing; wait for maintenance completion
            self.next_phase_time = None
            self._waiting_for_maintenance = True

            # current_pallet is no longer needed after mission completion
            self.current_pallet = None

            # Keep phase within allowed set; park indefinitely (await external)
            self.hold_in("RETURNING", float("inf"))
            return

        # Defensive fallback
        self.hold_in(old_phase, float("inf"))`,deltext:`    def deltext(self, e: float):
        _ = float(e)
        now = float(get_current_time())
        phase_before = self.phase
        sigma_before = self.ta()

        accepted_assignment = False
        maintenance_done = False

        # Process assignment(s)
        for msg in self.input["assignment_in"].values:
            # msg (dict):
            #   aircraft_id (int)
            #   pallet (dict): pallet_id (int), gen_time (float)
            if accepted_assignment:
                continue

            try:
                msg_aircraft_id = int(msg.get("aircraft_id"))
            except Exception:
                continue

            if msg_aircraft_id != int(self.aircraft_id):
                continue

            # Accept only if currently IDLE (per spec)
            if self.phase != "IDLE":
                continue

            pallet = msg.get("pallet", None)
            if not isinstance(pallet, dict):
                continue

            if "pallet_id" not in pallet or "gen_time" not in pallet:
                continue

            pallet_id = int(pallet["pallet_id"])
            gen_time = float(pallet["gen_time"])

            # Accept assignment
            self.current_pallet = {"pallet_id": pallet_id, "gen_time": gen_time}
            self.next_phase_time = now + self.flight_time

            # Prepare immediate depart log via a zero-time internal event in FLYING
            self._pending_depart_log = self._make_log_record(
                "depart",
                {"aircraft_id": int(self.aircraft_id), "pallet_id": pallet_id},
            )
            self._emit_depart_now = True

            # Start FLYING phase; schedule immediate output at same timestamp
            self._waiting_for_maintenance = False
            self.hold_in("FLYING", 0.0)
            accepted_assignment = True

        # Process maintenance completion(s)
        for msg in self.input["maintenance_done_in"].values:
            # msg (dict): {'aircraft_id': int}
            try:
                msg_aircraft_id = int(msg.get("aircraft_id"))
            except Exception:
                continue

            if msg_aircraft_id != int(self.aircraft_id):
                continue

            # Only act when actually waiting for maintenance completion
            if not self._waiting_for_maintenance:
                continue

            # Reset to IDLE
            self.current_pallet = None
            self.next_phase_time = None
            self._waiting_for_maintenance = False

            # Clear any pending outputs just in case
            self._emit_depart_now = False
            self._pending_depart_log = None
            self._pending_delivery = None
            self._pending_return_logs = []
            self._pending_maintenance_start = None

            self.hold_in("IDLE", float("inf"))
            maintenance_done = True

        # If no state change occurred due to external events, preserve timing (deduct elapsed time)
        if not accepted_assignment and not maintenance_done:
            if sigma_before == float("inf"):
                self.hold_in(phase_before, float("inf"))
            else:
                self.hold_in(phase_before, max(0.0, float(sigma_before) - float(e)))`,exit:`    def exit(self):
        # Cleanup only; no mission-event logs here (mission logs are emitted via log_out during simulation).
        self.current_pallet = None
        self.next_phase_time = None
        self._waiting_for_maintenance = False

        self._emit_depart_now = False
        self._pending_depart_log = None
        self._pending_delivery = None
        self._pending_return_logs = []
        self._pending_maintenance_start = None`}},{id:`n13`,label:`A1 MissionLogEmitter`,modelType:`atomic`,x:670,y:470,ports:{in:[`log_in`],out:[]},portsTyped:{in:[{name:`log_in`,type:`dict`}],out:[]},file:`StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit_libs/AircraftMissionController_libs/MissionLogEmitter.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): The parent model. If None, the model is a root model.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "log_in"))

        # Internal hardcoded parameters (none required, keep explicit container per standard)
        self.param: dict = {}

        # No buffered records by design (immediate forwarding)
        self.hold_in("IDLE", float("inf"))`,initialize:`    def initialize(self):
        # Ready/idle; no buffered records.
        self.hold_in("IDLE", float("inf"))`,_validate_record:`    def _validate_record(self, record: dict):
        if not isinstance(record, dict):
            raise TypeError("MissionLogEmitter.log_in record must be a dict")

        expected_keys = {"time", "entity", "event", "payload"}
        record_keys = set(record.keys())
        if record_keys != expected_keys:
            raise ValueError(f"MissionLogEmitter.log_in record keys must be exactly {expected_keys}, got {record_keys}")

        if not isinstance(record["time"], float):
            raise TypeError("MissionLogEmitter.log_in['time'] must be a float")
        if not isinstance(record["entity"], str):
            raise TypeError("MissionLogEmitter.log_in['entity'] must be a str")
        if not isinstance(record["event"], str):
            raise TypeError("MissionLogEmitter.log_in['event'] must be a str")
        if not isinstance(record["payload"], dict):
            raise TypeError("MissionLogEmitter.log_in['payload'] must be a dict")

        event_name = record["event"]
        payload = record["payload"]

        if event_name == "depart":
            payload_keys = set(payload.keys())
            if payload_keys != {"aircraft_id", "pallet_id"}:
                raise ValueError("depart payload must have exactly keys {'aircraft_id','pallet_id'}")
            if not isinstance(payload["aircraft_id"], int):
                raise TypeError("depart payload['aircraft_id'] must be an int")
            if not isinstance(payload["pallet_id"], int):
                raise TypeError("depart payload['pallet_id'] must be an int")
        elif event_name in {"return", "maintenance_start"}:
            payload_keys = set(payload.keys())
            if payload_keys != {"aircraft_id"}:
                raise ValueError(f"{event_name} payload must have exactly key {{'aircraft_id'}}")
            if not isinstance(payload["aircraft_id"], int):
                raise TypeError(f"{event_name} payload['aircraft_id'] must be an int")
        else:
            # Preserve schema; only validate the required mission events explicitly described by spec.
            # Other events (if any) must still adhere to the top-level record schema above.
            pass`,deltext:`    def deltext(self, e: float):
        _ = e
        for record in self.input["log_in"].values:
            self._validate_record(record)
            # Forward unchanged record (no extra keys added here).
            self.logger.info(record, log_type="PROCESS")

        # Avoid re-processing if the runtime does not auto-clear the port.
        self.input["log_in"].clear()

        self.hold_in("IDLE", float("inf"))`,lambdaf:`    def lambdaf(self):
        # No output ports. (All forwarding is done via logger side-effect in deltext.)
        return`,deltint:`    def deltint(self):
        # No internal events expected.
        self.hold_in("IDLE", float("inf"))`,exit:`    def exit(self):
        # No additional logs here to avoid introducing non-spec JSONL lines.
        _ = get_current_time()
        return`}},{id:`n14`,label:`A1 MaintenanceController`,modelType:`atomic`,x:760,y:370,ports:{in:[`maintenance_start_in`],out:[`idle_out`,`maintenance_done_out`]},portsTyped:{in:[{name:`maintenance_start_in`,type:`dict`}],out:[{name:`idle_out`,type:`dict`},{name:`maintenance_done_out`,type:`dict`}]},file:`StrategicAirlift_D0_libs/AircraftFleet_libs/AircraftUnit_libs/AircraftMaintenanceController.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None, aircraft_id: int, maintenance_time: float):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            aircraft_id (int): This unit’s aircraft ID (1..num_aircraft).
            maintenance_time (float): Seconds aircraft spends in maintenance after returning; aircraft becomes IDLE at end.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "maintenance_start_in"))
        self.add_out_port(Port(dict, "idle_out"))
        self.add_out_port(Port(dict, "maintenance_done_out"))

        # Configuration
        self.aircraft_id = int(aircraft_id)
        self.maintenance_time = float(maintenance_time)

        # Internal hardcoded parameters
        self.param = {
            "passive_sigma": float("inf")
        }

        # State variables
        self.next_phase_time = None  # float | None
        self._pending_idle_payload = None  # dict | None
        self._pending_maintenance_done_payload = None  # dict | None
        self.maintenance_completed = 0  # KPI counter

        # Initial scheduling (no initial output)
        self.hold_in("IDLE", self.param["passive_sigma"])

        # Log creation (schema must be exactly time/entity/event/payload)
        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "aircraft",
                "event": "model_created",
                "payload": {
                    "aircraft_id": int(self.aircraft_id),
                    "maintenance_time": float(self.maintenance_time),
                },
            },
            log_type="PROCESS",
        )`,initialize:`    def initialize(self):
        self.next_phase_time = None
        self._pending_idle_payload = None
        self._pending_maintenance_done_payload = None
        self.maintenance_completed = 0

        self.hold_in("IDLE", self.param["passive_sigma"])

        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "aircraft",
                "event": "model_initialized",
                "payload": {
                    "aircraft_id": int(self.aircraft_id),
                    "phase": "IDLE",
                },
            },
            log_type="PROCESS",
        )`,deltext:`    def deltext(self, e: float):
        # External transition: handle maintenance start triggers.
        current_time = float(get_current_time())

        # Default: continue current phase with remaining time unless changed by an accepted trigger.
        remaining = self.ta()
        if math.isinf(remaining):
            remaining_after_e = remaining
        else:
            remaining_after_e = max(0.0, float(remaining) - float(e))

        started = False

        for msg in self.input["maintenance_start_in"].values:
            # msg schema:
            #   aircraft_id (int): target aircraft id
            if not isinstance(msg, dict):
                continue
            if "aircraft_id" not in msg:
                continue

            msg_aircraft_id = msg["aircraft_id"]
            if isinstance(msg_aircraft_id, bool):
                continue
            if not isinstance(msg_aircraft_id, int):
                continue

            if int(msg_aircraft_id) != int(self.aircraft_id):
                continue

            # Accept trigger only if not already in MAINTENANCE (deterministic, no stacking).
            if self.phase != "MAINTENANCE":
                started = True
                self.next_phase_time = current_time + float(self.maintenance_time)
                self._pending_idle_payload = {"aircraft_id": int(self.aircraft_id)}
                self._pending_maintenance_done_payload = {"aircraft_id": int(self.aircraft_id)}
                self.hold_in("MAINTENANCE", max(0.0, float(self.maintenance_time)))
            # If already in MAINTENANCE, ignore additional triggers deterministically.

        if not started:
            self.hold_in(self.phase, remaining_after_e)`,lambdaf:`    def lambdaf(self):
        # Output function: output only, no state changes.
        if self.phase == "MAINTENANCE":
            if isinstance(self._pending_idle_payload, dict):
                self.output["idle_out"].add(self._pending_idle_payload)
            if isinstance(self._pending_maintenance_done_payload, dict):
                self.output["maintenance_done_out"].add(self._pending_maintenance_done_payload)`,deltint:`    def deltint(self):
        # Internal transition: handle maintenance completion.
        current_time = float(get_current_time())

        if self.phase == "MAINTENANCE":
            # Maintenance completes now (time == next_phase_time by construction).
            self.maintenance_completed += 1

            # Required event log: maintenance_end
            self.logger.info(
                {
                    "time": float(current_time),
                    "entity": "aircraft",
                    "event": "maintenance_end",
                    "payload": {
                        "aircraft_id": int(self.aircraft_id),
                    },
                },
                log_type="PROCESS",
            )

            # Transition to IDLE
            self.next_phase_time = None
            self._pending_idle_payload = None
            self._pending_maintenance_done_payload = None
            self.hold_in("IDLE", self.param["passive_sigma"])
        else:
            # IDLE has no scheduled internal events; keep passive.
            self.hold_in("IDLE", self.param["passive_sigma"])`,exit:`    def exit(self):
        # Final stats logging
        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "aircraft",
                "event": "model_finalized",
                "payload": {
                    "aircraft_id": int(self.aircraft_id),
                    "maintenance_completed": int(self.maintenance_completed),
                },
            },
            log_type="RESULT",
        )`}},{id:`n15`,label:`DestinationSink`,modelType:`atomic`,x:1290,y:130,ports:{in:[`delivery_in`],out:[]},portsTyped:{in:[{name:`delivery_in`,type:`dict`}],out:[]},file:`StrategicAirlift_D0_libs/DestinationSink.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        # Ports (must match specification)
        self.add_in_port(Port(dict, "delivery_in"))

        # Internal hardcoded parameters (none required, but reserved for consistency)
        self.param = {}

        # Internal state
        self.total_delivered = 0  # (int) cumulative deliveries recorded

        # Initial DEVS state (will be set again in initialize())
        self.hold_in("IDLE", float("inf"))

        # Log creation (must conform to the required {time, entity, event, payload} schema)
        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "destination",
                "event": "model_created",
                "payload": {"model_name": str(self.name)},
            },
            log_type="PROCESS",
        )`,initialize:`    def initialize(self):
        self.total_delivered = 0
        self.hold_in("IDLE", float("inf"))

        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "destination",
                "event": "model_initialized",
                "payload": {"model_name": str(self.name)},
            },
            log_type="PROCESS",
        )`,deltext:`    def deltext(self, e: float):
        _ = e  # elapsed time is not needed for this sink
        t_now = float(get_current_time())

        for delivery in self.input["delivery_in"].values:
            # Expected structure (dict):
            #   pallet_id (int), aircraft_id (int), latency (float)
            payload = {
                "pallet_id": int(delivery["pallet_id"]),
                "aircraft_id": int(delivery["aircraft_id"]),
                "latency": float(delivery["latency"]),
            }

            self.total_delivered += 1
            self.logger.info(
                {
                    "time": t_now,
                    "entity": "destination",
                    "event": "pallet_delivered",
                    "payload": payload,
                },
                log_type="RESULT",
            )

        # Remain idle indefinitely
        self.hold_in("IDLE", float("inf"))`,lambdaf:`    def lambdaf(self):
        # No external outputs required by specification.
        return`,deltint:`    def deltint(self):
        # No internal events; remain idle.
        self.hold_in("IDLE", float("inf"))`,exit:`    def exit(self):
        self.logger.info(
            {
                "time": float(get_current_time()),
                "entity": "destination",
                "event": "model_finalized",
                "payload": {"model_name": str(self.name), "total_delivered": int(self.total_delivered)},
            },
            log_type="RESULT",
        )`}}],edges:[[`n1`,`n2`,`contains`],[`n1`,`n3`,`contains`],[`n1`,`n6`,`contains`],[`n1`,`n15`,`contains`],[`n2`,`n3`,`IC: pallet_out -> pallet_in`],[`n3`,`n6`,`IC: assignment_out -> assignment_in`],[`n6`,`n3`,`IC: aircraft_idle_out -> aircraft_idle_in`],[`n6`,`n15`,`IC: delivery_out -> delivery_in`],[`n3`,`n4`,`EIC: pallet_in`],[`n3`,`n5`,`EIC: aircraft_idle_in`],[`n5`,`n4`,`IC: dequeue_req_out -> dequeue_req_in`],[`n4`,`n5`,`IC: pallet_out -> pallet_in`],[`n4`,`n5`,`IC: queue_status_out -> queue_status_in`],[`n5`,`n3`,`EOC: assignment_out`],[`n6`,`n8`,`EIC broadcast: assignment_in`],[`n6`,`n9`,`EIC broadcast: assignment_in`],[`n6`,`n10`,`EIC broadcast: assignment_in`],[`n8`,`n7`,`IC: idle_out -> aircraft_idle_in`],[`n8`,`n7`,`IC: delivery_out -> delivery_in`],[`n9`,`n7`,`IC: idle_out -> aircraft_idle_in`],[`n9`,`n7`,`IC: delivery_out -> delivery_in`],[`n10`,`n7`,`IC: idle_out -> aircraft_idle_in`],[`n10`,`n7`,`IC: delivery_out -> delivery_in`],[`n7`,`n6`,`EOC: aircraft_idle_out`],[`n7`,`n6`,`EOC: delivery_out`],[`n8`,`n11`,`contains`],[`n8`,`n14`,`contains`],[`n11`,`n12`,`contains`],[`n11`,`n13`,`contains`],[`n8`,`n11`,`EIC: assignment_in`],[`n11`,`n8`,`EOC: delivery_out`],[`n14`,`n8`,`EOC: idle_out`],[`n11`,`n12`,`EIC: assignment_in + maintenance_done_in`],[`n12`,`n11`,`EOC: delivery_out + maintenance_start_out`],[`n12`,`n13`,`IC: log_out -> log_in`],[`n11`,`n14`,`IC: maintenance_start_out -> maintenance_start_in`],[`n14`,`n11`,`IC: maintenance_done_out -> maintenance_done_in`]],groups:[{members:[`n4`,`n5`],label:`children of OpsCenterQueueCoordinator`},{members:[`n7`,`n8`,`n9`,`n10`],label:`children of AircraftFleet`},{members:[`n11`,`n14`],label:`children of AircraftUnit aircraft_1`},{members:[`n12`,`n13`],label:`children of A1 AircraftMissionController`}]},eval:[`Debug-copy benchmark replay: Score_ope=1.0 and Score_beh=1.0 across 9 SA evaluation settings.`,`Pipeline: generated simulator entry -> benchmark/SA/sa_test_config.json test matrix -> benchmark/SA/checker.py scoring.`,`All key rule groups pass: output_format, pallet_lifecycle, aircraft_state_machine, coordinator_logic, metrics_accuracy.`,`Evaluation confirms timing consistency for return/maintenance_start lifecycle constraints.`,`Evaluation artifact: SA benchmark summary output + benchmark/SA/checker.py.`],evalFlow:[{id:`s1`,step:`Step 1`,title:`Load benchmark suite D and per-case runtime inputs for SA`,paperStep:`Sec.4.1 + Sec.4.3`,artifact:`benchmark/SA/sa_test_config.json`,result:`Evaluator reads 9 SA settings (L0/L1/L2) with deterministic timing/fleet parameters and checker-side expectations.`,sampleSelectionNote:`For readability, panel 4 shows one representative trace excerpt selected from all SA evaluation outputs. The underlying full log for this data point has 217 JSONL lines (time 0.0 to 501.0).`,sampleConfig:`{"name":"L1_Queue_Formation","checker_args":{"test_name":"L1_Queue_Formation","aircraft_count":2,"duration":500.0},"cases":[{"sim_args":{"--duration":500.0,"--num_aircraft":2,"--pallet_interval":10.0,"--pallet_expiration_time":250.0,"--flight_time":30.0,"--unload_time":2.0,"--return_time":30.0,"--maintenance_time":5.0}}]}`},{id:`s2`,step:`Step 2`,title:`Execute generated model M(d_i) and emit JSONL trace T_i`,paperStep:`Sec.2.1 simulator M(I,J) and trace T`,artifact:`.../strategic_airlift_eval_results/*/model_output_run0.jsonl`,result:`Each case emits required entity/event records for facility, queue, coordinator, aircraft, and destination.`,sampleLogNote:`Shown below is an excerpt for L1_Queue_Formation. Full trace has 217 JSONL lines.`,sampleLogs:`{"time":0.0,"entity":"queue","event":"pallet_queued","payload":{"pallet_id":1,"queue_size":1}}
{"time":0.0,"entity":"facility","event":"pallet_generated","payload":{"pallet_id":1,"expiration_time":250.0}}
{"time":0.0,"entity":"coordinator","event":"assignment_created","payload":{"aircraft_id":1,"pallet_id":1}}
{"time":0.0,"entity":"aircraft","event":"depart","payload":{"aircraft_id":1,"pallet_id":1}}
{"time":10.0,"entity":"queue","event":"pallet_queued","payload":{"pallet_id":2,"queue_size":1}}
{"time":10.0,"entity":"facility","event":"pallet_generated","payload":{"pallet_id":2,"expiration_time":260.0}}
{"time":10.0,"entity":"coordinator","event":"assignment_created","payload":{"aircraft_id":2,"pallet_id":2}}
{"time":10.0,"entity":"aircraft","event":"depart","payload":{"aircraft_id":2,"pallet_id":2}}
{"time":20.0,"entity":"queue","event":"pallet_queued","payload":{"pallet_id":3,"queue_size":1}}
{"time":30.0,"entity":"queue","event":"pallet_queued","payload":{"pallet_id":4,"queue_size":2}}
{"time":32.0,"entity":"destination","event":"pallet_delivered","payload":{"pallet_id":1,"aircraft_id":1,"latency":32.0}}
{"time":42.0,"entity":"destination","event":"pallet_delivered","payload":{"pallet_id":2,"aircraft_id":2,"latency":32.0}}
{"time":67.0,"entity":"coordinator","event":"assignment_created","payload":{"aircraft_id":1,"pallet_id":3}}
{"time":77.0,"entity":"coordinator","event":"assignment_created","payload":{"aircraft_id":2,"pallet_id":4}}`},{id:`s3`,step:`Step 3`,title:`Apply SA checker rules over operational, micro-level, and macro-level constraints`,paperStep:`Sec.4.1 Behavioral Conformance`,artifact:`benchmark/SA/checker.py`,result:`Checker verifies lifecycle integrity, state-machine timing, assignment logic, and latency correctness with per-case add_case accumulation.`},{id:`s4`,step:`Step 4`,title:`Aggregate Score_ope/Score_beh over test suite D; SA run reaches 1.0/1.0`,paperStep:`Sec.4.3 Eq.(1)`,artifact:`.../strategic_airlift_eval_results/summary.json`,result:`All 9 SA entries return score=1.0, so aggregate benchmark score is 1.0 for this demo run.`,formula:Pu,workedExample:`SA demo uses N=9 test cases.
- All runs are operationally valid, so v_i=1 for all i and Score_ope=(1/9)*sum_i v_i=1.0.
- All micro-level and macro-level rules pass, so c_i=1 for all i and Score_beh=(1/9)*sum_i c_i=1.0.`}],evalRuleGroups:[{group:`Operational Success (Spec_ope)`,rules:[{name:`output_format`,what:`Ensure valid simulation events exist and conform to required JSONL structure.`,granularity:`Per run and per line-level schema checks.`,checkerCode:`validate_log_entry_hook(): checks required keys {time,entity,event,payload}, valid entity/event set, payload dict type.`}]},{group:`Micro-level Consistency`,rules:[{name:`pallet_lifecycle`,what:`Checks pallet conservation, deadline consistency, exact expiration timing, and delivery/assignment exclusivity.`,granularity:`Per pallet lifecycle.`,checkerCode:`_check_pallet_lifecycle(): verify reported_deadline == gen_time + configured expiration and lifecycle transitions.`},{name:`aircraft_state_machine`,what:`Validates cycle timing: Depart -> Return duration equals flight + unload + return; maintenance duration matches config.`,granularity:`Per aircraft cycle.`,checkerCode:`_check_aircraft_statemachine(): compares actual cycle deltas with configured flight/unload/return/maintenance.`}]},{group:`Macro-level Causality`,rules:[{name:`coordinator_logic`,what:`Ensures near-zero load delay between assignment_created and matching depart event.`,granularity:`Per assignment.`,checkerCode:`_check_coordinator_logic(): find matching depart by aircraft_id+pallet_id and enforce zero-duration loading tolerance.`},{name:`metrics_accuracy`,what:`Verifies reported latency equals delivered_time - generated_time.`,granularity:`Per delivered pallet.`,checkerCode:`_check_metrics_accuracy(): compare payload latency to reconstructed timestamps for each delivered pallet.`}]}],interactive:null},{id:`icu`,title:`ICU Case`,tag:`A constructed workflow demo case.`,inputText:Fu,sources:{input:`devs_demo/demo_cases/ori_scenes.md (ICU scene)`,plan:`devs_reasoning_app/outputs_v54_icu/scene_1_spec.yaml`,code:`devs_reasoning_app/working_dirs/scene1_gen_v3/tasks/icu_sepsis_treatment/devs_project/`,eval:`devs_reasoning_app/outputs_v54_icu/scene_1_direct_answer.md + devs_reasoning_app/outputs_v54_icu/scene_1_assisted_answer.md`},planTree:{id:`icu-root`,name:`icu_sepsis_treatment`,type:`coupled`,summary:`Batch coordinator + deterministic simulator + trace/result logging over 6-hour dynamics`,initArgs:[`simulation_id`,`horizon_hours`,`state_update_interval_hours`,`initial_state`,`model_parameters`],initArgsTyped:[{name:`simulation_id`,type:`str`},{name:`horizon_hours`,type:`int`},{name:`state_update_interval_hours`,type:`int`},{name:`initial_state`,type:`dict`},{name:`model_parameters`,type:`dict`}],ports:{input:[`plans_in`],output:[]},portsTyped:{input:[{name:`plans_in`,type:`list`}],output:[]},details:{function:`Root coupled model receives externally supplied plan batches, dispatches each plan through the same deterministic simulator, aggregates plan results, and emits final comparison result.`,logging:`Key logs: Batch Received, trace, Plan Result Prepared, Final Result Emitted, result.`,schemas:`plans_in:list -> plan_result:{final_state,final_score} -> result:{plans,best_plan_id}`},children:[{id:`icu-batch`,name:`plan_batch_coordinator`,type:`atomic`,summary:`Validates batch payload, dispatches plans, forwards per-plan results`,initArgs:[`simulation_id`,`horizon_hours`,`state_update_interval_hours`,`initial_state`,`model_parameters`],initArgsTyped:[{name:`simulation_id`,type:`str`},{name:`horizon_hours`,type:`int`}],ports:{input:[`plans_in`,`plan_result_in`],output:[`plan_out`,`batch_meta_out`,`plan_result_out`]},portsTyped:{input:[{name:`plans_in`,type:`list`},{name:`plan_result_in`,type:`dict`}],output:[{name:`plan_out`,type:`dict`},{name:`batch_meta_out`,type:`dict`},{name:`plan_result_out`,type:`dict`}]},details:{function:`Consumes one plan batch, preserves deterministic order, and coordinates full batch completion.`,logging:`Emits Batch Received / Plan Result Received / Batch Completed.`,schemas:`plans_in -> plan_out + batch_meta_out; plan_result_in -> plan_result_out`},children:[]},{id:`icu-sim`,name:`plan_simulator`,type:`atomic`,summary:`Deterministic hourly transition + scoring for each plan`,initArgs:[`simulation_id`,`horizon_hours`,`state_update_interval_hours`,`initial_state`,`model_parameters`],initArgsTyped:[{name:`simulation_id`,type:`str`},{name:`horizon_hours`,type:`int`}],ports:{input:[`plan_in`],output:[`trace_out`,`plan_result_out`]},portsTyped:{input:[{name:`plan_in`,type:`dict`}],output:[{name:`trace_out`,type:`dict`},{name:`plan_result_out`,type:`dict`}]},details:{function:`Applies delayed vasopressor/fluid/antibiotic effects, low-BP+high-infection kidney hazard, and end-of-hour scoring over horizon.`,logging:`Emits trace per hour and one plan result per plan.`,schemas:`plan_in:{plan_id,action_timeline} -> plan_result_out:{final_state,final_score,score_breakdown}`},children:[]},{id:`icu-trace`,name:`trace_logger`,type:`atomic`,summary:`Pass-through trace event logger`,initArgs:[`simulation_id`],initArgsTyped:[{name:`simulation_id`,type:`str`}],ports:{input:[`trace_in`],output:[]},portsTyped:{input:[{name:`trace_in`,type:`dict`}],output:[]},details:{function:`Receives all trace events from simulator and logs them in deterministic order.`,logging:`Emits trace events only.`,schemas:`trace_in -> log(trace)`},children:[]},{id:`icu-agg`,name:`result_aggregator`,type:`atomic`,summary:`Collects plan results and emits single batch result`,initArgs:[`simulation_id`,`horizon_hours`],initArgsTyped:[{name:`simulation_id`,type:`str`},{name:`horizon_hours`,type:`int`}],ports:{input:[`batch_meta_in`,`plan_result_in`],output:[`result_out`]},portsTyped:{input:[{name:`batch_meta_in`,type:`dict`},{name:`plan_result_in`,type:`dict`}],output:[{name:`result_out`,type:`dict`}]},details:{function:`Deterministically sorts/compares plan results and emits one result event with best_plan_id.`,logging:`Emits Final Result Prepared and result.`,schemas:`batch_meta + plan_results -> result:{plans,best_plan_id}`},children:[]},{id:`icu-rlog`,name:`result_logger`,type:`atomic`,summary:`Final result logger`,initArgs:[`simulation_id`],initArgsTyped:[{name:`simulation_id`,type:`str`}],ports:{input:[`result_in`],output:[]},portsTyped:{input:[{name:`result_in`,type:`dict`}],output:[]},details:{function:`Logs the final result event exactly once.`,logging:`Emits result event to output stream.`,schemas:`result_in -> log(result)`},children:[]}]},codeGraph:{nodes:[{id:`c1`,label:`icu_sepsis_treatment (coupled)`,modelType:`coupled`,x:440,y:70,ports:{in:[`plans_in`],out:[]},portsTyped:{in:[{name:`plans_in`,type:`list`}],out:[]},file:`icu_sepsis_treatment.py`,methods:{__init__:`    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        simulation_id: str,
        horizon_hours: int,
        state_update_interval_hours: int,
        initial_state: dict,
        model_parameters: dict,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            simulation_id (str): Opaque batch identifier copied into sub-model configurations and logs.
            horizon_hours (int): Batch simulation horizon in hours. Expected value for this task is 6.
            state_update_interval_hours (int): State update interval in hours. Expected value for this task is 1.
            initial_state (dict): Shared initial patient state for all evaluated plans.
                blood_pressure (str): Initial blood pressure category; expected "low" or "stable".
                infection_burden (str): Initial infection burden category; expected "high", "medium", or "low".
                kidney_stress (str): Initial kidney stress category; expected "mild", "moderate", or "severe".
                fluid_overload (bool): Initial fluid overload status.
            model_parameters (dict): Deterministic rule parameters used by coordinator and simulator.
                fluid_support_delay_hours (int): Delay from IV fluid administration to support start.
                fluid_support_duration_hours (int): Duration of fluid-support activity once started.
                antibiotic_delay_hours (int): Delay from antibiotic administration to effect activation.
                max_intervention_hour (int): Latest hour allowed to contain non-empty interventions.
                repeated_vasopressor_toxicity_rule (str): Human-readable deterministic rule description.
                fluid_overload_rule (str): Human-readable deterministic rule description.
                infection_reduction_rule (str): Human-readable deterministic rule description.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.param = {
            "component_names": [
                "batch_coordinator",
                "plan_simulator",
                "trace_logger",
                "result_aggregator",
                "result_logger",
            ],
            "evaluator_count": 1,
            "architecture": "single_plan_simulator_with_batch_coordination_and_result_aggregation",
        }

        self.add_in_port(Port(list, "plans_in"))

        batch_coordinator = plan_batch_coordinator(
            name="batch_coordinator",
            parent=self,
            simulation_id=simulation_id,
            horizon_hours=horizon_hours,
            state_update_interval_hours=state_update_interval_hours,
            initial_state=initial_state,
            model_parameters=model_parameters,
        )
        simulator = plan_simulator(
            name="plan_simulator",
            parent=self,
            simulation_id=simulation_id,
            horizon_hours=horizon_hours,
            state_update_interval_hours=state_update_interval_hours,
            initial_state=initial_state,
            model_parameters=model_parameters,
        )
        trace_log = trace_logger(
            name="trace_logger",
            parent=self,
            simulation_id=simulation_id,
        )
        aggregator = result_aggregator(
            name="result_aggregator",
            parent=self,
            simulation_id=simulation_id,
            horizon_hours=horizon_hours,
        )
        final_result_logger = result_logger(
            name="result_logger",
            parent=self,
            simulation_id=simulation_id,
        )

        self.add_component(batch_coordinator)
        self.add_component(simulator)
        self.add_component(trace_log)
        self.add_component(aggregator)
        self.add_component(final_result_logger)

        self.add_coupling(self.input["plans_in"], batch_coordinator.input["plans_in"])

        self.add_coupling(batch_coordinator.output["plan_out"], simulator.input["plan_in"])
        self.add_coupling(batch_coordinator.output["batch_meta_out"], aggregator.input["batch_meta_in"])
        self.add_coupling(simulator.output["trace_out"], trace_log.input["trace_in"])
        self.add_coupling(simulator.output["plan_result_out"], batch_coordinator.input["plan_result_in"])
        self.add_coupling(batch_coordinator.output["plan_result_out"], aggregator.input["plan_result_in"])
        self.add_coupling(aggregator.output["result_out"], final_result_logger.input["result_in"])

        self.logger.info(
            {
                "event": "Model Created",
                "model": self.name,
                "simulation_id": simulation_id,
                "horizon_hours": horizon_hours,
                "state_update_interval_hours": state_update_interval_hours,
                "initial_state": {
                    "blood_pressure": initial_state["blood_pressure"],
                    "infection_burden": initial_state["infection_burden"],
                    "kidney_stress": initial_state["kidney_stress"],
                    "fluid_overload": initial_state["fluid_overload"],
                },
                "model_parameters": {
                    "fluid_support_delay_hours": model_parameters["fluid_support_delay_hours"],
                    "fluid_support_duration_hours": model_parameters["fluid_support_duration_hours"],
                    "antibiotic_delay_hours": model_parameters["antibiotic_delay_hours"],
                    "max_intervention_hour": model_parameters["max_intervention_hour"],
                    "repeated_vasopressor_toxicity_rule": model_parameters["repeated_vasopressor_toxicity_rule"],
                    "fluid_overload_rule": model_parameters["fluid_overload_rule"],
                    "infection_reduction_rule": model_parameters["infection_reduction_rule"],
                },
                "param": self.param,
                "time": get_current_time(),
            },
            log_type="PROCESS",
        )`}},{id:`c2`,label:`plan_batch_coordinator`,modelType:`atomic`,x:170,y:240,ports:{in:[`plans_in`,`plan_result_in`],out:[`plan_out`,`batch_meta_out`,`plan_result_out`]},portsTyped:{in:[{name:`plans_in`,type:`list`},{name:`plan_result_in`,type:`dict`}],out:[{name:`plan_out`,type:`dict`},{name:`batch_meta_out`,type:`dict`},{name:`plan_result_out`,type:`dict`}]},file:`icu_sepsis_treatment_libs/plan_batch_coordinator.py`,methods:{__init__:`    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        simulation_id: str,
        horizon_hours: int,
        state_update_interval_hours: int,
        initial_state: dict,
        model_parameters: dict
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            simulation_id (str): Opaque batch identifier copied into logs.
            horizon_hours (int): Batch simulation horizon. Must be 6 for this task.
            state_update_interval_hours (int): State update interval. Must be 1 for this task.
            initial_state (dict): Starting patient state shared across independently evaluated plans.
                blood_pressure (str): Initial blood pressure category, "low" or "stable".
                infection_burden (str): Initial infection burden category, "high", "medium", or "low".
                kidney_stress (str): Initial kidney stress category, "mild", "moderate", or "severe".
                fluid_overload (bool): Initial fluid overload flag.
            model_parameters (dict): Deterministic model parameter contract forwarded conceptually to sibling simulators.
                fluid_support_delay_hours (int): Delay before fluid support starts.
                fluid_support_duration_hours (int): Duration of fluid support.
                antibiotic_delay_hours (int): Delay before antibiotic effect starts.
                max_intervention_hour (int): Maximum hour at which interventions are allowed.
                repeated_vasopressor_toxicity_rule (str): Documentation string for deterministic vasopressor toxicity rule.
                fluid_overload_rule (str): Documentation string for deterministic fluid overload rule.
                infection_reduction_rule (str): Documentation string for deterministic infection reduction rule.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.add_in_port(Port(list, "plans_in"))
        self.add_in_port(Port(dict, "plan_result_in"))
        self.add_out_port(Port(dict, "plan_out"))
        self.add_out_port(Port(dict, "batch_meta_out"))
        self.add_out_port(Port(dict, "plan_result_out"))

        self.simulation_id = simulation_id
        self.horizon_hours = horizon_hours
        self.state_update_interval_hours = state_update_interval_hours
        self.initial_state = {
            "blood_pressure": initial_state["blood_pressure"],
            "infection_burden": initial_state["infection_burden"],
            "kidney_stress": initial_state["kidney_stress"],
            "fluid_overload": initial_state["fluid_overload"]
        }
        self.model_parameters = {
            "fluid_support_delay_hours": model_parameters["fluid_support_delay_hours"],
            "fluid_support_duration_hours": model_parameters["fluid_support_duration_hours"],
            "antibiotic_delay_hours": model_parameters["antibiotic_delay_hours"],
            "max_intervention_hour": model_parameters["max_intervention_hour"],
            "repeated_vasopressor_toxicity_rule": model_parameters["repeated_vasopressor_toxicity_rule"],
            "fluid_overload_rule": model_parameters["fluid_overload_rule"],
            "infection_reduction_rule": model_parameters["infection_reduction_rule"]
        }

        self.param = {
            "allowed_actions": ["vasopressor", "iv_fluids", "antibiotic"],
            "allowed_blood_pressure": ["low", "stable"],
            "allowed_infection_burden": ["high", "medium", "low"],
            "allowed_kidney_stress": ["mild", "moderate", "severe"],
            "expected_horizon_hours": 6,
            "expected_state_update_interval_hours": 1
        }

        self.batch_received = False
        self.batch_dispatched = False
        self.batch_aborted = False
        self.plan_order = []
        self.expected_plan_count = 0
        self.received_plan_results = 0
        self.forwarded_plan_results = 0
        self.received_result_plan_ids = []
        self.pending_plan_outputs = []
        self.pending_batch_meta = None
        self.pending_result_outputs = []
        self.last_error = None

        self.hold_in("WAITING", float("inf"))

        self.logger.info(
            {
                "event": "Model Created",
                "model": self.name,
                "simulation_id": self.simulation_id,
                "horizon_hours": self.horizon_hours,
                "state_update_interval_hours": self.state_update_interval_hours,
                "initial_state": self.initial_state,
                "model_parameters": self.model_parameters,
                "param": self.param,
                "time": get_current_time()
            },
            log_type="PROCESS"
        )`,initialize:`    def initialize(self):
        self.batch_received = False
        self.batch_dispatched = False
        self.batch_aborted = False
        self.plan_order = []
        self.expected_plan_count = 0
        self.received_plan_results = 0
        self.forwarded_plan_results = 0
        self.received_result_plan_ids = []
        self.pending_plan_outputs = []
        self.pending_batch_meta = None
        self.pending_result_outputs = []
        self.last_error = None

        self.hold_in("WAITING", float("inf"))
        self.logger.info(
            {
                "event": "Model Initialized",
                "model": self.name,
                "simulation_id": self.simulation_id,
                "time": get_current_time()
            },
            log_type="PROCESS"
        )`,_copy_initial_state:`    def _copy_initial_state(self) -> dict:
        return {
            "blood_pressure": self.initial_state["blood_pressure"],
            "infection_burden": self.initial_state["infection_burden"],
            "kidney_stress": self.initial_state["kidney_stress"],
            "fluid_overload": self.initial_state["fluid_overload"]
        }`,_validate_and_normalize_plan_batch:`    def _validate_and_normalize_plan_batch(self, plans: list) -> tuple[bool, list, dict | None]:
        if self.horizon_hours != self.param["expected_horizon_hours"]:
            return False, [], {
                "event": "Batch Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "invalid_horizon_hours",
                "horizon_hours": self.horizon_hours,
                "expected_horizon_hours": self.param["expected_horizon_hours"],
                "time": get_current_time()
            }

        if self.state_update_interval_hours != self.param["expected_state_update_interval_hours"]:
            return False, [], {
                "event": "Batch Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "invalid_state_update_interval_hours",
                "state_update_interval_hours": self.state_update_interval_hours,
                "expected_state_update_interval_hours": self.param["expected_state_update_interval_hours"],
                "time": get_current_time()
            }

        if not isinstance(plans, list):
            return False, [], {
                "event": "Batch Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "plans_in_not_list",
                "time": get_current_time()
            }

        normalized = []
        seen_plan_ids = []

        for index, plan in enumerate(plans):
            if not isinstance(plan, dict):
                return False, [], {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "plan_not_dict",
                    "plan_index": index,
                    "time": get_current_time()
                }

            if "plan_id" not in plan or "action_timeline" not in plan:
                return False, [], {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "missing_plan_fields",
                    "plan_index": index,
                    "time": get_current_time()
                }

            plan_id = plan["plan_id"]
            action_timeline = plan["action_timeline"]

            if not isinstance(plan_id, str):
                return False, [], {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "plan_id_not_str",
                    "plan_index": index,
                    "time": get_current_time()
                }

            if plan_id in seen_plan_ids:
                return False, [], {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "duplicate_plan_id",
                    "plan_id": plan_id,
                    "plan_index": index,
                    "time": get_current_time()
                }

            if not isinstance(action_timeline, dict):
                return False, [], {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "action_timeline_not_dict",
                    "plan_id": plan_id,
                    "time": get_current_time()
                }

            normalized_timeline = {}
            max_intervention_hour = self.model_parameters["max_intervention_hour"]

            for hour_key, actions in action_timeline.items():
                if not isinstance(hour_key, str):
                    return False, [], {
                        "event": "Batch Validation Error",
                        "simulation_id": self.simulation_id,
                        "reason": "hour_key_not_str",
                        "plan_id": plan_id,
                        "time": get_current_time()
                    }

                try:
                    hour_int = int(hour_key)
                except Exception:
                    return False, [], {
                        "event": "Batch Validation Error",
                        "simulation_id": self.simulation_id,
                        "reason": "hour_key_not_integer_string",
                        "plan_id": plan_id,
                        "hour": hour_key,
                        "time": get_current_time()
                    }

                if str(hour_int) != hour_key:
                    return False, [], {
                        "event": "Batch Validation Error",
                        "simulation_id": self.simulation_id,
                        "reason": "hour_key_not_canonical_integer_string",
                        "plan_id": plan_id,
                        "hour": hour_key,
                        "time": get_current_time()
                    }

                if hour_int < 0 or hour_int > max_intervention_hour:
                    return False, [], {
                        "event": "Batch Validation Error",
                        "simulation_id": self.simulation_id,
                        "reason": "hour_out_of_allowed_range",
                        "plan_id": plan_id,
                        "hour": hour_int,
                        "max_intervention_hour": max_intervention_hour,
                        "time": get_current_time()
                    }

                if not isinstance(actions, list):
                    return False, [], {
                        "event": "Batch Validation Error",
                        "simulation_id": self.simulation_id,
                        "reason": "actions_not_list",
                        "plan_id": plan_id,
                        "hour": hour_int,
                        "time": get_current_time()
                    }

                normalized_actions = []
                seen_actions = []
                for action in actions:
                    if not isinstance(action, str):
                        return False, [], {
                            "event": "Batch Validation Error",
                            "simulation_id": self.simulation_id,
                            "reason": "action_not_str",
                            "plan_id": plan_id,
                            "hour": hour_int,
                            "time": get_current_time()
                        }
                    if action not in self.param["allowed_actions"]:
                        return False, [], {
                            "event": "Batch Validation Error",
                            "simulation_id": self.simulation_id,
                            "reason": "unknown_action",
                            "plan_id": plan_id,
                            "hour": hour_int,
                            "action": action,
                            "time": get_current_time()
                        }
                    if action in seen_actions:
                        return False, [], {
                            "event": "Batch Validation Error",
                            "simulation_id": self.simulation_id,
                            "reason": "duplicate_action_same_hour",
                            "plan_id": plan_id,
                            "hour": hour_int,
                            "action": action,
                            "time": get_current_time()
                        }
                    seen_actions.append(action)
                    normalized_actions.append(action)

                normalized_timeline[str(hour_int)] = normalized_actions

            for hour_int in range(0, max_intervention_hour + 1):
                hour_key = str(hour_int)
                if hour_key not in normalized_timeline:
                    normalized_timeline[hour_key] = []

            normalized.append(
                {
                    "plan_id": plan_id,
                    "action_timeline": normalized_timeline
                }
            )
            seen_plan_ids.append(plan_id)

        return True, normalized, None`,_validate_plan_result:`    def _validate_plan_result(self, result_payload: dict) -> tuple[bool, dict | None]:
        if not isinstance(result_payload, dict):
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "result_not_dict",
                "time": get_current_time()
            }

        required_top = ["plan_id", "final_state", "final_score", "score_breakdown"]
        for key in required_top:
            if key not in result_payload:
                return False, {
                    "event": "Plan Result Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "missing_result_field",
                    "missing_field": key,
                    "time": get_current_time()
                }

        if not isinstance(result_payload["plan_id"], str):
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "plan_id_not_str",
                "time": get_current_time()
            }

        if result_payload["plan_id"] not in self.plan_order:
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "unknown_plan_id_result",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        final_state = result_payload["final_state"]
        if not isinstance(final_state, dict):
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "final_state_not_dict",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        for field in ["blood_pressure", "infection_burden", "kidney_stress", "fluid_overload"]:
            if field not in final_state:
                return False, {
                    "event": "Plan Result Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "missing_final_state_field",
                    "plan_id": result_payload["plan_id"],
                    "missing_field": field,
                    "time": get_current_time()
                }

        if final_state["blood_pressure"] not in self.param["allowed_blood_pressure"]:
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "invalid_blood_pressure",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        if final_state["infection_burden"] not in self.param["allowed_infection_burden"]:
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "invalid_infection_burden",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        if final_state["kidney_stress"] not in self.param["allowed_kidney_stress"]:
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "invalid_kidney_stress",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        if not isinstance(final_state["fluid_overload"], bool):
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "fluid_overload_not_bool",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        if not isinstance(result_payload["final_score"], int):
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "final_score_not_int",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        score_breakdown = result_payload["score_breakdown"]
        if not isinstance(score_breakdown, dict):
            return False, {
                "event": "Plan Result Validation Error",
                "simulation_id": self.simulation_id,
                "reason": "score_breakdown_not_dict",
                "plan_id": result_payload["plan_id"],
                "time": get_current_time()
            }

        for field in ["blood_pressure_points", "infection_points", "kidney_penalty", "fluid_overload_penalty"]:
            if field not in score_breakdown or not isinstance(score_breakdown[field], int):
                return False, {
                    "event": "Plan Result Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "invalid_score_breakdown_field",
                    "plan_id": result_payload["plan_id"],
                    "missing_or_invalid_field": field,
                    "time": get_current_time()
                }

        return True, None`,lambdaf:`    def lambdaf(self):
        if self.phase == "DISPATCH":
            if self.pending_batch_meta is not None:
                self.output["batch_meta_out"].add(self.pending_batch_meta)
            for payload in self.pending_plan_outputs:
                self.output["plan_out"].add(payload)

        elif self.phase == "FORWARD_RESULT":
            for payload in self.pending_result_outputs:
                self.output["plan_result_out"].add(payload)`,deltint:`    def deltint(self):
        old_phase = self.phase
        _ = self.ta()

        if old_phase == "DISPATCH":
            self.batch_dispatched = True
            self.logger.info(
                {
                    "event": "Batch Dispatch Prepared",
                    "simulation_id": self.simulation_id,
                    "plan_order": self.plan_order,
                    "plan_count": self.expected_plan_count,
                    "time": get_current_time()
                },
                log_type="PROCESS"
            )
            self.pending_plan_outputs = []
            self.pending_batch_meta = None

            if self.expected_plan_count == 0:
                self.hold_in("DONE", float("inf"))
                self.logger.info(
                    {
                        "event": "Batch Completed",
                        "simulation_id": self.simulation_id,
                        "expected_plan_count": self.expected_plan_count,
                        "received_plan_results": self.received_plan_results,
                        "forwarded_plan_results": self.forwarded_plan_results,
                        "time": get_current_time()
                    },
                    log_type="PROCESS"
                )
            else:
                self.hold_in("WAITING", float("inf"))

        elif old_phase == "FORWARD_RESULT":
            forwarded_now = len(self.pending_result_outputs)
            self.forwarded_plan_results += forwarded_now
            self.pending_result_outputs = []

            if self.received_plan_results >= self.expected_plan_count and self.expected_plan_count > 0:
                self.hold_in("DONE", float("inf"))
                self.logger.info(
                    {
                        "event": "Batch Completed",
                        "simulation_id": self.simulation_id,
                        "expected_plan_count": self.expected_plan_count,
                        "received_plan_results": self.received_plan_results,
                        "forwarded_plan_results": self.forwarded_plan_results,
                        "time": get_current_time()
                    },
                    log_type="PROCESS"
                )
            else:
                self.hold_in("WAITING", float("inf"))

        else:
            self.hold_in(self.phase, float("inf"))`,deltext:`    def deltext(self, e: float):
        current_phase = self.phase
        remaining = self.ta()
        if remaining != float("inf"):
            remaining = max(0.0, remaining - e)

        incoming_batches = []
        for batch in self.input["plans_in"].values:
            incoming_batches.append(batch)

        incoming_results = []
        for result_payload in self.input["plan_result_in"].values:
            incoming_results.append(result_payload)

        if len(incoming_batches) > 0:
            if self.batch_received:
                self.last_error = {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "multiple_batches_received",
                    "batch_count_received_now": len(incoming_batches),
                    "time": get_current_time()
                }
                self.logger.info(self.last_error, log_type="ERROR")
                self.batch_aborted = True
                self.hold_in("DONE", float("inf"))
                return

            if len(incoming_batches) != 1:
                self.last_error = {
                    "event": "Batch Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "expected_single_batch_event",
                    "batch_count_received_now": len(incoming_batches),
                    "time": get_current_time()
                }
                self.logger.info(self.last_error, log_type="ERROR")
                self.batch_aborted = True
                self.hold_in("DONE", float("inf"))
                return

            batch_payload = incoming_batches[0]
            valid, normalized_plans, error_payload = self._validate_and_normalize_plan_batch(batch_payload)
            if not valid:
                self.last_error = error_payload
                self.logger.info(error_payload, log_type="ERROR")
                self.batch_aborted = True
                self.hold_in("DONE", float("inf"))
                return

            self.batch_received = True
            self.plan_order = [plan["plan_id"] for plan in normalized_plans]
            self.expected_plan_count = len(normalized_plans)

            self.pending_plan_outputs = []
            for index, plan in enumerate(normalized_plans):
                self.pending_plan_outputs.append(
                    {
                        "plan_index": index,
                        "plan_id": plan["plan_id"],
                        "action_timeline": plan["action_timeline"],
                        "initial_state": self._copy_initial_state()
                    }
                )

            self.pending_batch_meta = {
                "plan_order": [plan_id for plan_id in self.plan_order],
                "plan_count": self.expected_plan_count,
                "horizon_hours": self.horizon_hours
            }

            self.logger.info(
                {
                    "event": "Batch Received",
                    "simulation_id": self.simulation_id,
                    "plan_order": self.plan_order,
                    "plan_count": self.expected_plan_count,
                    "time": get_current_time()
                },
                log_type="PROCESS"
            )

            self.hold_in("DISPATCH", 0.0)
            return

        if len(incoming_results) > 0:
            if not self.batch_received or self.batch_aborted:
                self.last_error = {
                    "event": "Plan Result Validation Error",
                    "simulation_id": self.simulation_id,
                    "reason": "result_received_before_valid_batch",
                    "result_count_received_now": len(incoming_results),
                    "time": get_current_time()
                }
                self.logger.info(self.last_error, log_type="ERROR")
                self.hold_in("DONE", float("inf"))
                return

            prepared = []
            for result_payload in incoming_results:
                valid, error_payload = self._validate_plan_result(result_payload)
                if not valid:
                    self.last_error = error_payload
                    self.logger.info(error_payload, log_type="ERROR")
                    self.batch_aborted = True
                    self.hold_in("DONE", float("inf"))
                    return

                plan_id = result_payload["plan_id"]
                if plan_id in self.received_result_plan_ids:
                    self.last_error = {
                        "event": "Plan Result Validation Error",
                        "simulation_id": self.simulation_id,
                        "reason": "duplicate_plan_result",
                        "plan_id": plan_id,
                        "time": get_current_time()
                    }
                    self.logger.info(self.last_error, log_type="ERROR")
                    self.batch_aborted = True
                    self.hold_in("DONE", float("inf"))
                    return

                self.received_result_plan_ids.append(plan_id)
                self.received_plan_results += 1
                prepared.append(
                    {
                        "plan_id": result_payload["plan_id"],
                        "final_state": {
                            "blood_pressure": result_payload["final_state"]["blood_pressure"],
                            "infection_burden": result_payload["final_state"]["infection_burden"],
                            "kidney_stress": result_payload["final_state"]["kidney_stress"],
                            "fluid_overload": result_payload["final_state"]["fluid_overload"]
                        },
                        "final_score": result_payload["final_score"],
                        "score_breakdown": {
                            "blood_pressure_points": result_payload["score_breakdown"]["blood_pressure_points"],
                            "infection_points": result_payload["score_breakdown"]["infection_points"],
                            "kidney_penalty": result_payload["score_breakdown"]["kidney_penalty"],
                            "fluid_overload_penalty": result_payload["score_breakdown"]["fluid_overload_penalty"]
                        }
                    }
                )

                self.logger.info(
                    {
                        "event": "Plan Result Received",
                        "simulation_id": self.simulation_id,
                        "plan_id": plan_id,
                        "received_plan_results": self.received_plan_results,
                        "expected_plan_count": self.expected_plan_count,
                        "time": get_current_time()
                    },
                    log_type="PROCESS"
                )

            self.pending_result_outputs = prepared
            self.hold_in("FORWARD_RESULT", 0.0)
            return

        self.hold_in(current_phase, remaining)`,exit:`    def exit(self):
        self.logger.info(
            {
                "event": "Model Finalized",
                "simulation_id": self.simulation_id,
                "batch_received": self.batch_received,
                "batch_dispatched": self.batch_dispatched,
                "batch_aborted": self.batch_aborted,
                "expected_plan_count": self.expected_plan_count,
                "received_plan_results": self.received_plan_results,
                "forwarded_plan_results": self.forwarded_plan_results,
                "plan_order": self.plan_order,
                "time": get_current_time()
            },
            log_type="RESULT"
        )`}},{id:`c3`,label:`plan_simulator`,modelType:`atomic`,x:420,y:240,ports:{in:[`plan_in`],out:[`trace_out`,`plan_result_out`]},portsTyped:{in:[{name:`plan_in`,type:`dict`}],out:[{name:`trace_out`,type:`dict`},{name:`plan_result_out`,type:`dict`}]},file:`icu_sepsis_treatment_libs/plan_simulator.py`,methods:{__init__:`    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        simulation_id: str,
        horizon_hours: int,
        state_update_interval_hours: int,
        initial_state: dict,
        model_parameters: dict,
    ):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            simulation_id (str): Opaque batch identifier copied into all emitted trace logs.
            horizon_hours (int): Simulation horizon in hours. Must be 6 for this task and hours 0 through 6 inclusive are evaluated.
            state_update_interval_hours (int): Hourly update interval. Must be 1 for this task.
            initial_state (dict): Default initial patient state.
                blood_pressure (str): Initial blood pressure category, "low" or "stable".
                infection_burden (str): Initial infection burden category, "high", "medium", or "low".
                kidney_stress (str): Initial kidney stress category, "mild", "moderate", or "severe".
                fluid_overload (bool): Initial fluid overload flag.
            model_parameters (dict): Deterministic model parameters and rule labels.
                fluid_support_delay_hours (int): Delay from IV fluid administration to support start.
                fluid_support_duration_hours (int): Number of hours fluid support remains active once started.
                antibiotic_delay_hours (int): Delay from antibiotic administration to infection effect activation.
                max_intervention_hour (int): Last hour in which interventions may be scheduled.
                repeated_vasopressor_toxicity_rule (str): Human-readable deterministic toxicity rule description.
                fluid_overload_rule (str): Human-readable deterministic overload rule description.
                infection_reduction_rule (str): Human-readable deterministic infection reduction rule description.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.add_in_port(Port(dict, "plan_in"))
        self.add_out_port(Port(dict, "trace_out"))
        self.add_out_port(Port(dict, "plan_result_out"))

        self.simulation_id = simulation_id
        self.horizon_hours = horizon_hours
        self.state_update_interval_hours = state_update_interval_hours
        self.default_initial_state = {
            "blood_pressure": initial_state["blood_pressure"],
            "infection_burden": initial_state["infection_burden"],
            "kidney_stress": initial_state["kidney_stress"],
            "fluid_overload": initial_state["fluid_overload"],
        }
        self.model_parameters = {
            "fluid_support_delay_hours": model_parameters["fluid_support_delay_hours"],
            "fluid_support_duration_hours": model_parameters[
                "fluid_support_duration_hours"
            ],
            "antibiotic_delay_hours": model_parameters["antibiotic_delay_hours"],
            "max_intervention_hour": model_parameters["max_intervention_hour"],
            "repeated_vasopressor_toxicity_rule": model_parameters[
                "repeated_vasopressor_toxicity_rule"
            ],
            "fluid_overload_rule": model_parameters["fluid_overload_rule"],
            "infection_reduction_rule": model_parameters["infection_reduction_rule"],
        }

        self.param = {
            "allowed_actions": ["vasopressor", "iv_fluids", "antibiotic"],
            "blood_pressure_order": ["low", "stable"],
            "infection_order": ["high", "medium", "low"],
            "kidney_order": ["mild", "moderate", "severe"],
            "fluid_overload_threshold": 2,
        }

        self.plan_loaded = False
        self.plan_index = -1
        self.plan_id = ""
        self.plan_queue = []
        self.action_timeline = {}

        self.current_hour = 0
        self.state = {}
        self.fluid_tokens = []
        self.antibiotic_tokens = []
        self.vasopressor_count = 0
        self.fluid_count = 0

        self.pending_trace_payload = None
        self.pending_result_payload = None

        self.trace_count = 0
        self.error_count = 0

        self.hold_in("WAIT_PLAN", math.inf)

        self.logger.info(
            {
                "event": "Model Created",
                "simulation_id": self.simulation_id,
                "horizon_hours": self.horizon_hours,
                "state_update_interval_hours": self.state_update_interval_hours,
                "initial_state": self.default_initial_state,
                "model_parameters": self.model_parameters,
                "param": self.param,
                "time": get_current_time(),
            },
            log_type="PROCESS",
        )`,initialize:`    def initialize(self):
        self.plan_loaded = False
        self.plan_index = -1
        self.plan_id = ""
        self.plan_queue = []
        self.action_timeline = {}
        self.current_hour = 0
        self.state = {
            "blood_pressure": self.default_initial_state["blood_pressure"],
            "infection_burden": self.default_initial_state["infection_burden"],
            "kidney_stress": self.default_initial_state["kidney_stress"],
            "fluid_overload": self.default_initial_state["fluid_overload"],
        }
        self.fluid_tokens = []
        self.antibiotic_tokens = []
        self.vasopressor_count = 0
        self.fluid_count = 0
        self.pending_trace_payload = None
        self.pending_result_payload = None
        self.trace_count = 0
        self.error_count = 0

        self.logger.info(
            {
                "event": "Model Initialized",
                "simulation_id": self.simulation_id,
                "phase": "WAIT_PLAN",
                "time": get_current_time(),
            },
            log_type="PROCESS",
        )
        self.hold_in("WAIT_PLAN", math.inf)`,lambdaf:`    def lambdaf(self):
        if self.phase == "EMIT_TRACE" and self.pending_trace_payload is not None:
            self.output["trace_out"].add(self.pending_trace_payload)
        elif self.phase == "EMIT_RESULT" and self.pending_result_payload is not None:
            self.output["plan_result_out"].add(self.pending_result_payload)`,deltint:`    def deltint(self):
        old_phase = self.phase
        old_sigma = self.ta()

        if old_phase == "EMIT_TRACE":
            self.trace_count += 1
            self.logger.info(self.pending_trace_payload, log_type="PROCESS")

            if self.current_hour < self.horizon_hours:
                self.current_hour += 1
                self.pending_trace_payload = self._simulate_hour(self.current_hour)
                self.hold_in("EMIT_TRACE", 0)
            else:
                self.pending_result_payload = self._build_plan_result()
                self.logger.info(
                    {
                        "event": "Plan Result Prepared",
                        "simulation_id": self.simulation_id,
                        "plan_id": self.plan_id,
                        "result": self.pending_result_payload,
                        "time": get_current_time(),
                    },
                    log_type="RESULT",
                )
                self.hold_in("EMIT_RESULT", 0)

        elif old_phase == "EMIT_RESULT":
            self.pending_result_payload = None
            self.plan_loaded = False
            self.plan_index = -1
            self.plan_id = ""

            if len(self.plan_queue) > 0:
                next_plan = self.plan_queue.pop(0)
                try:
                    self._load_plan(next_plan)
                    self.pending_trace_payload = self._simulate_hour(0)
                    self.logger.info(
                        {
                            "event": "Plan Accepted",
                            "simulation_id": self.simulation_id,
                            "plan_id": self.plan_id,
                            "plan_index": self.plan_index,
                            "time": get_current_time(),
                        },
                        log_type="PROCESS",
                    )
                    self.hold_in("EMIT_TRACE", 0)
                except Exception as exc:
                    self.error_count += 1
                    self.logger.info(
                        {
                            "event": "Plan Validation Error",
                            "simulation_id": self.simulation_id,
                            "error": str(exc),
                            "received_payload": next_plan,
                            "time": get_current_time(),
                        },
                        log_type="ERROR",
                    )
                    self.hold_in("WAIT_PLAN", math.inf)
            else:
                self.hold_in("WAIT_PLAN", math.inf)

        else:
            self.hold_in(old_phase, old_sigma)`,deltext:`    def deltext(self, e: float):
        if self.phase == "WAIT_PLAN":
            for plan_payload in self.input["plan_in"].values:
                self.plan_queue.append(plan_payload)

            if len(self.plan_queue) > 0:
                plan_payload = self.plan_queue.pop(0)
                try:
                    self._load_plan(plan_payload)
                    self.pending_trace_payload = self._simulate_hour(0)
                    self.logger.info(
                        {
                            "event": "Plan Accepted",
                            "simulation_id": self.simulation_id,
                            "plan_id": self.plan_id,
                            "plan_index": self.plan_index,
                            "time": get_current_time(),
                        },
                        log_type="PROCESS",
                    )
                    self.hold_in("EMIT_TRACE", 0)
                    return
                except Exception as exc:
                    self.error_count += 1
                    self.logger.info(
                        {
                            "event": "Plan Validation Error",
                            "simulation_id": self.simulation_id,
                            "error": str(exc),
                            "received_payload": plan_payload,
                            "time": get_current_time(),
                        },
                        log_type="ERROR",
                    )
                    self.hold_in("WAIT_PLAN", math.inf)
                    return
            self.hold_in("WAIT_PLAN", math.inf)
        else:
            for plan_payload in self.input["plan_in"].values:
                self.plan_queue.append(plan_payload)
            remaining = self.ta()
            if math.isinf(remaining):
                self.hold_in(self.phase, math.inf)
            else:
                self.hold_in(self.phase, max(0.0, remaining - e))`,exit:`    def exit(self):
        self.logger.info(
            {
                "event": "Model Finalized",
                "simulation_id": self.simulation_id,
                "plan_loaded": self.plan_loaded,
                "plan_id": self.plan_id,
                "trace_count": self.trace_count,
                "error_count": self.error_count,
                "time": get_current_time(),
            },
            log_type="RESULT",
        )`,_load_plan:`    def _load_plan(self, plan_payload: dict):
        self._validate_plan_payload(plan_payload)

        self.plan_loaded = True
        self.plan_index = plan_payload["plan_index"]
        self.plan_id = plan_payload["plan_id"]
        self.action_timeline = self._normalize_timeline(plan_payload["action_timeline"])

        if "initial_state" in plan_payload and isinstance(
            plan_payload["initial_state"], dict
        ):
            plan_initial_state = plan_payload["initial_state"]
            self._validate_state(plan_initial_state)
            self.state = {
                "blood_pressure": plan_initial_state["blood_pressure"],
                "infection_burden": plan_initial_state["infection_burden"],
                "kidney_stress": plan_initial_state["kidney_stress"],
                "fluid_overload": plan_initial_state["fluid_overload"],
            }
        else:
            self.state = {
                "blood_pressure": self.default_initial_state["blood_pressure"],
                "infection_burden": self.default_initial_state["infection_burden"],
                "kidney_stress": self.default_initial_state["kidney_stress"],
                "fluid_overload": self.default_initial_state["fluid_overload"],
            }

        self.current_hour = 0
        self.fluid_tokens = []
        self.antibiotic_tokens = []
        self.vasopressor_count = 0
        self.fluid_count = 0
        self.pending_trace_payload = None
        self.pending_result_payload = None`,_validate_plan_payload:`    def _validate_plan_payload(self, payload: dict):
        if not isinstance(payload, dict):
            raise ValueError("plan payload must be a dict")
        for required_key in [
            "plan_index",
            "plan_id",
            "action_timeline",
            "initial_state",
        ]:
            if required_key not in payload:
                raise ValueError("missing required key: " + required_key)
        if not isinstance(payload["plan_index"], int):
            raise ValueError("plan_index must be int")
        if not isinstance(payload["plan_id"], str):
            raise ValueError("plan_id must be str")
        if not isinstance(payload["action_timeline"], dict):
            raise ValueError("action_timeline must be dict")
        if not isinstance(payload["initial_state"], dict):
            raise ValueError("initial_state must be dict")

        self._validate_state(payload["initial_state"])

        for hour_key, action_list in payload["action_timeline"].items():
            if not isinstance(hour_key, str):
                raise ValueError("action_timeline hour keys must be str")
            if not hour_key.isdigit():
                raise ValueError("action_timeline hour keys must be integer strings")
            hour_int = int(hour_key)
            if hour_int < 0 or hour_int > self.horizon_hours:
                raise ValueError("action_timeline hour out of range")
            if not isinstance(action_list, list):
                raise ValueError("action_timeline values must be list")
            for action_name in action_list:
                if not isinstance(action_name, str):
                    raise ValueError("action names must be str")
                if action_name not in self.param["allowed_actions"]:
                    raise ValueError("unknown action name: " + action_name)
            if (
                hour_int > self.model_parameters["max_intervention_hour"]
                and len(action_list) > 0
            ):
                raise ValueError(
                    "interventions after max_intervention_hour are not allowed"
                )`,_validate_state:`    def _validate_state(self, state_data: dict):
        for required_key in [
            "blood_pressure",
            "infection_burden",
            "kidney_stress",
            "fluid_overload",
        ]:
            if required_key not in state_data:
                raise ValueError("missing state key: " + required_key)
        if state_data["blood_pressure"] not in self.param["blood_pressure_order"]:
            raise ValueError("invalid blood_pressure")
        if state_data["infection_burden"] not in self.param["infection_order"]:
            raise ValueError("invalid infection_burden")
        if state_data["kidney_stress"] not in self.param["kidney_order"]:
            raise ValueError("invalid kidney_stress")
        if not isinstance(state_data["fluid_overload"], bool):
            raise ValueError("fluid_overload must be bool")`,_normalize_timeline:`    def _normalize_timeline(self, action_timeline: dict) -> dict:
        normalized = {}
        hour = 0
        while hour <= self.horizon_hours:
            key = str(hour)
            if key in action_timeline:
                normalized[key] = []
                for item in action_timeline[key]:
                    normalized[key].append(item)
            else:
                normalized[key] = []
            hour += 1
        return normalized`,_simulate_hour:`    def _simulate_hour(self, hour: int) -> dict:
        actions_applied = []
        for action_name in self.action_timeline.get(str(hour), []):
            actions_applied.append(action_name)

        state_before = {
            "blood_pressure": self.state["blood_pressure"],
            "infection_burden": self.state["infection_burden"],
            "kidney_stress": self.state["kidney_stress"],
            "fluid_overload": self.state["fluid_overload"],
        }

        registered_effects = {
            "new_fluid_tokens": [],
            "new_antibiotic_tokens": [],
            "vasopressor_administered": False,
        }
        kidney_worsening_reasons = []
        notes = []

        vasopressor_immediate = False

        for action_name in actions_applied:
            if action_name == "vasopressor":
                vasopressor_immediate = True
                self.vasopressor_count += 1
                registered_effects["vasopressor_administered"] = True
                notes.append(
                    "vasopressor gives immediate same-hour blood pressure support"
                )
            elif action_name == "iv_fluids":
                self.fluid_count += 1
                start_hour = hour + self.model_parameters["fluid_support_delay_hours"]
                end_hour = (
                    start_hour
                    + self.model_parameters["fluid_support_duration_hours"]
                    - 1
                )
                token = {"start_hour": start_hour, "end_hour": end_hour}
                self.fluid_tokens.append(token)
                registered_effects["new_fluid_tokens"].append(
                    {"start_hour": start_hour, "end_hour": end_hour}
                )
                notes.append("iv_fluids register delayed support token")
            elif action_name == "antibiotic":
                activation_hour = hour + self.model_parameters["antibiotic_delay_hours"]
                token = {"activation_hour": activation_hour}
                self.antibiotic_tokens.append(token)
                registered_effects["new_antibiotic_tokens"].append(
                    {"activation_hour": activation_hour}
                )
                notes.append(
                    "antibiotic registers delayed infection-reduction activation"
                )

        fluid_support_active = 0
        for token in self.fluid_tokens:
            if token["start_hour"] <= hour <= token["end_hour"]:
                fluid_support_active += 1

        antibiotic_effect_active = 0
        for token in self.antibiotic_tokens:
            if token["activation_hour"] <= hour:
                antibiotic_effect_active += 1

        if vasopressor_immediate or fluid_support_active > 0:
            self.state["blood_pressure"] = "stable"
        else:
            self.state["blood_pressure"] = "low"

        infection_steps = antibiotic_effect_active
        while infection_steps > 0:
            self.state["infection_burden"] = self._improve_infection(
                self.state["infection_burden"]
            )
            infection_steps -= 1
        if antibiotic_effect_active > 0:
            notes.append(
                "antibiotic delayed effect is active and reduces infection one step per active token"
            )

        if vasopressor_immediate and self.vasopressor_count >= 2:
            self.state["kidney_stress"] = self._worsen_kidney(
                self.state["kidney_stress"]
            )
            kidney_worsening_reasons.append("repeated_vasopressor_toxicity")
            notes.append("repeated vasopressor exposure worsens kidney stress")

        if (
            self.state["blood_pressure"] == "low"
            and self.state["infection_burden"] == "high"
        ):
            self.state["kidney_stress"] = self._worsen_kidney(
                self.state["kidney_stress"]
            )
            kidney_worsening_reasons.append("low_bp_and_high_infection")
            notes.append(
                "combined low blood pressure and high infection worsens kidney stress"
            )

        if self.fluid_count >= self.param["fluid_overload_threshold"]:
            self.state["fluid_overload"] = True
            notes.append("fluid overload threshold reached and remains true")

        state_after = {
            "blood_pressure": self.state["blood_pressure"],
            "infection_burden": self.state["infection_burden"],
            "kidney_stress": self.state["kidney_stress"],
            "fluid_overload": self.state["fluid_overload"],
        }

        active_effects = {
            "vasopressor_immediate": vasopressor_immediate,
            "fluid_support_active": fluid_support_active,
            "antibiotic_effect_active": antibiotic_effect_active,
        }

        transitions = {
            "blood_pressure": str(state_before["blood_pressure"])
            + "->"
            + str(state_after["blood_pressure"]),
            "infection_burden": str(state_before["infection_burden"])
            + "->"
            + str(state_after["infection_burden"]),
            "kidney_stress": str(state_before["kidney_stress"])
            + "->"
            + str(state_after["kidney_stress"]),
            "fluid_overload": str(state_before["fluid_overload"]).lower()
            + "->"
            + str(state_after["fluid_overload"]).lower(),
        }

        score_if_terminal_now, _ = self._compute_score(state_after)

        trace_payload = {
            "event": "trace",
            "simulation_id": self.simulation_id,
            "plan_id": self.plan_id,
            "hour": hour,
            "actions_applied": actions_applied,
            "state_before": state_before,
            "active_effects": active_effects,
            "transitions": transitions,
            "state_after": state_after,
            "score_if_terminal_now": score_if_terminal_now,
            "registered_effects": registered_effects,
            "kidney_worsening_reasons": kidney_worsening_reasons,
            "cumulative_exposures": {
                "vasopressor_count": self.vasopressor_count,
                "fluid_count": self.fluid_count,
            },
            "notes": notes,
        }
        return trace_payload`,_compute_score:`    def _compute_score(self, state_data: dict) -> tuple:
        if state_data["blood_pressure"] == "stable":
            blood_pressure_points = 40
        else:
            blood_pressure_points = 0

        if state_data["infection_burden"] == "low":
            infection_points = 30
        elif state_data["infection_burden"] == "medium":
            infection_points = 15
        else:
            infection_points = 0

        if state_data["kidney_stress"] == "mild":
            kidney_penalty = 0
        elif state_data["kidney_stress"] == "moderate":
            kidney_penalty = 15
        else:
            kidney_penalty = 35

        if state_data["fluid_overload"]:
            fluid_overload_penalty = 10
        else:
            fluid_overload_penalty = 0

        final_score = (
            blood_pressure_points
            + infection_points
            - kidney_penalty
            - fluid_overload_penalty
        )
        breakdown = {
            "blood_pressure_points": blood_pressure_points,
            "infection_points": infection_points,
            "kidney_penalty": kidney_penalty,
            "fluid_overload_penalty": fluid_overload_penalty,
        }
        return final_score, breakdown`,_build_plan_result:`    def _build_plan_result(self) -> dict:
        final_state = {
            "blood_pressure": self.state["blood_pressure"],
            "infection_burden": self.state["infection_burden"],
            "kidney_stress": self.state["kidney_stress"],
            "fluid_overload": self.state["fluid_overload"],
        }
        final_score, score_breakdown = self._compute_score(final_state)
        return {
            "plan_id": self.plan_id,
            "final_state": final_state,
            "final_score": final_score,
            "score_breakdown": score_breakdown,
        }`,_improve_infection:`    def _improve_infection(self, current_value: str) -> str:
        if current_value == "high":
            return "medium"
        if current_value == "medium":
            return "low"
        return "low"`,_worsen_kidney:`    def _worsen_kidney(self, current_value: str) -> str:
        if current_value == "mild":
            return "moderate"
        if current_value == "moderate":
            return "severe"
        return "severe"`}},{id:`c4`,label:`trace_logger`,modelType:`atomic`,x:620,y:240,ports:{in:[`trace_in`],out:[]},portsTyped:{in:[{name:`trace_in`,type:`dict`}],out:[]},file:`icu_sepsis_treatment_libs/trace_logger.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None, simulation_id: str):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            simulation_id (str): Opaque batch identifier expected in all trace records written to the logger.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.add_in_port(Port(dict, "trace_in"))

        self.simulation_id = simulation_id
        self.param = {
            "expected_event": "trace",
            "queue_policy": "preserve_reception_order",
            "simulation_id_must_match": True
        }

        self.trace_queue = []
        self.prepared_trace = None
        self.logged_trace_count = 0

        self.hold_in("IDLE", math.inf)

        self.logger.info(
            {
                "event": "Model Created",
                "model": self.name,
                "simulation_id": self.simulation_id,
                "param": self.param,
                "time": get_current_time()
            },
            log_type="PROCESS"
        )`,initialize:`    def initialize(self):
        self.trace_queue = []
        self.prepared_trace = None
        self.logged_trace_count = 0
        self.hold_in("IDLE", math.inf)
        self.logger.info(
            {
                "event": "Model Initialized",
                "model": self.name,
                "simulation_id": self.simulation_id,
                "param": self.param,
                "time": get_current_time()
            },
            log_type="PROCESS"
        )`,lambdaf:`    def lambdaf(self):
        return`,deltint:`    def deltint(self):
        old_phase = self.phase
        _ = self.ta()

        if old_phase == "LOG_READY" and self.prepared_trace is not None:
            self.logger.info(self.prepared_trace, log_type="PROCESS")
            self.logged_trace_count += 1
            self.prepared_trace = None

        if len(self.trace_queue) > 0:
            self.prepared_trace = self.trace_queue.pop(0)
            self.hold_in("LOG_READY", 0)
        else:
            self.hold_in("IDLE", math.inf)`,deltext:`    def deltext(self, e: float):
        old_phase = self.phase
        remaining = self.ta()

        incoming_traces = list(self.input["trace_in"].values)
        for trace_payload in incoming_traces:
            if isinstance(trace_payload, dict):
                self.trace_queue.append(trace_payload)
            else:
                self.logger.info(
                    {
                        "event": "Trace Rejected",
                        "reason": "non_dict_payload",
                        "simulation_id": self.simulation_id,
                        "model": self.name,
                        "time": get_current_time()
                    },
                    log_type="ERROR"
                )

        if old_phase == "IDLE":
            if self.prepared_trace is None and len(self.trace_queue) > 0:
                self.prepared_trace = self.trace_queue.pop(0)
                self.hold_in("LOG_READY", 0)
            else:
                self.hold_in("IDLE", math.inf)
        elif old_phase == "LOG_READY":
            next_sigma = remaining - e
            if next_sigma < 0:
                next_sigma = 0
            self.hold_in("LOG_READY", next_sigma)
        else:
            if self.prepared_trace is None and len(self.trace_queue) > 0:
                self.prepared_trace = self.trace_queue.pop(0)
                self.hold_in("LOG_READY", 0)
            else:
                self.hold_in("IDLE", math.inf)`,exit:`    def exit(self):
        self.logger.info(
            {
                "event": "Model Finalized",
                "model": self.name,
                "simulation_id": self.simulation_id,
                "total_logged_traces": self.logged_trace_count,
                "time": get_current_time()
            },
            log_type="RESULT"
        )`}},{id:`c5`,label:`result_aggregator`,modelType:`atomic`,x:370,y:390,ports:{in:[`batch_meta_in`,`plan_result_in`],out:[`result_out`]},portsTyped:{in:[{name:`batch_meta_in`,type:`dict`},{name:`plan_result_in`,type:`dict`}],out:[{name:`result_out`,type:`dict`}]},file:`icu_sepsis_treatment_libs/result_aggregator.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None, simulation_id: str, horizon_hours: int):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            simulation_id (str): Opaque batch identifier copied into the final result payload.
            horizon_hours (int): Batch simulation horizon. Must be 6 for this task.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.add_in_port(Port(dict, "batch_meta_in"))
        self.add_in_port(Port(dict, "plan_result_in"))
        self.add_out_port(Port(dict, "result_out"))

        self.simulation_id = simulation_id
        self.horizon_hours = horizon_hours

        self.param = {
            "tie_break_rule": "highest_final_score_then_lexical_ascending_plan_id",
            "duplicate_plan_result_policy": "last_received_value_overwrites_previous_same_plan_id",
            "output_count": 1
        }

        self.batch_meta = None
        self.plan_order = []
        self.plan_count = 0
        self.results_by_plan_id = {}
        self.result_payload = None
        self.result_emitted = False

        self.hold_in("WAITING", float("inf"))

        self.logger.info(
            {
                "event": "Model Created",
                "simulation_id": self.simulation_id,
                "horizon_hours": self.horizon_hours,
                "param": self.param,
                "time": get_current_time()
            },
            log_type="PROCESS"
        )`,initialize:`    def initialize(self):
        self.batch_meta = None
        self.plan_order = []
        self.plan_count = 0
        self.results_by_plan_id = {}
        self.result_payload = None
        self.result_emitted = False

        self.hold_in("WAITING", float("inf"))

        self.logger.info(
            {
                "event": "Model Initialized",
                "simulation_id": self.simulation_id,
                "horizon_hours": self.horizon_hours,
                "time": get_current_time()
            },
            log_type="PROCESS"
        )`,_is_ready_to_emit:`    def _is_ready_to_emit(self) -> bool:
        if self.result_emitted:
            return False
        if self.batch_meta is None:
            return False
        if self.plan_count < 0:
            return False
        if len(self.results_by_plan_id) != self.plan_count:
            return False
        for plan_id in self.plan_order:
            if plan_id not in self.results_by_plan_id:
                return False
        return True`,_select_best_plan_id:`    def _select_best_plan_id(self, ordered_plans: list) -> str:
        best_plan_id = ""
        best_score = None
        for plan in ordered_plans:
            current_plan_id = plan["plan_id"]
            current_score = plan["final_score"]
            if best_score is None:
                best_score = current_score
                best_plan_id = current_plan_id
            else:
                if current_score > best_score:
                    best_score = current_score
                    best_plan_id = current_plan_id
                elif current_score == best_score and current_plan_id < best_plan_id:
                    best_plan_id = current_plan_id
        return best_plan_id`,_build_result_payload:`    def _build_result_payload(self) -> dict:
        ordered_plans = []
        for plan_id in self.plan_order:
            plan_result = self.results_by_plan_id[plan_id]
            ordered_plans.append(
                {
                    "plan_id": plan_result["plan_id"],
                    "final_state": {
                        "blood_pressure": plan_result["final_state"]["blood_pressure"],
                        "infection_burden": plan_result["final_state"]["infection_burden"],
                        "kidney_stress": plan_result["final_state"]["kidney_stress"],
                        "fluid_overload": plan_result["final_state"]["fluid_overload"]
                    },
                    "final_score": plan_result["final_score"],
                    "score_breakdown": {
                        "blood_pressure_points": plan_result["score_breakdown"]["blood_pressure_points"],
                        "infection_points": plan_result["score_breakdown"]["infection_points"],
                        "kidney_penalty": plan_result["score_breakdown"]["kidney_penalty"],
                        "fluid_overload_penalty": plan_result["score_breakdown"]["fluid_overload_penalty"]
                    }
                }
            )

        best_plan_id = self._select_best_plan_id(ordered_plans)

        return {
            "event": "result",
            "simulation_id": self.simulation_id,
            "horizon_hours": self.horizon_hours,
            "plans": ordered_plans,
            "best_plan_id": best_plan_id
        }`,lambdaf:`    def lambdaf(self):
        if self.phase == "EMIT_RESULT" and self.result_payload is not None and not self.result_emitted:
            self.output["result_out"].add(self.result_payload)`,deltint:`    def deltint(self):
        if self.phase == "EMIT_RESULT":
            self.result_emitted = True
            self.logger.info(self.result_payload, log_type="RESULT")
            self.logger.info(
                {
                    "event": "Final Result Emitted",
                    "simulation_id": self.simulation_id,
                    "result": self.result_payload,
                    "time": get_current_time()
                },
                log_type="PROCESS"
            )
            self.hold_in("DONE", float("inf"))
        else:
            self.hold_in(self.phase, float("inf"))`,deltext:`    def deltext(self, e: float):
        current_phase = self.phase
        current_sigma = self.ta()

        if current_phase == "DONE":
            self.hold_in("DONE", float("inf"))
            return

        for meta in self.input["batch_meta_in"].values:
            self.batch_meta = {
                "plan_order": [plan_id for plan_id in meta["plan_order"]],
                "plan_count": meta["plan_count"],
                "horizon_hours": meta["horizon_hours"]
            }
            self.plan_order = [plan_id for plan_id in meta["plan_order"]]
            self.plan_count = meta["plan_count"]

            self.logger.info(
                {
                    "event": "Batch Metadata Received",
                    "simulation_id": self.simulation_id,
                    "batch_meta": self.batch_meta,
                    "time": get_current_time()
                },
                log_type="PROCESS"
            )

        for plan_result in self.input["plan_result_in"].values:
            stored_result = {
                "plan_id": plan_result["plan_id"],
                "final_state": {
                    "blood_pressure": plan_result["final_state"]["blood_pressure"],
                    "infection_burden": plan_result["final_state"]["infection_burden"],
                    "kidney_stress": plan_result["final_state"]["kidney_stress"],
                    "fluid_overload": plan_result["final_state"]["fluid_overload"]
                },
                "final_score": plan_result["final_score"],
                "score_breakdown": {
                    "blood_pressure_points": plan_result["score_breakdown"]["blood_pressure_points"],
                    "infection_points": plan_result["score_breakdown"]["infection_points"],
                    "kidney_penalty": plan_result["score_breakdown"]["kidney_penalty"],
                    "fluid_overload_penalty": plan_result["score_breakdown"]["fluid_overload_penalty"]
                }
            }
            self.results_by_plan_id[stored_result["plan_id"]] = stored_result

            self.logger.info(
                {
                    "event": "Plan Result Received",
                    "simulation_id": self.simulation_id,
                    "plan_result": stored_result,
                    "collected_result_count": len(self.results_by_plan_id),
                    "time": get_current_time()
                },
                log_type="PROCESS"
            )

        if self._is_ready_to_emit():
            self.result_payload = self._build_result_payload()
            self.logger.info(
                {
                    "event": "Final Result Prepared",
                    "simulation_id": self.simulation_id,
                    "result": self.result_payload,
                    "time": get_current_time()
                },
                log_type="PROCESS"
            )
            self.hold_in("EMIT_RESULT", 0)
        else:
            if math.isinf(current_sigma):
                self.hold_in("WAITING", float("inf"))
            else:
                remaining = current_sigma - e
                if remaining < 0:
                    remaining = 0
                self.hold_in(current_phase, remaining)`,exit:`    def exit(self):
        self.logger.info(
            {
                "event": "Model Finalized",
                "simulation_id": self.simulation_id,
                "horizon_hours": self.horizon_hours,
                "metadata_received": self.batch_meta is not None,
                "expected_plan_count": self.plan_count,
                "collected_plan_count": len(self.results_by_plan_id),
                "result_emitted": self.result_emitted,
                "time": get_current_time()
            },
            log_type="RESULT"
        )`}},{id:`c6`,label:`result_logger`,modelType:`atomic`,x:620,y:390,ports:{in:[`result_in`],out:[]},portsTyped:{in:[{name:`result_in`,type:`dict`}],out:[]},file:`icu_sepsis_treatment_libs/result_logger.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None, simulation_id: str):
        """
        Args:
            name (str): The unique name of the model.
            parent (Coupled | None): the parent model. If None, the model is a root model.
            simulation_id (str): Opaque batch identifier expected in the final result record.
        """
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.add_in_port(Port(dict, "result_in"))

        self.simulation_id = simulation_id
        self.param = {
            "expects_event": "result",
            "allow_multiple_results": False
        }

        self.pending_result = None
        self.logged_result_count = 0

        self.hold_in("WAITING", math.inf)

        self.logger.info(
            {
                "event": "Model Created",
                "simulation_id": self.simulation_id,
                "param": self.param
            },
            log_type="PROCESS"
        )`,initialize:`    def initialize(self):
        self.pending_result = None
        self.logged_result_count = 0
        self.hold_in("WAITING", math.inf)
        self.logger.info(
            {
                "event": "Model Initialized",
                "simulation_id": self.simulation_id
            },
            log_type="PROCESS"
        )`,lambdaf:`    def lambdaf(self):
        return`,deltint:`    def deltint(self):
        old_phase = self.phase
        _ = self.ta()

        if old_phase == "LOG_READY" and self.pending_result is not None:
            self.logger.info(self.pending_result, log_type="RESULT")
            self.logged_result_count += 1
            self.pending_result = None

        self.hold_in("WAITING", math.inf)`,deltext:`    def deltext(self, e: float):
        old_phase = self.phase
        remaining = self.ta()

        incoming_results = list(self.input["result_in"].values)

        if len(incoming_results) == 0:
            if math.isinf(remaining):
                self.hold_in(old_phase, math.inf)
            else:
                self.hold_in(old_phase, max(0.0, remaining - e))
            return

        selected_result = incoming_results[0]

        if self.logged_result_count >= 1 and not self.param["allow_multiple_results"]:
            self.logger.info(
                {
                    "event": "Duplicate Result Ignored",
                    "simulation_id": self.simulation_id
                },
                log_type="ERROR"
            )
            self.hold_in("WAITING", math.inf)
            return

        self.pending_result = {
            "event": selected_result["event"],
            "simulation_id": selected_result["simulation_id"],
            "horizon_hours": selected_result["horizon_hours"],
            "plans": selected_result["plans"],
            "best_plan_id": selected_result["best_plan_id"]
        }

        self.hold_in("LOG_READY", 0.0)`,exit:`    def exit(self):
        self.logger.info(
            {
                "event": "Model Finalized",
                "simulation_id": self.simulation_id,
                "logged_result_count": self.logged_result_count,
                "time": get_current_time()
            },
            log_type="RESULT"
        )`}}],edges:[[`c1`,`c2`,`contains`],[`c1`,`c3`,`contains`],[`c1`,`c4`,`contains`],[`c1`,`c5`,`contains`],[`c1`,`c6`,`contains`],[`c2`,`c3`,`plan_out`],[`c3`,`c2`,`plan_result_out -> plan_result_in`],[`c2`,`c5`,`batch_meta_out / plan_result_out`],[`c3`,`c4`,`trace_out -> trace_in`],[`c5`,`c6`,`result_out -> result_in`]],groups:[{members:[`c2`,`c3`,`c4`,`c5`,`c6`],label:`children of icu_sepsis_treatment (coupled containment)`}]},eval:[`Direct run (outputs_v54_icu) selected Plan 2 as final decision.`,`Model-assisted run (outputs_v54_icu) selected Plan 3 based on executable result evidence.`,`This case demonstrates how executable model feedback can materially change final reasoning output.`],evalFlow:[{id:`u1`,step:`Step 1`,title:`Task Prompt and Baseline Reasoning`,paperStep:`Paper Mapping: Problem statement and direct inference baseline`,artifact:`outputs_v54_icu/scene_1_direct_answer.md`,result:`Direct run (no tool): model chose Plan 2 as unique winner from narrative reasoning.`},{id:`u2`,step:`Step 2`,title:`LLM to DEVS Spec Packaging`,paperStep:`Paper Mapping: World-model specification synthesis`,artifact:`outputs_v54_icu/scene_1_spec.yaml`,result:`LLM-generated model spec was normalized into benchmark-style YAML and used to construct executable DEVS code.`},{id:`u3`,step:`Step 3`,title:`Executable DEVS Construction and Run`,paperStep:`Paper Mapping: Transition-system execution over explicit states`,artifact:`working_dirs/scene1_gen_v3/tasks/icu_sepsis_treatment/devs_project/run_icu_sepsis_treatment.py`,result:`Simulation emitted plan_final and plan_comparison logs with scores plan_1=-35, plan_2=-5, plan_3=15, yielding unique best plan_3.`},{id:`u4`,step:`Step 4`,title:`Tool-assisted Re-Reasoning`,paperStep:`Paper Mapping: Model-in-the-loop decision refinement`,artifact:`outputs_v54_icu/scene_1_assisted_answer.md`,result:`After consuming tool evidence, the assisted run changed final decision from Plan 2 to Plan 3.`}],interactive:null},{id:`wetlab`,title:`Wet-Lab Case`,tag:`A constructed workflow demo case.`,inputText:Vu,sources:{input:`devs_reasoning_app/inputs/scene2_hard_v4.md`,plan:`devs_reasoning_app/outputs_v4/scene_2_spec.yaml`,code:`devs_reasoning_app/working_dirs/scene2_gen_v3/tasks/wet_lab_assay_scheduling/devs_project/`,eval:`devs_reasoning_app/outputs_v5/scene_2_assisted_answer.md + outputs_v5_gpt41/scene_2_direct_answer.md + outputs_v5_gpt4omini/scene_2_direct_answer.md`},planTree:{id:`wetlab-root`,name:`wet_lab_assay_scheduling`,type:`coupled`,summary:`Batch schedule ingestion + deterministic lab transition + completion scoring`,initArgs:[`horizon`,`samples`],initArgsTyped:[{name:`horizon`,type:`int`},{name:`samples`,type:`list[str]`}],ports:{input:[`episode_request`],output:[`episode_result`]},portsTyped:{input:[{name:`episode_request`,type:`dict`}],output:[{name:`episode_result`,type:`dict`}]},details:{function:`Root model accepts one fixed strategy timeline payload, simulates hourly transitions with delayed biosafety lockout, and outputs composite scoring evidence.`,logging:`Key logs: hour_state and final result with completed_sample_ids_by_deadline, prep_bonus, composite_score, invalid_action_count.`,schemas:`episode_request:{horizon,samples,action_timeline} -> episode_result:{completed_samples_by_deadline,prep_bonus,composite_score,invalid_action_count}`},children:[{id:`wetlab-ingest`,name:`schedule_ingestor`,type:`atomic`,summary:`Normalizes timeline into deterministic hour packets`,initArgs:[`horizon`],initArgsTyped:[{name:`horizon`,type:`int`}],ports:{input:[`episode_request`],output:[`hour_packet`]},portsTyped:{input:[{name:`episode_request`,type:`dict`}],output:[{name:`hour_packet`,type:`dict`}]},details:{function:`Converts full timeline into hour=0..horizon packets with stable ordering.`,logging:`No business scoring; orchestration only.`,schemas:`episode_request -> hour_packet:{episode_id,hour,actions}`},children:[]},{id:`wetlab-trans`,name:`lab_transition`,type:`atomic`,summary:`Applies resource constraints and stage prerequisites hour by hour`,initArgs:[`horizon`,`samples`],initArgsTyped:[{name:`horizon`,type:`int`},{name:`samples`,type:`list[str]`}],ports:{input:[`hour_packet`],output:[`final_state`]},portsTyped:{input:[{name:`hour_packet`,type:`dict`}],output:[{name:`final_state`,type:`dict`}]},details:{function:`Processes completion-before-action semantics, updates sample lifecycle states, and enforces delayed lockout (prep allowed at incubation start hour, blocked at next hour).`,logging:`Emits hour_state traces with per-sample stage status.`,schemas:`hour_packet -> final_state:{sample_stage,stage_times,invalid_action_count}`},children:[]},{id:`wetlab-score`,name:`lab_result`,type:`atomic`,summary:`Scores completed assays by deadline`,initArgs:[`horizon`],initArgsTyped:[{name:`horizon`,type:`int`}],ports:{input:[`final_state`],output:[`episode_result`]},portsTyped:{input:[{name:`final_state`,type:`dict`}],output:[{name:`episode_result`,type:`dict`}]},details:{function:`Computes completed_by_8, prep_bonus, and composite_score=10*completed+prep_bonus; tie-break uses invalid actions.`,logging:`Emits result.`,schemas:`final_state -> episode_result:{completed_samples_by_deadline,prep_bonus,composite_score,invalid_action_count}`},children:[]}]},codeGraph:{nodes:[{id:`w1`,label:`wet_lab_assay_scheduling (coupled)`,modelType:`coupled`,x:420,y:70,ports:{in:[`episode_request`],out:[`episode_result`]},portsTyped:{in:[{name:`episode_request`,type:`dict`}],out:[{name:`episode_result`,type:`dict`}]},file:`wet_lab_assay_scheduling.py`,methods:{__init__:`    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        horizon: int = 8,
        samples: list | None = None,
    ):
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)

        self.add_in_port(Port(dict, "episode_request"))
        self.add_out_port(Port(dict, "episode_result"))

        ingestor = schedule_ingestor("schedule_ingestor", self, horizon=int(horizon))
        transition = lab_transition(
            "lab_transition", self, horizon=int(horizon), samples=samples
        )
        scorer = lab_result("lab_result", self, horizon=int(horizon))

        self.add_component(ingestor)
        self.add_component(transition)
        self.add_component(scorer)

        self.add_coupling(
            self.input["episode_request"], ingestor.input["episode_request"]
        )
        self.add_coupling(
            ingestor.output["hour_packet"], transition.input["hour_packet"]
        )
        self.add_coupling(transition.output["final_state"], scorer.input["final_state"])
        self.add_coupling(
            scorer.output["episode_result"], self.output["episode_result"]
        )

        self.logger.info(
            {
                "event": "model_created",
                "model": self.name,
                "mode": "batch_stdin",
                "decomposition": ["schedule_ingestor", "lab_transition", "lab_result"],
            },
            log_type="PROCESS",
        )`}},{id:`w2`,label:`schedule_ingestor`,modelType:`atomic`,x:190,y:260,ports:{in:[`episode_request`],out:[`hour_packet`]},portsTyped:{in:[{name:`episode_request`,type:`dict`}],out:[{name:`hour_packet`,type:`dict`}]},file:`wet_lab_assay_scheduling_libs/schedule_ingestor.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None, horizon: int = 8):
        super().__init__(name)
        self.parent = parent
        self.horizon = int(horizon)

        self.add_in_port(Port(dict, "episode_request"))
        self.add_out_port(Port(dict, "hour_packet"))

        self.episode_id = "episode_0"
        self.schedule = {}
        self.cursor = 0
        self.pending = None
        self.hold_in("IDLE", float("inf"))`,initialize:`    def initialize(self):
        self.episode_id = "episode_0"
        self.schedule = {}
        self.cursor = 0
        self.pending = None
        self.hold_in("IDLE", float("inf"))`,deltext:`    def deltext(self, e: float):
        _ = e
        incoming = list(self.input["episode_request"].values)
        if not incoming:
            return
        req = incoming[-1]
        self.episode_id = str(req.get("episode_id", "episode_0"))
        self.schedule = {}
        for block in req.get("action_timeline", []):
            h = int(block.get("hour", -1))
            if h < 0 or h > self.horizon:
                continue
            actions = block.get("actions", [])
            if isinstance(actions, list):
                self.schedule[h] = list(actions)
        self.cursor = 0
        self.pending = {
            "episode_id": self.episode_id,
            "hour": 0,
            "actions": self.schedule.get(0, []),
        }
        self.hold_in("EMIT", 0.0)`,lambdaf:`    def lambdaf(self):
        if self.phase == "EMIT" and self.pending is not None:
            self.output["hour_packet"].add(self.pending)`,deltint:`    def deltint(self):
        if self.phase != "EMIT":
            self.hold_in("IDLE", float("inf"))
            return
        if self.cursor >= self.horizon:
            self.pending = None
            self.hold_in("IDLE", float("inf"))
            return
        self.cursor += 1
        self.pending = {
            "episode_id": self.episode_id,
            "hour": self.cursor,
            "actions": self.schedule.get(self.cursor, []),
        }
        self.hold_in("EMIT", 1.0)`,exit:`    def exit(self):
        return`}},{id:`w3`,label:`lab_transition`,modelType:`atomic`,x:420,y:260,ports:{in:[`hour_packet`],out:[`final_state`]},portsTyped:{in:[{name:`hour_packet`,type:`dict`}],out:[{name:`final_state`,type:`dict`}]},file:`wet_lab_assay_scheduling_libs/lab_transition.py`,methods:{__init__:`    def __init__(
        self,
        name: str,
        parent: Coupled | None,
        horizon: int = 8,
        samples: list | None = None,
    ):
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)
        self.horizon = int(horizon)
        self.samples = list(samples or ["X", "Y", "Z"])

        self.add_in_port(Port(dict, "hour_packet"))
        self.add_out_port(Port(dict, "final_state"))

        self.pending = None
        self.hold_in("IDLE", float("inf"))
        self._reset_episode("episode_0")`,_reset_episode:`    def _reset_episode(self, episode_id: str):
        self.episode_id = episode_id
        self.sample_stage = {s: "not_started" for s in self.samples}
        self.stage_times = {
            s: {
                "preparation_start": None,
                "preparation_end": None,
                "incubation_start": None,
                "incubation_end": None,
                "assay_start": None,
                "assay_end": None,
            }
            for s in self.samples
        }
        self.resources = {
            "technician": {"busy_until": -1, "sample": "", "start_hour": -1},
            "incubator": {"busy_until": -1, "sample": "", "start_hour": -1},
            "assay_machine": {"busy_until": -1, "sample": "", "start_hour": -1},
        }
        self.invalid = 0`,initialize:`    def initialize(self):
        self.pending = None
        self._reset_episode("episode_0")
        self.hold_in("IDLE", float("inf"))`,_release_completed:`    def _release_completed(self, hour: int):
        for r in ["technician", "incubator", "assay_machine"]:
            if self.resources[r]["busy_until"] == hour:
                self.resources[r]["busy_until"] = -1
                self.resources[r]["sample"] = ""
                self.resources[r]["start_hour"] = -1`,_start:`    def _start(self, sample: str, stage: str, hour: int, duration: int, resource: str):
        self.resources[resource]["busy_until"] = hour + duration
        self.resources[resource]["sample"] = sample
        self.resources[resource]["start_hour"] = hour
        self.stage_times[sample][f"{stage}_start"] = hour
        self.stage_times[sample][f"{stage}_end"] = hour + duration
        if stage == "preparation":
            self.sample_stage[sample] = "preparing"
        elif stage == "incubation":
            self.sample_stage[sample] = "incubating"
        else:
            self.sample_stage[sample] = "assaying"`,_apply_stage_completions:`    def _apply_stage_completions(self, hour: int):
        for s in self.samples:
            if (
                self.sample_stage[s] == "preparing"
                and self.stage_times[s]["preparation_end"] == hour
            ):
                self.sample_stage[s] = "prepared_waiting"
            if (
                self.sample_stage[s] == "incubating"
                and self.stage_times[s]["incubation_end"] == hour
            ):
                self.sample_stage[s] = "incubated_waiting"
            if (
                self.sample_stage[s] == "assaying"
                and self.stage_times[s]["assay_end"] == hour
            ):
                self.sample_stage[s] = "completed"`,_try_action:`    def _try_action(self, action: dict, hour: int):
        at = str(action.get("type", ""))
        sample = str(action.get("sample", ""))
        if sample not in self.sample_stage:
            self.invalid += 1
            return

        if at == "start_preparation":
            incubator_busy = self.resources["incubator"]["busy_until"] > hour
            incubator_started = int(self.resources["incubator"].get("start_hour", -1))
            second_hour_lockout = (
                incubator_busy
                and incubator_started >= 0
                and hour >= incubator_started + 1
            )
            if (
                self.sample_stage[sample] != "not_started"
                or self.resources["technician"]["busy_until"] > hour
                or second_hour_lockout
            ):
                self.invalid += 1
                return
            self._start(sample, "preparation", hour, 1, "technician")
            return

        if at == "start_incubation":
            if (
                self.sample_stage[sample] != "prepared_waiting"
                or self.resources["incubator"]["busy_until"] > hour
            ):
                self.invalid += 1
                return
            self._start(sample, "incubation", hour, 2, "incubator")
            return

        if at == "start_assay":
            if (
                self.sample_stage[sample] != "incubated_waiting"
                or self.resources["assay_machine"]["busy_until"] > hour
            ):
                self.invalid += 1
                return
            self._start(sample, "assay", hour, 1, "assay_machine")
            return

        self.invalid += 1`,deltext:`    def deltext(self, e: float):
        _ = e
        for packet in self.input["hour_packet"].values:
            episode_id = str(packet["episode_id"])
            hour = int(packet["hour"])
            if episode_id != self.episode_id:
                self._reset_episode(episode_id)

            self._release_completed(hour)
            self._apply_stage_completions(hour)

            actions = packet.get("actions", [])
            for action in actions:
                self._try_action(action, hour)

            self.logger.info(
                {
                    "event": "hour_state",
                    "episode_id": self.episode_id,
                    "hour": hour,
                    "sample_stage": dict(self.sample_stage),
                    "invalid_action_count": self.invalid,
                },
                log_type="PROCESS",
            )

            if hour >= self.horizon:
                self.pending = {
                    "episode_id": self.episode_id,
                    "horizon": self.horizon,
                    "sample_stage": dict(self.sample_stage),
                    "stage_times": self.stage_times,
                    "invalid_action_count": self.invalid,
                }
                self.hold_in("EMIT", 0.0)`,lambdaf:`    def lambdaf(self):
        if self.phase == "EMIT" and self.pending is not None:
            self.output["final_state"].add(self.pending)`,deltint:`    def deltint(self):
        self.pending = None
        self.hold_in("IDLE", float("inf"))`,exit:`    def exit(self):
        return`}},{id:`w4`,label:`lab_result`,modelType:`atomic`,x:650,y:260,ports:{in:[`final_state`],out:[`episode_result`]},portsTyped:{in:[{name:`final_state`,type:`dict`}],out:[{name:`episode_result`,type:`dict`}]},file:`wet_lab_assay_scheduling_libs/lab_result.py`,methods:{__init__:`    def __init__(self, name: str, parent: Coupled | None, horizon: int = 8):
        super().__init__(name)
        self.parent = parent
        self.logger = get_sim_logger(self)
        self.horizon = int(horizon)

        self.add_in_port(Port(dict, "final_state"))
        self.add_out_port(Port(dict, "episode_result"))
        self.pending = None
        self.hold_in("IDLE", float("inf"))`,initialize:`    def initialize(self):
        self.pending = None
        self.hold_in("IDLE", float("inf"))`,deltext:`    def deltext(self, e: float):
        _ = e
        for msg in self.input["final_state"].values:
            completed = []
            prep_bonus_ids = []
            for s, times in msg["stage_times"].items():
                assay_end = times.get("assay_end")
                if isinstance(assay_end, (int, float)) and assay_end <= self.horizon:
                    completed.append(s)

                prep_end = times.get("preparation_end")
                if isinstance(prep_end, (int, float)) and prep_end <= 3:
                    prep_bonus_ids.append(s)

            completed_count = len(completed)
            prep_bonus = len(prep_bonus_ids)
            invalid_count = int(msg.get("invalid_action_count", 0))
            composite_score = 10 * completed_count + prep_bonus

            self.pending = {
                "event": "result",
                "episode_id": msg["episode_id"],
                "completed_samples_by_deadline": completed_count,
                "completed_sample_ids_by_deadline": sorted(completed),
                "prep_bonus": prep_bonus,
                "prep_bonus_sample_ids": sorted(prep_bonus_ids),
                "score_formula": "composite_score = 10 * completed_samples_by_deadline + prep_bonus; tie-breaker fewer invalid_action_count",
                "composite_score": composite_score,
                "score": composite_score,
                "invalid_action_count": invalid_count,
                "overall_valid": invalid_count == 0,
                "per_sample_final_status": msg["sample_stage"],
                "per_sample_stage_times": msg["stage_times"],
                "horizon": self.horizon,
            }
            self.logger.info(self.pending, log_type="RESULT")
            self.hold_in("EMIT", 0.0)`,lambdaf:`    def lambdaf(self):
        if self.phase == "EMIT" and self.pending is not None:
            self.output["episode_result"].add(self.pending)`,deltint:`    def deltint(self):
        self.pending = None
        self.hold_in("IDLE", float("inf"))`,exit:`    def exit(self):
        return`}}],edges:[[`w1`,`w2`,`contains`],[`w1`,`w3`,`contains`],[`w1`,`w4`,`contains`],[`w2`,`w3`,`hour_packet`],[`w3`,`w4`,`final_state`],[`w4`,`w1`,`episode_result`]],groups:[{members:[`w2`,`w3`,`w4`],label:`children of wet_lab_assay_scheduling`}]},eval:[`Direct run (outputs_v4) reported Strategy C as final decision.`,`DEVS-assisted run (outputs_v4) executed fixed scripts A/B/C and selected Strategy B from composite score evidence.`,`This case demonstrates text-only reasoning failure on subtle legality + scoring rules, corrected by executable simulation.`],evalFlow:[{id:`w-u1`,step:`Step 1`,title:`Task Prompt and Baseline Reasoning`,paperStep:`Paper Mapping: direct inference baseline`,artifact:`outputs_v4/scene_2_direct_answer.md`,result:`Direct baseline gave final decision Strategy C (incorrect under executable scoring).`},{id:`w-u2`,step:`Step 2`,title:`LLM to DEVS Spec Packaging`,paperStep:`Paper Mapping: world-model specification synthesis`,artifact:`outputs_v4/scene_2_spec.yaml`,result:`Spec encodes delayed lockout legality and composite scoring formula for fixed candidate scripts.`},{id:`w-u3`,step:`Step 3`,title:`Executable DEVS Construction and Run`,paperStep:`Paper Mapping: transition-system execution`,artifact:`working_dirs/scene2_gen_v3/tasks/wet_lab_assay_scheduling/devs_project/run_wet_lab_assay_scheduling.py`,result:`Executable runs produced A=21, B=23, C=22 composite scores (B best).`},{id:`w-u4`,step:`Step 4`,title:`Tool-assisted Re-Reasoning`,paperStep:`Paper Mapping: model-in-the-loop correction`,artifact:`outputs_v4/scene_2_assisted_answer.md`,result:`After tool evidence, final decision switches to Strategy B.`}],interactive:null}],ed=$u,Z=`sa`,td={"sa-root":!0,"sa-ops":!0,"sa-fleet":!0,"sa-aircraft-unit-template":!0,"sa-aircraft-mission":!0,"sa-aircraft-mission-sm":!0,"sa-aircraft-mission-log":!0,"icu-root":!0,"icu-sim":!0,"wetlab-root":!0};function nd(e,t){if(e.id===t)return e;for(let n of e.children){let e=nd(n,t);if(e)return e}return null}function rd(e,t){return e.find(e=>e.id===t)||null}var id={ta:{paperName:`ta(s) Time Advance`,intro:`Defines the time until the next internal transition from current state s.`},deltint:{paperName:`delta_int(s) Internal Transition`,intro:`State update when scheduled internal event fires.`},deltext:{paperName:`delta_ext(s, e, x) External Transition`,intro:`State update on external input x after elapsed time e.`},lambdaf:{paperName:`lambda(s) Output Function`,intro:`Computes outputs emitted just before internal transition.`},deltconf:{paperName:`delta_con(s, x) Confluent Transition`,intro:`Conflict resolution when external and internal events coincide.`},__init__:{paperName:`Model Constructor / Coupling Definition`,intro:`Declares ports, init args, and (for coupled models) wiring relations.`},initialize:{paperName:`Initialization Routine`,intro:`Resets model state and schedules initial phase before simulation starts.`},exit:{paperName:`Finalization Routine`,intro:`Final cleanup/final logging hook after simulation completes.`}};function ad(e){let t=e?.methods||{},n=[`__init__`,`initialize`,`ta`,`deltint`,`deltext`,`lambdaf`,`deltconf`,`exit`],r=n.filter(e=>Object.prototype.hasOwnProperty.call(t,e)),i=Object.keys(t).filter(e=>!n.includes(e));return[...r,...i].map(e=>{let n=t[e],r=id[e]||{paperName:`Helper / Internal Method`,intro:`Project-specific helper used by DEVS transitions or output logic.`};return typeof n==`string`?{name:e,paperName:r.paperName,intro:r.intro,code:n}:{name:e,paperName:n.paperName||r.paperName,intro:n.intro||r.intro,code:n.code||``}})}function od(e=``){let t=String(e).split(`
`),n=t.filter(e=>e.trim().length>0);if(n.length===0)return``;let r=Math.min(...n.map(e=>e.match(/^ */)?.[0].length??0));return t.map(e=>e.slice(Math.min(r,e.length))).join(`
`).trim()}function sd(e=``){let t=String(e).match(/general:\s*\|\n([\s\S]*?)\n\s*scenario:\s*\|\n([\s\S]*?)\n\s*args_input_output:\s*\|\n([\s\S]*)$/);return t?{general:od(t[1]),scenario:od(t[2]),interface:od(t[3])}:{general:String(e).trim(),scenario:``,interface:``}}function cd(e=[]){return e.map(e=>typeof e==`string`?{name:e,type:`?`}:e)}function ld(){return{t:0,agentHolding:null,objects:{mug_1:{parent:`counter`,held:!1},apple_1:{parent:`fridge_1`,held:!1}},receptacles:{drawer_1:{open:!1,goalOpen:!1},fridge_1:{open:!0,goalOpen:!1}},goals:{mug_1:`drawer_1`,apple_1:`fridge_1`},logs:[]}}function ud(){let[e,t]=(0,b.useState)(()=>{let e=typeof window<`u`?window.location.hash.replace(`#`,``):``;return e===`usage`||e===`icu`||e===`wetlab`?`workflow`:`benchmark`}),[n,r]=(0,b.useState)(()=>{let e=typeof window<`u`?window.location.hash.replace(`#`,``):``;return e===`icu`?`icu`:e===`wetlab`?`wetlab`:Z}),i=(0,b.useMemo)(()=>ed.find(e=>e.id===n)??ed[0],[n]),a=(0,b.useMemo)(()=>i.id===Z?Nu:sd(i.inputText),[i]),o=(0,b.useMemo)(()=>e===`benchmark`?ed.filter(e=>e.id===Z):e===`workflow`?ed.filter(e=>e.id===`wetlab`||e.id===`icu`):[],[e]),[s,c]=(0,b.useState)(td),[l,u]=(0,b.useState)($u.find(e=>e.id===Z)?.planTree?.id||`abp-root`),[d,f]=(0,b.useState)(`n1`);(0,b.useEffect)(()=>{if(e===`benchmark`&&n!==Z){r(Z);return}e===`workflow`&&n!==`wetlab`&&n!==`icu`&&r(`wetlab`)},[e,n]),(0,b.useEffect)(()=>{u(i.planTree.id),f(i.codeGraph.nodes[0].id)},[n,i]);let p=(0,b.useMemo)(()=>nd(i.planTree,l)??i.planTree,[i,l]),m=(0,b.useMemo)(()=>rd(i.codeGraph.nodes,d)??i.codeGraph.nodes[0],[i,d]),h=(0,b.useMemo)(()=>i.id===Z?i.evalFlow.find(e=>e.id===`s1`)??null:null,[i]),g=(0,b.useMemo)(()=>i.id===Z?i.evalFlow.filter(e=>e.id!==`s1`):[],[i]),_=e=>{setAi2State(t=>{if(e===`reset`)return ld();let n=structuredClone(t);n.t+=1;let r=!0,i=null,a=n.objects.mug_1;e===`open_drawer`&&(n.receptacles.drawer_1.open=!0),e===`close_fridge`&&(n.receptacles.fridge_1.open=!1),e===`pickup_mug`&&(!n.agentHolding&&a.parent?(n.agentHolding=`mug_1`,a.held=!0,a.parent=null):(r=!1,i=`cannot_pickup_mug`)),e===`put_mug_drawer`&&(n.agentHolding===`mug_1`&&n.receptacles.drawer_1.open?(n.agentHolding=null,a.held=!1,a.parent=`drawer_1`):(r=!1,i=`cannot_put_mug_drawer`));let o=Object.entries(n.goals).filter(([e,t])=>n.objects[e].parent!==t).map(([e])=>e),s=Object.entries(n.receptacles).filter(([e,t])=>t.open!==t.goalOpen).map(([e])=>e),c=Object.keys(n.goals).length+Object.keys(n.receptacles).length,l=o.length+s.length,u=Math.max(0,Math.min(1,1-l/c));return n.logs.push(JSON.stringify({time:n.t,cmd:e,ok:r,error:i,misplaced_objects:o,receptacle_mismatches:s,fraction_complete:Number(u.toFixed(3)),done:l===0})),n})};return(0,U.jsxs)(`div`,{className:`mx-auto min-h-screen w-full max-w-[1400px] overflow-x-visible px-4 py-7 md:px-6`,children:[(0,U.jsxs)(`section`,{className:`mb-5 rounded-2xl border-2 border-sky-300 bg-sky-50 p-3`,children:[(0,U.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-sky-800`,children:`Click to switch view`}),(0,U.jsxs)(`div`,{className:`grid gap-2 md:grid-cols-2`,children:[(0,U.jsx)(`button`,{type:`button`,onClick:()=>{t(`benchmark`),r(Z),window.location.hash=`benchmark`},className:`rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${e===`benchmark`?`border-sky-600 bg-sky-600 text-white shadow`:`border-sky-300 bg-white text-sky-800 hover:border-sky-500`}`,children:`Benchmark Deep Dive`}),(0,U.jsx)(`button`,{type:`button`,onClick:()=>{t(`workflow`),r(`wetlab`),window.location.hash=`usage`},className:`rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${e===`workflow`?`border-indigo-600 bg-indigo-600 text-white shadow`:`border-indigo-300 bg-white text-indigo-800 hover:border-indigo-500`}`,children:`Real-World Usage`})]}),e===`benchmark`&&(0,U.jsxs)(`p`,{className:`mt-2 text-[11px] text-sky-800`,children:[`Standard benchmark pipeline: specification Spec=(Spec`,(0,U.jsx)(`sub`,{children:`ope`}),`, Spec`,(0,U.jsx)(`sub`,{children:`beh`}),`) -> generated executable simulator M -> checker computes Score`,(0,U.jsx)(`sub`,{children:`ope`}),` and Score`,(0,U.jsx)(`sub`,{children:`beh`}),`.`]}),e===`workflow`&&(0,U.jsx)(`p`,{className:`mt-2 text-[11px] text-indigo-800`,children:`In real planning tasks, LLMs must reason over complex, uncertain scenarios. Direct reasoning often fails; our model-assisted workflow uses executable DEVS simulations to ground decisions in evidence.`})]}),(e===`benchmark`||e===`workflow`)&&(0,U.jsxs)(U.Fragment,{children:[e===`workflow`&&(0,U.jsx)(`section`,{className:`mb-5 grid gap-3 md:grid-cols-2`,children:o.map(e=>(0,U.jsxs)(`button`,{onClick:()=>{r(e.id),window.location.hash=e.id===`wetlab`?`wetlab`:`icu`},className:`rounded-2xl border p-4 text-left transition ${n===e.id?`border-emerald-400 bg-emerald-50`:`border-slate-200 bg-white hover:border-slate-300`}`,children:[(0,U.jsx)(`h2`,{className:`text-sm font-semibold text-slate-800 md:text-base`,children:e.title}),(0,U.jsx)(`p`,{className:`mt-1 text-xs text-slate-500`,children:e.tag})]},e.id))}),(0,U.jsxs)(`div`,{className:`grid gap-4`,children:[e===`workflow`&&(0,U.jsx)(dd,{activeCase:i}),e!==`workflow`&&(0,U.jsxs)(U.Fragment,{children:[i.id===Z&&(0,U.jsxs)(pd,{icon:(0,U.jsx)(Ou,{className:`size-4`}),title:`From Benchmark: Input Specification Given to Generator`,children:[(0,U.jsxs)(`div`,{className:`mb-2 rounded-lg border border-sky-200 bg-sky-50 p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-sky-900`,children:`Exact LLM input for this benchmark scene.`}),(0,U.jsx)(`p`,{className:`mt-1 text-[11px] text-slate-700`,children:`The three blocks below are fed together as one task requirement package.`})]}),(0,U.jsxs)(`div`,{className:`grid gap-3 xl:grid-cols-3`,children:[(0,U.jsxs)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold uppercase tracking-wide text-sky-700`,children:`General Implementation Requirements`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:a.general})]}),(0,U.jsxs)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,U.jsxs)(`p`,{className:`text-xs font-semibold uppercase tracking-wide text-sky-700`,children:[`Behavioral Description (Spec`,(0,U.jsx)(`sub`,{children:`beh`}),`)`]}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:a.scenario})]}),(0,U.jsxs)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,U.jsxs)(`p`,{className:`text-xs font-semibold uppercase tracking-wide text-sky-700`,children:[`Operational Configuration (Spec`,(0,U.jsx)(`sub`,{children:`ope`}),`)`]}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:a.interface})]})]})]}),i.id===`wetlab`&&(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(pd,{icon:(0,U.jsx)(Ou,{className:`size-4`}),title:`1) Task`,children:(0,U.jsx)(`pre`,{className:`max-h-[420px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700`,children:i.inputText})}),(0,U.jsxs)(pd,{icon:(0,U.jsx)(Ou,{className:`size-4`}),title:`2) Model Spec Generation`,children:[(0,U.jsx)(`p`,{className:`mb-3 text-xs text-slate-600`,children:`We prompt GPT-5.4 to generate this model spec from the task definition.`}),(0,U.jsxs)(`div`,{className:`space-y-3`,children:[(0,U.jsxs)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold uppercase tracking-wide text-sky-700`,children:`Prompt template for model spec generation`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:Yu})]}),(0,U.jsxs)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold uppercase tracking-wide text-sky-700`,children:`Generated model spec (scene_2_spec.yaml)`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:Xu})]})]})]})]}),i.id===`icu`&&(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(pd,{icon:(0,U.jsx)(Ou,{className:`size-4`}),title:`1) Task`,children:(0,U.jsx)(`pre`,{className:`max-h-[420px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700`,children:i.inputText})}),(0,U.jsxs)(pd,{icon:(0,U.jsx)(Ou,{className:`size-4`}),title:`2) Model Spec Generation`,children:[(0,U.jsx)(`p`,{className:`mb-3 text-xs text-slate-600`,children:`We prompt GPT-5.4 to generate this model spec from the task definition.`}),(0,U.jsxs)(`div`,{className:`space-y-3`,children:[(0,U.jsxs)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold uppercase tracking-wide text-sky-700`,children:`Prompt template for model spec generation`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:Yu})]}),(0,U.jsxs)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold uppercase tracking-wide text-sky-700`,children:`Generated model spec (scene_1_spec.yaml)`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:Bu})]})]})]})]}),i.id!==`wetlab`&&i.id!==`icu`&&i.id!==Z&&(0,U.jsx)(pd,{icon:(0,U.jsx)(Ou,{className:`size-4`}),title:`1) Full Original System Input`,children:(0,U.jsx)(`pre`,{className:`max-h-[420px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700`,children:i.inputText})}),i.id===Z&&(0,U.jsxs)(`div`,{className:`grid w-full items-start gap-4 lg:grid-cols-[170px_minmax(0,1fr)]`,children:[(0,U.jsx)(`div`,{className:`self-start lg:sticky lg:top-4`,children:(0,U.jsxs)(`div`,{className:`flex w-full flex-col items-center`,children:[(0,U.jsx)(`p`,{className:`text-center text-[11px] font-semibold text-sky-700`,children:`From panel 1 input`}),(0,U.jsx)(`div`,{className:`my-1 h-12 border-l-2 border-sky-400`}),(0,U.jsx)(`p`,{className:`-mt-1 mb-1 text-sky-500`,children:`↓`}),(0,U.jsxs)(`div`,{className:`w-full rounded-2xl border-2 border-cyan-300 bg-cyan-50 p-3 shadow-sm`,children:[(0,U.jsxs)(`div`,{className:`mb-2 flex items-center gap-2 text-cyan-800`,children:[(0,U.jsx)(wu,{className:`size-4`}),(0,U.jsx)(`p`,{className:`text-xs font-semibold uppercase tracking-wide`,children:`DEVS-GEN workflow`})]}),(0,U.jsx)(`p`,{className:`mb-2 text-[11px] text-slate-700`,children:`This is the DEVS-GEN path used in this demo. In the benchmark pipeline, this generation stage can be replaced by other frameworks.`}),(0,U.jsxs)(`div`,{className:`space-y-2 text-[11px] text-slate-700`,children:[(0,U.jsxs)(`div`,{className:`rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`font-semibold text-indigo-700`,children:`2) Stage 1: Structural Planning`}),(0,U.jsx)(`p`,{children:`Generate model decomposition and interface skeleton.`})]}),(0,U.jsx)(`div`,{className:`flex justify-center text-slate-500`,children:`↓`}),(0,U.jsxs)(`div`,{className:`rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`font-semibold text-violet-700`,children:`3) Stage 2: Behavioral Synthesizing`}),(0,U.jsx)(`p`,{children:`Generate executable wiring and DEVS behavior methods.`})]})]})]}),(0,U.jsx)(`div`,{className:`my-1 h-14 border-l-2 border-emerald-400`}),(0,U.jsx)(`p`,{className:`-mt-1 mb-1 text-emerald-500`,children:`↓`}),(0,U.jsx)(`p`,{className:`text-center text-[11px] font-semibold text-emerald-700`,children:`to panel 4 evaluation`})]})}),(0,U.jsxs)(`div`,{className:`grid min-w-0 gap-4`,children:[(0,U.jsxs)(pd,{icon:(0,U.jsx)(ku,{className:`size-4`}),title:`DEVS-Gen Stage 1: Structural Planning (from Natural Language to PlanTree)`,children:[(0,U.jsx)(`p`,{className:`mb-2 text-xs text-slate-600`,children:`This panel shows the structural generation result for this scene: model decomposition and interface skeleton.`}),(0,U.jsxs)(`div`,{className:`grid gap-4 xl:grid-cols-[1fr_1fr]`,children:[(0,U.jsx)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-3`,children:(0,U.jsx)(md,{node:i.planTree,depth:0,openTree:s,setOpenTree:c,selectedTreeNodeId:l,setSelectedTreeNodeId:u})}),(0,U.jsxs)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-4`,children:[(0,U.jsx)(`h3`,{className:`mb-2 text-sm font-semibold text-slate-800`,children:p.name}),(0,U.jsxs)(`p`,{className:`mb-3 text-xs text-slate-500`,children:[p.type,` · `,p.summary]}),(0,U.jsxs)(`div`,{className:`mb-3 rounded-xl border border-cyan-200 bg-cyan-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold uppercase tracking-wide text-cyan-700`,children:`ModelPlan Interface`}),(0,U.jsxs)(`p`,{className:`mt-1 text-[11px] text-slate-600`,children:[`Includes `,(0,U.jsx)(`code`,{children:`model_init_args`}),`, `,(0,U.jsx)(`code`,{children:`input_ports`}),`, `,(0,U.jsx)(`code`,{children:`output_ports`}),`, and output trace schema obligations.`]}),(0,U.jsxs)(`div`,{className:`mt-2`,children:[(0,U.jsx)(hd,{title:`init args`,items:p.initArgsTyped||cd(p.initArgs)}),(0,U.jsx)(hd,{title:`input ports`,items:p.portsTyped?.input||cd(p.ports?.input||[])}),(0,U.jsx)(hd,{title:`output ports`,items:p.portsTyped?.output||cd(p.ports?.output||[])})]}),(0,U.jsxs)(`details`,{className:`rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsx)(`summary`,{className:`cursor-pointer text-xs text-sky-700`,children:`ModelPlan typed schema details (args + ports)`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-52 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:p.details?.schemas||`No embedded schema detail for this node.`})]}),(0,U.jsxs)(`details`,{className:`mt-2 rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsx)(`summary`,{className:`cursor-pointer text-xs text-sky-700`,children:`ModelPlan logging requirements`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:p.details?.logging||`No embedded full logging text for this node.`})]})]}),(0,U.jsxs)(`div`,{className:`mb-2 rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,U.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:`ModelPlan`}),(0,U.jsxs)(`details`,{className:`mb-2 rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsx)(`summary`,{className:`cursor-pointer text-xs text-sky-700`,children:`Function semantics`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:p.details?.function||`No embedded full function text for this node.`})]})]}),(0,U.jsxs)(`details`,{className:`mt-2 rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsx)(`summary`,{className:`cursor-pointer text-xs text-sky-700`,children:`Raw node object (full available detail)`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:JSON.stringify(p,null,2)})]})]})]})]}),(0,U.jsxs)(pd,{icon:(0,U.jsx)(Au,{className:`size-4`}),title:`DEVS-Gen Stage 2: Behavioral Synthesizing (from PlanTree to DEVS Model)`,children:[(0,U.jsx)(`p`,{className:`mb-2 text-xs text-slate-600`,children:`This panel shows the behavioral generation result: executable wiring and DEVS transition/output methods used in evaluation.`}),(0,U.jsxs)(`div`,{className:`space-y-4`,children:[(0,U.jsx)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-3`,children:(0,U.jsx)(gd,{graphKey:i.id,graph:i.codeGraph,selectedCodeNodeId:d,setSelectedCodeNodeId:f})}),(0,U.jsxs)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-4`,children:[(0,U.jsx)(`h3`,{className:`mb-1 text-sm font-semibold text-slate-800`,children:m.label}),(0,U.jsxs)(`p`,{className:`mb-2 text-xs text-slate-500`,children:[`file: `,m.file]}),(0,U.jsx)(hd,{title:`input ports`,items:m.portsTyped?.in||cd(m.ports.in),compact:!0}),(0,U.jsx)(hd,{title:`output ports`,items:m.portsTyped?.out||cd(m.ports.out),compact:!0}),(0,U.jsx)(`h4`,{className:`mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-slate-600`,children:`Behavioral semantics (DEVS transition/output functions)`}),(0,U.jsx)(`div`,{className:`space-y-2`,children:ad(m).map(e=>(0,U.jsxs)(`details`,{className:`rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsxs)(`summary`,{className:`cursor-pointer text-xs text-sky-700`,children:[e.name,` · `,e.paperName]}),(0,U.jsx)(`p`,{className:`mb-1 mt-2 text-[11px] text-slate-600`,children:e.intro}),(0,U.jsx)(`pre`,{className:`mt-1 whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:String(e.code)})]},e.name))})]})]})]})]})]}),i.id!==Z&&(0,U.jsxs)(U.Fragment,{children:[(0,U.jsxs)(pd,{icon:(0,U.jsx)(ku,{className:`size-4`}),title:i.id===Z?`2) Generation Output A: Stage 1 Structural Planning (PlanTree / Algorithm 2)`:i.id===`wetlab`||i.id===`icu`?`3) Modeling Plan Tree (expand + inspect)`:`2) Modeling Plan Tree (expand + inspect)`,children:[i.id===Z&&(0,U.jsxs)(`div`,{className:`mb-2 rounded-xl border border-amber-300 bg-amber-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold uppercase tracking-wide text-amber-800`,children:`Generated by DEVS-GEN (not benchmark asset)`}),(0,U.jsx)(`p`,{className:`mt-1 text-[12px] text-slate-700`,children:`We feed the benchmark scenario specification (panel 1) into our DEVS-GEN framework. This panel shows Stage 1 structural planning output: model decomposition and interfaces.`})]}),(0,U.jsxs)(`div`,{className:`grid gap-4 xl:grid-cols-[1fr_1fr]`,children:[(0,U.jsx)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-3`,children:(0,U.jsx)(md,{node:i.planTree,depth:0,openTree:s,setOpenTree:c,selectedTreeNodeId:l,setSelectedTreeNodeId:u})}),(0,U.jsxs)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-4`,children:[(0,U.jsx)(`h3`,{className:`mb-2 text-sm font-semibold text-slate-800`,children:p.name}),(0,U.jsxs)(`p`,{className:`mb-3 text-xs text-slate-500`,children:[p.type,` · `,p.summary]}),(0,U.jsxs)(`div`,{className:`mb-3 rounded-xl border border-cyan-200 bg-cyan-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold uppercase tracking-wide text-cyan-700`,children:i.id===Z?`ModelPlan Interface`:`Interface overview`}),i.id===Z&&(0,U.jsxs)(`p`,{className:`mt-1 text-[11px] text-slate-600`,children:[`Includes `,(0,U.jsx)(`code`,{children:`model_init_args`}),`, `,(0,U.jsx)(`code`,{children:`input_ports`}),`, `,(0,U.jsx)(`code`,{children:`output_ports`}),`, and output trace schema obligations.`]}),(0,U.jsxs)(`div`,{className:`mt-2`,children:[(0,U.jsx)(hd,{title:`init args`,items:p.initArgsTyped||cd(p.initArgs)}),(0,U.jsx)(hd,{title:`input ports`,items:p.portsTyped?.input||cd(p.ports?.input||[])}),(0,U.jsx)(hd,{title:`output ports`,items:p.portsTyped?.output||cd(p.ports?.output||[])})]}),(0,U.jsxs)(`details`,{className:`rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsx)(`summary`,{className:`cursor-pointer text-xs text-sky-700`,children:i.id===Z?`ModelPlan typed schema details (args + ports)`:`Typed schemas (args + ports)`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-52 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:p.details?.schemas||`No embedded schema detail for this node.`})]}),(0,U.jsxs)(`details`,{className:`mt-2 rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsx)(`summary`,{className:`cursor-pointer text-xs text-sky-700`,children:i.id===Z?`ModelPlan logging requirements`:`Logging detail (expanded)`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:p.details?.logging||`No embedded full logging text for this node.`})]})]}),(0,U.jsxs)(`div`,{className:`mb-2 rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,U.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:`ModelPlan`}),(0,U.jsxs)(`details`,{className:`mb-2 rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsx)(`summary`,{className:`cursor-pointer text-xs text-sky-700`,children:i.id===Z?`Function semantics`:`Function description (expanded)`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:p.details?.function||`No embedded full function text for this node.`})]})]}),(0,U.jsxs)(`details`,{className:`mt-2 rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsx)(`summary`,{className:`cursor-pointer text-xs text-sky-700`,children:`Raw node object (full available detail)`}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:JSON.stringify(p,null,2)})]})]})]})]}),(0,U.jsxs)(pd,{icon:(0,U.jsx)(Au,{className:`size-4`}),title:i.id===Z?`3) Generation Output B: Stage 2 Behavioral Synthesizing (Code Topology + DEVS Methods)`:i.id===`wetlab`||i.id===`icu`?`4) Code Topology + IO Ports + Method Details`:`3) Code Topology + IO Ports + Method Details`,children:[i.id===Z&&(0,U.jsxs)(`div`,{className:`mb-2 rounded-xl border border-amber-300 bg-amber-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold uppercase tracking-wide text-amber-800`,children:`Generated by DEVS-GEN (not benchmark asset)`}),(0,U.jsx)(`p`,{className:`mt-1 text-[12px] text-slate-700`,children:`This is Stage 2 (Behavioral Synthesizing) from the same scenario specification. DEVS-GEN produces executable wiring and transition logic, which are exactly what panel 4 evaluates.`})]}),(0,U.jsxs)(`div`,{className:`grid gap-4 xl:grid-cols-[1.18fr_1fr]`,children:[(0,U.jsx)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-3`,children:(0,U.jsx)(gd,{graphKey:i.id,graph:i.codeGraph,selectedCodeNodeId:d,setSelectedCodeNodeId:f})}),(0,U.jsxs)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-4`,children:[(0,U.jsx)(`h3`,{className:`mb-1 text-sm font-semibold text-slate-800`,children:m.label}),(0,U.jsxs)(`p`,{className:`mb-2 text-xs text-slate-500`,children:[`file: `,m.file]}),(0,U.jsx)(hd,{title:`input ports`,items:m.portsTyped?.in||cd(m.ports.in),compact:!0}),(0,U.jsx)(hd,{title:`output ports`,items:m.portsTyped?.out||cd(m.ports.out),compact:!0}),(0,U.jsx)(`h4`,{className:`mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-slate-600`,children:i.id===Z?`Behavioral semantics (DEVS transition/output functions)`:`DEVS methods (paper-aligned naming)`}),(0,U.jsx)(`div`,{className:`space-y-2`,children:ad(m).map(e=>(0,U.jsxs)(`details`,{className:`rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsxs)(`summary`,{className:`cursor-pointer text-xs text-sky-700`,children:[e.name,` · `,e.paperName]}),(0,U.jsx)(`p`,{className:`mb-1 mt-2 text-[11px] text-slate-600`,children:e.intro}),(0,U.jsx)(`pre`,{className:`mt-1 whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:String(e.code)})]},e.name))})]})]})]})]}),i.id===Z&&(0,U.jsxs)(pd,{icon:(0,U.jsx)(Eu,{className:`size-4`}),title:`Evaluation of the Generated DEVS Model`,children:[(0,U.jsx)(`p`,{className:`mb-2 text-xs text-slate-600`,children:`This stage is the actual benchmark evaluation: run test suite cases, read traces from the generated model, apply checker rules, then aggregate final metrics.`}),h&&(0,U.jsxs)(`div`,{className:`mb-2 rounded-lg border border-slate-200 bg-slate-50 p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`Evaluation assets`}),(0,U.jsx)(`p`,{className:`mt-1 text-[11px] text-slate-600`,children:`Test suite D and per-case input d_i=(I,J) are loaded from benchmark configuration.`}),h.sampleSelectionNote&&(0,U.jsx)(`p`,{className:`mt-1 text-[11px] text-slate-600`,children:h.sampleSelectionNote}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-44 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:h.sampleConfig})]}),(0,U.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:`Evaluation process on the generated model (Step 1-3)`}),(0,U.jsx)(`div`,{className:`space-y-2`,children:g.map((e,t)=>(0,U.jsxs)(`div`,{className:`rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsxs)(`p`,{className:`text-xs font-semibold text-sky-700`,children:[`Step `,t+1,` · `,e.title]}),e.id===`s2`&&(0,U.jsxs)(`div`,{className:`mt-2`,children:[(0,U.jsx)(`p`,{className:`text-[11px] font-semibold text-slate-700`,children:`Selected generated log trace excerpt`}),e.sampleLogNote&&(0,U.jsx)(`p`,{className:`mt-1 text-[11px] text-slate-600`,children:e.sampleLogNote}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-52 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700`,children:e.sampleLogs})]}),e.id===`s3`&&(0,U.jsxs)(`div`,{className:`mt-2`,children:[(0,U.jsx)(`p`,{className:`mt-1 text-[11px] text-slate-600`,children:`Rules run over relevant events and event relations in T_i; checker accumulates evidence by repeated add_case(...) calls.`}),(0,U.jsx)(`div`,{className:`mt-2 space-y-2`,children:i.evalRuleGroups.map(e=>(0,U.jsxs)(`details`,{className:`rounded-lg border border-slate-200 bg-slate-50 p-2`,open:!0,children:[(0,U.jsx)(`summary`,{className:`cursor-pointer text-xs font-semibold text-indigo-700`,children:e.group}),(0,U.jsx)(`div`,{className:`mt-2 space-y-2`,children:e.rules.map(e=>(0,U.jsxs)(`details`,{className:`rounded-md border border-slate-200 bg-white p-2`,children:[(0,U.jsx)(`summary`,{className:`cursor-pointer text-[11px] font-semibold text-sky-700`,children:e.name}),(0,U.jsx)(`p`,{className:`mt-1 text-[11px] text-slate-700`,children:e.what}),(0,U.jsxs)(`p`,{className:`mt-1 text-[11px] text-slate-600`,children:[`Granularity: `,e.granularity]}),(0,U.jsx)(`p`,{className:`mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500`,children:`Checker core flow`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-36 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:e.checkerCode})]},e.name))})]},e.group))})]}),e.id===`s4`&&e.formula&&(0,U.jsxs)(`div`,{className:`mt-2`,children:[(0,U.jsx)(`p`,{className:`text-[11px] font-semibold text-slate-700`,children:`Metric equations`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700`,children:e.formula}),e.workedExample&&(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`p`,{className:`mt-2 text-[11px] font-semibold text-slate-700`,children:`Worked example`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700`,children:e.workedExample})]})]})]},e.id))})]}),i.id===`wetlab`&&(0,U.jsx)(pd,{icon:(0,U.jsx)(Eu,{className:`size-4`}),title:`5) Direct vs Model-assisted Reasoning Comparison`,children:(0,U.jsxs)(`div`,{className:`grid gap-3 xl:grid-cols-2`,children:[(0,U.jsxs)(`div`,{className:`rounded-xl border border-rose-200 bg-rose-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-sm font-semibold uppercase tracking-wide text-rose-700`,children:`Direct run(wrong)`}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-lg border border-rose-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`(1) Original prompt template`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:Hu})]}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-lg border border-rose-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`(2) Calling type`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:Gu})]}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-lg border border-rose-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`(3) Raw reply text`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:qu})]})]}),(0,U.jsxs)(`div`,{className:`rounded-xl border border-emerald-200 bg-emerald-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-sm font-semibold uppercase tracking-wide text-emerald-700`,children:`Model-assisted workflow run(right)`}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-lg border border-emerald-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`(1) Original prompt template`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:Ku})]}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-lg border border-emerald-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`(2) Calling type`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:X})]}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-lg border border-emerald-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`(3) Raw reply text`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:Ju})]})]})]})}),i.id===`icu`&&(0,U.jsx)(pd,{icon:(0,U.jsx)(Eu,{className:`size-4`}),title:`5) Direct vs Model-assisted Reasoning Comparison`,children:(0,U.jsxs)(`div`,{className:`grid gap-3 xl:grid-cols-2`,children:[(0,U.jsxs)(`div`,{className:`rounded-xl border border-rose-200 bg-rose-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-sm font-semibold uppercase tracking-wide text-rose-700`,children:`Direct run(wrong)`}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-lg border border-rose-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`(1) Original prompt template`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:Hu})]}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-lg border border-rose-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`(2) Calling type`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:Iu})]}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-lg border border-rose-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`(3) Raw reply text`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:Ru})]})]}),(0,U.jsxs)(`div`,{className:`rounded-xl border border-emerald-200 bg-emerald-50 p-3`,children:[(0,U.jsx)(`p`,{className:`text-sm font-semibold uppercase tracking-wide text-emerald-700`,children:`Model-assisted workflow run(right)`}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-lg border border-emerald-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`(1) Original prompt template`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:Ku})]}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-lg border border-emerald-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`(2) Calling type`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:Lu})]}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-lg border border-emerald-200 bg-white p-2`,children:[(0,U.jsx)(`p`,{className:`text-xs font-semibold text-slate-700`,children:`(3) Raw reply text`}),(0,U.jsx)(`pre`,{className:`mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:zu})]})]})]})}),i.interactive?.type===`ai2thor`&&(0,U.jsxs)(pd,{icon:(0,U.jsx)(ju,{className:`size-4`}),title:`5) Interactive Demo (complex world model)`,children:[(0,U.jsx)(`div`,{className:`mb-3 flex flex-wrap gap-2`,children:[[`compare_to_goal`,`compare_to_goal`],[`open_drawer`,`open_drawer`],[`pickup_mug`,`pickup_mug`],[`put_mug_drawer`,`put_mug_drawer`],[`close_fridge`,`close_fridge`],[`reset`,`reset`]].map(([e,t])=>(0,U.jsx)(`button`,{onClick:()=>_(t),className:`rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 hover:border-sky-400`,children:e},t))}),(0,U.jsx)(`div`,{className:`mb-3 grid gap-2 md:grid-cols-2 lg:grid-cols-4`,children:[`time=${ai2State.t}`,`holding=${ai2State.agentHolding??`none`}`,`mug_1.parent=${ai2State.objects.mug_1.parent??`held`}`,`fridge_open=${ai2State.receptacles.fridge_1.open}`,`drawer_open=${ai2State.receptacles.drawer_1.open}`,`apple_1.parent=${ai2State.objects.apple_1.parent}`].map(e=>(0,U.jsx)(`div`,{className:`rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-700`,children:e},e))}),(0,U.jsx)(`pre`,{className:`max-h-60 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700`,children:ai2State.logs.join(`
`)||`No events yet`})]})]})]})]})]})}function dd({activeCase:e}){let t=Qu[e.id];if(!t)return null;let n=e.id===`wetlab`?Xu:Bu,r=e.id===`wetlab`?qu:Ru,i=e.id===`wetlab`?Ju:zu,a=e.id===`wetlab`?`Wet-Lab`:`ICU`,o=(0,b.useMemo)(()=>`${e.inputText}\n\n${Wu}`,[e]),[s,c]=(0,b.useState)(()=>({[e.planTree.id]:!0})),[l,u]=(0,b.useState)(e.planTree.id),[d,f]=(0,b.useState)(e.codeGraph.nodes[0]?.id||``);(0,b.useEffect)(()=>{c({[e.planTree.id]:!0}),u(e.planTree.id),f(e.codeGraph.nodes[0]?.id||``)},[e]);let p=(0,b.useMemo)(()=>nd(e.planTree,l)??e.planTree,[e,l]),m=(0,b.useMemo)(()=>rd(e.codeGraph.nodes,d)??e.codeGraph.nodes[0],[e,d]),h=(0,b.useMemo)(()=>{let e=String(n).split(`
`);return e.slice(0,120).join(`
`)+(e.length>120?`
... (trimmed for demo view)`:``)},[n]),g=(0,b.useMemo)(()=>`{"type":"tool_call","name":"construct_devs_model","arguments":{"spec_yaml":"<see spec block below>"}}`,[]);return(0,U.jsx)(`div`,{className:`space-y-4`,children:(0,U.jsxs)(`div`,{className:`grid gap-4 lg:grid-cols-[150px_minmax(0,1fr)]`,children:[(0,U.jsx)(`aside`,{className:`hidden lg:block`,children:(0,U.jsxs)(`div`,{className:`sticky top-4 rounded-xl border border-slate-200 bg-white p-3`,children:[(0,U.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:`On this page`}),(0,U.jsxs)(`div`,{className:`space-y-1 text-xs`,children:[(0,U.jsx)(`a`,{href:`#wf-agent`,className:`block rounded px-2 py-1 text-emerald-700 hover:bg-slate-100`,children:`Agent workflow (correct)`}),(0,U.jsx)(`a`,{href:`#wf-direct`,className:`block rounded px-2 py-1 text-rose-700 hover:bg-slate-100`,children:`Direct run (wrong)`})]})]})}),(0,U.jsxs)(`div`,{className:`min-w-0 space-y-4`,children:[(0,U.jsx)(`div`,{id:`wf-agent`,className:`scroll-mt-24`,children:(0,U.jsx)(pd,{icon:(0,U.jsx)(wu,{className:`size-4`}),title:`Agent Workflow Demo (${a})`,children:(0,U.jsxs)(`div`,{className:`space-y-3`,children:[(0,U.jsx)(fd,{role:`system`,title:`system`,children:(0,U.jsx)(`pre`,{className:`max-h-40 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:Zu})}),(0,U.jsx)(fd,{role:`user`,title:`user`,children:(0,U.jsx)(`pre`,{className:`max-h-56 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:t.firstUserPrompt})}),(0,U.jsxs)(fd,{role:`tool_calling`,title:`tool_calling`,children:[(0,U.jsx)(`pre`,{className:`max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:g}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:h}),(0,U.jsxs)(`div`,{className:`mt-2 rounded-xl border border-slate-200 bg-white p-3`,children:[(0,U.jsx)(`p`,{className:`mb-2 text-[11px] text-slate-700`,children:`Internal DEVS-GEN construction flow inside this tool call. The two blocks below show what was built.`}),(0,U.jsxs)(`div`,{className:`grid w-full gap-3`,children:[(0,U.jsxs)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,U.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:`Stage 1: Structural Planning (PlanTree / Algorithm 2)`}),(0,U.jsxs)(`div`,{className:`grid gap-3 lg:grid-cols-[0.95fr_1fr]`,children:[(0,U.jsx)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-3`,children:(0,U.jsx)(md,{node:e.planTree,depth:0,openTree:s,setOpenTree:c,selectedTreeNodeId:l,setSelectedTreeNodeId:u})}),(0,U.jsxs)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-3`,children:[(0,U.jsx)(`h3`,{className:`mb-1 text-sm font-semibold text-slate-800`,children:p.name}),(0,U.jsxs)(`p`,{className:`mb-2 text-xs text-slate-500`,children:[p.type,` · `,p.summary]}),(0,U.jsx)(hd,{title:`init args`,items:p.initArgsTyped||cd(p.initArgs)}),(0,U.jsx)(hd,{title:`input ports`,items:p.portsTyped?.input||cd(p.ports?.input||[])}),(0,U.jsx)(hd,{title:`output ports`,items:p.portsTyped?.output||cd(p.ports?.output||[])})]})]})]}),(0,U.jsxs)(`div`,{className:`rounded-xl border border-slate-200 bg-slate-50 p-3`,children:[(0,U.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:`Stage 2: Behavioral Synthesizing (Code Topology + DEVS Methods)`}),(0,U.jsxs)(`div`,{className:`grid gap-3`,children:[(0,U.jsx)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-3`,children:(0,U.jsx)(gd,{graphKey:`workflow-${e.id}`,graph:e.codeGraph,selectedCodeNodeId:d,setSelectedCodeNodeId:f,compact:!0})}),(0,U.jsxs)(`div`,{className:`rounded-2xl border border-slate-200 bg-white p-3`,children:[(0,U.jsx)(`h3`,{className:`mb-1 text-sm font-semibold text-slate-800`,children:m.label}),(0,U.jsxs)(`p`,{className:`mb-2 text-xs text-slate-500`,children:[`file: `,m.file]}),(0,U.jsx)(hd,{title:`input ports`,items:m.portsTyped?.in||cd(m.ports.in),compact:!0}),(0,U.jsx)(hd,{title:`output ports`,items:m.portsTyped?.out||cd(m.ports.out),compact:!0}),(0,U.jsx)(`div`,{className:`mt-2 space-y-2`,children:ad(m).map(e=>(0,U.jsxs)(`details`,{className:`rounded-lg border border-slate-200 bg-white p-2`,children:[(0,U.jsxs)(`summary`,{className:`cursor-pointer text-xs text-sky-700`,children:[e.name,` · `,e.paperName]}),(0,U.jsx)(`pre`,{className:`mt-1 whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:String(e.code)})]},e.name))})]})]})]})]})]}),(0,U.jsx)(`div`,{className:`mt-2 rounded-lg border border-slate-200 bg-white p-2`,children:(0,U.jsx)(`pre`,{className:`max-h-28 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:t.constructResult})})]}),(0,U.jsx)(fd,{role:`reasoning`,title:`reasoning`,children:(0,U.jsx)(`pre`,{className:`max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:t.reasoningBeforeRuns})}),(0,U.jsxs)(fd,{role:`tool_calling`,title:`tool_calling`,children:[(0,U.jsx)(`pre`,{className:`max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:t.runAInput}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:t.runAResult})]}),(0,U.jsxs)(fd,{role:`tool_calling`,title:`tool_calling`,children:[(0,U.jsx)(`pre`,{className:`max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:t.runBInput}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:t.runBResult})]}),(0,U.jsxs)(fd,{role:`tool_calling`,title:`tool_calling`,children:[(0,U.jsx)(`pre`,{className:`max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:t.runCInput}),(0,U.jsx)(`pre`,{className:`mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700`,children:t.runCResult})]}),(0,U.jsx)(fd,{role:`reasoning`,title:`reasoning`,children:(0,U.jsx)(`pre`,{className:`max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:t.reasoningAfterRuns})}),(0,U.jsx)(fd,{role:`reply`,title:`reply`,children:(0,U.jsx)(`pre`,{className:`max-h-72 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:i})})]})})}),(0,U.jsx)(`div`,{id:`wf-direct`,className:`scroll-mt-24`,children:(0,U.jsx)(pd,{icon:(0,U.jsx)(Du,{className:`size-4`}),title:`Direct run(wrong)`,children:(0,U.jsxs)(`div`,{className:`space-y-3`,children:[(0,U.jsxs)(`div`,{className:`rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px]`,children:[(0,U.jsx)(`span`,{className:`font-mono text-slate-700`,children:`GPT-5.4`}),(0,U.jsx)(`span`,{className:`ml-2 text-slate-600`,children:`Reasoning trace omitted; final result only.`})]}),(0,U.jsx)(fd,{role:`system`,title:`system`,children:(0,U.jsx)(`pre`,{className:`max-h-28 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:Uu})}),(0,U.jsx)(fd,{role:`user`,title:`user`,children:(0,U.jsx)(`pre`,{className:`max-h-52 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:o})}),(0,U.jsx)(fd,{role:`reply`,title:`reply`,children:(0,U.jsx)(`pre`,{className:`max-h-72 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700`,children:r})})]})})})]})]})})}function fd({role:e,title:t,children:n}){let r={system:`border-cyan-200 bg-cyan-50`,user:`border-slate-300 bg-slate-50`,tool_calling:`border-emerald-200 bg-emerald-50`,reasoning:`border-indigo-200 bg-indigo-50`,reply:`border-amber-300 bg-amber-50`};if(e===`system`)return(0,U.jsxs)(`div`,{className:`rounded-xl border p-3 ${r[e]}`,children:[(0,U.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:t}),n]});let i=e===`user`?`justify-end`:`justify-start`,a=e===`user`?`max-w-[84%]`:`max-w-[98%]`;return(0,U.jsx)(`div`,{className:`flex ${i}`,children:(0,U.jsxs)(`div`,{className:`w-full ${a} rounded-xl border p-3 ${r[e]||`border-slate-200 bg-white`}`,children:[(0,U.jsx)(`p`,{className:`mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700`,children:t}),n]})})}function pd({icon:e,title:t,children:n}){return(0,U.jsxs)(pu.section,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},className:`min-w-0 w-full rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg`,children:[(0,U.jsxs)(`h2`,{className:`mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800 md:text-base`,children:[(0,U.jsx)(`span`,{className:`rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-sky-700`,children:e}),t]}),n]})}function md({node:e,depth:t,openTree:n,setOpenTree:r,selectedTreeNodeId:i,setSelectedTreeNodeId:a}){let o=n[e.id]??!1,s=e.children.length>0;return(0,U.jsxs)(`div`,{className:`mb-2`,children:[(0,U.jsxs)(`div`,{className:`flex items-center gap-2 rounded-lg border px-2 py-2 text-xs ${i===e.id?e.type===`coupled`?`border-indigo-400 bg-indigo-50 text-indigo-800`:`border-sky-400 bg-sky-50 text-sky-700`:e.type===`coupled`?`border-indigo-200 bg-indigo-50/40 text-slate-700`:`border-slate-200 bg-white text-slate-700`}`,style:{marginLeft:`${t*18}px`},children:[s?(0,U.jsx)(`button`,{className:`rounded p-0.5 hover:bg-slate-700`,onClick:()=>r(t=>({...t,[e.id]:!o})),children:(0,U.jsx)(Tu,{className:`size-3 transition ${o?``:`-rotate-90`}`})}):(0,U.jsx)(`span`,{className:`inline-block size-3`}),(0,U.jsxs)(`button`,{className:`text-left`,onClick:()=>a(e.id),children:[(0,U.jsxs)(`span`,{className:`font-semibold`,children:[t>0?`↳ `:``,e.name]}),(0,U.jsx)(`span`,{className:`ml-2 rounded-full border border-slate-300 px-2 py-0.5 text-[10px] uppercase text-slate-500`,children:e.type}),s&&(0,U.jsxs)(`span`,{className:`ml-2 text-[10px] text-slate-500`,children:[`contains `,e.children.length,` submodels`]})]})]}),s&&o&&(0,U.jsx)(`div`,{className:`mt-1 border-l border-slate-300 pl-1`,children:e.children.map(e=>(0,U.jsx)(md,{node:e,depth:t+1,openTree:n,setOpenTree:r,selectedTreeNodeId:i,setSelectedTreeNodeId:a},e.id))})]})}function hd({title:e,items:t,compact:n=!1}){return(0,U.jsxs)(`div`,{className:`mb-3`,children:[(0,U.jsx)(`h4`,{className:`mb-1 text-xs font-semibold uppercase tracking-wide text-slate-600`,children:e}),(0,U.jsx)(`div`,{className:`flex flex-wrap gap-1.5 ${n?`text-[11px]`:`text-xs`}`,children:t.map(e=>(0,U.jsx)(`span`,{className:`rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-slate-700`,children:typeof e==`string`?e:`${e.name}: ${e.type||`?`}`},typeof e==`string`?e:`${e.name}:${e.type||``}`))})]})}function gd({graphKey:e,graph:t,selectedCodeNodeId:n,setSelectedCodeNodeId:r,compact:i=!1}){let a=i?70:78,o=i?22:23,s=i?98:108,c=i?26:27,l=i?14:18,u=i?12:16,d=i?14:16,f=i?1120:1360,p=i?470:560,m=e=>e?.modelType===`coupled`?{w:s,h:c}:{w:a,h:o},h=e=>{let t=String(e||``),n=t.split(` (`);if(n.length>1)return[n[0],`(${n.slice(1).join(` (`)}`];if(t.length<=24)return[t];let r=Math.floor(t.length/2),i=t.lastIndexOf(`_`,r);return i<6&&(i=t.indexOf(`_`,r)),i>5&&i<t.length-5?[t.slice(0,i),t.slice(i+1)]:[t]},g=(e,t,n,r)=>{let i=Math.abs(e)<1e-6?1/0:n/Math.abs(e),a=Math.abs(t)<1e-6?1/0:r/Math.abs(t);return Math.min(i,a)},[_,v]=(0,b.useState)(()=>Object.fromEntries(t.nodes.map(e=>[e.id,{x:e.x,y:e.y}]))),[y,x]=(0,b.useState)(!0),[S,C]=(0,b.useState)(null),w=(0,b.useRef)(null);(0,b.useEffect)(()=>{v(Object.fromEntries(t.nodes.map(e=>[e.id,{x:e.x,y:e.y}]))),C(null),x(!0)},[e,t]);let ee=Object.fromEntries(t.nodes.map(e=>{let t=_[e.id]||{x:e.x,y:e.y};return[e.id,{...e,x:t.x,y:t.y}]})),te=(t.groups||[]).map(e=>{if(!e.members||e.members.length===0)return e;let t=e.members.map(e=>ee[e]).filter(Boolean);if(t.length===0)return e;let n=Math.min(...t.map(e=>e.x-m(e).w)),r=Math.max(...t.map(e=>e.x+m(e).w)),i=Math.min(...t.map(e=>e.y-m(e).h)),a=Math.max(...t.map(e=>e.y+m(e).h)),o=Math.max(8,n-l),s=Math.max(8,i-u-d),c=Math.min(f-16-o,r-n+l*2),h=Math.min(p-16-s,a-i+u*2+d);return{...e,x:o,y:s,w:c,h}}),ne=e=>{let t=w.current;if(!t)return null;let n=t.createSVGPoint();n.x=e.clientX,n.y=e.clientY;let r=t.getScreenCTM();return r?n.matrixTransform(r.inverse()):null},re=(e,t)=>{if(!y)return;e.preventDefault();let n=ne(e);n&&C({id:t.id,dx:t.x-n.x,dy:t.y-n.y})},ie=e=>{if(!S)return;let t=ne(e);if(!t)return;let n=ee[S.id],r=m(n),i=Math.max(r.w+6,Math.min(f-r.w-6,t.x+S.dx)),a=Math.max(r.h+6,Math.min(p-r.h-6,t.y+S.dy));v(e=>({...e,[S.id]:{x:i,y:a}}))},ae=()=>C(null),oe=`arrow-${e}`,se=(0,b.useMemo)(()=>{let e=new Map;t.edges.forEach(([t,n],r)=>{let i=t<n?`${t}__${n}`:`${n}__${t}`,a=e.get(i)||[];a.push(r),e.set(i,a)});let n={};for(let t of e.values()){let e=t.length;t.forEach((t,r)=>{n[t]=(r-(e-1)/2)*(i?18:24)})}return n},[t.edges,i]),ce=e=>{let t=String(e||``);return t.startsWith(`EIC`)?{stroke:`#0369a1`,text:`#075985`,dash:void 0,marker:!0}:t.startsWith(`EOC`)?{stroke:`#047857`,text:`#065f46`,dash:void 0,marker:!0}:t.startsWith(`IC`)?{stroke:`#475569`,text:`#475569`,dash:void 0,marker:!0}:t===`contains`?{stroke:`#94a3b8`,text:`#64748b`,dash:`4 3`,marker:!1}:{stroke:`#64748b`,text:`#64748b`,dash:void 0,marker:!0}};return(0,U.jsxs)(`div`,{children:[(0,U.jsxs)(`div`,{className:`mb-2 flex items-center justify-between text-[11px] text-slate-500`,children:[(0,U.jsx)(`span`,{className:`text-slate-500`,children:`Static layout optimized for readability; optional drag mode for manual tuning.`}),(0,U.jsx)(`button`,{onClick:()=>x(e=>!e),className:`rounded-md border px-2 py-1 ${y?`border-cyan-500 bg-cyan-50 text-cyan-700`:`border-slate-300 bg-white text-slate-700`}`,children:y?`Drag: ON`:`Drag: OFF`})]}),(0,U.jsxs)(`div`,{className:`mb-2 flex flex-wrap items-center gap-3 ${i?`text-[9px]`:`text-[10px]`} text-slate-500`,children:[(0,U.jsxs)(`span`,{className:`inline-flex items-center gap-1`,children:[(0,U.jsx)(`span`,{className:`inline-block h-[2px] w-4 bg-[#0369a1]`}),`EIC: External Input Coupling`]}),(0,U.jsxs)(`span`,{className:`inline-flex items-center gap-1`,children:[(0,U.jsx)(`span`,{className:`inline-block h-[2px] w-4 bg-[#475569]`}),`IC: Internal Coupling`]}),(0,U.jsxs)(`span`,{className:`inline-flex items-center gap-1`,children:[(0,U.jsx)(`span`,{className:`inline-block h-[2px] w-4 bg-[#047857]`}),`EOC: External Output Coupling`]}),(0,U.jsxs)(`span`,{className:`inline-flex items-center gap-1`,children:[(0,U.jsx)(`span`,{className:`inline-block h-[2px] w-4 border-t border-dashed border-[#94a3b8]`}),`contains`]})]}),(0,U.jsx)(`div`,{className:`overflow-x-auto pb-1`,children:(0,U.jsxs)(`svg`,{ref:w,viewBox:`0 0 ${f} ${p}`,className:`${i?`h-[390px] w-full max-w-full`:`h-[460px] w-[1360px] max-w-none`} rounded-xl border border-slate-200 bg-white`,onMouseMove:ie,onMouseUp:ae,onMouseLeave:ae,children:[(0,U.jsx)(`defs`,{children:(0,U.jsx)(`marker`,{id:oe,markerWidth:`12`,markerHeight:`12`,refX:`9`,refY:`4`,orient:`auto`,markerUnits:`strokeWidth`,children:(0,U.jsx)(`path`,{d:`M0,0 L0,8 L10,4 z`,fill:`#475569`})})}),te.map((e,t)=>(0,U.jsxs)(`g`,{children:[(0,U.jsx)(`rect`,{x:e.x,y:e.y,width:e.w,height:e.h,rx:12,fill:`rgba(99, 102, 241, 0.05)`,stroke:`#818cf8`,strokeDasharray:`6 4`,strokeWidth:`1.2`}),(0,U.jsx)(`text`,{x:e.x+10,y:e.y+16,fill:`#4338ca`,fontSize:`10`,children:e.label})]},`group-${t}`)),t.edges.map(([e,t,n],r)=>{let i=ee[e],a=ee[t];if(!i||!a)return null;let o=String(n||``),s=ce(o),c=o===`contains`?`contains`:o.replace(/^EIC[^:]*:\s*/i,``).replace(/^EOC[^:]*:\s*/i,``).replace(/^IC[^:]*:\s*/i,``),l=m(i),u=m(a),d=a.x-i.x,f=a.y-i.y,p=Math.hypot(d,f)||1,h=d/p,_=f/p,v=g(h,_,l.w,l.h),y=g(h,_,u.w,u.h),b=i.x+h*(v+1),x=i.y+_*(v+1),S=a.x-h*(y+11),C=a.y-_*(y+11),[w,te]=(e<t?`${e}__${t}`:`${t}__${e}`).split(`__`),ne=ee[w],re=ee[te],ie=(re?.x??a.x)-(ne?.x??i.x),ae=(re?.y??a.y)-(ne?.y??i.y),le=Math.hypot(ie,ae)||1,ue=-ae/le,T=ie/le,E=se[r]||0,de=(b+S)/2,fe=(x+C)/2,pe=de+ue*E,D=fe+T*E,O=E===0?`M ${b} ${x} L ${S} ${C}`:`M ${b} ${x} Q ${pe} ${D} ${S} ${C}`,k=E===0?de:de+E*.45*ue,me=E===0?fe-4:fe+E*.45*T-4;return(0,U.jsxs)(`g`,{children:[(0,U.jsx)(`path`,{d:O,fill:`none`,stroke:s.stroke,strokeWidth:s.dash?`1.2`:`1.5`,strokeDasharray:s.dash,markerEnd:s.marker?`url(#${oe})`:void 0}),(0,U.jsx)(`text`,{x:k,y:me,fill:s.text,fontSize:`10`,textAnchor:`middle`,children:c})]},`${e}-${t}-${r}`)}),t.nodes.map(e=>{let t=ee[e.id],i=t.id===n,a=t.modelType===`coupled`,o=/omitted|\.\.\./i.test(String(t.label||``)),s=m(t),c=h(t.label),l=i?`#e0f2fe`:o?`#fff7ed`:a?`#eef2ff`:`#f8fafc`,u=i?`#0ea5e9`:o?`#f59e0b`:a?`#6366f1`:`#cbd5e1`;return(0,U.jsxs)(`g`,{onClick:()=>r(t.id),onMouseDown:e=>re(e,t),style:{cursor:y?`grab`:`pointer`},children:[(0,U.jsx)(`rect`,{x:t.x-s.w,y:t.y-s.h,width:s.w*2,height:s.h*2,rx:10,fill:l,stroke:u,strokeWidth:a?2:1.5,strokeDasharray:o?`5 3`:void 0}),(0,U.jsx)(`text`,{x:t.x,y:c.length>1?t.y-8:t.y-2,fill:`#0f172a`,fontSize:`11`,textAnchor:`middle`,children:c.map((e,n)=>(0,U.jsx)(`tspan`,{x:t.x,dy:n===0?0:12,children:e},`${t.id}-label-${n}`))}),(0,U.jsxs)(`text`,{x:t.x,y:c.length>1?t.y+14:t.y+11,fill:o?`#b45309`:`#0369a1`,fontSize:`9`,textAnchor:`middle`,children:[`in:`,t.ports.in.length,` out:`,t.ports.out.length]})]},t.id)})]})})]})}(0,x.createRoot)(document.getElementById(`root`)).render((0,U.jsx)(b.StrictMode,{children:(0,U.jsx)(ud,{})}));