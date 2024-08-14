import com.yungouos.pay.common.PayException;
import com.yungouos.pay.entity.BizParams;
import com.yungouos.pay.entity.CodePayBiz;
import com.yungouos.pay.merge.MergePay;

public class MergePayTest {

    public static void main(String[] args) {
        try {
            String mch_id = "聚合支付商户号";
            String key = "聚合支付密钥";
            String out_trade_no = System.currentTimeMillis() + "";
            String total_fee = "0.01";
            String body = "一码付测试";
            String app_id = "应用APPID";
            String auth_code = "条码";
            String receipt = null;
            String attach = null;
            String notify_url = null;
            String return_url = null;
            BizParams bizParams = null;
            String url = MergePay.nativePay(out_trade_no, total_fee, mch_id, body, "2", attach, notify_url, return_url, null, null, null,null, key);
            System.out.println(url);
            CodePayBiz codePayBiz = MergePay.codePay(out_trade_no, total_fee, mch_id, body, app_id, auth_code, receipt, attach, notify_url, bizParams, key);
            System.out.println(codePayBiz.toString());
        } catch (PayException e) {
            e.printStackTrace();
        }
    }
}
