import { UploadProps } from 'antd/lib/upload/interface';
import { CSSProperties, ReactNode } from 'react';
export interface UUploadProps extends UploadProps {
  /** multiple 是否支持多个上传 */
  multiple?: boolean;
  /** describe 描述文案 */
  describe?: string | ReactNode | (string | ReactNode)[];
  /** extra 额外描述文案 */
  extra?: string | ReactNode | (string | ReactNode)[];
  // /** onChange 回调方法 */
  // onChange?: (params: any) => void;
  // /** 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）。注意：IE9 不支持该方法 */
  // beforeUpload?: (params: any) => any;
  /** 自定义样式 */
  // style?: CSSProperties;
  /** 自定义上传icon */
  icon?: ReactNode;
  children?: ReactNode;
  /** iconFontSize 上传图标大小 */
  iconFontSize?: number;
  /** 图标样式 */
  iconFontStyle?: CSSProperties;
  /** 上传组件类型 */
  uploadType?: 'dragger' | 'upload';
}
