import com.yungouos.pay.entity.PayOrder;
import com.yungouos.pay.order.SystemOrder;

/**
 * 
 * 订单接口调用演示
 * 
 * @author YunGouOS技术部-029
 *
 */
public class OrderTest {

	public static void main(String[] args) {
		
		try {
			// 商户号可以是支付宝也可以是微信
			String mch_id = "2088802674000755";
			// 商户密钥
			String key = "6BA371F4CFAB4465AA04DAEADBAC4161";
			PayOrder payOrder = SystemOrder.getOrderInfoByOutTradeNo("Y194506551713811", mch_id, key);
			System.out.println("查询系统订单返回结果："+payOrder);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
