import { InputProps } from 'antd/lib/input';
export interface VertifyInputProps extends InputProps {
  /** 发送验证码接口函数 */
  sendCode?: () => void;
  /** 倒计时时间 */
  countDown?: number;
  /** 初始验证码文本内容 */
  initCodeText?: string;
  /** 重新发送验证码文本内容 */
  reCodeText?: string;
  /** 校验手机号格式 */
  checkPhone?: () => boolean;
  /** 验证码类名 */
  codeClassname?: string;
}
