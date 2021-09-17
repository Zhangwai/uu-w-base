---
title: VertifyInput
order: 3
toc: menu
---

### Basic use

```tsx
import React from 'react';
import { VertifyInput } from 'uu-w-base';

export default () => (
  <VertifyInput
    initCodeText="Send vertify code"
    sendCode={() => {}}
    onChange={() => {}}
  />
);
```

### Simple combination

```tsx
import React, { useState, useRef } from 'react';
import { Input, Button, message } from 'antd';
import { VertifyInput } from 'uu-w-base';

let v;
let V;
let phone = '';
let vphone = '';
const InputRef = useRef();

const respo = () => {
  v = Math.floor(Math.random() * 9000 + 1000);
  alert(`Sent verification code, verification code is${v}`);
};

const checkPhone = () => {
  if (phone && phone.length === 11) {
    vphone = phone;
    return true;
  } else {
    phone = '';
    vphone = '';
    InputRef.current.state.value = '';
    return false;
  }
};

const gogogo = () => {
  if (v && V.toString() === v.toString()) {
    if (vphone === phone) {
      message.success('succeess');
    } else {
      message.error('phone changed');
    }
  } else {
    message.error('error');
  }
};
export default () => (
  <div>
    <Input
      ref={InputRef}
      style={{ margin: '0 0 20px 0', height: '40px' }}
      onChange={e => {
        phone = e.target.value;
      }}
    />

    <VertifyInput
      placeholder="Please enter a four digit verification code"
      initCodeText="Go! Send one"
      reCodeText="Wrong, Bao! I will send later"
      countDown={30}
      sendCode={() => respo()}
      checkPhone={checkPhone}
      onChange={e => {
        V = e.target.value;
      }}
    />
    <Button onClick={gogogo} style={{ margin: '20px 0 0 0' }}>
      Send
    </Button>
  </div>
);
```

<br/>

### config(API)

Inherited from [antd input props](https://ant.design/components/input-cn/#Input)

| attribute     | explain                                   | type          | Default value | Is it necessary to pass | edition |
| ------------- | ----------------------------------------- | ------------- | ------------- | ----------------------- | ------- |
| sendCode      | Send verification code interface function | () => void    |               | false                   |         |
| countDown     | Countdown time                            | number        | 60            | false                   |         |
| initCodeText  | Initial verification code text content    | string        | 发送验证码    | false                   |         |
| reCodeText    | Resend verification code text content     | string        | 重新发送      | false                   |         |
| checkPhone    | Verify mobile phone number format         | () => boolean |               | false                   |         |
| codeClassname | Verification code class name              | string        |               | false                   |         |
