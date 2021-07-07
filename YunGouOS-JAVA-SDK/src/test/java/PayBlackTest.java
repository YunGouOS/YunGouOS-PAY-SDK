import com.yungouos.pay.black.PayBlack;

/**
 * 
 * 黑名单API调用演示
 *
 * @author YunGouOS技术部-029
 */
public class PayBlackTest {

	public static void main(String[] args) {
		String mchId = "1529637931";
		String key = "499F61DB734C4BF39792A098C44FA80A";
		String account="一般是openid或支付宝buyer_id";
		PayBlack.create(mchId, account, "羊毛党", "2021-06-25 11:10:23", key);
		System.out.println("黑名单添加成功");
		
		boolean check = PayBlack.check(mchId, account, key);
		System.out.println("是否黑名单："+check);
	}
}
