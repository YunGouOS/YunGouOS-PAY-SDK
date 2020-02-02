import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.entity.RefundOrder;
import com.yungouos.pay.entity.RefundSearch;
import com.yungouos.pay.entity.WxBillInfoBiz;
import com.yungouos.pay.entity.WxDownloadBillBiz;
import com.yungouos.pay.entity.WxOauthInfo;
import com.yungouos.pay.entity.PayOrder;
import com.yungouos.pay.wxpay.WxPay;

/**
 *
 * 微信支付调用演示
 * 
 * @author YunGouOS技术部-029
 *
 */
public class WxPayTest {

	public static void main(String[] args) {

		String result;
		String mchId="1529637931";
		String key="6BA371F4CFAB4465AA04DAEADBAC4161";
		//收银台支付结束后返回地址
		String returnUrl="http://www.baidu.com";
		try {
			
			
			/**
			 * 下载对账单 正常直接通过getUrl获取到excel地址到浏览器访问下载即可
			 * 也可以通过getList获取到对账单的数据流集成到业务系统中
			 */
			WxDownloadBillBiz downloadBillBiz = WxPay.downloadBill(mchId, "2020-01-29", key);
			System.out.println("对账单excel地址："+downloadBillBiz.getUrl());
			System.out.println("对账单数据："+downloadBillBiz.getList().toString());
			System.out.println("对账单统计数据："+downloadBillBiz.getTotal().toString());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	
	}
}
