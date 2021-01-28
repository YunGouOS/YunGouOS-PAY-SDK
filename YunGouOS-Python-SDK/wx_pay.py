"""

Written by: Jack Lee
Time: 2020/11/11 17:09

Function: YunGouOS 微信个人支付API Python版实现

"""
from .utils import remove_empty, key_sort

from urllib.parse import urlencode

import hashlib
import requests
import json


class PaySign(object):

    def get_sign(self, params_dict, key):
        """
        获得支付签名
        :param params_dict: 需要签名的参数字典
        :param key:  商户密钥
        :return [str]: 返回生成的签名字符串
        """
        # 去除字典中的空值
        params_dict = remove_empty(params_dict)
        if params_dict.get('sign'):
            params_dict.pop('sign')

        # 按字典键名排序
        params_dict = key_sort(params_dict)
        # 生成"xx=xx&xx=xx"格式
        # print(params_dict)
        # params_str = urlencode(params_dict) + "&key=" + key
        params_str = "&".join(
            f'{key}={params_dict[key]}' for key in params_dict.keys()) + "&key=" + key
        md5 = hashlib.md5()
        md5.update(params_str.encode('utf-8'))
        # print(params_str)
        # print(params_str.encode('utf-8'))
        # print(md5.update(params_str.encode('utf-8')))
        sign = md5.hexdigest().upper()  # 加密转换为大写
        return sign

    def check_sign(self, params_dict, key):
        """
        验证签名
        :param params_dict:  需要验证签名的字典参数
        :param key: 支付密钥
        :return [Boolean]: 返回签名是否正确
        """

        sign = self.get_sign(params_dict, key)
        if sign == params_dict['sign']:
            return True
        else:
            return False

    def check_notify_sign(self, post, key):
        """
        验证回调签名
        :param post: 回调的post对象
        :param key:  支付密钥
        :return [Boolean]: 签名是否正确
        """

        try:
            if not post:
                raise Exception('POST对象不能为空')

            sign = post.get('sign')
            if not sign:
                raise Exception('POST中未获取到sign')

            code = post.get('code')
            order_no = post.get('orderNo')
            out_trade_no = post.get('outTradeNo')
            pay_no = post.get('payNo')
            money = post.get('money')
            mch_id = post.get('mchId')
            params_dict = {
                'code': code,
                'orderNo': order_no,
                'outTradeNo': out_trade_no,
                'payNo': pay_no,
                'money': money,
                'mchId': mch_id
            }

            resign = self.get_sign(params_dict, key)
            if sign == resign:
                # return True
                return json.dumps({
                    'sign_matched': True,
                    'money': money
                })
        except Exception:
            raise

        return False


class WxPay(object):

    def cashierPay(self, out_trade_no=None, total_fee=None,
                   mch_id=None, body=None, attach=None,
                   notify_url=None, return_url=None, config_no=None,
                   auto=None, auto_code=None, key=None):
        result = None
        params_dict = {}
        try:
            if not out_trade_no:
                raise Exception('订单号不能为空')
            if not total_fee:
                raise Exception('付款金额不能为空')
            if not mch_id:
                raise Exception('商户号不能为空')
            if not body:
                raise Exception('商品描述不能为空')
            if not key:
                raise Exception('商品密钥不能为空')
            params_dict['out_trade_no'] = out_trade_no
            params_dict['total_fee'] = total_fee
            params_dict['mch_id'] = mch_id
            params_dict['body'] = body
            # 上述必传参数签名
            pay_sign = PaySign()
            sign = pay_sign.get_sign(params_dict, key)
            # print(sign)
            # 下面参数不参与签名，但是接口需要这些参数
            if attach:
                params_dict['attach'] = attach
            if notify_url:
                params_dict['notify_url'] = notify_url
            if return_url:
                params_dict['return_url'] = return_url
            if config_no:
                params_dict['config_no'] = config_no
            if auto:
                params_dict['auto'] = auto
            if auto_code:
                params_dict['auto_code'] = auto_code

            params_dict['sign'] = sign
            # 发起POST请求
            resp = requests.request(
                'post',
                'https://api.pay.yungouos.com/api/pay/wxpay/cashierPay',
                data=params_dict).text
            if not resp:
                raise Exception('API接口返回为空')
            ret = json.loads(resp)
            if not ret:
                raise Exception('API接口返回为空')
            code = ret['code']
            if code != 0:
                raise Exception(ret['msg'])
            result = ret['data']
            return result
        except Exception:
            raise
