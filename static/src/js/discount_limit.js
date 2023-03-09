//console.log('hh')
//odoo.define('pos_discount_limit.pos', function(require) {
//    'use strict';
//
//    const NumpadWidget = require('point_of_sale.NumpadWidget');
//    const Registries = require('point_of_sale.Registries');
//    var rpc=require('web.rpc');
//    var disc = " ";
//
//
//    const discount_limit_amount = (NumpadWidget)=>class extends NumpadWidget {
//        async sendInput(key)  {
//            this.trigger('numpad-click-input', { key });
//            disc += key
//            var apply_disc = parseInt(disc)
//            console.log(apply_disc,'apply_disc')
//            console.log(this.env.pos.selectedOrder.selected_orderline.cid,'cccccccccccccccccccccccc')
//            console.log(this.env.pos.selectedOrder.selected_orderline.discountStr,'llllllllllllllllllllllll')
//            console.log(this.env.pos.selectedOrder.selected_orderline.discount,'mmmmmmmmmmmmmmmmmmmm')
//            var self=this;
//            console.log(key,'kyugtrdestdyupoiiudfoip');
//
//            var discount=this.props.activeMode
//            console.log(this,'proopss')
////            if(discount!=='quantity'){
//
//            if(discount){
//                console.log(this.env.pos.config.discount_limit,'ooooooooooooooooooo')
//
//
//                var category_value=0;
//                await rpc.query({
//                model:"pos.config",
//                method:"get_category_ids",
//                args:[0]
//                }).then(function(result){
//                    category_value=result
//                    console.log(result,'cate')
//
//                    });
//
//                console.log(category_value,'oiiioo')
//
//                var custom_discount = this.env.pos.config.discount_limit
//
//                console.log(custom_discount ,'[[[[[[[[[[[[[[[[[[[[[[[')
//
//                var applied_discount = this.env.pos.selectedOrder.selected_orderline.discount
//                console.log(applied_discount ,'[poutr4567890-=')
//                var selected_order = this.env.pos.selectedOrder.selected_orderline
//                console.log(this.env.pos.selectedOrder.selected_orderline.discount,'0098654')
//                console.log(applied_discount,'0-08765')
//                console.log(category_value[0],':::::::::::::::::::::::::;')
//                console.log((this.env.pos.selectedOrder.selected_orderline.product.pos_categ_id[0]),'llllll')
//
//                var displayed_category = this.env.pos.selectedOrder.selected_orderline.product.pos_categ_id[0]
//
//                console.log(displayed_category ,'///////////////////')
//
//                if (category_value.includes(displayed_category)){
//                    if (apply_disc > custom_discount){
//                        this.env.pos.selectedOrder.selected_orderline.set_discount(custom_discount);
//                        console.log(this.env.pos.selectedOrder.selected_orderline.set_discount(custom_discount),'==========')
//                        self.showPopup('ErrorPopup', {
//                            title : "Discount is not valid",
//                            body  : "enter discount less than  "+custom_discount
//                        });
//                        disc = " "
//                        console.log("aaaabbbbbbbbbbbbbbbbb",this.env.pos.selectedOrder.selected_orderline)
////                        this.env.pos.selectedOrder.selected_orderline.set_discount(custom_discount);
//                        return ;
//                    }
//
//                    console.log('888888888888888888')
//                }
//                if (!category_value.includes(displayed_category)){
//                    disc = " "
//                }
//
//
//
//            }
////            console.log(this,'............................')
//            }
//            };
//
//            Registries.Component.extend(NumpadWidget ,discount_limit_amount);
//            return NumpadWidget;
//            });


console.log('hh')
odoo.define('pos_discount_limit.pos', function(require) {


    'use strict';

    const ProductScreen = require('point_of_sale.ProductScreen');
    const Registries = require('point_of_sale.Registries');
    var rpc=require('web.rpc');

    const discount_limit_amount = (ProductScreen)=>class extends ProductScreen {
    async _onClickPay()  {
    var self=this;


                var category_value=0;
                var custom_discount = this.env.pos.config.discount_limit
                await rpc.query({
                model:"pos.config",
                method:"get_category_ids",
                args:[0]
                }).then(function(result){
                    category_value=result
                    console.log(result,'cate')

                    });

                console.log(this.env.pos,'oiiioo')
                console.log(category_value,'55555555555555555555555')
                var check=0
                var product=[]

//                var discount_category = this.env.pos.selectedOrder.orderlines
//                console.log(displayed_category ,'displayed_category')

                   $.each(this.env.pos.selectedOrder.orderlines,function(index,name){
                   console.log(name.product.pos_categ_id[0],'ppppppppppppppp')
                   console.log(name.discount,'00000000000000')
                   if (category_value.includes(name.product.pos_categ_id[0])){
                    const sum = name.discount+name.discount
                    if (sum > custom_discount){
                        check=1
                        product.push(name.product.pos_categ_id[1])
                   }
}
})
                if (check==1){

                   self.showPopup('ErrorPopup', {
                            title : "Discount is not valid",
                            body  : "enter discount less than  "+custom_discount +"% for the product "+product[0]
                        });
                        }
                else{
                super._onClickPay()
                }
                }}
            Registries.Component.extend(ProductScreen ,discount_limit_amount);
            return ProductScreen;
            });
