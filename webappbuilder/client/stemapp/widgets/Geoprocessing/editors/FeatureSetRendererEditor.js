///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define(['dojo/_base/declare',
  'dojo/_base/array',
  'esri/renderers/jsonUtils',
  'jimu/dijit/RendererChooser',
  '../BaseEditor',
  './simpleEditors'
],
function(declare, array, rendererUtils, RendererChooser, BaseEditor, simpleEditors) {
  var clazz = declare([BaseEditor], {

    baseClass: 'jimu-gp-editor-base jimu-gp-editor-fsre',
    editorName: 'FeatureSetRendererEditor',

    postCreate: function(){
      this.inherited(arguments);
      var o = {};
      if(this.param.renderer){
        o.renderer = rendererUtils.fromJson(this.param.renderer);
      }else{
        o.type = this._getSymbolType();
        if(!o.type){
          var unsupportEditor = new simpleEditors.UnsupportEditor({
            message: this.nls.unSupportGeometryType
          });
          unsupportEditor.placeAt(this.domNode);
          return;
        }
      }
      o.fields = array.map(this.param.defaultValue.fields, function(field){
        return field.name;
      });

      this.renderer = new RendererChooser(o);
      this.renderer.placeAt(this.domNode);
      this.renderer.startup();
    },

    getValue: function(){
      if(this.renderer){
        return {
          renderer: this.renderer.getRenderer().toJson()
        };
      }else{
        return null;
      }
    },

    _getSymbolType: function(){
      switch(this.param.defaultValue.geometryType){
        case 'esriGeometryPoint':
        case 'esriGeometryMultipoint':
          return 'marker';
        case 'esriGeometryPolyline':
          return 'line';
        case 'esriGeometryPolygon':
          return 'fill';
      }
    }
  });
  return clazz;
});
