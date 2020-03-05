
package com.xiyou.util;
import com.google.gson.Gson;
import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;

import java.io.File;

public class QiniuUploadImageUtil {
    //accessKey
    private static String accessKey = "U7iuJHsq5knZMU22Bd8JR11GpOcS7Z0i4ma3n5RM";//用钥匙 刮 屏幕得字符串
    //secretKey
    private static String secretKey ="IsRk8WjvituvSf6eER2HcxGgAPgJIlw2rP-Ld-pU";
    //储存空间名
    private static String bucket ="bearchu";
    //外链URL前缀
    private static String fronturl = "http://q6pn1p8cf.bkt.clouddn.com/";


    /**
     * 图片上传

     * @param file  图片路径
     * @return  链接
     * @throws QiniuException
     */
    public static  String  fileUpload(String file)throws QiniuException {
        Auth auth = Auth.create(accessKey,secretKey);
        String upToken = auth.uploadToken(bucket);  //上传凭证
        Configuration cfg = new Configuration(Zone.autoZone());
        UploadManager uploadManager = new UploadManager(cfg);
        String key  = null;
        try {
            Response response = uploadManager.put(file, key, upToken);
            DefaultPutRet putRet = new Gson().fromJson(response.bodyString(),DefaultPutRet.class);
            return fronturl+putRet.key;
        }catch (QiniuException ex){
            Response r = ex.response;
            System.err.println(r.toString());
            try {
                System.err.println(r.bodyString());
            } catch (QiniuException ex2) {
                // ignore
            }
        }
        return null;
    }

    /**
     *删除图片
     * @param key
     * @return
     * @throws QiniuException
     */
    public static String delete(String key)throws QiniuException{
        Auth auth = Auth.create(accessKey,secretKey);
        Configuration cfg = new Configuration(Zone.zone2());
        BucketManager bucketMgr = new BucketManager(auth, cfg);
        try {
            bucketMgr.delete(bucket,key);
        }catch (QiniuException Q){
            return Q.toString();
        }
        System.out.println("success");
        return null;
    }

}
