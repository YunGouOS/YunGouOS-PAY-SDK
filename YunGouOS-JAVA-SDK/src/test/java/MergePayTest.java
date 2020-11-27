import com.yungouos.pay.common.PayException;
import com.yungouos.pay.merge.MergePay;

public class MergePayTest {

	public static void main(String[] args) {
		try {
			String mchId = "100100007911";
			String key = "891C491DAE794C74B630940C994BE711";
			String url = MergePay.nativePay(System.currentTimeMillis() + "", "0.01", mchId, "一码付测试", "2", null, null, null, null, null, null, key);
			System.out.println(url);
		} catch (PayException e) {
			e.printStackTrace();
		}
	}
}
