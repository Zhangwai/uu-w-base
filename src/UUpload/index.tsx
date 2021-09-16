import React, { FC } from 'react';
import { UUploadProps } from './interface';

export const UUpload: FC<UUploadProps> = (props: UUploadProps) => {
  const { ...restProps } = props;
  return <div>UUpload</div>;
};

export default UUpload;
