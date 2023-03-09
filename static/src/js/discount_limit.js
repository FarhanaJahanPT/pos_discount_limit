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
