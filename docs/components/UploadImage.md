---
title: UploadImage
order: 1
toc: menu
nav:
  title: Components
  order: 1
---

### Basic use

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
    </div>
  );
};
```

### 配置

继承自 [UploadProps](https://ant.design/components/upload-cn/#API)

| attribute         | explain                                          | type               | Default value | Is it necessary | edition |
| ----------------- | ------------------------------------------------ | ------------------ | ------------- | --------------- | ------- |
| limit             | Limit the number of uploads                      | number             | 20            | 否              |         |
| isCropped         | Need to crop                                     | boolean            | false         | 否              |         |
| size              | Picture size limit                               | number             | 3\*1024       | 否              |         |
| aspectRatio       | Image crop scale                                 | number             | 1/1           | 否              |         |
| cleanBeforeUpload | Clear the existing picture list before uploading | boolean            | false         | 否              |         |
| change            | changes                                          | function(file)     | -             | 否              |         |
| onUpdate          | update                                           | function(fileList) | -             | 否              |         |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
