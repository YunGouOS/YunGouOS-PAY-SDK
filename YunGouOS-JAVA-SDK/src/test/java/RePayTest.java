import com.yungouos.pay.entity.RePayBiz;
import com.yungouos.pay.finance.Finance;

/**
 * 
 * 转账业务demo
 * 
 * @author YunGouOS技术部-029
 *
 *
 */
public class RePayTest {

	public static void main(String[] args) {
		String merchant_id = "商户号";// YunGouOS商户ID 登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
		String key = "商户密钥";// 商户密钥 登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥

		String out_trade_no = System.currentTimeMillis() + "";
		String account = "收款人openid";
		String account_name = "";
		String money = "0.01";
		String desc = "这是转账描述";
		String mch_id = null;

		RePayBiz rePayBiz = Finance.rePayWxPay(merchant_id, out_trade_no, account, account_name, money, desc, mch_id, key);
		System.out.println(rePayBiz.toString());

		account = "收款支付宝账户";
		account_name = "支付宝姓名";
		RePayBiz payAliPay = Finance.rePayAliPay(merchant_id, out_trade_no, account, account_name, money, desc, mch_id, key);
		System.out.println(payAliPay.toString());
	}
}
