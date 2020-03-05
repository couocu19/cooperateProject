package com.xiyou.service.impl;

import com.xiyou.service.IFileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Service("iFileService")
public class FileServiceImpl implements IFileService {

    private Logger logger = LoggerFactory.getLogger(FileServiceImpl.class);

    public String upload(MultipartFile file, String path){
        String fileName = null;
        try {
            fileName = new String(file.getOriginalFilename().getBytes(),"UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        //abc.jpg
        //获取扩展名"jpg"
        String fileExtensionName = fileName.substring(fileName.lastIndexOf(".")+1);
        String fileUploadFileName = UUID.randomUUID()+"."+fileExtensionName;

        logger.info("开始上传文件,上传的文件名:{},上传的路径:{},新文件名:{}",fileName,path,fileUploadFileName);

        File fileDir = new File(path);
        if(!fileDir.exists()){
            fileDir.setWritable(true);
            fileDir.mkdirs();
        }

        File targetFile = new File(path,fileUploadFileName);

        try {
            file.transferTo(targetFile);
            //此时文件已经上传成功

            //todo:将targetFile上传到服务器上

            //todo:上传完成后,删除upload下面的文件


        } catch (IOException e) {
            logger.info("上传文件异常",e);
            return null;
        }
        return targetFile.getName();
    }

}
