{
    'name': 'Discount Limit',
    'sequence': 1,
    'version': '16.0.1.0.0',
    'depends': ['base', 'sale', 'point_of_sale'],

    'data':  [
              'views/discount_limit.xml',
              ],
    'assets': {
       'point_of_sale.assets': [
           'pos_discount_limit/static/src/js/discount_limit.js',
           'pos_discount_limit/static/src/xml/pos_discount_limit.xml',
       ],
    },

    'installable': True,
    'application': True,
    'auto_install': False,

}