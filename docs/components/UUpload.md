---
title: UUpload
order: 1
toc: menu
nav:
  title: Components
  order: 1
---

### Basic use

```tsx
import React from 'react';
import { UUpload } from 'uu-w-base';

export default () => <UUpload />;
```

### Simple combination

```tsx
import React from 'react';
import { Button } from 'antd';
import { UUpload } from 'uu-w-base';

export default () => {
  return (
    <div>
      <h3>Drag and drop upload</h3>
      <UUpload
        extra={[
          'Supported extensions: .word .pdf',
          <span style={{ color: 'red' }}>
            It is recommended to upload PDF files within 30m
          </span>,
        ]}
        describe="Click or drag the PDF here to upload"
      />
      <br />
      <h3>Normal upload, you can customize the style</h3>
      <UUpload uploadType="upload">
        <Button>upload</Button>
      </UUpload>
    </div>
  );
};
```

### config(API)

Inherited from [UploadProps](https://ant.design/components/upload-cn/#API)

| 属性          | 说明                        | 类型                                        | 默认值  | 是否必传 | 版本 |
| ------------- | --------------------------- | ------------------------------------------- | ------- | -------- | ---- |
| multiple      | Support multiple uploads    | boolean                                     | true    | false    |      |
| describe      | Description copy            | string \| ReactNode \|(string\|ReactNode)[] |         | false    |      |
| extra         | Additional description copy | string \| ReactNode \|(string\|ReactNode)[] |         | false    |      |
| iconFontSize  | Upload icon size            | number                                      | 28      | false    |      |
| iconFontStyle | Icon style                  | CSSProperties                               | 28      | false    |      |
| uploadType    | Upload component type       | 'dragger' \| 'upload'                       | dragger | false    |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
