import { Schema, model } from "mongoose";

const FileModel= new Schema({
    uploaded_by:String,
    name: String,  //文件名称
    path: String,   //存储路径
    type: String,   //类型，如：图片、视频等
    size: Number,   //大小，单位kb
    createTime: {type: Date, default: Date.now},     //创建时
    duration:Number,
    public_id:String,
    format:String
})

export const File = model("File",FileModel)