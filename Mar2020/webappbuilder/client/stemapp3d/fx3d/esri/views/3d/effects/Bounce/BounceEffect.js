/**
 * Copyright @ 2018 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["dojo/_base/lang","dojo/_base/array","esri/core/declare","esri/core/lang","esri/views/3d/webgl-engine/lib/Util","esri/core/libs/gl-matrix-2/gl-matrix","../../webgl-engine-extensions/VertexBufferLayout","../../webgl-engine-extensions/GLVertexArrayObject","../../webgl-engine-extensions/GLXBO","../../webgl-engine-extensions/GLVerTexture","../../support/fx3dUtils","../../support/fx3dUnits","../../support/interpolationUtils","../Effect","./BounceMaterial"],function(i,e,t,s,r,n,a,h,o,l,_,d,u,g,c){var f,m,v,p=n.vec3f64,x=n.vec3,b=n.vec2f64,w=n.vec2,y=40.11,I=p.create(),F=p.create(),M=p.create(),P=p.create(),z=p.create(),V=p.create(),T=p.create(),A=p.create(),B=p.create(),O=p.fromValues(0,0,1),D=0,C=-1,N=0,L=r.VertexAttrConstants,S=t([g],{declaredClass:"esri.views.3d.effects.Bounce.BounceEffect",effectName:"Bounce",constructor:function(e){i.hitch(this,e),this.orderId=2,this._pointsNum=15,this._cachedFlyPaths={},this._cachedPulses={},this._timeAwareFids=[],this._needsAllLoaded=!0,this._layer.timeInfo instanceof Object?(this._hasTimeInfo=!0,this._needsRenderPath=!1):this._hasTimeInfo=!1,this._hasTimeInfo=!1},_initRenderingInfo:function(){this.renderingInfo.radius=30,this.renderingInfo.dashHeight=1e5,this.renderingInfo.haloColors=[_.rgbNames.cadetblue,_.rgbNames.yellowgreen,_.rgbNames.lightpink,_.rgbNames.orangered,_.rgbNames.green,_.rgbNames.indianred],this._colorBarDirty=!0,this._renderingInfoDirty=!0,this._vacDirty=!0,this._shapeDirty=!0,this.inherited(arguments)},_doRenderingInfoChange:function(i){this.inherited(arguments);for(var e in i)i.hasOwnProperty(e)&&this.renderingInfo.hasOwnProperty(e)&&(s.endsWith(e.toLowerCase(),"info")?_.isInforAttrChanged(this.renderingInfo[e],i[e])&&(this._renderingInfoDirty=!0):s.endsWith(e.toLowerCase(),"color")?i[e]instanceof Array&&3==i[e].length&&(this.renderingInfo[e]=[i[e][0]/255,i[e][1]/255,i[e][2]/255]):s.endsWith(e.toLowerCase(),"colors")?i[e]instanceof Array&&(this.renderingInfo[e]=i[e],this._colorBarDirty=!0,this._renderingInfoDirty=!0):"radius"===e.toLowerCase()||"dashHeight"===e.toLowerCase()||"transparency"===e.toLowerCase()?(this._clampScope(i,e),"radius"==e&&this._radiusUnit?this.renderingInfo[e]=d.toMeters(this._radiusUnit,i[e],this._view.viewingMode):"dashHeight"==e&&this._dashHeightUnit?(this.renderingInfo[e]=d.toMeters(this._dashHeightUnit,i[e],this._view.viewingMode),this._updateDefaultLabelHeight()):this.renderingInfo[e]=i[e]):typeof i[e]==typeof this.renderingInfo[e]&&(this.renderingInfo[e]=i[e]))},_updateDefaultLabelHeight:function(){var i=this._pointsNum*this.renderingInfo.dashHeight;this._layer._labelDefaultHeight={flag:0,min:i,max:i}},setContext:function(t){this.inherited(arguments),this._effectConfig&&i.isArray(this._effectConfig.renderingInfo)&&(this._radiusUnit=null,this._dashHeightUnit=null,e.forEach(this._effectConfig.renderingInfo,function(i){"radius"===i.name.toLowerCase()?(this._radiusUnit=i.unit,this.renderingInfo.radius=d.toMeters(this._radiusUnit,this.renderingInfo.radius,this._view.viewingMode)):"dashHeight"===i.name.toLowerCase()&&(this._dashHeightUnit=i.unit,this.renderingInfo.dashHeight=d.toMeters(this._dashHeightUnit,this.renderingInfo.dashHeight,this._view.viewingMode),this._updateDefaultLabelHeight())}.bind(this)),this._aroundVerticesTexture=new l(this._gl),this._aroundVerticesTextureSize=b.create())},destroy:function(){this._resetXBOs(),this._dispose("_aroundVerticesTexture"),this._dispose("_vao"),this._dispose("_pulseVAO")},_resetXBOs:function(){this._dispose("_vbo"),this._dispose("_ibo"),this._dispose("_pulseVBO"),D=0,C=-1,f=0,N=0,this._needsRenderPath=!1},_initVertexLayout:function(){this._vertexAttrConstants=[L.POSITION,L.AUXPOS1],this._vertexBufferLayout=new a(this._vertexAttrConstants,[3,2],[5126,5126])},_initRenderContext:function(){return this.inherited(arguments),this._vacDirty&&(this._initVertexLayout(),this._resetXBOs(),this._vacDirty=!1,this._vao&&(this._vao.unbind(),this._vao._initialized=!1),this._pulseVAO&&(this._pulseVAO.unbind(),this._pulseVAO._initialized=!1)),this._pulseVBO||(this._pulseVBO=new o(this._gl,(!0),this._vertexBufferLayout)),this._hasTimeInfo?(this._vbo||(this._vbo=new o(this._gl,(!0),this._vertexBufferLayout)),this._ibo||(this._ibo=new o(this._gl,(!1))),this._vaoExt&&(this._vao=new h(this._gl,this._vaoExt)),this._buildTimeAwareAroundPathGeometries()):(this._vaoExt&&(this._pulseVAO=new h(this._gl,this._vaoExt)),this._buildVerticalGeometries())},_buildTimeAwareAroundPathGeometries:function(){var i,e,t=this._allGraphics();if(t.sort(function(t,s){return i=t.attributes[this._layer.timeInfo.startTimeField],e=s.attributes[this._layer.timeInfo.startTimeField],i===e?0:i<e?1:i>e?-1:0}.bind(this)),this._cachedFlyPaths={},this._timeAwareFids=[],t.length>1){for(var s,r,n,a,h,o,l,d,g,c,f,m=[],v=0,p=t.length-1;v<p;v++)if(null!=t[v].geometry){for(s=t[v].geometry,s.altitude||(s.altitude=y),r=t[v+1].geometry,r.altitude||(r.altitude=y),x.set(I,s.longitude,s.latitude,s.altitude),"global"===this._view.viewingMode?_.wgs84ToSphericalEngineCoords(I,0,I,0):"local"===this._view.viewingMode&&_.wgs84ToWebMerc(I,0,I,0),x.set(F,r.longitude,r.latitude,r.altitude),"global"===this._view.viewingMode?_.wgs84ToSphericalEngineCoords(F,0,F,0):"local"===this._view.viewingMode&&_.wgs84ToWebMerc(F,0,F,0),0==v&&this._initPulseGeometries(v,t[v]),x.subtract(M,I,F),h=x.length(M),"global"===this._view.viewingMode?n=h<=5e5?18:h<=1e6?40:Math.floor(1e-5*h):"local"===this._view.viewingMode&&(n=h<=1e6?10:h<=2e6?18:Math.floor(6e-6*h)),f=.6*h,x.lerp(P,I,F,.5),"global"===this._view.viewingMode?(c=x.length(P),x.normalize(P,P),x.scale(P,P,c+f)):"local"===this._view.viewingMode&&(x.scale(B,O,f),x.add(P,B,P)),x.normalize(M,M),x.scale(z,M,f),x.add(V,P,z),x.scale(T,M,-f),x.add(A,P,T),this._cachedFlyPaths[t[v].attributes.FID]={vertices:null,indices:null},m=u.getPoints(n,I,I,V,P),m.pop(),m=m.concat(u.getPoints(n,P,A,F,F)),a=m.length,o=[],l=[],d=0,g=a;d<g;d++)o.push(m[d][0],m[d][1],m[d][2],d,a),d<g-1&&0===(1&d)&&(l.push(d,d+1),d+1===a-2&&l.push(d+1,d+2));this._cachedFlyPaths[t[v].attributes.FID].vertices=new Float32Array(o),this._cachedFlyPaths[t[v].attributes.FID].indices=new Uint32Array(l),this._timeAwareFids.push(t[v].attributes.FID),this._initPulseGeometries(v+1,t[v+1])}return this._resetAddGeometries(),!0}return 1==t.length&&(this._initPulseGeometries(0,t[0]),this._resetAddGeometries(),!0)},_initPulseGeometries:function(i,e){if(e.geometry){var t,s,r=e.geometry,n=this._vertexBufferLayout.getStride(),a=new Float32Array(this._pointsNum*n);for(t=0;t<this._pointsNum;t++)s=n*t,a[s+0]=r.longitude,a[s+1]=r.latitude,a[s+2]=null==r.altitude?y:y+r.altitude,a[s+3]=t==this._pointsNum-1?-this._pointsNum-1:t+1,a[s+4]=i;this._cachedPulses[e.attributes.FID]={vertices:a}}},_buildVerticalGeometries:function(){var i=this._allGraphics();if(i.length>0){var e,t=this._vertexBufferLayout.getStride(),s=new Float32Array(i.length*t*this._pointsNum),r=0,n=0,a=0;for(n=0;n<i.length;n++)if(e=i[n].geometry)for(a=0;a<this._pointsNum;a++)r=(n*this._pointsNum+a)*t,s[r+0]=e.longitude,s[r+1]=e.latitude,s[r+2]=null==e.altitude?y:y+e.altitude,s[r+3]=a==this._pointsNum-1?-this._pointsNum-1:a+1,s[r+4]=n;return this._pulseVBO.addData(!1,s),this._pulseVAO&&(this._pulseVAO._initialized=!1),this._resetAddGeometries(),!0}return!1},_initAroundVerticesTexture:function(){if(2*this._pathIdNum!==this._tmpPoints.length)return!1;var i=this._gl.getParameter(3379),e=2,t=this._pathIdNum*e,s=_.nextHighestPowerOfTwo(t);s>i&&(s=i,console.warn("Too many graphics, and some data will be discarded."));var r=Math.ceil(t/s);r=_.nextHighestPowerOfTwo(r),r>i&&(r=i,console.warn("Too many graphics, and some data will be discarded."));for(var n,a=new Float32Array(s*r*4),h=0;h<this._pathIdNum;h++)n=h*e*4,a[0+n]=h,a[1+n]=this._tmpPoints[h*e][0],a[2+n]=this._tmpPoints[h*e][1],a[3+n]=this._tmpPoints[h*e][2],a[4+n]=h,a[5+n]=this._tmpPoints[h*e+1][0],a[6+n]=this._tmpPoints[h*e+1][1],a[7+n]=this._tmpPoints[h*e+1][2];return this._aroundVerticesTexture.setData(s,r,a),w.set(this._aroundVerticesTextureSize,s,r),!0},_loadShaders:function(){return this.inherited(arguments),this._material||(this._material=new c({pushState:this._pushState.bind(this),restoreState:this._restoreState.bind(this),gl:this._gl,viewingMode:this._view.viewingMode,shaderSnippets:this._shaderSnippets})),this._material.loadShaders(this._hasTimeInfo)},_initColourMap:function(){this._colourMapTexture||(this._colourMapTexture=this._gl.createTexture());var i=new Image;i.src=_.spriteImg;var e=this;return i.onload=function(){var t=e._gl.getParameter(e._gl.TEXTURE_BINDING_2D);e._gl.bindTexture(3553,e._colourMapTexture),e._gl.pixelStorei(37440,!0),e._gl.texParameteri(3553,10240,9728),e._gl.texParameteri(3553,10241,9728),e._gl.texParameteri(3553,10242,33071),e._gl.texParameteri(3553,10243,33071),e._gl.texImage2D(3553,0,6408,6408,5121,i),e._gl.generateMipmap(3553),e._gl.bindTexture(3553,t)},0===this._gl.getError()},_initColorBar:function(){if(!this._colorBarDirty)return!0;this._colorBarTexture||(this._colorBarTexture=this._gl.createTexture());var i=this._gl.getParameter(32873);this._gl.bindTexture(3553,this._colorBarTexture),this._gl.pixelStorei(37440,!0),this._gl.texParameteri(3553,10240,9728),this._gl.texParameteri(3553,10241,9728),this._gl.texParameteri(3553,10242,33071),this._gl.texParameteri(3553,10243,33071);var e=_.createColorBarTexture(32,1,this.renderingInfo.haloColors);return this._gl.texImage2D(3553,0,6408,6408,5121,e),this._gl.generateMipmap(3553),this._gl.bindTexture(3553,i),0===this._gl.getError()},render:function(i,e){this.inherited(arguments),this._layer.visible&&this.ready&&this._bindPramsReady()&&(this._hasSentReady||(this._layer.emit("fx3d-ready"),this._hasSentReady=!0),this._hasTimeInfo?this._renderWithTimeInfo(i,e):this._renderWithoutTimeInfo(i,e))},_renderWithTimeInfo:function(e,t){this._material.bind(i.mixin({},{pi:this._vizFieldVerTextures[this._vizFields[this._currentVizPage]],ll:this._vizFieldVerTextureSize,pl:this._colourMapTexture,ss:this.renderingInfo.animationInterval,op:this.renderingInfo.transparency,im:this._vizFieldMinMaxs[this._vizFieldDefault].min>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min?this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min:this._vizFieldMinMaxs[this._vizFieldDefault].min,ie:this._vizFieldMinMaxs[this._vizFieldDefault].max>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max?this._vizFieldMinMaxs[this._vizFieldDefault].max:this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max,li:this._colorBarTexture,is:[this._scopes.radius[0],this.renderingInfo.radius,this.renderingInfo.dashHeight]},e)),D=Math.floor(this.time/this.renderingInfo.animationInterval),this._repeatCount=Math.floor(D/this._timeAwareFids.length),D%=this._timeAwareFids.length,this._repeatCount>this.renderingInfo.repeat&&(D=this._timeAwareFids.length-1),D!=C&&(0==(1&D)?(v=this._cachedPulses[this._timeAwareFids[f++]],this._pulseVBO.addData(!0,v.vertices),N=f-1):f>0&&(m=this._cachedFlyPaths[this._timeAwareFids[f-1]],this._vbo.addData(!1,m.vertices),this._ibo.addData(!1,m.indices),N=-1),C=D),this._material.bindBoolean("drawFlyPath",!1),this._material.bindFloat("currentIndex",N),this._material.blend(!0,t),this._pulseVBO.bind(this._material.getProgram()),this._gl.drawArrays(0,0,this._pulseVBO.getNum()),this._pulseVBO.unbind(),1==(1&D)&&(this._material.bindBoolean("drawFlyPath",!0),this._material.blend(!1,t),this._vbo.bind(this._material.getProgram()),this._ibo.bind(),this._gl.drawElements(1,this._ibo.getNum(),5125,0),this._ibo.unbind(),this._vbo.unbind()),this._material.release()},_localPulseBinds:function(){this._pulseVBO.bind(this._material._program),this._vertexBufferLayout.enableVertexAttribArrays(this._gl,this._material._program)},_bindPulseBuffer:function(){this._pulseVAO?(this._pulseVAO._initialized||this._pulseVAO.initialize(this._localPulseBinds.bind(this)),this._pulseVAO.bind()):this._localPulseBinds()},_unBindPulseBuffer:function(){this._pulseVAO?this._pulseVAO.unbind():(this._pulseVBO.unbind(),this._vertexBufferLayout.disableVertexAttribArrays(this._gl,this._material._program))},_renderWithoutTimeInfo:function(e,t){this._material.bind(i.mixin({},{pi:this._vizFieldVerTextures[this._vizFields[this._currentVizPage]],ll:this._vizFieldVerTextureSize,pl:this._colourMapTexture,ss:this.renderingInfo.animationInterval,op:this.renderingInfo.transparency,im:this._vizFieldMinMaxs[this._vizFieldDefault].min>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min?this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min:this._vizFieldMinMaxs[this._vizFieldDefault].min,ie:this._vizFieldMinMaxs[this._vizFieldDefault].max>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max?this._vizFieldMinMaxs[this._vizFieldDefault].max:this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max,li:this._colorBarTexture,is:[this._scopes.radius[0],this.renderingInfo.radius,this.renderingInfo.dashHeight]},e),t),this._material.blend(!0,t),this._bindPulseBuffer(),this._gl.drawArrays(0,0,this._pulseVBO.getNum()),this._material.release(t),this._unBindPulseBuffer()}});return S});