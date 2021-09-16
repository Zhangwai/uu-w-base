---
title: Vertify
order: 2
toc: menu
---

### Basic use

```tsx
import React, { useState } from 'react';
import { Vertify } from 'uu-w-base';
export default () => {
  return <Vertify className="123" />;
};
```

### Set width and height

```tsx
import React from 'react';
import { Vertify } from 'uu-w-base';

export default () => {
  return <Vertify width={330} height={80} />;
};
```

### Set slider side length and radius

```tsx
import React from 'react';
import { Vertify } from 'uu-w-base';

export default () => {
  return <Vertify width={320} height={160} l={28} r={5} />;
};
```

### Callback when setting succeeded, failed and refreshed

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

### Dynamic settings show / hide

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
        show
      </div>
      <div onClick={hide} style={style}>
        hide
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

### Config

<br />

| attribute   | explain                        | type         | Default value | Is it necessary to pass | edition |
| ----------- | ------------------------------ | ------------ | ------------- | ----------------------- | ------- |
| className   | Class name                     | string       | ''            | false                   |         |
| width       | width                          | number       | 230           | false                   |         |
| height      | height                         | number       | 160           | false                   |         |
| l           | Slider side length             | number       | 42            | false                   |         |
| r           | Slider radius                  | number       | 9             | false                   |         |
| x           | Slider X-axis position         | number       | random        | false                   |         |
| y           | Slider Y-axis position         | number       | random        | false                   |         |
| imgUrl      | Picture URL                    | string       | random        | false                   |         |
| refreshIcon | Refresh icon URL               | string       | fixed         | false                   |         |
| text        | Default slide content          | ReactNode    | string        | '滑动验证'              |         |
| errortext   | Failed slide content           | ReactNode    | string        | '再试一次'              |         |
| visible     | Verify that the box is visible | boolean      | true          | false                   |         |
| onSuccess   | Successful callback            | VoidFunction | ()=>void      | false                   |         |
| onFail      | Failed callback                | VoidFunction | ()=>void      | false                   |         |
| onRefresh   | Refresh callback               | VoidFunction | ()=>void      | false                   |         |

<br />

### Basic config

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
