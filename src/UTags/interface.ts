import { TagProps } from 'antd/lib/tag/index';
export type DefaultTags = { closable?: boolean; text?: string } | string;
export type tagsColor =
  | 'blue'
  | 'cyan'
  | 'gold'
  | 'green'
  | 'lime'
  | 'magenta'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'yellow'
  | 'default'
  | 'geekblue'
  | 'volcano'
  | 'success'
  | 'processing'
  | 'error'
  | 'warning'
  | 'basic'
  | 'randomColor';
export interface UTagsProps extends TagProps {
  /** 标签组默认值 */
  defaultValues?: DefaultTags[];
  /** 添加标签文字， 默认值增加xxx */
  addText?: string;
  color: tagsColor;
  /** 标签长度，超出显示tooltip 默认值20 */
  maxLength?: number;
  /** 标签组值更新回调 */
  onValuesChange?: (tags: string[]) => void;
}
