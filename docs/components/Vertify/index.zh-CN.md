---
nav:
  title: 组件
  path: /components
---

## Vertify

### 基本使用:

```tsx
import React, { useState } from 'react';
import { Vertify } from 'uu-w-base';
export default () => {
  return <Vertify />;
};
```

### 设置宽高:

```tsx
import React from 'react';
import { Vertify } from 'uu-w-base';

export default () => {
  return <Vertify width={330} height={80} />;
};
```

### 设置滑块边长和半径:

```tsx
import React from 'react';
import { Vertify } from 'uu-w-base';

export default () => {
  return <Vertify width={320} height={160} l={28} r={5} />;
};
```

### 设置成功, 失败, 刷新时的回调:

```tsx
import React from 'react';
import { Vertify } from 'uu-w-base';

export default () => {
  return (
    <Vertify
      width={320}
      height={160}
      onSuccess={() => alert('success')}
      onFail={() => alert('fail')}
      onRefresh={() => alert('refresh')}
    />
  );
};
```

### 动态设置显示/ 隐藏:

```tsx
import React, { useState } from 'react';
import { Vertify } from 'uu-w-base';

export default () => {
  const [visible, setVisible] = useState(false);
  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };
  const style = {
    display: 'inline-block',
    marginRight: '20px',
    marginBottom: '20px',
    width: '100px',
    padding: '5px 20px',
    color: '#fff',
    textAlign: 'center',
    cursor: 'pointer',
    background: '#1991FA',
  };
  return (
    <>
      <div onClick={show} style={style}>
        显示
      </div>
      <div onClick={hide} style={style}>
        隐藏
      </div>
      <Vertify
        width={320}
        height={160}
        visible={visible}
        onSuccess={() => alert('success')}
        onFail={() => alert('fail')}
        onRefresh={() => alert('refresh')}
      />
    </>
  );
};
```

### 配置:

<br />

| 属性        | 说明           | 类型         | 默认值   | 是否必传   | 版本 |
| ----------- | -------------- | ------------ | -------- | ---------- | ---- |
| className   | 类名           | string       | ''       | 否         |      |
| width       | 宽度           | number       | 230      | 否         |      |
| height      | 高度           | number       | 160      | 否         |      |
| l           | 滑块边长       | number       | 42       | 否         |      |
| r           | 滑块半径       | number       | 9        | 否         |      |
| x           | 滑块 x 轴位置  | number       | 随机     | 否         |      |
| y           | 滑块 y 轴位置  | number       | 随机     | 否         |      |
| imgUrl      | 图片 url       | string       | 随机     | 否         |      |
| refreshIcon | 刷新图标 url   | string       | 固定     | 否         |      |
| text        | 默认滑轨内容   | ReactNode    | string   | '滑动验证' |      |
| errortext   | 失败滑轨内容   | ReactNode    | string   | '再试一次' |      |
| visible     | 验证框是否可见 | boolean      | true     | 否         |      |
| onSuccess   | 成功回调       | VoidFunction | ()=>void | 否         |      |
| onFail      | 失败回调       | VoidFunction | ()=>void | 否         |      |
| onRefresh   | 刷新回调       | VoidFunction | ()=>void | 否         |      |

<br />

### 默认配置:

```
      {
        width = 320,
        height = 160,
        l = 42,
        r = 9,
        x,
        y,
        imgUrl,
        text = '滑动验证',
        errorText='请在试一次',
        refreshIcon = 'http://cdn.dooring.cn/dr/icon12.png',
        className='',
        visible = true,
        onSuccess,
        onFail,
        onRefresh,
      }
```
