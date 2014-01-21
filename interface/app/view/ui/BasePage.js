/*
 * File: app/view/ui/BasePage.js
 * Date: Mon Jan 20 2014 12:08:14 GMT+0100 (CET)
 *
 * This file was generated by Ext Designer version 1.2.3.
 * http://www.sencha.com/products/designer/
 *
 * This file will be auto-generated each and everytime you export.
 *
 * Do NOT hand edit this file.
 */

Ext.define('istsos.view.ui.BasePage', {
    extend: 'Ext.panel.Panel',

    border: 0,
    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    hidden: true,
                    layout: {
                        type: 'fit'
                    },
                    bodyBorder: true,
                    bodyCls: 'centerTitle',
                    bodyPadding: '8px',
                    region: 'north'
                },
                {
                    xtype: 'panel',
                    border: 0,
                    styleHtmlContent: true,
                    autoScroll: true,
                    layout: {
                        type: 'anchor'
                    },
                    bodyBorder: true,
                    bodyCls: 'centerBody',
                    region: 'center'
                },
                {
                    xtype: 'panel',
                    border: 0,
                    height: 20,
                    hidden: true,
                    bodyPadding: '8px',
                    region: 'south'
                }
            ]
        });

        me.callParent(arguments);
    }
});