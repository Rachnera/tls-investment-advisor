!function(e){var n={};function r(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)r.d(t,i,function(n){return e[n]}.bind(null,i));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="/tls-investment-advisor/",r(r.s=0)}([function(e,n,r){"use strict";function t(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}function i(e,n){if(e){if("string"===typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}function a(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||i(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,n){if(null==e)return{};var r,t,i=function(e,n){if(null==e)return{};var r,t,i={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(i[r]=e[r]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}function c(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function u(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function s(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?u(Object(r),!0).forEach((function(n){c(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function l(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],t=!0,i=!1,a=void 0;try{for(var o,c=e[Symbol.iterator]();!(t=(o=c.next()).done)&&(r.push(o.value),!n||r.length!==n);t=!0);}catch(u){i=!0,a=u}finally{try{t||null==c.return||c.return()}finally{if(i)throw a}}return r}}(e,n)||i(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.r(n),r.d(n,"prepare",(function(){return G})),r.d(n,"preprocess",(function(){return R})),r.d(n,"process",(function(){return x})),r.d(n,"clean",(function(){return A}));var f,p,m,v,d,h=[{name:"Bank of Stineford",price:4e5,profits:24e4},{name:"Stineford Weapons Store",price:2e5,profits:75e3},{name:"Trading Pillar Rights",price:3e5,profits:1e5},{name:"Stineford Succubus Tower",price:function(e){return e.chapter1x2Tower?8e5:1e6},social:2},{name:"Yhilini Airship Fleet",price:1e6,profits:1e5},{name:"Min's Trade Route",price:4e5,profits:185e3,givini:1,chalice:1},{name:"Yhilini Succubi Trade",price:function(e){return e.chapter3Infrastructure?4e5:55e4},profits:2e5,chalice:2},{name:"Yhilini Brothel Reform",price:25e3,profits:35e3},{name:"Premium Steel Owner",price:function(e){return e.chapter1Steel?75e3:1e5},profits:1e4},{name:"Yhilini Bank Core Lender",price:function(e){return e.chapter1Bank?45e4:5e5},profits:15e4},{name:"Mercenary Offices",price:function(e){return e.chapter3Infrastructure?15e4:25e4},profits:15e3,social:2},{name:"Theltiar Rentals",price:425e3,profits:95e3,social:1},{name:"Theltiar Flowhouse",price:25e4,profits:8e4},{name:"Denmiel Mushrooms",price:105e3,profits:4e4},{name:"Denmiel Archives",price:function(e){return"full_unlock"===e.gawnfallMother?15e4:25e4},profits:2e4,social:1},{name:"Eustrin Guild",price:6e5,profits:25e4},{name:"Succubus Armorer",price:function(e){return e.chapter3Armorer?1e5:15e4},profits:1e4,chalice:2},{name:"Gasm Falls Trade",price:275e3,profits:11e4,chalice:2},{name:"Givini Tunnels",price:15e5,profits:3e5,givini:3,takkan:3,chalice:3},{name:"Lustlord Temples",price:function(e){return e.lustlordStatuesBought?75e4:8e5},profits:5e4,chalice:function(e){return e.lustlordStatuesBought?5:7}},{name:"Succubus Band Tour",price:1e5,profits:2e3,givini:2,social:1,takkan:2},{name:"Gasm Falls Water Cleanup",price:25e4,social:1,chalice:5},{name:"Gasm Falls Orc Tunnels",price:2e5,social:1,chalice:5},{name:"Givini Smithing",price:2e5,profits:1e4,givini:2},{name:"Givini Orc Merchant",price:function(e){var n=e.giviniStart,r=void 0===n?0:n;return r<20?1e5:r<25?2e5:r<35?3e5:r<45?4e5:5e5},profits:function(e){var n=e.giviniStart,r=void 0===n?0:n,t=e.giviniExtra,i=r+(void 0===t?0:t)+e.investments.reduce((function(e,n){return e+((null===n||void 0===n?void 0:n.givini)||0)}),0);return i<20?25e3:i<30?5e4:i<40?1e5:i<50?15e4:2e5},givini:5},{name:"Givini Teahouse Chain",price:275e3,profits:3e4,givini:2,social:1,takkan:1,chalice:1},{name:"Bank of Givini",price:35e4,profits:3e5,givini:5,takkan:2,chalice:2},{name:"Givini Mage Guild",price:1e6,profits:4e4,givini:5},{name:"War Monument",price:1e6,givini:10,social:3,takkan:2,chalice:2},{name:"Tarran'Kan Housing + Tarran'Kan Trade Upgrade",price:function(e){var n=e.gawnfallTakkan;return"major"===n?85e4:"minor"===n?1e6:11e5},profits:1e5,social:1,takkan:7},{name:"Hall of Mental Strength",price:2e5,profits:25e3,social:1,takkan:3},{name:"Booze Shack",price:15e4,profits:5e4,social:1,takkan:2},{name:"Tradesmasher's Guild",price:35e4,profits:function(e){var n=e.investments,r=void 0===n?[]:n,t=e.previousInvestments,i=void 0===t?[]:t,o=e.gawnfallTakkan,c=(e.chapter3Tradesmasher?1:0)+[].concat(a(i),a(r.map((function(e){return e.name})))).filter((function(e){return["Cee'Kan Shipping","Lonely Sailor Services","Givini Orc Merchant","Orcish Democracy","Orc Pools Upgrade"].includes(e)})).length+("major"===o?1:0);return c<1?25e3:1===c?5e4:2===c?75e3:3===c?125e3:4===c?15e4:5===c?175e3:2e5},takkan:5},{name:"Lonely Sailor Services",price:25e4,profits:1e5,social:1,takkan:5},{name:"Cee'Kan Shipping",price:7e5,profits:2e5,takkan:5},{name:"Orcish Democracy",price:1e6,social:5,takkan:10},{name:"Imp Offices",price:1e5,social:1,takkan:1},{name:"Orc Pools Upgrade",price:5e5,social:2,takkan:5},{name:"Givini Banners + Givini Dragon Statue",price:3500,givini:1},{name:"Orcish Drake Statue + Orcish Gargoyle Statue + Orcish Golden Drake Statue",price:8e3,takkan:1},{name:"Aram Eustrin Embassy",price:function(e){return e.eustrinEmbassy||1/0}}],g=function(e){var n=e.gawnfallArdford;return"resolved"===n||"overkill"===n},y=function(e){return function(n){return g(n)&&e||1/0}},b=[].concat(h,[{name:"Tak'Kan Mine",price:function(e){var n=e.gawnfallTakkan;return"major"===n?25e4:"minor"===n?5e5:1/0},profits:125e3,social:1,takkan:5},{name:"Ivalan Bank",price:y(55e4),profits:225e3},{name:"Mercenary Flotilla",price:y(5e5),profits:25e3},{name:"Sanitation Mages Guild",price:y(1e5),profits:5e3},{name:"Crystal Refiner",price:y(4e5),profits:55e3},{name:"Ardford Restaurant",price:y(1e5),profits:function(e){var n=e.investments,r=e.previousInvestments,t=void 0===r?[]:r;return g(e)&&[].concat(a(t),a(n.map((function(e){return e.name})))).includes("Givini Teahouse Chain")?25e3:1e4}}]),k=b.filter((function(e){return"function"===typeof e.profits})),O=function(e,n){var r=n.mandatory,t=void 0===r?[]:r,i=e.filter((function(e){var n=e.name;return!t.includes(n)})).sort((function(e,n){var r=e.price,t=void 0===r?0:r,i=n.price;return(void 0===i?0:i)-t})),a={};a[function(){var n=e.filter((function(e){var n=e.name;return t.includes(n)}));return n.length>0?n[n.length-1].name:"default"}()]=i.slice(0);for(var o=0;o<i.length;o++)a[i[o].name]=i.slice(o+1);return a},S=function(e,n){var r=n.mandatory,t=void 0===r?[]:r,i=n.atLeastOne,o=void 0===i?[]:i,c=e.filter((function(e){var n=e.name;return t.includes(n)}));return o.length>0&&!t.some((function(e){return o.includes(e)}))?o.map((function(n){var r=[].concat(a(c),[e.find((function(e){return e.name===n}))]);return[r,r.reduce((function(e,n){return e+n.price}),0)]})):[[c,c.reduce((function(e,n){return e+n.price}),0)]]},j=function(e){for(var n=e.combsNMinusOne,r=e.maxPrice,t=e.cheaperThan,i=[],o=0;o<n.length;o++)for(var c,u=l(n[o],2),s=u[0],f=u[1],p=t[(null===(c=s[s.length-1])||void 0===c?void 0:c.name)||"default"],m=0;m<p.length;m++){var v=p[m],d=f+v.price;d>r||i.push([[].concat(a(s),[v]),d])}return i},T=function(e,n){return"function"===typeof e?e(n):e||0},P=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=s(s({},n),{},{investments:e}),t=0,i=0,a=0,o=0,c=0,u=0,l=[];return e.forEach((function(e){var n=T(e.profits,r),f=T(e.chalice,r);t+=e.price,i+=n,a+=e.social||0,o+=e.givini||0,c+=e.takkan||0,u+=f,l.push(s(s({},e),{},{profits:n,chalice:f}))})),k.forEach((function(e){var t;(null===n||void 0===n||null===(t=n.previousInvestments)||void 0===t?void 0:t.includes(e.name))&&(i+=e.profits(r)-e.profits(s(s({},r),{},{investments:[]})))})),{price:t,profits:i,social:a,givini:o,takkan:c,chalice:u,investments:l}},w=function(e){var n=e.current,r=e.candidate,t=e.otherRequirements,i=void 0===t?{}:t,o=e.context,c=void 0===o?{}:o,u=e.money,s=i.social,l=void 0===s?0:s,f=i.givini,p=void 0===f?0:f,m=i.orcCouncil,v=i.reserve;return!(r.social<l)&&(!(r.givini<p)&&(!(m&&function(e){var n=e.investments,r=void 0===n?[]:n,t=e.takkan,i=e.researches,a=5,o=2;return t>=40?a+=4:t>=30?(a+=3,o+=1):t>=20?(a+=2,o+=2):t>=10?(a+=1,o+=3):o+=4,(void 0===i?[]:i).includes("orc")?a+=1:o+=1,a+=r.filter((function(e){return["Orc Pools Upgrade","Tarran'Kan Housing + Tarran'Kan Trade Upgrade","Hall of Mental Strength","Imp Offices"].includes(e)})).length,r.includes("Orcish Democracy")&&(a=2),a/(a+o)}({investments:[].concat(a(c.previousInvestments||[]),a(r.investments.map((function(e){return e.name})))),takkan:c.takkan+r.takkan,researches:c.completedResearch})<m)&&(!(v&&u-r.price+r.profits<v)&&(!n||(r.profits>n.profits||r.profits===n.profits&&r.price<n.price)))))},M=function(e){var n=e.money,r=e.otherRequirements,t=void 0===r?{}:r,i=e.list,a=void 0===i?"default":i,c=o(e,["money","otherRequirements","list"]),u=c.previousInvestments,l=void 0===u?[]:u,f=t.mandatory,p=void 0===f?[]:f,m=t.atLeastOne,v=void 0===m?[]:m,d=t.banned,g=void 0===d?[]:d;return{money:n,otherRequirements:t,investments:("gawnfall"===a?b:h).filter((function(e){var n=e.name;return!l.includes(n)&&!(g.includes(n)&&!v.includes(n)&&!p.includes(n))})).map((function(e){return s(s({},e),{},{price:T(e.price,c)})})).filter((function(e){return e.price!==1/0})),context:c}},G=function(e){var n,r=(null===(n=(f=M(e)).otherRequirements)||void 0===n?void 0:n.mandatory)||[];return v=O(f.investments,{mandatory:r}),d=S(f.investments,f.otherRequirements),p=a(d.map((function(e){return e[0]}))),m=null,f.investments.length-d[0][0].length},R=function(){d=j({combsNMinusOne:d,maxPrice:f.money,cheaperThan:v});for(var e=0;e<d.length;e++)p.push(d[e][0]);return d.length},x=function(e,n){for(var r=f,t=r.otherRequirements,i=r.context,a=r.money,o=e;o<n;o++){var c=p[o],u=P(c,i);w({current:m,candidate:u,otherRequirements:t,context:i,money:a})&&(m=u)}return m},A=function(){f=void 0,p=void 0,m=void 0,v=void 0,d=void 0};addEventListener("message",(function(e){var r,t=e.data,i=t.type,a=t.method,o=t.id,c=t.params;"RPC"===i&&a&&((r=n[a])?Promise.resolve().then((function(){return r.apply(n,c)})):Promise.reject("No such method")).then((function(e){postMessage({type:"RPC",id:o,result:e})})).catch((function(e){var n={message:e};e.stack&&(n.message=e.message,n.stack=e.stack,n.name=e.name),postMessage({type:"RPC",id:o,error:n})}))})),postMessage({type:"RPC",method:"ready"})}]);
//# sourceMappingURL=0289f8e37f8b057cf80f.worker.js.map