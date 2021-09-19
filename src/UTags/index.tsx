import React, { FC, useState, useEffect, useRef } from 'react';
import './index.less';
import { Tag, Input, Tooltip } from 'antd';
import { UTagsProps } from './interface';
import { PlusOutlined } from '@ant-design/icons';
export const UTags: FC<UTagsProps> = (props: UTagsProps) => {
  const {
    defaultValues = [],
    addText = '增加xxx',
    maxLength = 20,
    className = '',
    style = {},
    onValuesChange,
    color = 'basic',
    ...restTag
  } = props;

  const [tags, setTags] = useState<string[]>([]);
  const [disabled, setDisbaleIndex] = useState<number[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');

  const inputRef = useRef<Input>(null);
  const editInputRef = useRef<Input>(null);

  // defaultValues 数据初始化
  useEffect(() => {
    const disabledIndex: number[] = [];
    const defaultTags: string[] = [];
    defaultValues.forEach((item, index) => {
      const tag = typeof item === 'string' ? item : item.text || '';
      defaultTags.push(tag);
      if (typeof item === 'object' && item.closable === false) {
        disabledIndex.push(index);
      }
    });
    defaultTags.length > 0 && setTags(defaultTags);
    disabledIndex.length > 0 && setDisbaleIndex(disabledIndex);
  }, []);
  useEffect(() => {
    if (inputVisible) {
      inputRef?.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef?.current?.focus();
  }, [editInputIndex]);

  // 通知调用组件值已经更新
  useEffect(() => {
    onValuesChange?.(tags);
  }, [tags]);
  //监听添加input里面的值
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  //回车或者不聚焦事件，加一个
  const handleInputConfirm = () => {
    let tagR = tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tagR = [...tags, inputValue];
    }
    setTags(tagR);
    setInputVisible(false);
    setInputValue('');
  };
  //监听修改input里面的值
  const handleEditInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setEditInputValue(e.target.value);
  };
  //回车或者不聚焦事件，更改
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputValue('');
    setEditInputIndex(-1);
  };
  //出现添加input
  const showInput = () => {
    setInputVisible(true);
  };
  const handleClose = (removedTag: string) => {
    const tagsR = tags.filter(tag => tag !== removedTag);
    setTags(tagsR);
  };
  const radomColor = (): string => {
    const colorArr = [
      'magenta',
      'pink',
      'red',
      'yellow',
      'orange',
      'cyan',
      'green',
      'blue',
      'purple',
      'geekblue',
      'volcano',
      'gold',
      'lime',
    ];
    return colorArr[Math.floor(Math.random() * 14)];
  };
  return (
    <div className={`u-tags-group-container ${className}`} style={style}>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              className="u-tags-group-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.length > maxLength;
        const editFlag = disabled.indexOf(index) === -1;
        const tagElem = (
          <Tag
            className={color === 'basic' ? 'u-tags-group-edit' : ''}
            {...restTag}
            key={tag}
            closable={editFlag}
            onClose={() => handleClose(tag)}
            color={
              color === 'basic'
                ? ''
                : color === 'randomColor'
                ? radomColor()
                : color
            }
          >
            <span
              onDoubleClick={e => {
                if (editFlag) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, maxLength)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="u-tags-group-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag className="u-tags-plus" onClick={showInput}>
          <PlusOutlined /> {addText}
        </Tag>
      )}
    </div>
  );
};

export default UTags;
