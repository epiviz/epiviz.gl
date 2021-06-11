!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};var e=t.parcelRequire3582,o={},n={};function r(){if(r._executed)return;r._executed=!0;var t={};function o(t,e,r,i,s,u){if(s-i<=r)return;const a=i+s>>1;n(t,e,a,i,s,u%2),o(t,e,r,i,a-1,u+1),o(t,e,r,a+1,s,u+1)}function n(t,e,o,r,s,u){for(;s>r;){if(s-r>600){const i=s-r+1,a=o-r+1,h=Math.log(i),l=.5*Math.exp(2*h/3),c=.5*Math.sqrt(h*l*(i-l)/i)*(a-i/2<0?-1:1);n(t,e,o,Math.max(r,Math.floor(o-a*l/i+c)),Math.min(s,Math.floor(o+(i-a)*l/i+c)),u)}const a=e[2*o+u];let h=r,l=s;for(i(t,e,r,o),e[2*s+u]>a&&i(t,e,r,s);h<l;){for(i(t,e,h,l),h++,l--;e[2*h+u]<a;)h++;for(;e[2*l+u]>a;)l--}e[2*r+u]===a?i(t,e,r,l):(l++,i(t,e,l,s)),l<=o&&(r=l+1),o<=l&&(s=l-1)}}function i(t,e,o,n){s(t,o,n),s(e,2*o,2*n),s(e,2*o+1,2*n+1)}function s(t,e,o){const n=t[e];t[e]=t[o],t[o]=n}function u(t,e,o,n){const r=t-o,i=e-n;return r*r+i*i}const a=t=>t[0],h=t=>t[1];class l{constructor(t,e=a,n=h,r=64,i=Float64Array){this.nodeSize=r,this.points=t;const s=t.length<65536?Uint16Array:Uint32Array,u=this.ids=new s(t.length),l=this.coords=new i(2*t.length);for(let o=0;o<t.length;o++)u[o]=o,l[2*o]=e(t[o]),l[2*o+1]=n(t[o]);o(u,l,r,0,u.length-1,0)}range(t,e,o,n){return function(t,e,o,n,r,i,s){const u=[0,t.length-1,0],a=[];let h,l;for(;u.length;){const c=u.pop(),p=u.pop(),d=u.pop();if(p-d<=s){for(let s=d;s<=p;s++)h=e[2*s],l=e[2*s+1],h>=o&&h<=r&&l>=n&&l<=i&&a.push(t[s]);continue}const f=Math.floor((d+p)/2);h=e[2*f],l=e[2*f+1],h>=o&&h<=r&&l>=n&&l<=i&&a.push(t[f]);const g=(c+1)%2;(0===c?o<=h:n<=l)&&(u.push(d),u.push(f-1),u.push(g)),(0===c?r>=h:i>=l)&&(u.push(f+1),u.push(p),u.push(g))}return a}(this.ids,this.coords,t,e,o,n,this.nodeSize)}within(t,e,o){return function(t,e,o,n,r,i){const s=[0,t.length-1,0],a=[],h=r*r;for(;s.length;){const l=s.pop(),c=s.pop(),p=s.pop();if(c-p<=i){for(let r=p;r<=c;r++)u(e[2*r],e[2*r+1],o,n)<=h&&a.push(t[r]);continue}const d=Math.floor((p+c)/2),f=e[2*d],g=e[2*d+1];u(f,g,o,n)<=h&&a.push(t[d]);const m=(l+1)%2;(0===l?o-r<=f:n-r<=g)&&(s.push(p),s.push(d-1),s.push(m)),(0===l?o+r>=f:n+r>=g)&&(s.push(d+1),s.push(c),s.push(m))}return a}(this.ids,this.coords,t,e,o,this.nodeSize)}}const c={minZoom:0,maxZoom:16,minPoints:2,radius:40,extent:512,nodeSize:64,log:!1,generateId:!1,reduce:null,map:t=>t},p=Math.fround||(d=new Float32Array(1),t=>(d[0]=+t,d[0]));var d;class f{constructor(t){this.options=v(Object.create(c),t),this.trees=new Array(this.options.maxZoom+1)}load(t){const{log:e,minZoom:o,maxZoom:n,nodeSize:r}=this.options;e&&console.time("total time");const i=`prepare ${t.length} points`;e&&console.time(i),this.points=t;let s=[];for(let e=0;e<t.length;e++)t[e].geometry&&s.push(m(t[e],e));this.trees[n+1]=new l(s,b,P,r,Float32Array),e&&console.timeEnd(i);for(let t=n;t>=o;t--){const o=+Date.now();s=this._cluster(s,t),this.trees[t]=new l(s,b,P,r,Float32Array),e&&console.log("z%d: %d clusters in %dms",t,s.length,+Date.now()-o)}return e&&console.timeEnd("total time"),this}getClusters(t,e){let o=((t[0]+180)%360+360)%360-180;const n=Math.max(-90,Math.min(90,t[1]));let r=180===t[2]?180:((t[2]+180)%360+360)%360-180;const i=Math.max(-90,Math.min(90,t[3]));if(t[2]-t[0]>=360)o=-180,r=180;else if(o>r){const t=this.getClusters([o,n,180,i],e),s=this.getClusters([-180,n,r,i],e);return t.concat(s)}const s=this.trees[this._limitZoom(e)],u=s.range(w(o),M(i),w(r),M(n)),a=[];for(const t of u){const e=s.points[t];a.push(e.numPoints?y(e):this.points[e.index])}return a}getChildren(t){const e=this._getOriginId(t),o=this._getOriginZoom(t),n="No cluster with the specified id.",r=this.trees[o];if(!r)throw new Error(n);const i=r.points[e];if(!i)throw new Error(n);const s=this.options.radius/(this.options.extent*Math.pow(2,o-1)),u=r.within(i.x,i.y,s),a=[];for(const e of u){const o=r.points[e];o.parentId===t&&a.push(o.numPoints?y(o):this.points[o.index])}if(0===a.length)throw new Error(n);return a}getLeaves(t,e,o){e=e||10,o=o||0;const n=[];return this._appendLeaves(n,t,e,o,0),n}getTile(t,e,o){const n=this.trees[this._limitZoom(t)],r=Math.pow(2,t),{extent:i,radius:s}=this.options,u=s/i,a=(o-u)/r,h=(o+1+u)/r,l={features:[]};return this._addTileFeatures(n.range((e-u)/r,a,(e+1+u)/r,h),n.points,e,o,r,l),0===e&&this._addTileFeatures(n.range(1-u/r,a,1,h),n.points,r,o,r,l),e===r-1&&this._addTileFeatures(n.range(0,a,u/r,h),n.points,-1,o,r,l),l.features.length?l:null}getClusterExpansionZoom(t){let e=this._getOriginZoom(t)-1;for(;e<=this.options.maxZoom;){const o=this.getChildren(t);if(e++,1!==o.length)break;t=o[0].properties.cluster_id}return e}_appendLeaves(t,e,o,n,r){const i=this.getChildren(e);for(const e of i){const i=e.properties;if(i&&i.cluster?r+i.point_count<=n?r+=i.point_count:r=this._appendLeaves(t,i.cluster_id,o,n,r):r<n?r++:t.push(e),t.length===o)break}return r}_addTileFeatures(t,e,o,n,r,i){for(const s of t){const t=e[s],u=t.numPoints;let a,h,l;if(u)a=x(t),h=t.x,l=t.y;else{const e=this.points[t.index];a=e.properties,h=w(e.geometry.coordinates[0]),l=M(e.geometry.coordinates[1])}const c={type:1,geometry:[[Math.round(this.options.extent*(h*r-o)),Math.round(this.options.extent*(l*r-n))]],tags:a};let p;u?p=t.id:this.options.generateId?p=t.index:this.points[t.index].id&&(p=this.points[t.index].id),void 0!==p&&(c.id=p),i.features.push(c)}}_limitZoom(t){return Math.max(this.options.minZoom,Math.min(+t,this.options.maxZoom+1))}_cluster(t,e){const o=[],{radius:n,extent:r,reduce:i,minPoints:s}=this.options,u=n/(r*Math.pow(2,e));for(let n=0;n<t.length;n++){const r=t[n];if(r.zoom<=e)continue;r.zoom=e;const a=this.trees[e+1],h=a.within(r.x,r.y,u),l=r.numPoints||1;let c=l;for(const t of h){const o=a.points[t];o.zoom>e&&(c+=o.numPoints||1)}if(c>=s){let t=r.x*l,s=r.y*l,u=i&&l>1?this._map(r,!0):null;const p=(n<<5)+(e+1)+this.points.length;for(const o of h){const n=a.points[o];if(n.zoom<=e)continue;n.zoom=e;const h=n.numPoints||1;t+=n.x*h,s+=n.y*h,n.parentId=p,i&&(u||(u=this._map(r,!0)),i(u,this._map(n)))}r.parentId=p,o.push(g(t/c,s/c,p,c,u))}else if(o.push(r),c>1)for(const t of h){const n=a.points[t];n.zoom<=e||(n.zoom=e,o.push(n))}}return o}_getOriginId(t){return t-this.points.length>>5}_getOriginZoom(t){return(t-this.points.length)%32}_map(t,e){if(t.numPoints)return e?v({},t.properties):t.properties;const o=this.points[t.index].properties,n=this.options.map(o);return e&&n===o?v({},n):n}}function g(t,e,o,n,r){return{x:p(t),y:p(e),zoom:1/0,id:o,parentId:-1,numPoints:n,properties:r}}function m(t,e){const[o,n]=t.geometry.coordinates;return{x:p(w(o)),y:p(M(n)),zoom:1/0,index:e,parentId:-1}}function y(t){return{type:"Feature",id:t.id,properties:x(t),geometry:{type:"Point",coordinates:[(e=t.x,360*(e-.5)),_(t.y)]}};var e}function x(t){const e=t.numPoints,o=e>=1e4?`${Math.round(e/1e3)}k`:e>=1e3?Math.round(e/100)/10+"k":e;return v(v({},t.properties),{cluster:!0,cluster_id:t.id,point_count:e,point_count_abbreviated:o})}function w(t){return t/360+.5}function M(t){const e=Math.sin(t*Math.PI/180),o=.5-.25*Math.log((1+e)/(1-e))/Math.PI;return o<0?0:o>1?1:o}function _(t){const e=(180-360*t)*Math.PI/180;return 360*Math.atan(Math.exp(e))/Math.PI-90}function v(t,e){for(const o in e)t[o]=e[o];return t}function b(t){return t.x}function P(t){return t.y}var A,E,F;function I(t,e,o){void 0===o&&(o={});var n={type:"Feature"};return(0===o.id||o.id)&&(n.id=o.id),o.bbox&&(n.bbox=o.bbox),n.properties=e||{},n.geometry=t,n}function z(t,e,o){if(void 0===o&&(o={}),!t)throw new Error("point is required");if(!e)throw new Error("polygon is required");var n,r=function(t){if(!t)throw new Error("coord is required");if(!Array.isArray(t)){if("Feature"===t.type&&null!==t.geometry&&"Point"===t.geometry.type)return t.geometry.coordinates;if("Point"===t.type)return t.coordinates}if(Array.isArray(t)&&t.length>=2&&!Array.isArray(t[0])&&!Array.isArray(t[1]))return t;throw new Error("coord must be GeoJSON Point or an Array of numbers")}(t),i="Feature"===(n=e).type?n.geometry:n,s=i.type,u=e.bbox,a=i.coordinates;if(u&&!1===function(t,e){return e[0]<=t[0]&&e[1]<=t[1]&&e[2]>=t[0]&&e[3]>=t[1]}(r,u))return!1;"Polygon"===s&&(a=[a]);for(var h=!1,l=0;l<a.length&&!h;l++)if(Z(r,a[l][0],o.ignoreBoundary)){for(var c=!1,p=1;p<a[l].length&&!c;)Z(r,a[l][p],!o.ignoreBoundary)&&(c=!0),p++;c||(h=!0)}return h}function Z(t,e,o){var n=!1;e[0][0]===e[e.length-1][0]&&e[0][1]===e[e.length-1][1]&&(e=e.slice(0,e.length-1));for(var r=0,i=e.length-1;r<e.length;i=r++){var s=e[r][0],u=e[r][1],a=e[i][0],h=e[i][1];if(t[1]*(s-a)+u*(a-t[0])+h*(t[0]-s)==0&&(s-t[0])*(a-t[0])<=0&&(u-t[1])*(h-t[1])<=0)return!o;u>t[1]!=h>t[1]&&t[0]<(a-s)*(t[1]-u)/(h-u)+s&&(n=!n)}return n}class N{constructor(t){this.index=new f,this.points=[],console.log("Reading data..."),t.split("\n").forEach((t=>{const e=t.split(","),o=parseFloat(e[1]),n=parseFloat(e[2]);!e[0]||isNaN(o)||isNaN(n)||this.points.push({geometry:{coordinates:[o,n],sample:e[0]}})})),console.log("Indexing data..."),this.index.load(this.points),console.log("Data ready.")}selectBox(t,e=16){const o=Math.min(t[0],t[2]),n=Math.min(t[1],t[3]),r=Math.max(t[0],t[2]),i=Math.max(t[1],t[3]);console.log(this.index.getClusters([o,n,r,i],e))}selectLasso(t,e=16){let o=Number.MAX_VALUE,n=Number.MIN_VALUE,r=Number.MAX_VALUE,i=Number.MIN_VALUE;const s=[];for(let e=0;e<t.length;e+=2)t[e]<o&&(o=t[e]),t[e]>n&&(n=t[e]),t[e+1]<r&&(r=t[e+1]),t[e+1]>i&&(i=t[e+1]),s.push([t[e],t[e+1]]);s.push([...s[0]]);const u=this.index.getClusters([o,r,n,i],e),a=function(t,e,o){void 0===o&&(o={});for(var n=0,r=t;n<r.length;n++){var i=r[n];if(i.length<4)throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");for(var s=0;s<i[i.length-1].length;s++)if(i[i.length-1][s]!==i[0][s])throw new Error("First and last Position are not equivalent.")}return I({type:"Polygon",coordinates:t},e,o)}([s]);console.log(u.filter((t=>z(t.geometry.coordinates,a))))}}A=t,E="default",F=function(){return N},Object.defineProperty(A,E,{get:F,enumerable:!0}),e.register("291vL",(function(){return t}))}null==e&&((e=function(t){if(t in n){let e=n[t];delete n[t],e()}if(t in o)return o[t];if("undefined"!=typeof module&&"function"==typeof module.require)return module.require(t);var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}).register=function(t,e){o[t]=e},e.registerBundle=function(t,e){n[t]=e,o[t]={}},t.parcelRequire3582=e);for(var i=["291vL"],s=0;s<i.length;s++)parcelRequire3582.registerBundle(i[s],r)}();
//# sourceMappingURL=index.089c93f5.js.map