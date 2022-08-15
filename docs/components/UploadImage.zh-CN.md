---
title: 图片上传组件
order: 1
toc: menu
nav:
  title: 组件
  order: 1
---

### 基本使用

```tsx
import React, { useState } from 'react';
import { UploadImage } from 'uu-w-base';

export default () => {
  const [fileList, setFileList] = useState([]);
  const handleUpdate = e => {
    console.log(e, 'handleUpdate');
    setFileList([...e]);
  };
  return <UploadImage fileList={fileList} limit={2} onUpdate={handleUpdate} />;
};
```

### 常用封装

```tsx
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { UploadImage } from 'uu-w-base';

export default () => {
  const [fileList, setFileList] = useState([]);
  const handleChange = e => {
    console.log(e, 'handleChange');
  };
  const handleUpdate = e => {
    console.log(e, 'handleUpdate');
    setFileList([...e]);
  };

  return (
    <div>
      <UploadImage
        fileList={fileList}
        limit={2}
        isCropped
        change={handleChange}
        onUpdate={handleUpdate}
      />
      <br />
      <h3>裁剪上传</h3>
    </div>
  );
};
```

### 配置

继承自 [UploadProps](https://ant.design/components/upload-cn/#API)

| 属性              | 说明                   | 类型               | 默认值  | 是否必传 | 版本 |
| ----------------- | ---------------------- | ------------------ | ------- | -------- | ---- |
| limit             | limit 限制上传个数     | number             | 20      | 否       |      |
| isCropped         | isCropped 是否裁剪     | boolean            | false   | 否       |      |
| size              | size 图片限制大小      | number             | 3\*1024 | 否       |      |
| aspectRatio       | aspectRatio 裁剪比例   | number             | 1/1     | 否       |      |
| cleanBeforeUpload | 上传前清空已有图片列表 | boolean            | false   | 否       |      |
| change            | 组件改变事件           | function(file)     | -       | 否       |      |
| onUpdate          | 组件更新事件           | function(fileList) | -       | 否       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
