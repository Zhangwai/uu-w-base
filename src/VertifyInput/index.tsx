import React, { FC, useState } from 'react';
import { VertifyInputProps } from './interface';
import { Input, message } from 'antd';
import classNames from 'classnames';
import './index.less';
/**
 * 带验证码功能的输入组件，适用于要发送验证码的场景。
 *
 * ### 如何引用
 *
 * ~~~javascript
 * import { InputVerify } from 'ii-admin-base'
 * ~~~
 */
export const VertifyInput: FC<VertifyInputProps> = (
  props: VertifyInputProps,
) => {
  const {
    sendCode,
    countDown = 60,
    initCodeText = '发送验证码',
    reCodeText = '重新发送',
    checkPhone,
    codeClassname,
    ...restProps
  } = props;
  //发送按钮文字
  const [codeText, setCodeText] = useState(initCodeText);
  //发送按钮点击后改变状态为true
  const [codeStatus, setCodeStatus] = useState(false);
  const codeCls = classNames('uu-verify-button', codeClassname, {
    'uu-verify-button-disabled': codeStatus,
  });
  // 处理倒计时时间
  const handleCountDown = (
    //ts通过ReturnType 指定变量timer的类型是 setTimeout
    timer: ReturnType<typeof setTimeout> | null,
    count: number,
  ) => {
    if (timer) {
      clearTimeout(timer);
    }

    if (count <= 0) {
      setCodeText(reCodeText);
      setCodeStatus(false);
    } else {
      setCodeText(`${count} s`);

      const newTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
        handleCountDown(newTimer, count - 1);
      }, 1000);
    }
  };
  const handleCodeClick = () => {
    //判断状态触发点击事件
    if (codeStatus) return;
    // 有校验条件但是不通过
    if (checkPhone && !checkPhone()) {
      message.error('请输入正确手机号！');
      return;
    }
    //发送给接口发送
    sendCode && sendCode();
    setCodeStatus(true);
    //启动定时器
    handleCountDown(null, countDown as number);
  };

  return (
    <Input
      data-testid="test-input-verify"
      {...restProps}
      suffix={
        <span className={codeCls} onClick={handleCodeClick}>
          {codeText}
        </span>
      }
    />
  );
};

export default VertifyInput;
