---
title: UTags
order: 4
toc: menu
---

### Basic use

```tsx
import React from 'react';
import { UTags } from 'uu-w-base';

export default () => (
  <UTags
    defaultValues={[{ text: '123', closable: false }, '2323', { text: '444' }]}
    addText="add"
  />
);
```

### Simple combination

```tsx
import React from 'react';
import { UTags } from 'uu-w-base';
import { message } from 'antd';

export default () => (
  <UTags
    defaultValues={[{ text: 'abc', closable: false }, 'def', { text: 'gold' }]}
    color={'randomColor'}
    addText="add"
    onValuesChange={tags => {
      message.success(tags[tags.length - 1]);
    }}
  />
);
```

### config

inherit from [TagsProps](https://ant.design/components/tag-cn/#API)

| attribute      | explain                                     | type                     | Default value | Is it necessary | edition |
| -------------- | ------------------------------------------- | ------------------------ | ------------- | --------------- | ------- |
| defaultValues  | Label group defaults                        | DefaultTags[]            |               | false           |         |
| addText        | Add label text                              | string                   | Add keywords  | false           |         |
| maxLength      | Label length, out of display andt's tooltip | number                   | 20            | false           |         |
| onValuesChange | Tag group value update callback             | (tags: string[]) => void |               | false           |         |
| color          | label theme                                 | tagsColor[]              |               | false           |         |

#### DefaultTags

string | 对象{ closable?: boolean; text?: string }
| attribute | explain | type | Default value | Is it necessary | edition |
| --------- | ------------ | ------- | ------------- | --------------- | ------- |
| closable | it can close | boolean | true | false | |
| text | label value | string | | false | |

#### tagsColor

"blue" | "cyan" | "gold" | "green" | "lime" | "magenta" | "orange" | "pink" | "purple" | "red" | "yellow" | "default" | "geekblue" | "volcano" | "success" | "processing" | "error" | "warning" | "basic" | "randomColor"
| attribute | explain | type | Default value | Is it necessary | edition |
| ----------- | ------------ | ------ | ------------- | --------------- | ------- |
| basic | basic theme | string | true | false | |
| randomColor | random theme | string | | false | |

other inherit from [TagsProps](https://ant.design/components/tag-cn/#API)[color]
