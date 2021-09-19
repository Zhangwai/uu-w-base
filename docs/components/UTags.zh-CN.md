---
title: UTags
order: 4
toc: menu
---

### 基础使用

```tsx
import React from 'react';
import { UTags } from 'uu-w-base';

export default () => (
  <UTags
    defaultValues={[{ text: '123', closable: false }, '2323', { text: '444' }]}
  />
);
```

### 简单组合

```tsx
import React from 'react';
import { UTags } from 'uu-w-base';
import { message } from 'antd';

export default () => (
  <UTags
    defaultValues={[
      { text: '大聪明', closable: false },
      '小帅',
      { text: '小伙子' },
    ]}
    color={'randomColor'}
    onValuesChange={tags => {
      message.success(tags[tags.length - 1]);
    }}
  />
);
```

### 配置

继承[TagsProps](https://ant.design/components/tag-cn/#API)

| 属性           | 说明                       | 类型                     | 默认值     | 是否必传 | 版本 |
| -------------- | -------------------------- | ------------------------ | ---------- | -------- | ---- |
| defaultValues  | 标签组默认值               | DefaultTags[]            |            | 否       |      |
| addText        | 添加标签文字，             | string                   | 增加关键词 | 否       |      |
| maxLength      | 标签长度，超出显示 tooltip | number                   | 20         | 否       |      |
| onValuesChange | 标签组值更新回调           | (tags: string[]) => void |            | 否       |      |

#### DefaultTags

string | 对象{ closable?: boolean; text?: string }
| 属性 | 说明 | 类型 | 默认值 | 是否必传 | 版本 |
| -------- | ------------ | ------- | ------ | -------- | ---- |
| closable | 是否可以关闭 | boolean | true | 否 | |
| text | 标签文案 | string | | 否 | |

#### tagsColor

"blue" | "cyan" | "gold" | "green" | "lime" | "magenta" | "orange" | "pink" | "purple" | "red" | "yellow" | "default" | "geekblue" | "volcano" | "success" | "processing" | "error" | "warning" | "basic" | "randomColor"
| 属性 | 说明 | 类型 | 默认值 | 是否必传 | 版本 |
| ----------- | -------- | ------ | ------ | -------- | ---- |
| basic | 基础主题 | string | true | false | |
| randomColor | 随机主题 | string | | false | |

其他的主题继承 [TagsProps](https://ant.design/components/tag-cn/#API) 的 [color] 属性
