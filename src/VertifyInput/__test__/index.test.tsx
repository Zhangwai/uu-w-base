import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from '@testing-library/react';
import '@testing-library/jest-dom'; // toHaveClass、toBeInTheDocument、...
import '@testing-library/jest-dom/extend-expect'; // 注册所有的matchers
import VertifyInput from '../index';
import { VertifyInputProps } from '../interface';

const antdProps: VertifyInputProps = {
  placeholder: 'antd input placeholder',
  size: 'large',
  sendCode: jest.fn(), // jest.fn 创建模拟函数，检测是否被调用
  onPressEnter: jest.fn(),
  onChange: jest.fn(),
};

const selfProps: VertifyInputProps = {
  countDown: 30,
  initCodeText: '发一个',
  reCodeText: '再次发送',
  sendCode: jest.fn(),
};

let wrapper: RenderResult,
  inputElement: HTMLInputElement,
  buttonElement: HTMLElement;

// 测试 Ant Design 的原始 Input 组件是否正常
describe("Test VertifyInput component on the props of antd's input component", () => {
  /**
   * 针对多个测试case运行前需获取相同的元素，可以通过beforeEach避免重复设置。
   * 在每个case运行之前，都会运行该函数
   */
  beforeEach(() => {
    wrapper = render(<VertifyInput {...antdProps} />);

    // 在元素加上 data-testid
    inputElement = wrapper.getByTestId('test-input-verify') as HTMLInputElement;
  });
  it("it should have the input's class of antd", () => {
    expect(inputElement).toBeInTheDocument(); //判断元素是否在html文档中
    expect(inputElement).toHaveClass('ant-input'); //判断有没有对应的class
  });
  it('it should support size', () => {
    expect(inputElement).toHaveClass('ant-input-lg');
  });
  it('it should trigger onChange event correctly', () => {
    // 触发 change 事件
    fireEvent.change(inputElement, { target: { value: 'input test' } });
    expect(antdProps.onChange).toHaveBeenCalled();
    expect(inputElement.value).toEqual('input test');
  });
});

//测试自身的属性
describe("Test VertifyInput component on the self's props", () => {
  beforeEach(() => {
    wrapper = render(<VertifyInput {...selfProps} />);
    // getByText返回的元素是HTMLElement
    buttonElement = wrapper.getByText('发一个');
  });
  it('it should render correctly', () => {
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('uu-verify-button');
  });
  it('it should call the right callback function when you click then button', async () => {
    fireEvent.click(buttonElement);

    //检测sendcode函数是否被调用
    expect(selfProps.sendCode).toHaveBeenCalled();

    //通过async 、 await 、 waitFor函数，让断言语句延时执行
    await waitFor(
      () => {
        // 函数中的断言会重复执行，直到断言通过或者timeout报错
        return async () =>
          expect(wrapper.getByText('再次发送')).toBeInTheDocument();
      },
      { timeout: 4000 },
    );
  });
});
