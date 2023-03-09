from ast import literal_eval


from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class DiscountLimit(models.TransientModel):
    _inherit = 'res.config.settings'

    discount_limit = fields.Boolean(string='Discount Limit')
    discount_limit_amount = fields.Integer(string='Discount', default=10,related="pos_config_id.discount_limit",readonly=False,store=True)
    category_ids = fields.Many2many('pos.category', 'catg_rel', 'catg_id', 'catg_us', string='Category')


    @api.constrains('discount_limit_amount')
    def _check_value(self):
        if self.discount_limit_amount > 100 or self.discount_limit_amount < 0:
            raise ValidationError(_('Enter Value Between 0-100'))

    def set_values(self):
        res1 = super(DiscountLimit, self).set_values()
        self.env['ir.config_parameter'].sudo().set_param('pos_discount_limit.discount_limit', self.discount_limit),
        self.env['ir.config_parameter'].sudo().set_param('pos_discount_limit.discount_limit_amount', self.discount_limit_amount),
        self.env['ir.config_parameter'].sudo().set_param('pos_discount_limit.category_ids', self.category_ids.ids)
        print(res1,"set")
        return res1

    @api.model
    def get_values(self):
        res = super(DiscountLimit, self).get_values()
        get_param = self.env['ir.config_parameter'].sudo().get_param
        values = self.env['ir.config_parameter'].sudo()
        category = values.get_param('pos_discount_limit.category_ids')
        res.update(
            discount_limit=get_param('pos_discount_limit.discount_limit'),
            discount_limit_amount=get_param('pos_discount_limit.discount_limit_amount'),

            category_ids=[(6, 0, literal_eval(category))] if category else False,)
        print("get",res)
        return res

    class PosSession(models.Model):
        _inherit = 'pos.config'

        discount_limit = fields.Integer()


        def get_category_ids(self):
            res=self.env['ir.config_parameter'].sudo().get_param('pos_discount_limit.category_ids')
            print(res,'kjn')
            return eval(res)
