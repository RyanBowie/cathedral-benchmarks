import{c as e,d as t,f as n,l as r,n as i,o as a,r as o,t as s}from"./data-lFQEj9_v.js";import{a as c,d as l,f as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _}from"./index-DazmmRlT.js";import{C as v,S as y,T as b,_ as x,a as S,b as C,c as w,close as T,d as E,f as D,g as O,h as k,i as A,l as j,m as M,n as ee,o as N,openPlan2D as te,p as P,planOpen as F,r as ne,s as I,setPlanHook as re,t as ie,u as ae,v as L,w as R,x as oe,y as z}from"./plan2d-BgUyjAk4.js";import{l as se}from"./plan-DxRS6d1-.js";import{A as ce,Dn as le,G as ue,H as B,Hn as de,In as fe,Ln as V,Q as pe,R as me,Rn as H,bn as he,et as ge,hn as _e,nt as ve,r as ye,tt as U,yn as be,z as W}from"./three.core-Br0n7Trn.js";import{n as xe,r as Se}from"./three.module-C2qM_QM1.js";var Ce=[[`Rhine`,[367,1,120],``],[`Hohenzollern Bridge`,[300,32,-180],``],[`Hauptbahnhof (main station)`,[-70,26,-181],``],[`Römisch-Germanisches Museum`,[50,18,82],``],[`Museum Ludwig`,[133,22,-60],``],[`Groß St. Martin`,[128,80,402],``],[`Roncalliplatz`,[-30,2,75],``],[`Domplatte (cathedral square)`,[-108,2,0],``],[`N`,[-5,2,-230],`cmp`,`north`],[`S`,[-5,2,230],`cmp`,`south`],[`E`,[230,2,0],`cmp`,`east`],[`W`,[-240,2,0],`cmp`,`west`]],we=a.map(e=>E.has(e.level)||se(e.pos[0],e.pos[1],e.pos[2])),G=13,Te=a.map((e,t)=>t).sort((e,t)=>Number(!!a[t].req)-Number(!!a[e].req)),Ee=[[[-71,0,-22],[42,21,22]],[[42,0,-11],[52,20,11]],[[-71,21,-7],[42,46,7]],[[42,18,-5],[47.5,46,5]],[[-56,46,-3.5],[42,53,3.5]],[[-15,0,-37],[15,21,37]],[[-7,21,-37],[7,46,37]],[[-3.5,46,-37],[3.5,53,37]],[[-71,0,-6],[-55,45,6]],[[-71,0,8.5],[-55.5,75,23.5]],[[-71,0,-23.5],[-55.5,75,-8.5]],[[-67.8,75,11.4],[-58.6,96,20.6]],[[-67.8,75,-20.6],[-58.6,96,-11.4]]];function De(e,t,n,r,i){let a=[e.x,e.y,e.z],o=[t[0]-e.x,t[1]-e.y,t[2]-e.z];for(let[e,t]of Ee){let s=[Math.max(e[0],r),e[1],e[2]],c=[t[0],Math.min(t[1],n),Math.min(t[2],i)],l=0,u=.98,d=!0;for(let e=0;e<3&&d;e++)if(s[e]>=c[e])d=!1;else if(Math.abs(o[e])<1e-9)d=a[e]>=s[e]&&a[e]<=c[e];else{let t=(s[e]-a[e])/o[e],n=(c[e]-a[e])/o[e];l=Math.max(l,Math.min(t,n)),u=Math.min(u,Math.max(t,n)),d=l<=u}if(d)return!0}return!1}function Oe(e){let t=-1,n=!0,i=-1,o=-1,s=null,c=[],l=_(`tooltip`),u=m(`div`,{id:`markers`,role:`group`,"aria-label":`Place markers in the 3D view`}),f=a.map((e,t)=>u.appendChild(m(`button`,{type:`button`,class:`hs`+(e.req?` req`:``),text:String(t+1),hidden:!0,"aria-label":`${t+1}. ${e.name} (${L(e.level).name})`,onclick:()=>O(t,{card:!0}),onpointerenter:()=>i=t,onpointerleave:()=>i=-1,onfocus:()=>i=t,onblur:()=>i=-1})));_(`app`).append(u);let p=_(`labels`),g=Ce.map(([e,,t,n])=>p.appendChild(m(`div`,{class:`lbl world ${t}`,hidden:!0},e,n?m(`small`,{text:n}):null))),y=a.map(()=>({x:0,y:0,on:!1})),S=Ce.map(()=>!1);e.onFrame(r=>{let o=e.renderer.domElement,s=o.clientWidth,c=o.clientHeight,u=R(e,r),d=[],p=t>=0?[t,...Te.filter(e=>e!==t)]:Te,m=e.state.mode===`exterior`;for(let r of p){let i=a[r],o=y[r],l=n&&(r===t||z(e,i))&&!e.isCut(i.pos);if(l){let n=e.project(i.pos);if(l=n.front&&n.x>-12&&n.y>-12&&n.x<s+12&&n.y<c+12&&!oe(u,n.x,n.y),l&&r!==t&&(l=!D.some(e=>Math.abs(e[0]-n.x)<e[2]+G&&Math.abs(e[1]-n.y)<e[3]+G)),l&&r!==t){for(let e of d)if(Math.abs(y[e].x-n.x)<20&&Math.abs(y[e].y-n.y)<20){l=!1;break}}l&&(o.x=n.x,o.y=n.y,d.push(r))}let p=f[r];l!==o.on&&(p.hidden=!l,o.on=l),l&&(p.style.transform=`translate(${o.x.toFixed(1)}px,${o.y.toFixed(1)}px) translate(-50%,-50%)`,p.classList.toggle(`inside`,m&&we[r]))}i>=0&&y[i].on?(l.textContent=`${a[i].name} \u00b7 ${L(a[i].level).name}`,l.style.left=`${y[i].x+8}px`,l.style.top=`${y[i].y}px`,l.hidden=!1):l.hidden=!0;let h=e.state.mode!==`interior`,_=e.state.cuts,b=e.state.mode!==`xray`,x=e.cutH??1/0,C=_.ns.on?_.ns.v:-1/0,w=_.ew.on?_.ew.v:1/0,T=(e,t,n,r)=>d.find(i=>Math.abs(y[i].x-e)<n+G&&Math.abs(y[i].y-t)<r+G)??-1,E=[...D],O=[...u,[-1e5,-1e5,0,1e5],[s,-1e5,s+1e5,1e5]];Ce.forEach((t,r)=>{let i=h&&(n||t[2]===`cmp`);if(i){let n=e.project(t[1]);if(i=n.front&&n.x>0&&n.y>0&&n.x<s&&n.y<c&&!(b&&De(e.rig.camera.position,t[1],x,C,w)),i){let[e,t]=M(g[r]),a=[n.y],o=2*(t+G)+2,s=NaN,c=NaN;for(let r=0;r<a.length&&r<6&&Number.isNaN(s);r++){let i=v(O,n.x,a[r],e,t,e-4);if(Number.isNaN(i))continue;let l=T(i,a[r],e,t);if(l>=0)for(let e of[y[l].y-G-t-2,y[l].y+G+t+2])Math.abs(e-n.y)<=o&&!a.includes(e)&&a.push(e);else E.some(n=>Math.abs(n[0]-i)<n[2]+e&&Math.abs(n[1]-a[r])<n[3]+t)||(s=i,c=a[r])}i=!Number.isNaN(s),i&&(E.push([s,c,e,t]),g[r].style.transform=`translate(${s.toFixed(1)}px,${c.toFixed(1)}px) translate(-50%,-50%)`)}}i!==S[r]&&(g[r].hidden=!i,S[r]=i)})});let C=_(`info`);function w(e){let t=a[e];o=e,_(`infoName`).textContent=t.name;let n=_(`infoMeta`);n.textContent=`Place ${e+1} \u00b7 ${x(t.level)} \u00b7 ${t.zone}`,t.est&&n.append(` `,m(`span`,{class:`est-tag`,text:`estimated`,title:`Position or figure is an estimate`})),_(`infoFact`).textContent=t.fact;let i=_(`infoSrc`);i.textContent=t.src.length>1?`Sources: `:`Source: `,t.src.forEach((e,t)=>{let n=r[e];n&&(t&&i.append(` · `),i.append(m(`a`,{href:n.url,target:`_blank`,rel:`noopener noreferrer`,text:n.title})))}),C.hidden&&document.activeElement instanceof HTMLElement&&document.activeElement!==document.body&&(s=document.activeElement),C.hidden=!1}function T(){f.forEach((e,n)=>e.classList.toggle(`active`,n===t));for(let e of c)e(t)}function O(e,n={}){t=e,n.card!==!1&&w(e),T(),n.fly&&k(e)}function k(t){b();let n=a[t],r=n.view;if(!r){let t=e.rig.camera.position,r=new V(...n.pos);return e.flyTo(r.clone().add(t.clone().sub(r).setLength(25)),r,1.6)}r.mode&&r.mode!==e.state.mode&&e.setMode(r.mode);let i=`all`;return(E.has(n.level)||e.state.mode!==`interior`&&!r.noCut&&n.level!==`floor`)&&(i=n.level),e.state.level!==i&&e.setLevel(i),e.isCut(n.pos)&&e.clearCuts(),h(`Flying to ${n.name}`),e.flyTo(r.pos,r.target,1.8)}function A(e=!0){let n=!C.hidden;C.hidden=!0,o=-1,t>=0&&(t=-1,T()),n&&e&&s&&s.isConnected&&!s.hidden&&s.focus(),s=null}return _(`btnInfoClose`).addEventListener(`click`,()=>A()),_(`btnInfoFly`).addEventListener(`click`,()=>o>=0&&void k(o)),e.renderer.domElement.addEventListener(`dblclick`,t=>{let n=e.pick(t.clientX,t.clientY);if(!n)return;b();let r=e.rig.camera.position,i=d(r.distanceTo(n.point)*.45,4,40),a=n.point.clone().add(r.clone().sub(n.point).setLength(i));a.y<e.rig.minY+.5&&(a.y=e.rig.minY+.5),e.flyTo(a,n.point,1.1),h(`Flying to the selected point`)}),{active:()=>t,eligible:()=>a.map((e,t)=>t).filter(r=>r===t||n&&z(e,a[r])&&!e.isCut(a[r].pos)),select:O,fly:k,close:A,setMarkers:e=>void(n=e),onSelect:e=>void c.push(e)}}var K={show(e,t,n,r,i){_(`pbCount`).textContent=e,_(`pbTitle`).textContent=t,_(`pbText`).textContent=n,_(`pbPrev`).setAttribute(`aria-label`,r),_(`pbNext`).setAttribute(`aria-label`,i),_(`playbar`).hidden=!1},count(e){_(`pbCount`).textContent=e},playing(e,t=`Play`){let n=_(`pbPlay`);n.textContent=e?`Pause`:t,n.setAttribute(`aria-label`,e?`Pause`:t)},hide(){_(`playbar`).hidden=!0}};function ke(){_(`pbPrev`).addEventListener(`click`,()=>P()?.prev()),_(`pbNext`).addEventListener(`click`,()=>P()?.next()),_(`pbPlay`).addEventListener(`click`,()=>P()?.toggle()),_(`pbEnd`).addEventListener(`click`,()=>P()?.end())}function Ae(e,n){let r=-1,i=!1,a=0,o=0,s=_(`btnTourStart`),c=t.map((e,t)=>{let n=m(`button`,{type:`button`,onclick:()=>f(t,!1)},e.title);return _(`tourList`).append(m(`li`,{},n)),n}),l=e=>Math.max(6,t[e].text.length/18)*1e3;function u(){if(window.clearTimeout(a),!i||r<0)return;let e=o;a=window.setTimeout(()=>{e===o&&i&&(r<t.length-1?f(r+1,!0):p())},l(r))}function f(l,f=i){P()&&P()!==v&&P().end(),y(v),r=d(l,0,t.length-1),i=f,window.clearTimeout(a);let p=t[r],m=++o;e.setMode(p.mode),e.state.night!==!!p.night&&e.setNight(!!p.night),e.clearCuts(),p.section&&e.setCut(p.section,!0),e.setLevel(p.mode===`interior`||p.noCut?`all`:p.level);let g=p.hotspot?O(p.hotspot):-1;g>=0?n.select(g,{card:!1}):n.close(!1),c.forEach((e,t)=>{e.classList.toggle(`active`,t===r),t===r?e.setAttribute(`aria-current`,`step`):e.removeAttribute(`aria-current`)}),K.show(`Tour \u00b7 stop ${r+1} of ${t.length}`,p.title,p.text,`Previous stop`,`Next stop`),K.playing(i),s.textContent=`Restart tour`,h(`Tour stop ${r+1} of ${t.length}: ${p.title}. ${p.text}`),e.flyTo(p.cam.pos,p.cam.target,2.2).then(()=>{m===o&&u()})}function p(){i=!1,o++,window.clearTimeout(a),K.playing(!1)}function g(){p(),r<0||(r=-1,c.forEach(e=>{e.classList.remove(`active`),e.removeAttribute(`aria-current`)}),K.hide(),s.textContent=`Start tour`,P()===v&&y(null),h(`Tour ended`))}let v={prev:()=>f(r-1),next:()=>r<t.length-1?f(r+1):g(),toggle:()=>{if(i)return p();if(r>=t.length-1)return f(0,!0);i=!0,o++,K.playing(!0),u()},end:g};return s.addEventListener(`click`,()=>f(0,!0)),C(()=>{P()===v&&i&&p()}),{start:()=>f(0,!0),end:g,get active(){return r>=0},prev:v.prev,next:v.next}}var je=new ye,Me=new V,Ne=class extends me{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new ce([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new ce([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new W(t,6,1);return this.setAttribute(`instanceStart`,new B(n,3,0)),this.setAttribute(`instanceEnd`,new B(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new W(t,6,1);return this.setAttribute(`instanceColorStart`,new B(n,3,0)),this.setAttribute(`instanceColorEnd`,new B(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new de(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ye);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),je.setFromBufferAttribute(t),this.boundingBox.union(je))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new be),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)Me.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(Me)),Me.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(Me));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}};Se.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new fe},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},xe.line={uniforms:le.merge([Se.common,Se.fog,Se.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = perspective ? normalize( mix( start.xyz, end.xyz, 0.5 ) ) : vec3( 0.0, 0.0, - 1.0 );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;

				// only shift the depth of vertices in front of the camera (#35137)
				if ( clip.w > 0.0 ) clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				float len;

				if ( isOrthographic ) {

					// View rays are parallel to the z axis so the distance reduces to camera-space XY
					vec2 lineDir = worldEnd.xy - worldStart.xy;
					float t = clamp( dot( worldPos.xy - worldStart.xy, lineDir ) / dot( lineDir, lineDir ), 0.0, 1.0 );
					len = length( worldStart.xy + lineDir * t - worldPos.xy );

				} else {

					// Find the closest points on the view ray and the line segment
					vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
					vec3 lineDir = worldEnd - worldStart;
					vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

					vec3 p1 = worldStart + lineDir * params.x;
					vec3 p2 = rayEnd * params.y;
					vec3 delta = p1 - p2;
					len = length( delta );

				}

				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var Pe=class extends _e{constructor(e){super({type:`LineMaterial`,uniforms:le.clone(xe.line.uniforms),vertexShader:xe.line.vertexShader,fragmentShader:xe.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return`WORLD_UNITS`in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return`USE_DASH`in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return`USE_ALPHA_TO_COVERAGE`in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE=``:delete this.defines.USE_ALPHA_TO_COVERAGE)}},Fe=new H,Ie=new V,Le=new V,q=new H,J=new H,Y=new H,Re=new V,ze=new ge,X=new ue,Be=new V,Ve=new ye,He=new be,Z=new H,Q,$;function Ue(e,t,n){return Z.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),Z.multiplyScalar(1/Z.w),Z.x=$/n.width,Z.y=$/n.height,Z.applyMatrix4(e.projectionMatrixInverse),Z.multiplyScalar(1/Z.w),Math.abs(Math.max(Z.x,Z.y))}function We(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){X.start.fromBufferAttribute(i,r),X.end.fromBufferAttribute(a,r),X.applyMatrix4(n);let o=new V,s=new V;Q.distanceSqToSegment(X.start,X.end,s,o),s.distanceTo(o)<$*.5&&t.push({point:s,pointOnLine:o,distance:Q.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,uv1:null})}}function Ge(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,c=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count),u=-t.near;Q.at(1,Y),Y.w=1,Y.applyMatrix4(t.matrixWorldInverse),Y.applyMatrix4(r),Y.multiplyScalar(1/Y.w),Y.x*=i.x/2,Y.y*=i.y/2,Y.z=0,Re.copy(Y),ze.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,o=l;t<o;t++){if(q.fromBufferAttribute(s,t),J.fromBufferAttribute(c,t),q.w=1,J.w=1,q.applyMatrix4(ze),J.applyMatrix4(ze),q.z>u&&J.z>u)continue;if(q.z>u){let e=q.z-J.z,t=(q.z-u)/e;q.lerp(J,t)}else if(J.z>u){let e=J.z-q.z,t=(J.z-u)/e;J.lerp(q,t)}q.applyMatrix4(r),J.applyMatrix4(r),q.multiplyScalar(1/q.w),J.multiplyScalar(1/J.w),q.x*=i.x/2,q.y*=i.y/2,J.x*=i.x/2,J.y*=i.y/2,X.start.copy(q),X.start.z=0,X.end.copy(J),X.end.z=0;let o=X.closestPointToPointParameter(Re,!0);X.at(o,Be);let l=pe.lerp(q.z,J.z,o),d=l>=-1&&l<=1,f=Re.distanceTo(Be)<$*.5;if(d&&f){X.start.fromBufferAttribute(s,t),X.end.fromBufferAttribute(c,t),X.start.applyMatrix4(a),X.end.applyMatrix4(a);let r=new V,i=new V;Q.distanceSqToSegment(X.start,X.end,i,r),n.push({point:i,pointOnLine:r,distance:Q.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}var Ke=class extends U{constructor(e=new Ne,t=new Pe({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)Ie.fromBufferAttribute(t,e),Le.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+Ie.distanceTo(Le);let i=new W(r,2,1);return e.setAttribute(`instanceDistanceStart`,new B(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new B(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;if(r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;Q=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;$=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),He.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?$*.5:Ue(r,Math.max(r.near,He.distanceToPoint(Q.origin)),s.resolution),He.radius+=c,Q.intersectsSphere(He)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Ve.copy(o.boundingBox).applyMatrix4(a);let l;l=n?$*.5:Ue(r,Math.max(r.near,Ve.distanceToPoint(Q.origin)),s.resolution),Ve.expandByScalar(l),Q.intersectsBox(Ve)!==!1&&(n?We(this,t):Ge(this,r,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Fe),this.material.uniforms.resolution.value.set(Fe.z,Fe.w))}},qe=class extends Ne{constructor(){super(),this.isLineGeometry=!0,this.type=`LineGeometry`}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setColors(n),this}setFromPoints(e){let t=e.length-1,n=new Float32Array(6*t);for(let r=0;r<t;r++)n[6*r]=e[r].x,n[6*r+1]=e[r].y,n[6*r+2]=e[r].z||0,n[6*r+3]=e[r+1].x,n[6*r+4]=e[r+1].y,n[6*r+5]=e[r+1].z||0;return super.setPositions(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}},Je=class extends Ke{constructor(e=new qe,t=new Pe({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type=`Line2`}},Ye=14,Xe=new V(-73.6,0,24.6),Ze=new V(-63.2,0,16),Qe=new V(-15.5,6.5,15.5);function $e(e){let t=e.marks.climb||[],n=Math.min(533,t.length-1),r=t.flatMap(e=>[e.x,e.y+.35,e.z]),a=(t,n,i,a)=>{let o=new qe;o.setPositions(r);let s=new Je(o,new Pe({color:t,linewidth:n,transparent:!0,opacity:i,depthTest:!1,depthWrite:!1}));return s.renderOrder=a,s.frustumCulled=!1,s.visible=!1,e.scene.add(s),s},s=a(3721471,3,.55,990),c=a(14219007,5,1,991),l=new U(new he(.9,16,12),new ve({color:16777215,depthTest:!1,transparent:!0}));l.renderOrder=992,l.visible=!1,e.scene.add(l);let u=_(`labels`).appendChild(m(`div`,{class:`lbl climb`,hidden:!0})),f=_(`rngClimb`),p=_(`btnClimbPlay`),g=i.map((e,t)=>{let n=m(`button`,{type:`button`,onclick:()=>I(t)},e.name,m(`span`,{class:`h`,text:`${e.est?`≈ `:``}${e.h} m`}));return _(`climbList`).append(m(`li`,{},n)),n}),v=!1,b=!1,x=0,S=-1,w=0,T=new V,E=new V,D=()=>Math.round(x),O=e=>t[d(e,0,n)]?.y??0,k=e=>{let t=0;return i.forEach((n,r)=>{O(e)>=n.h-.05&&(t=r)}),e>=n?i.length-1:t},A=e=>{for(let t=0;t<=n;t++)if(O(t)>=e-.05)return t;return n};function j(){let e=D(),t=e>=n?o:O(e),r=k(e),a=e>=n?String(o):t.toFixed(1);_(`climbStep`).textContent=`Step ${e} / 533`,_(`climbHeight`).textContent=`${a} m`,f.value=String(e),f.setAttribute(`aria-valuetext`,`Step ${e} of 533, ${a} metres, ${i[r].name}`),u.replaceChildren(`Step ${e} of 533`,m(`small`,{text:`${a} m \u00b7 ${i[r].name}`})),c.geometry.instanceCount=Math.max(0,e),r!==S&&(S=r,g.forEach((e,t)=>{e.classList.toggle(`active`,t===r),t===r?e.setAttribute(`aria-current`,`step`):e.removeAttribute(`aria-current`)}),v&&(K.show(`Climb \u00b7 stage ${r+1} of ${i.length}`,i[r].name,i[r].text,`Previous stage`,`Next stage`),K.playing(b,e>=n?`Climb again`:`Resume`),h(`${i[r].name}: step ${e} of 533, ${t.toFixed(0)} metres. ${i[r].text}`))),p.textContent=b?`Pause`:v&&e>0?e>=n?`Climb again`:`Resume`:`Start climb`}function M(e){let t=D(),n=O(t);return e.copy(t<=417?Xe:Ze).setY(n+1.5)}function ee(){return!v&&(P()&&P()!==ie&&P().end(),y(ie),v=!0,S=-1,e.setMode(`exterior`),e.clearCuts(),e.setLevel(`all`),e.setClimb(!0),s.visible=c.visible=l.visible=!0,u.hidden=!1,M(T),e.flyTo(T.clone().add(Qe),T,1.6),!0)}function N(e){b=e,w=performance.now(),K.playing(e,D()>=n?`Climb again`:`Resume`),j()}function te(){D()>=n&&(x=0),ee()||(M(T),e.flyTo(T.clone().add(Qe),T,.8)),N(!0)}function F(){b&&N(!1)}function ne(t,r=!0){ee(),x=d(t,0,n),j(),r&&(M(T),e.flyTo(T.clone().add(Qe),T,.9))}function I(e){F(),ne(A(i[d(e,0,i.length-1)].h))}function re(){v&&(v=!1,b=!1,x=0,e.setClimb(!1),s.visible=c.visible=l.visible=!1,u.hidden=!0,S=-1,P()===ie&&y(null),K.hide(),j(),h(`Climb ended`))}let ie={prev:()=>I(k(D())-(D()>A(i[k(D())].h)?0:1)),next:()=>I(k(D())+1),toggle:()=>b?F():te(),end:re};return e.onFrame(r=>{if(!v)return;let i=Math.min(.1,(r-w)/1e3);if(w=r,b){let t=D();x=Math.min(n,x+i*Ye),D()!==t&&j(),x>=n&&(N(!1),h(`You reached the viewing platform at ${o} m after 533 steps.`)),M(E),T.lerp(E,1-Math.exp(-i*4)),e.rig.flying||(e.flyTo(T.clone().add(Qe),T,0),e.rig.camera.updateMatrixWorld())}let a=t[D()];if(a){l.position.set(a.x,a.y+.6,a.z);let t=e.project([a.x,a.y+.6,a.z]);t.front&&(u.style.transform=`translate(${t.x.toFixed(1)}px,${(t.y-30).toFixed(1)}px) translate(-50%,-50%)`),u.hidden=!t.front||oe(R(e,r),t.x,t.y-30)}}),p.addEventListener(`click`,()=>b?F():te()),_(`btnClimbStop`).addEventListener(`click`,re),f.addEventListener(`input`,()=>{F(),ne(Number(f.value),!1),M(T),e.flyTo(T.clone().add(Qe),T,0)}),C(()=>{b&&F()}),j(),{play:te,pause:F,end:re,toggle:ie.toggle,get on(){return v}}}var et=[-135,125,-93,93];function tt(t,n){let r=_(`minimap`),i=r.getContext(`2d`),o=document.createElement(`canvas`),s=``,c=1,l=I(280,200,et);function u(){c=Math.min(2,window.devicePixelRatio||1);let n=r.clientWidth||280,i=r.clientHeight||200,a=`${t.state.level}|${n}|${i}|${c}`;if(a===s)return;s=a,r.width=o.width=Math.round(n*c),r.height=o.height=Math.round(i*c),l=I(n,i,et);let u=o.getContext(`2d`);u.setTransform(c,0,0,c,0,0),A(u,l,!1),S(u,l,t.state.level);let d=e.find(e=>e.id===t.state.level);_(`mmLevel`).textContent=d?d.h==null?d.name:`${d.name} · ${d.est?`≈ `:``}${d.h} m`:``}function f(){u(),i.setTransform(1,0,0,1,0,0),i.drawImage(o,0,0),i.setTransform(c,0,0,c,0,0);let e=n.active(),r=n.eligible().map(t=>({n:t+1,x:a[t].pos[0],z:a[t].pos[2],req:a[t].req,active:t===e}));N(i,l,r,3.4,!1);let s=t.rig.camera,f=t.rig.target,[m,h]=j(l,s.position.x,s.position.z),g=m<6||h<6||m>l.w-6||h>l.h-6;m=d(m,6,l.w-6),h=d(h,6,l.h-6);let _=t.rig.heading()*p-Math.PI/2,v=2*Math.atan(Math.tan(s.fov*p/2)*s.aspect),y=i.createRadialGradient(m,h,2,m,h,40);y.addColorStop(0,`rgba(127,211,255,0.6)`),y.addColorStop(1,`rgba(127,211,255,0.04)`),i.beginPath(),i.moveTo(m,h),i.arc(m,h,40,_-v/2,_+v/2),i.closePath(),i.fillStyle=y,i.fill();let[b,x]=j(l,f.x,f.z);i.strokeStyle=`#7fd3ff`,i.lineWidth=1.5,i.beginPath(),i.moveTo(b-4,x),i.lineTo(b+4,x),i.moveTo(b,x-4),i.lineTo(b,x+4),i.stroke(),i.beginPath(),i.arc(m,h,5,0,Math.PI*2),i.fillStyle=g?`rgba(127,211,255,0.45)`:`#7fd3ff`,i.fill(),i.lineWidth=1.5,i.strokeStyle=`#0d1015`,i.stroke()}function m(e,r,i){n.onUser();let a=t.rig.target,o=t.rig.camera.position;e=d(e,-400,700),r=d(r,-400,450),t.flyTo([o.x+e-a.x,o.y,o.z+r-a.z],[e,a.y,r],i)}r.addEventListener(`click`,e=>{let t=r.getBoundingClientRect(),[n,i]=w(l,e.clientX-t.left,e.clientY-t.top);m(n,i,.9)}),r.addEventListener(`keydown`,e=>{let n=e.shiftKey?30:8,r={ArrowUp:[0,-n],ArrowDown:[0,n],ArrowLeft:[-n,0],ArrowRight:[n,0]}[e.key];if(!r)return;e.preventDefault(),e.stopPropagation();let i=t.rig.target;m(i.x+r[0],i.z+r[1],.25)});let h=0;return t.onFrame(e=>{e-h<100||(h=e,f())}),f(),{draw:f}}var nt=[.5,.4,.6,.3,.7,.2,.8],rt=`http://www.w3.org/2000/svg`,it=(e,t=``)=>{let n=document.createElementNS(rt,e);return t&&n.setAttribute(`class`,t),n};function at(e){let t=_(`labels`),n=it(`svg`,`figs`);n.setAttribute(`aria-hidden`,`true`),n.style.display=`none`,t.prepend(n);let r=s.map(e=>{let r=it(`g`,e.est?`est`:``),i=it(`line`,`dim`),a=it(`line`,`tick`),o=it(`line`,`tick`);return r.append(i,a,o),n.append(r),{a:e,g:r,line:i,t0:a,t1:o,lb:t.appendChild(m(`div`,{class:`lbl fig`+(e.est?` est`:``),hidden:!0},e.label,m(`small`,{text:e.value}))),on:!1,lbOn:!1}}),i=_(`btnFigures`),a=!1,o=(e,t,n,r,i)=>{e.setAttribute(`x1`,t.toFixed(1)),e.setAttribute(`y1`,n.toFixed(1)),e.setAttribute(`x2`,r.toFixed(1)),e.setAttribute(`y2`,i.toFixed(1))};function c(t,o=!1){if(a=t,e.setFigures(t),i.setAttribute(`aria-pressed`,String(t)),n.style.display=t?``:`none`,!t)for(let e of r)e.lb.hidden=!0,e.g.style.display=`none`,e.on=e.lbOn=!1;o||h(t?`Key figures shown: ${s.map(e=>`${e.label} ${e.value}`).join(`; `)}`:`Key figures hidden`)}return i.addEventListener(`click`,()=>c(!a)),e.onFrame(t=>{if(D.length=0,!a)return;let n=e.renderer.domElement,i=n.clientWidth,s=n.clientHeight,c=[...R(e,t),[-1e5,-1e5,0,1e5],[i,-1e5,i+1e5,1e5],[-1e5,-1e5,1e5,0],[-1e5,s,1e5,1e5]];for(let t of r){let n=e.project(t.a.a),r=e.project(t.a.b),a=n.front&&r.front,l=!1;if(a){let e=(n.x+r.x)/2,u=(n.y+r.y)/2;if(a=e>-50&&u>-50&&e<i+50&&u<s+50,a){o(t.line,n.x,n.y,r.x,r.y);let e=r.x-n.x,i=r.y-n.y,a=Math.hypot(e,i)||1,s=-i/a*7,u=e/a*7;o(t.t0,n.x-s,n.y-u,n.x+s,n.y+u),o(t.t1,r.x-s,r.y-u,r.x+s,r.y+u);let[d,f]=M(t.lb);for(let r of nt){let a=n.y+i*r,o=v(c,n.x+e*r,a,d,f,d-4);if(!Number.isNaN(o)){l=!0,D.push([o,a,d,f]),c.push([o-d-2,a-f-2,o+d+2,a+f+2]),t.lb.style.transform=`translate(${o.toFixed(1)}px,${a.toFixed(1)}px) translate(-50%,-50%)`;break}}}}a!==t.on&&(t.on=a,t.g.style.display=a?``:`none`),l!==t.lbOn&&(t.lbOn=l,t.lb.hidden=!l)}}),{show:c,get on(){return a}}}var ot=[`north`,`north-east`,`east`,`south-east`,`south`,`south-west`,`west`,`north-west`],st=e=>ot[Math.round((e%360+360)%360/45)%8];function ct(e){let t=e.rig,n=(e,t)=>_(e).addEventListener(`click`,()=>{b(),t()});n(`zoomIn`,()=>t.dolly(.8)),n(`zoomOut`,()=>t.dolly(1.25)),n(`orbitL`,()=>t.orbit(-.26,0)),n(`orbitR`,()=>t.orbit(.26,0));let r=_(`compassRose`),i=_(`compass`),a=_(`fps`),o=``,s=0,c=NaN;e.onFrame(n=>{let l=t.heading();if(Math.abs(l-c)>.05){c=l,r.style.transform=`rotate(${(-l).toFixed(1)}deg)`;let e=st(l);e!==o&&(o=e,i.setAttribute(`aria-label`,`Compass: the view faces ${e}`),i.title=`View faces ${e}`)}if(!a.hidden&&n-s>500){s=n;let t=e.stats();a.textContent=`${t.fps.toFixed(0)} fps \u00b7 ${Math.round(t.tris/1e3)}k triangles \u00b7 ${t.calls} draw calls \u00b7 ${e.state.quality}`}})}var lt=new Set([`checkbox`,`radio`,`button`,`submit`,`reset`]),ut=e=>e instanceof HTMLInputElement&&!lt.has(e.type)||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement||e instanceof HTMLElement&&e.isContentEditable;function dt(e,t){let n=e.rig;window.addEventListener(`keydown`,e=>{if(e.defaultPrevented||e.ctrlKey||e.altKey||e.metaKey||document.querySelector(`dialog[open]`))return;let r=e.key,i=r.length===1?r.toLowerCase():r,a=e.shiftKey,o=ut(e.target);if(F()){let n=e.target instanceof Node&&_(`plan2d`).contains(e.target);!o&&(i===`p`||r===`Escape`&&!n)?(e.preventDefault(),t.plan()):!o&&r===`?`&&(e.preventDefault(),t.help());return}if(r===`Escape`)return t.escape();if(o)return;let s={ArrowLeft:()=>a?n.pan(-1,0):n.orbit(-.12,0),ArrowRight:()=>a?n.pan(1,0):n.orbit(.12,0),ArrowUp:()=>a?n.pan(0,1):n.orbit(0,-.08),ArrowDown:()=>a?n.pan(0,-1):n.orbit(0,.08),w:()=>n.move(1,0),s:()=>n.move(-1,0),a:()=>n.move(0,-1),d:()=>n.move(0,1),q:()=>n.move(0,0,-1),r:()=>n.move(0,0,1),"+":()=>n.dolly(.85),"=":()=>n.dolly(.85),"-":()=>n.dolly(1.18),_:()=>n.dolly(1.18),PageUp:()=>n.dolly(.85),PageDown:()=>n.dolly(1.18)}[i];if(s){e.preventDefault(),b(),s();return}let c={h:t.home,Home:t.home,e:()=>t.mode(`exterior`),i:()=>t.mode(`interior`),x:()=>t.mode(`xray`),n:t.night,f:t.figures,l:()=>t.level(a?-1:1),t:t.tour,"[":()=>t.tourStep(-1),"]":()=>t.tourStep(1),c:t.climb,p:t.plan,"/":t.search,"?":t.help}[i];c?(e.preventDefault(),c()):/^[1-9]$/.test(r)&&(e.preventDefault(),t.view(Number(r)-1))})}function ft(e){e.addEventListener(`keydown`,t=>{if(![`ArrowDown`,`ArrowUp`,`Home`,`End`].includes(t.key))return;let n=[...e.querySelectorAll(`button`)],r=n.indexOf(document.activeElement);r<0||(t.preventDefault(),n[t.key===`Home`?0:t.key===`End`?n.length-1:Math.max(0,Math.min(n.length-1,r+(t.key===`ArrowDown`?1:-1)))].focus())})}var pt={quality:`medium`,labels:!0,fps:!1,motion:null,ghost:!0},mt=[`low`,`medium`,`high`],ht={exterior:`Exterior`,interior:`Interior`,xray:`X-ray`},gt=[`all`,`spires`,`platform`,`bells`,`roof`,`triforium`,`floor`,`crypt`,`excavations`].filter(t=>e.some(e=>e.id===t)),_t=[`h`,`ew`,`ns`],vt=e=>e.replace(/-/g,`−`),yt=e=>vt(`${e.toFixed(1)} m`);function bt(e){let t=Math.round(e*60)%1440;return`${String(Math.floor(t/60)).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`}function xt(e,t){let n=Math.abs(t).toFixed(1);return e===`h`?`${n} metres ${t<0?`below`:`above`} the floor`:e===`ew`?t===0?`on the centre line`:`${n} metres ${t>0?`south`:`north`} of the centre line`:t===0?`through the crossing`:`${n} metres ${t<0?`west`:`east`} of the crossing`}function St(){let e=g(),t={...pt};return mt.includes(e.quality)&&(t.quality=e.quality),typeof e.labels==`boolean`&&(t.labels=e.labels),typeof e.fps==`boolean`&&(t.fps=e.fps),typeof e.motion==`boolean`&&(t.motion=e.motion),typeof e.ghost==`boolean`&&(t.ghost=e.ghost),t}function Ct(t){t.onFrame(()=>t.rig.camera.updateMatrixWorld());let r=$e(t),i=at(t),o=Oe(t),s=tt(t,{eligible:o.eligible,active:o.active,onUser:b});ke();let d=Ae(t,o),p=ae({active:o.active,select:e=>o.select(e,{fly:!0,card:!0}),onSelect:o.onSelect,level:()=>t.state.level},{listId:`placeList`,countId:`placeCount`,searchId:`search`,allId:`chkAllLevels`});ie(()=>t.stats()),re(e=>o.select(e,{fly:!0,card:!0})),t.rig.controls.addEventListener(`start`,b),ct(t);let v=St(),y=_(`chkLabels`),x=_(`chkFps`),S=_(`chkMotion`),w=_(`chkGhost`),E=_(`selQuality`),D=_(`fps`),O=()=>l({...g(),...v});function A(){t.state.quality!==v.quality&&t.setQuality(v.quality),E.value=t.state.quality,o.setMarkers(v.labels),y.checked=v.labels,D.hidden=!v.fps,x.checked=v.fps;let e=v.motion??f();t.rig.reducedMotion=e,S.checked=e,t.state.ghost!==v.ghost&&t.setGhost(v.ghost),w.checked=v.ghost}let j=_(`app`),M=_(`left`),N=_(`btnLeft`),I=_(`btnRight`);function L(e){M.classList.toggle(`collapsed`,!e),N.setAttribute(`aria-expanded`,String(e)),N.textContent=e?`‹`:`›`,N.setAttribute(`aria-label`,e?`Collapse control panel`:`Expand control panel`)}function R(e){j.classList.toggle(`right-collapsed`,!e),I.setAttribute(`aria-expanded`,String(e)),I.textContent=e?`›`:`‹`,I.setAttribute(`aria-label`,e?`Collapse places panel`:`Expand places panel`)}N.addEventListener(`click`,()=>L(M.classList.contains(`collapsed`))),I.addEventListener(`click`,()=>R(j.classList.contains(`right-collapsed`))),L(!0),R(!0);let oe=[...document.querySelectorAll(`#tabs [role="tab"]`)];function z(e,t=!1){for(let n of oe){let r=n.id===`tab-${e}`;n.setAttribute(`aria-selected`,String(r)),n.tabIndex=r?0:-1;let i=document.getElementById(n.getAttribute(`aria-controls`)||``);i&&(i.hidden=!r),r&&t&&n.focus()}M.classList.contains(`collapsed`)&&L(!0)}oe.forEach((e,t)=>{e.addEventListener(`click`,()=>z(e.id.slice(4))),e.addEventListener(`keydown`,e=>{let n=oe.length,r=e.key===`ArrowRight`?(t+1)%n:e.key===`ArrowLeft`?(t+n-1)%n:e.key===`Home`?0:e.key===`End`?n-1:-1;r<0||(e.preventDefault(),z(oe[r].id.slice(4),!0))})}),z(`levels`);let se=[...document.querySelectorAll(`#topbar .seg [role="radio"][data-mode]`)];function ce(e){b(),r.on&&e!==`exterior`&&r.end(),t.state.mode!==e&&t.setMode(e),h(`${ht[e]} mode`)}se.forEach((e,t)=>{e.addEventListener(`click`,()=>ce(e.dataset.mode)),e.addEventListener(`keydown`,e=>{let n=se.length,r=e.key===`ArrowRight`||e.key===`ArrowDown`,i=e.key===`ArrowLeft`||e.key===`ArrowUp`,a=r?(t+1)%n:i?(t+n-1)%n:e.key===`Home`?0:e.key===`End`?n-1:-1;a<0||(e.preventDefault(),ce(se[a].dataset.mode),se[a].focus())})});let le=_(`levelList`),ue=gt.map(t=>{let n=e.find(e=>e.id===t);return le.appendChild(m(`button`,{type:`button`,role:`radio`,"aria-checked":`false`,"data-level":t,title:n.desc,onclick:()=>B(t)},m(`span`,{text:n.name}),m(`span`,{class:`h`,text:k(t)||`whole building`})))});function B(n){let i=e.find(e=>e.id===n);if(!i)return;b(),r.on&&r.end(),n!==`all`&&t.state.mode===`interior`&&t.setMode(`exterior`),t.clearCuts(),t.setLevel(n),t.flyTo(i.view.pos,i.view.target,1.6);let o=n===`all`?a.length:a.filter(e=>e.level===n).length,s=k(n);h(`${i.name}${s?`, ${s}`:``}. ${i.desc} ${o} place${o===1?``:`s`}${n===`all`?` in total`:` on this level`}.`)}ue.forEach((e,t)=>e.addEventListener(`keydown`,e=>{let n=ue.length,r=e.key===`ArrowDown`||e.key===`ArrowRight`,i=e.key===`ArrowUp`||e.key===`ArrowLeft`,a=r?(t+1)%n:i?(t+n-1)%n:e.key===`Home`?0:e.key===`End`?n-1:-1;a<0||(e.preventDefault(),B(gt[a]),ue[a].focus())}));let de=_(`rngTime`),fe=_(`outTime`),V=_(`selSeason`),pe=_(`sunInfo`),me=_(`btnNight`),H=()=>t.state.night||t.light.info.night>.5;function he(e,n=!1){e?t.setNight(!0):(t.setNight(!1),t.light.info.night>.5&&t.setTime(16,t.state.season)),n||h(e?`Night: floodlights on and the windows glow from inside`:`Daylight`)}function ge(){let e=t.light.info,n;n=t.state.night?`Night mode: floodlights on, windows glowing.`:e.alt<-.5?e.night>.5?`Sun below the horizon — floodlights on, windows glowing.`:`Sun just below the horizon — twilight.`:`Sun elevation ${Math.round(e.alt)}\u00b0, azimuth ${Math.round(e.az)}\u00b0 (${st(e.az)}).`,pe.textContent=n}de.addEventListener(`input`,()=>{t.state.night&&t.setNight(!1),t.setTime(Number(de.value),V.value)}),V.addEventListener(`change`,()=>{t.setTime(t.state.hour,V.value),h(`Season: ${V.selectedOptions[0]?.textContent||V.value}`)}),me.addEventListener(`click`,()=>he(!H())),E.addEventListener(`change`,()=>{v.quality=E.value,t.setQuality(v.quality),O(),h(`Rendering quality: ${v.quality}`)}),document.addEventListener(`cce:autoquality`,()=>E.value=t.state.quality),y.addEventListener(`change`,()=>{v.labels=y.checked,o.setMarkers(v.labels),O()}),x.addEventListener(`change`,()=>{v.fps=x.checked,D.hidden=!v.fps,O()}),S.addEventListener(`change`,()=>{v.motion=S.checked,t.rig.reducedMotion=v.motion,O()}),w.addEventListener(`change`,()=>{v.ghost=w.checked,t.setGhost(v.ghost),O()});let _e=_(`viewList`),ve=n.map((e,t)=>_e.appendChild(m(`button`,{type:`button`,"data-view":e.id,title:e.desc,"aria-keyshortcuts":t<9?String(t+1):void 0,onclick:()=>U(e.id)},m(`span`,{text:e.name}),t<9?m(`span`,{class:`k`,"aria-hidden":`true`,text:String(t+1)}):null))),ye=e=>ve.forEach(t=>t.dataset.view===e?t.setAttribute(`aria-current`,`true`):t.removeAttribute(`aria-current`));C(()=>ye(null));function U(e){let i=n.find(t=>t.id===e);i&&(b(),r.on&&r.end(),d.active&&d.end(),t.setMode(i.mode||`exterior`),(i.night!==void 0||e===`home`)&&he(!!i.night,!0),t.clearCuts(),i.section&&t.setCut(i.section,!0),t.setLevel(`all`),t.flyTo(i.pos,i.target,1.8),ye(e),h(`${i.name}. ${i.desc}`))}let be={},W={h:`H`,ew:`EW`,ns:`NS`};for(let e of _t){let n=be[e]={chk:_(`chk${W[e]}`),rng:_(`rng${W[e]}`),out:_(`out${W[e]}`)};n.rng.addEventListener(`input`,()=>{b(),r.on&&r.end(),t.setCut(e,!0,Number(n.rng.value))}),n.chk.addEventListener(`change`,()=>{b(),r.on&&r.end(),t.setCut(e,n.chk.checked,Number(n.rng.value)),h(`${n.chk.labels?.[0]?.textContent?.trim()||`Section`} ${n.chk.checked?`on`:`off`}`)})}_(`btnSecView`).addEventListener(`click`,()=>{b(),r.on&&r.end(),t.state.mode===`interior`&&t.setMode(`exterior`);let e=t.state.cuts;if(e.h.on||e.ew.on||e.ns.on||t.setCut(`ew`,!0,e.ew.v),e=t.state.cuts,e.ew.on)t.flyTo([-5,76,e.ew.v+249],[-5,76,e.ew.v],1.6),h(`Looking at the east–west section from the south`);else if(e.ns.on)t.flyTo([e.ns.v-110,34,28],[e.ns.v,29,0],1.6),h(`Looking at the cross-section from the west`);else{let n=t.cutH??e.h.v;t.flyTo([-75,n+90,110],[-4,n,0],1.6),h(`Looking down on the horizontal cut`)}}),_(`btnSecClear`).addEventListener(`click`,()=>{b(),t.clearCuts(),h(`Section cuts cleared`)});function xe(){d.active&&d.end(),r.on&&r.end(),o.close(!1),U(`home`)}_(`btnHome`).addEventListener(`click`,xe);let Se=_(`btn2d`),Ce=_(`plan2d`);function we(){F()?T():te(!1,``,{level:t.state.level===`all`?`floor`:t.state.level,active:o.active()})}Se.addEventListener(`click`,we);let G=()=>Se.setAttribute(`aria-pressed`,String(!Ce.hidden));new MutationObserver(G).observe(Ce,{attributes:!0,attributeFilter:[`hidden`]}),G(),_(`btnHelp`).addEventListener(`click`,ne),_(`btnAbout`).addEventListener(`click`,ee),_(`btnResetApp`).addEventListener(`click`,()=>{c(),v={...pt},d.active&&d.end(),r.on&&r.end(),i.show(!1,!0),o.close(!1),F()&&T(),t.setNight(!1),t.setTime(16,`equinox`),A();let e=_(`search`);e.value=``,_(`chkAllLevels`).checked=!0,p.render(),L(!0),R(!0),U(`home`),u(`App reset — saved settings cleared`)}),ft(_(`viewList`)),ft(_(`tourList`)),ft(_(`climbList`)),dt(t,{home:xe,view:e=>{let t=n[e];t&&U(t.id)},mode:ce,night:()=>he(!H()),figures:()=>i.show(!i.on),level:e=>{let n=gt.length;B(gt[(Math.max(0,gt.indexOf(t.state.level))+e+n)%n])},tour:()=>{z(`tour`),d.active?d.end():d.start()},tourStep:e=>{let t=P();t?e<0?t.prev():t.next():e>0&&(z(`tour`),d.start())},climb:()=>{z(`climb`),r.on?r.end():r.play()},plan:we,search:()=>{R(!0);let e=_(`search`);e.focus(),e.select()},escape:()=>{F()?T():_(`info`).hidden?d.active?d.end():r.on&&r.end():o.close()},help:ne});let Te={level:``,mode:``,below:!1},Ee=_(`placeList`);function De(){let e=t.state;se.forEach(t=>{let n=t.dataset.mode===e.mode;t.setAttribute(`aria-checked`,String(n)),t.tabIndex=n?0:-1}),ue.forEach(t=>{let n=t.dataset.level===e.level;t.setAttribute(`aria-checked`,String(n)),t.tabIndex=n?0:-1});for(let t of _t){let n=e.cuts[t],r=be[t];r.chk.checked=n.on,r.rng.value=String(n.v),r.out.textContent=yt(n.v),r.rng.setAttribute(`aria-valuetext`,xt(t,n.v))}de.value=String(e.hour),fe.textContent=bt(e.hour),de.setAttribute(`aria-valuetext`,`${bt(e.hour)} local solar time`),V.value=e.season,me.setAttribute(`aria-pressed`,String(H())),ge();let n=t.belowVisible;if(e.level!==Te.level||e.mode!==Te.mode||n!==Te.below){Te={level:e.level,mode:e.mode,below:n};let t=Ee.contains(document.activeElement);p.render(),t&&!Ee.contains(document.activeElement)&&Ee.querySelector(`button[data-i]`)?.focus()}s.draw()}t.onChange(De),A();let K=n.find(e=>e.id===`home`);K&&t.flyTo(K.pos,K.target,0),De(),window.__cceView=U}export{Ct as initUI};