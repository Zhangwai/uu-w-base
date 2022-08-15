// import ossClient from '/@/libs/oss';
import { message } from 'antd';
import { RcFile } from 'antd/es/upload';

const beforeUpload = (file: RcFile, size: number): Promise<RcFile> => {
  return new Promise((resolve, reject) => {
    const format = ['image/jpeg', 'image/png'];
    if (!format.includes(file.type as string)) {
      message.error('图片上传失败，请上传”JPG、JPEG或PNG格式');
      reject(file);
    }
    if (size && (file.size as number) / 1024 > size) {
      message.error(`图片内存大小不可超过 ${size} kb`);
      reject(file);
    }
    resolve(file);
  });
};

// const uploadToOSS = (file: File, filePath: string) => {
//   let uploadPath = '';
//   return new Promise((resolve) => {
//     ossClient
//       .ossPut(filePath, file)
//       .then((url: any) => {
//         uploadPath = url;
//       })
//       .catch(() => {
//         message.error('上传失败');
//       })
//       .finally(() => {
//         resolve(uploadPath);
//       });
//   });
// };

export default function useUpload() {
  return {
    beforeUpload,
    // uploadToOSS
  };
}
