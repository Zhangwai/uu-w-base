---
title: 发送验证码组件
order: 3
toc: menu
---

### 基本使用

```tsx
import React from 'react';
import { VertifyInput } from 'uu-w-base';

export default () => <VertifyInput sendCode={() => {}} onChange={() => {}} />;
```

### 简单组合使用

```tsx
import React, { useState, useRef } from 'react';
import { Input, Button, message } from 'antd';
import { VertifyInput } from 'uu-w-base';

//模拟验证码
let v;
//输入的验证码
let V;
//模拟手机号码
let phone = '123';
//拿到电话号的ref
const InputRef = useRef();

//模拟接口返回值
const respo = () => {
  v = Math.floor(Math.random() * 9000 + 1000);
  alert(`发送了验证码，验证码为${v}`);
};
//验证简单手机号码长度
const checkPhone = () => {
  if (phone && phone.length === 11) {
    return true;
  } else {
    phone = '';
    InputRef.current.state.value = '';
    return false;
  }
};
//发送事件
const gogogo = () => {
  //一般这里请接口带参数啥的就行
  // console.log(V,v)
  //验证
  if (V.toString() === v.toString()) {
    message.success('验证通过了');
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
      placeholder="请输入四位验证码"
      initCodeText="冲！发一个"
      reCodeText="错了宝！过会发一个哦"
      countDown={30}
      sendCode={() => respo()}
      checkPhone={checkPhone}
      onChange={e => {
        V = e.target.value;
      }}
    />
    <Button onClick={gogogo} style={{ margin: '20px 0 0 0' }}>
      发送
    </Button>
  </div>
);
```

<br/>

### 配置

继承[antd input props](https://ant.design/components/input-cn/#Input)

| 属性          | 说明                   | 类型          | 默认值     | 是否必传 | 版本 |
| ------------- | ---------------------- | ------------- | ---------- | -------- | ---- |
| sendCode      | 发送验证码接口函数     | () => void    |            | 否       |      |
| countDown     | 倒计时时间             | number        | 60         | 否       |      |
| initCodeText  | 初始验证码文本内容     | string        | 发送验证码 | 否       |      |
| reCodeText    | 重新发送验证码文本内容 | string        | 重新发送   | 否       |      |
| checkPhone    | 校验手机号格式         | () => boolean |            | 否       |      |
| codeClassname | 验证码类名             | string        |            | 否       |      |
