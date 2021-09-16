import React, { useState, useRef, useEffect, FC } from 'react';
import { VertifyProps } from './interface';
import './index.less';
import { getRandomNumberByRange, sum, square } from './tools';
export const Vertify: FC<VertifyProps> = (props: VertifyProps) => {
  const {
    width = 320,
    height = 160,
    l = 42,
    r = 9,
    x,
    y,
    imgUrl,
    text = '滑动验证',
    errorText = '请在试一次',
    refreshIcon = 'http://cdn.dooring.cn/dr/icon12.png',
    className = '',
    visible = true,
    onSuccess,
    onFail,
    onRefresh,
  } = props;
  const [isLoading, setLoading] = useState(true);
  const [sliderLeft, setSliderLeft] = useState(0);
  const [sliderClass, setSliderClass] = useState('sliderContainer');
  const [textTip, setTextTip] = useState(text);
  const canvasRef = useRef<any>(null);
  const blockRef = useRef<any>(null);
  const imgRef = useRef<any>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const trailRef = useRef<number[]>([]);
  const originXRef = useRef<number>(0);
  const originYRef = useRef<number>(0);
  const xRef = useRef<number>(0);
  const yRef = useRef<number>(0);
  const PI = Math.PI;
  const L = l + r * 2 + 3; // 滑块实际边长
  /** 画出一个以画路径的方式画canvas */
  const drawPath = (
    ctx: any,
    x: number,
    y: number,
    operation: 'fill' | 'clip',
  ) => {
    // 通过清空子路径列表开始一条新路径。当您要创建新路径时调用此方法。
    ctx.beginPath();
    // 将新子路径的起点移动到 (x, y) 坐标。
    ctx.moveTo(x, y);
    // 将圆弧添加到当前路径。
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
    // 用直线将当前子路径中的最后一个点连接到指定的 (x, y) 坐标。
    ctx.lineTo(x + l, y);
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
    ctx.lineTo(x + l, y + l);
    ctx.lineTo(x, y + l);
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.stroke();
    ctx.globalCompositeOperation = 'destination-over';
    operation === 'fill' ? ctx.fill() : ctx.clip();
  };
  /**获取img的链接 */
  const getRandomImgSrc = () => {
    return (
      imgUrl ||
      `https://picsum.photos/id/${getRandomNumberByRange(
        0,
        1084,
      )}/${width}/${height}`
    );
  };
  /**创建一个img标签 */
  const createImg = (onload: VoidFunction) => {
    const img = new Image(); //创建一个img标签<img />
    img.crossOrigin = 'Anonymous'; //设置跨域
    img.onload = onload;
    img.onerror = () => {
      (img as any).setSrc(getRandomImgSrc()); // 图片加载失败的时候重新加载其他图片
    };

    (img as any).setSrc = (src: string) => {
      const isIE = window.navigator.userAgent.indexOf('Trident') > -1;
      if (isIE) {
        // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
        const xhr = new XMLHttpRequest();
        xhr.onloadend = function(e: any) {
          const file = new FileReader(); // FileReader仅支持IE10+
          file.readAsDataURL(e.target.response);
          file.onloadend = function(e) {
            img.src = e?.target?.result as string;
          };
        };
        xhr.open('GET', src);
        xhr.responseType = 'blob';
        xhr.send();
      } else img.src = src;
    };

    (img as any).setSrc(getRandomImgSrc());
    return img;
  };
  /**沿着路径随机创建拼图位置并插入图片 */
  const draw = (img: HTMLImageElement) => {
    const canvasCtx = canvasRef.current.getContext('2d');
    const blockCtx = blockRef.current.getContext('2d');
    // 随机位置创建拼图形状
    xRef.current = x ? x : getRandomNumberByRange(L + 10, width - (L + 10));
    yRef.current = y
      ? y
      : getRandomNumberByRange(10 + r * 2, height - (L + 10));
    drawPath(canvasCtx, xRef.current, yRef.current, 'fill');
    drawPath(blockCtx, xRef.current, yRef.current, 'clip');

    // 画入图片
    canvasCtx.drawImage(img, 0, 0, width, height);
    blockCtx.drawImage(img, 0, 0, width, height);

    // 提取滑块并放到最左边
    const y1 = yRef.current - r * 2 - 1;
    const ImageData = blockCtx.getImageData(xRef.current - 3, y1, L, L);
    blockRef.current.width = L;
    blockCtx.putImageData(ImageData, 0, y1);
  };
  /**初始化 */
  const initImg = () => {
    const img = createImg(() => {
      setLoading(false);
      draw(img);
    });
    imgRef.current = img;
  };
  /**重新加载 */
  const reset = () => {
    const canvasCtx = canvasRef.current.getContext('2d');
    const blockCtx = blockRef.current.getContext('2d');
    // 重置样式
    setSliderLeft(0);
    setSliderClass('sliderContainer');
    blockRef.current.width = width;
    blockRef.current.style.left = 0 + 'px';

    // 清空画布
    canvasCtx.clearRect(0, 0, width, height);
    blockCtx.clearRect(0, 0, width, height);

    // 重新加载图片
    setLoading(true);
    imgRef.current.setSrc(getRandomImgSrc());
  };
  /**刷新事件，监听刷新并回调 */
  const handleRefresh = () => {
    reset();
    typeof onRefresh === 'function' && onRefresh();
  };
  /**获取拖动的起点位置 */
  const handleDragStart = (e: any) => {
    originXRef.current = e.clientX || e.touches[0].clientX;
    originYRef.current = e.clientY || e.touches[0].clientY;
    isMouseDownRef.current = true;
  };
  /**拖动 */
  const handleDragMove = (e: any) => {
    if (!isMouseDownRef.current) return false;
    e.preventDefault();
    const eventX = e.clientX || e.touches[0].clientX;
    const eventY = e.clientY || e.touches[0].clientY;
    const moveX = eventX - originXRef.current;
    const moveY = eventY - originYRef.current;
    if (moveX < 0 || moveX + 38 >= width) return false;
    setSliderLeft(moveX);
    const blockLeft = ((width - 40 - 20) / (width - 40)) * moveX;
    blockRef.current.style.left = blockLeft + 'px';

    setSliderClass('sliderContainer sliderContainer_active');
    trailRef.current.push(moveY);
  };
  const handleDragEnd = (e: any) => {
    if (!isMouseDownRef.current) return false;
    isMouseDownRef.current = false;
    const eventX = e.clientX || e.changedTouches[0].clientX;
    if (eventX === originXRef.current) return false;
    setSliderClass('sliderContainer');
    const { spliced, verified } = verify();
    if (spliced) {
      if (verified) {
        setSliderClass('sliderContainer sliderContainer_success');
        typeof onSuccess === 'function' && onSuccess();
      } else {
        setSliderClass('sliderContainer sliderContainer_fail');
        setTextTip(errorText);
        reset();
      }
    } else {
      setSliderClass('sliderContainer sliderContainer_fail');
      setTextTip(errorText);
      typeof onFail === 'function' && onFail();
      setTimeout(reset.bind(this), 1000);
    }
  };
  const verify = () => {
    const arr = trailRef.current; // 拖动时y轴的移动距离
    const average = arr.reduce(sum) / arr.length;
    const deviations = arr.map(x => x - average);
    const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
    const left = parseInt(blockRef.current.style.left);
    return {
      spliced: Math.abs(left - xRef.current) < 10,
      verified: stddev !== 0, // 简单验证拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
    };
  };
  useEffect(() => {
    if (visible) {
      imgRef.current ? reset() : initImg();
    }
  }, [visible]);
  return (
    <div
      className={`vertifyWrap ${className}`}
      style={{
        width: width + 'px',
        margin: '0 auto',
        display: visible ? '' : 'none',
      }}
      onMouseMove={handleDragMove}
      onTouchMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
    >
      {/* 图片区 */}
      <div className="canvasArea">
        <canvas ref={canvasRef} width={width} height={height}></canvas>
        <canvas
          ref={blockRef}
          className="block"
          width={width}
          height={height}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        ></canvas>
      </div>
      {/* 滑块区 */}
      <div
        className={sliderClass}
        style={{
          pointerEvents: isLoading ? 'none' : 'auto',
          width: width + 'px',
        }}
      >
        {/* 滑块 */}
        <div className="sliderMask" style={{ width: sliderLeft + 'px' }}>
          <div
            className="slider"
            style={{ left: sliderLeft + 'px' }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            <div className="sliderIcon">&rarr;</div>
          </div>
        </div>
        <div className="sliderText">{textTip}</div>
      </div>
      {/* 刷新按钮 */}
      <div
        className="refreshIcon"
        onClick={handleRefresh}
        style={{ backgroundImage: `url(${refreshIcon})` }}
      ></div>
      <div
        className="loadingContainer"
        style={{
          width: width + 'px',
          height: height + 'px',
          display: isLoading ? '' : 'none',
        }}
      >
        <div className="loadingIcon"></div>
        <span>加载中...</span>
      </div>
    </div>
  );
};

export default Vertify;
