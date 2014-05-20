/*
 * File: app/view/proceduresList.js
 * Date: Thu Apr 26 2012 16:35:17 GMT+0200 (CEST)
 *
 * This file was generated by Ext Designer version 1.2.2.
 * http://www.sencha.com/products/designer/
 *
 * This file will be generated the first time you export.
 *
 * You should implement event handling and custom methods in this
 * class.
 */

Ext.define('istsos.view.proceduresList', {
    extend: 'istsos.view.ui.proceduresList',

    initComponent: function() {
        var me = this;
        Ext.create('istsos.store.gridProceduresList',{
            fields: [
                {
                    name: 'name',
                    sortType: 'asText',
                    type: 'string'
                },
                {
                    name: 'description',
                    sortType: 'asText',
                    type: 'string'
                },
                {
                    name: 'sensortype',
                    sortType: 'asText',
                    type: 'string'
                },
                {
                    name: 'offerings'
                },
                {
                    name: 'observedproperties'
                },
                {
                    name: 'samplingTime',
                    type: 'auto'
                },
                {
                    name: 'begin',
                    convert: function fullName(v, record){
                        return record.data.samplingTime.beginposition;
                    },
                    type: 'string'
                },
                {
                    name: 'end',
                    convert: function fullName(v, record){
                        return record.data.samplingTime.endposition;
                    },
                    type: 'string'
                }
            ]
        });
        me.callParent(arguments);
        
        
        Ext.getCmp("btnRemove").on("click",function(){
            var sm = this.getSelectionModel();
            var rec = sm.getSelection();
            if (rec.length==1) {
                
                var msg = '', deleteurl='';
                if (rec[0].get('sensortype')=='virtual'){
                    deleteurl=Ext.String.format('{0}/istsos/services/{1}/virtualprocedures/{2}', 
                        wa.url, this.istService, rec[0].get('name')
                    );
                    msg = "Are you sure you want to erase the virtual " +
                        "procedure and all of its python code?";
                }else{
                    deleteurl=Ext.String.format('{0}/istsos/services/{1}/procedures/{2}', 
                        wa.url, this.istService, rec[0].get('name')
                    );
                    msg = "Are you sure you want to erase the procedure and all of its observations?";
                }
                
                Ext.Msg.show({
                    title:'Erasing procedure',
                    msg: msg,
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(btn){
                        if (btn == 'yes'){
                            var sm = this.getSelectionModel();
                            var rec = sm.getSelection();
                            if (Ext.isEmpty(this.mask)) {
                                this.mask = new Ext.LoadMask(this.body, {
                                    msg:"Please wait..."
                                });
                            }
                            this.mask.show();
                            Ext.Ajax.request({
                                url: deleteurl,
                                scope: this,
                                method: "DELETE",
                                success: function(response){
                                    Ext.Ajax.request({
                                        url: Ext.String.format('{0}/istsos/services/{1}/procedures/operations/getlist', wa.url,this.istService),
                                        scope: this,
                                        method: "GET",
                                        success: function(response){
                                            var json = Ext.decode(response.responseText);
                                            if (json.success) {
                                                this.getStore().loadData(json.data);
                                            }
                                            this.mask.hide();
                                        }
                                    });
                                },
                                failure: function(){
                                    
                                }
                            });      
                        }
                    },
                    scope: this
                });       
            }
        },this);
        
        this.columns[0].renderer = function(value, p, record){
            var func=Ext.String.format("istsos.engine.pageManager.openPage({" + 
                "istTitle: 'Edit procedure', " +
                "istBody: ['istsos.view.procedure'], " +
                "istFooter: istsos.SUBMIT, " +
                "istService: '{0}'," + 
                "istProcedure: '{1}'," + 
                "istFunction: { " +
                "   onLoad: 'executeGet'," +
                "   onSubmit: 'executePut'" +
                "}" +
                "})",
                this.istService,value);
            return Ext.String.format('<span class="softLink" onclick="{0}">{1}</span>',func,value);
        }
        this.columns[3].renderer = function(value, p, record){
            var ret = [];
            for (var i = 0; i < value.length; i++) {
                //var s = Ext.String.format('<span class="softLink" onclick="alert(\'load editor for: '+value[i]+'\')">{0}</span>',value[i]);
                var s = Ext.String.format('{0}',value[i]);
                ret.push(s);
            }  
            return ret.join(",&nbsp;")
        };
        this.columns[4].renderer = function(value, p, record){
            var ret = [];
            for (var i = 0; i < value.length; i++) {
                var v = value[i]['name'].split(':');
                var s = Ext.String.format('{0} [{1}]',v[v.length-1],value[i]['uom']);
                ret.push(s);
            }  
            return ret.join(",&nbsp;")
        };
        /*this.columns[5].renderer = function(value, p, record){
            return value['beginposition'];
        };
        this.columns[6].renderer = function(value, p, record){
            return value['endposition'];
        };*/
    },
    operationLoad: function(){
        if (Ext.isEmpty(this.mask)) {
            this.mask = new Ext.LoadMask(this.body, {
                msg:"Please wait..."
            });
        }
        this.mask.show();
        Ext.Ajax.request({
            url: Ext.String.format('{0}/istsos/services/{1}/procedures/operations/getlist', wa.url,this.istService),
            scope: this,
            method: "GET",
            success: function(response){
                var json = Ext.decode(response.responseText);
                if (json.success) {
                    this.istForm.getStore().loadData(json.data);
                }
                this.mask.hide();
            }
        });
    }
});