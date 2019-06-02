<?php
/* *
 * 功能：YunGouOS支付接口演示
 * 修改日期：2019-06-02
 * 说明：
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 */
?>
<!DOCTYPE html>
<html>
<head>
    <title>YunGouOS支付接口演示</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
    <meta name="format-detection" content="telephone=no,email=no,date=no,address=no">
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        ul, ol {
            list-style: none;
        }

        body {
            font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        }

        .tab-head {
            margin-left: 120px;
            margin-bottom: 10px;
        }

        .tab-content {
            clear: left;
            display: none;
        }

        h2 {
            border-bottom: solid #00ae47 2px;
            width: 200px;
            height: 50px;
            line-height: 50px;
            margin: 0;
            float: left;
            text-align: center;
            font-size: 16px;
        }

        .selected {
            color: #FFFFFF;
            background-color: #00ae47;
        }

        .show {
            clear: left;
            display: block;
        }

        .hidden {
            display: none;
        }

        .new-btn-login-sp {
            padding: 1px;
            display: inline-block;
            width: 75%;
            padding-bottom: 30px;
        }

        .new-btn-login {
            background-color: #00ae47;
            color: #FFFFFF;
            font-weight: bold;
            border: none;
            width: 100%;
            height: 45px;
            border-radius: 5px;
            font-size: 16px;
        }

        #main {
            width: 100%;
            margin: 0 auto;
            font-size: 14px;
        }

        .red-star {
            color: #f00;
            width: 10px;
            display: inline-block;
        }

        .null-star {
            color: #fff;
        }

        .content {
            margin-top: 5px;
        }

        .content dt {
            width: 200px;
            display: inline-block;
            float: left;
            margin-left: 20px;
            color: #666;
            font-size: 13px;
            margin-top: 8px;
        }

        .content dd {
            margin-left: 120px;
            margin-bottom: 5px;
        }

        .content dd input {
            width: 85%;
            height: 28px;
            border: 0;
            -webkit-border-radius: 0;
            -webkit-appearance: none;
        }

        #foot {
            margin: 15px;
            width: 100%;
        }

        .foot-ul {
            width: 100%;
        }

        .foot-ul li {
            width: 100%;
            text-align: center;
            color: #666;
        }

        .note-help {
            color: #999999;
            font-size: 12px;
            line-height: 130%;
            margin-top: 5px;
            width: 100%;
            display: block;
        }

        #btn-dd {
            margin: 20px;
            text-align: center;
        }

        .foot-ul {
            width: 100%;
        }

        .one_line {
            display: block;
            height: 1px;
            border: 0;
            border-top: 1px solid #eeeeee;
            width: 100%;
            margin-left: 20px;
        }

        .am-header {
            display: -webkit-box;
            display: -ms-flexbox;
            display: box;
            width: 100%;
            position: relative;
            padding: 7px 0;
            -webkit-box-sizing: border-box;
            -ms-box-sizing: border-box;
            box-sizing: border-box;
            background: #1D222D;
            height: 50px;
            text-align: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            box-pack: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            box-align: center;
        }

        .am-header h1 {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            box-flex: 1;
            line-height: 18px;
            text-align: center;
            font-size: 18px;
            font-weight: 300;
            color: #fff;
        }
    </style>
</head>
<body text=#000000 bgColor="#ffffff" leftMargin=0 topMargin=4>
<header class="am-header">
    <h1>YunGouOS支付接口演示页</h1>
</header>
<div id="main">
    <div id="tabhead" class="tab-head">
        <h2 id="tab1" class="selected" name="tab">扫码支付</h2>
        <h2 id="tab2" name="tab">收银台支付</h2>
        <h2 id="tab3" name="tab">JSAPI支付</h2>
    </div>
    <form name=alipayment action=payController.php method=post target="_blank">
        <div id="body1" class="show" name="divcontent">
            <input type="hidden" name="apitype" value="native">
            <dl class="content">
                <dt>商户订单号
                    ：
                </dt>
                <dd>
                    <input id="out_trade_no" name="out_trade_no" value="<?php echo time()?>"/>
                </dd>
                <hr class="one_line">
                <dt>付款金额
                    ：
                </dt>
                <dd>
                    <input id="total_fee" name="total_fee" value="0.01"/>
                </dd>
                <hr class="one_line">
                <dt>微信支付商户号
                    ：
                </dt>
                <dd>
                    <input id="mch_id" name="mch_id" value="1529637931"/>
                </dd>
                <hr class="one_line">
                <dt>商品描述
                    ：
                </dt>
                <dd>
                    <input id="body" name="body" value="扫码支付演示"/>
                </dd>
                <hr class="one_line">
                <dt>返回类型
                    ：
                </dt>
                <dd>
                    <input id="type" name="type" value="2"/>
                </dd>
                <hr class="one_line">
                <dt>附加数据
                    ：
                </dt>
                <dd>
                    <input id="attach" name="attach" value="我是附加数据"/>
                </dd>
                <hr class="one_line">
                <dt>异步回调地址
                    ：
                </dt>
                <dd>
                    <input id="notify_url" name="notify_url" value="http://127.0.0.1/demo/notify.php"/>
                </dd>
                <hr class="one_line">
                <dt>同步回调地址
                    ：
                </dt>
                <dd>
                    <input id="return_url" name="return_url" value="http://127.0.0.1/demo/return.php"/>
                </dd>
                <hr class="one_line">
                <dt>微信支付商户密钥
                    ：
                </dt>
                <dd>
                    <input id="key" name="key" value="6BA371F4CFAB4465AA04DAEADBAC4161"/>
                </dd>
                <hr class="one_line">
                <dt></dt>
                <dd id="btn-dd">
                        <span class="new-btn-login-sp">
                            <button class="new-btn-login" type="submit" style="text-align:center;">发起支付</button>
                        </span>
                    <span class="note-help">如果您点击“发起支付”按钮，即表示您同意该次的执行操作。</span>
                </dd>
            </dl>
        </div>
    </form>
    <form action="payController.php" method="post">
        <div id="body2" class="tab-content" name="divcontent">
            <input type="hidden" name="apitype" value="cashier">
            <dl class="content">
                <dt>商户订单号
                    ：
                </dt>
                <dd>
                    <input id="out_trade_no" name="out_trade_no" value="<?php echo time()?>"/>
                </dd>
                <hr class="one_line">
                <dt>付款金额
                    ：
                </dt>
                <dd>
                    <input id="total_fee" name="total_fee" value="0.01"/>
                </dd>
                <hr class="one_line">
                <dt>微信支付商户号
                    ：
                </dt>
                <dd>
                    <input id="mch_id" name="mch_id" value="1529637931"/>
                </dd>
                <hr class="one_line">
                <dt>商品描述
                    ：
                </dt>
                <dd>
                    <input id="body" name="body" value="收银台支付演示"/>
                </dd>
                <hr class="one_line">
                <dt>附加数据
                    ：
                </dt>
                <dd>
                    <input id="attach" name="attach" value="我是附加数据"/>
                </dd>
                <hr class="one_line">
                <dt>异步回调地址
                    ：
                </dt>
                <dd>
                    <input id="notify_url" name="notify_url" value="http://127.0.0.1/demo/notify.php"/>
                </dd>
                <hr class="one_line">
                <dt>同步回调地址
                    ：
                </dt>
                <dd>
                    <input id="return_url" name="return_url" value="http://127.0.0.1/demo/return.php"/>
                </dd>
                <hr class="one_line">
                <dt>微信支付商户密钥
                    ：
                </dt>
                <dd>
                    <input id="key" name="key" value="6BA371F4CFAB4465AA04DAEADBAC4161"/>
                </dd>
                <hr class="one_line">
                <dt></dt>
                <dd id="btn-dd">
                        <span class="new-btn-login-sp">
                            <button class="new-btn-login" type="submit" style="text-align:center;">发起支付</button>
                        </span>
                    <span class="note-help">如果您点击“发起支付”按钮，即表示您同意该次的执行操作。</span>
                </dd>
            </dl>
        </div>
    </form>
    <form action="payController.php" method="post">
        <div id="body3" class="tab-content" name="divcontent">
            <input type="hidden" name="apitype" value="jsapi">
            <dl class="content">
                <dt>商户订单号
                    ：
                </dt>
                <dd>
                    <input id="out_trade_no" name="out_trade_no" value="<?php echo time()?>"/>
                </dd>
                <hr class="one_line">
                <dt>付款金额
                    ：
                </dt>
                <dd>
                    <input id="total_fee" name="total_fee" value="0.01"/>
                </dd>
                <hr class="one_line">
                <dt>微信支付商户号
                    ：
                </dt>
                <dd>
                    <input id="mch_id" name="mch_id" value="1529637931"/>
                </dd>
                <hr class="one_line">
                <dt>商品描述
                    ：
                </dt>
                <dd>
                    <input id="body" name="body" value="JSAPI支付演示"/>
                </dd>
                <hr class="one_line">
                <dt>附加数据
                    ：
                </dt>
                <dd>
                    <input id="attach" name="attach" value="我是附加数据"/>
                </dd>
                <hr class="one_line">
                <dt>异步回调地址
                    ：
                </dt>
                <dd>
                    <input id="notify_url" name="notify_url" value="http://127.0.0.1/demo/notify.php"/>
                </dd>
                <hr class="one_line">
                <dt>同步回调地址
                    ：
                </dt>
                <dd>
                    <input id="return_url" name="return_url" value="http://127.0.0.1/demo/return.php"/>
                </dd>
                <hr class="one_line">
                <dt>授权结束回调地址
                    ：
                </dt>
                <dd>
                    <input id="callback_url" name="callback_url" value="http://127.0.0.1/demo/oauth.php?a=1"/>
                </dd>
                <hr class="one_line">
                <dt>微信支付商户密钥
                    ：
                </dt>
                <dd>
                    <input id="key" name="key" value="6BA371F4CFAB4465AA04DAEADBAC4161"/>
                </dd>
                <hr class="one_line">
                <dt></dt>
                <dd id="btn-dd">
                        <span class="new-btn-login-sp">
                            <button class="new-btn-login" type="submit" style="text-align:center;">发起支付</button>
                        </span>
                    <span class="note-help">如果您点击“发起支付”按钮，即表示您同意该次的执行操作。</span>
                </dd>
            </dl>

        </div>
    </form>
    <div id="foot">
        <ul class="foot-ul">
            <li>
                YunGouOS版权所有 2013-2019 YunGouOS.COM
            </li>
        </ul>
    </div>
</div>
</body>
<script language="javascript">
    var tabs = document.getElementsByName('tab');
    var contents = document.getElementsByName('divcontent');

    (function changeTab(tab) {
        for (var i = 0, len = tabs.length; i < len; i++) {
            tabs[i].onmouseover = showTab;
        }
    })();

    function showTab() {
        for (var i = 0, len = tabs.length; i < len; i++) {
            if (tabs[i] === this) {
                tabs[i].className = 'selected';
                contents[i].className = 'show';
            } else {
                tabs[i].className = '';
                contents[i].className = 'tab-content';
            }
        }
    }
</script>
</html>