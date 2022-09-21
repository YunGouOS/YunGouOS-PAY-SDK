import com.yungouos.pay.entity.batchpay.AccountBiz;
import com.yungouos.pay.entity.batchpay.BatchPayBiz;
import com.yungouos.pay.entity.batchpay.BatchPayInfoBiz;
import com.yungouos.pay.finance.Finance;

import java.util.ArrayList;
import java.util.List;

/**
 * 批量转账调用演示
 *
 * @author YunGouOS技术部-029
 */
public class BatchPayTest {
    public static void main(String[] args) {
        // 批量转账商户号，登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
        String mch_id = "批量转账商户号";
        // 商户密钥
        String key = "商户密钥";
        // 异步回调地址
        String notify_url = "http://www.baidu.com";
        // 同步回调地址
        String return_url = "http://www.baidu.com";
        String out_trade_no = System.currentTimeMillis() + "";
        String pay_type = "alipay";
        String order_title = "这是标题";
        String time_expire = null;
        String description = "这是描述";
        List<AccountBiz> repay_order_list = new ArrayList<AccountBiz>();
        AccountBiz accountBiz = new AccountBiz();
        accountBiz.setAccount("支付宝账号");
        accountBiz.setAccount_name("支付宝实名名称");
        accountBiz.setMoney("转账金额");
        repay_order_list.add(accountBiz);

        /**
         * 批量转账下单
         */
        BatchPayBiz batchPayBiz = Finance.batchPayCreate(out_trade_no, mch_id, repay_order_list, pay_type, order_title, time_expire, description, notify_url, return_url, key);
        System.out.println("批量转账下单成功-》" + batchPayBiz.toString());
        /**
         * 确认批量转账
         */
        String url = Finance.batchPaySendPay(out_trade_no, batchPayBiz.getBatchNo(), mch_id, "app", true, key);
        System.out.println("确认转账付款url-》" + url);

        /**
         * 查询批量转账
         */
        BatchPayInfoBiz batchPayInfoBiz = Finance.getBatchPayInfo(out_trade_no, batchPayBiz.getBatchNo(), mch_id, key);
        System.out.println("查询批量转账结果-》" + batchPayInfoBiz.toString());


        /**
         * 关闭批量转账(未支付之前可关闭)
         */
        Finance.batchPayClose(out_trade_no, batchPayBiz.getBatchNo(), mch_id, key);
    }
}
