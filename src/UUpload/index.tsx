import React, { FC } from 'react';
import { UUploadProps } from './interface';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
import './index.less';

const beforeUpload = () => {
  return false;
};
export const UUpload: FC<UUploadProps> = (props: UUploadProps) => {
  const {
    multiple = true,
    iconFontSize = 28,
    iconFontStyle,
    describe,
    extra,
    icon,
    uploadType = 'dragger',
    children,
    ...restProps
  } = props;
  if (!restProps.beforeUpload) {
    restProps.beforeUpload = beforeUpload;
  }

  if (uploadType === 'dragger') {
    return (
      <Dragger multiple={multiple} {...restProps}>
        {children}
        <p className="myupload-iconpart">
          {!icon && (
            <UploadOutlined
              style={{
                fontSize: `${iconFontSize}px`,
                color: '#3079FF',
                ...iconFontStyle,
              }}
            />
          )}
          {icon}
        </p>
        <p className="myupload-describe">
          {describe instanceof Array
            ? describe.map((item, index: number) => (
                <div key={`index${index}`}>{item}</div>
              ))
            : describe}
        </p>
        <p className="myupload-extra">
          {extra instanceof Array
            ? extra.map((item, index: number) => (
                <div key={`index${index}`}>{item}</div>
              ))
            : extra}
        </p>
      </Dragger>
    );
  }
  return (
    <Upload multiple={multiple} {...restProps}>
      {children}
    </Upload>
  );
};

export default UUpload;
