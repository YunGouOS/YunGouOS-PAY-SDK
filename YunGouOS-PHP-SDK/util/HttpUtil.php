<?php
header('content-type:text/html;charset=utf-8');

/**
 *  Http请求工具类
 *  author YunGouOS
 *  site:www.yungouos.com
 */
class HttpUtil
{
    /**
     * @desc PHP get请求之发送数组
     * @param $url
     * @param array $param
     * @return mixed
     * @throws Exception
     */
    public function httpGet($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        // 设置cURL 参数，要求结果保存到字符串中还是输出到屏幕上。
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-type:application/x-www-form-urlencoded;charset=utf-8'
        ));
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    /**
     * @desc PHP post请求之发送数组
     * @param $url
     * @param array $param
     * @return mixed
     * @throws Exception
     */
    public function httpsPost($url, $param = array())
    {
        $ch = curl_init(); // 初始化一个 cURL 对象
        curl_setopt($ch, CURLOPT_URL, $url); // 设置需要抓取的URL
        curl_setopt($ch, CURLOPT_HEADER, 0); // // 设置header
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // 设置cURL 参数，要求结果保存到字符串中还是输出到屏幕上。
        // 如果你想PHP去做一个正规的HTTP POST，设置这个选项为一个非零值。这个POST是普通的 application/x-www-from-urlencoded 类型，多数被HTML表单使用。
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($param)); // 传递一个作为HTTP “POST”操作的所有数据的字符串。//http_build_query:生成 URL-encode 之后的请求字符串
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-type:application/x-www-form-urlencoded;charset=utf-8'
        ));
        $result = curl_exec($ch); // 运行cURL，请求网页
        if ($errno = curl_errno($ch)) {
            throw new Exception ('Curl Error(' . $errno . '):' . curl_error($ch));
        }
        curl_close($ch); // 关闭URL请求
        return $result; // 返回获取的数据
    }

}