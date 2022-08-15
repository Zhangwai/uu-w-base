import { UploadProps } from 'antd/lib/upload/interface';
import { ReactNode } from 'react';
export interface UploadImageProps extends UploadProps {
  /** limit 上传图片数量 */
  limit?: number;
  /** isCropped 是否裁剪 */
  isCropped?: boolean;
  /** size 图片大小 */
  size?: number;
  /** aspectRatio 裁剪比例 */
  aspectRatio?: number;
  children?: ReactNode;
  /** cleanBeforeUpload 上传前清空已有图片列表 */
  cleanBeforeUpload?: boolean;
  change?: Function;
  onUpdate?: Function;
}
