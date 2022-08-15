import { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import { UploadImageProps } from './interface';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Modal, Button } from 'antd';
import { RcFile } from 'antd/es/upload';
import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';
import { getBase64 } from './tools';
import useCropper from './hooks/useCropper';
import useUpload from './hooks/useUpload';
import './index.less';

export const UploadImage: FC<UploadImageProps> = (props: UploadImageProps) => {
  const {
    fileList = [],
    limit = 20,
    isCropped = false,
    size = 1024 * 3,
    aspectRatio = 1 / 1,
    cleanBeforeUpload = false,
    ...restProps
  } = props;

  const {
    initCropper,
    resetCropper,
    destroyCropper,
    setCropper,
  } = useCropper();
  const { beforeUpload } = useUpload();

  const [previewData, setPreviewData] = useState({
    visible: false,
    url: '',
    title: '',
  });

  const [crop, setCrop] = useState({
    cropVisible: false,
    cropInstance: undefined as any, // 实例
  });

  const cropWrap: any = useRef({ style: {} });
  const cropImg: any = useRef({ src: '' }); // 图片节点

  const [myFileList, setMyFileList] = useState(fileList);

  useEffect(() => {
    setMyFileList([...fileList]);
  }, [props.fileList]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewData(prev => ({
      ...prev,
      visible: true,
      title: file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
      url: file.url || (file.preview as string),
    }));
  };

  const handleCancel = () => {
    setPreviewData(prev => ({
      ...prev,
      visible: false,
    }));
  };
  const initCropDialog = (url: string) => {
    setCrop(prev => ({
      ...prev,
      cropVisible: true,
    }));
    const loadImage = new Promise(resolve => {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        resolve({ width: image.width, height: image.height });
      };
    });
    loadImage.then((data: any) => {
      let { width, height } = data;
      // 长边设为 600，短边按原比例缩放
      if (width > height) {
        height *= 600 / width;
        width = 600;
      } else {
        width *= 600 / height;
        height = 600;
      }
      // 限定裁剪容器大小
      cropWrap.current.style = { width: `${width}px`, height: `${height}px` };
      // 提供图片路径
      cropImg.current.src = url;
      setCrop(prev => ({
        ...prev,
        // 初始化裁剪图形实例
        cropInstance: initCropper(cropImg.current, aspectRatio),
      }));
    });
  };
  const handleUpload = (e: any) => {
    if (cleanBeforeUpload) {
      setMyFileList([]);
    } else {
    }
    const tmpFileList = JSON.parse(JSON.stringify(myFileList));
    const { file } = e;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      if (typeof url === 'string') {
        const originImgData = {
          url,
          name: file.name,
          uid: new Date().valueOf(),
        };
        tmpFileList.push(originImgData);
        setMyFileList([...tmpFileList]);
        props.change && props.change(originImgData);
        props.onUpdate && props.onUpdate(tmpFileList);
        if (isCropped) {
          initCropDialog(originImgData.url);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCropperCancel = () => {
    setCrop(prev => ({
      ...prev,
      cropVisible: false,
    }));
    destroyCropper(crop.cropInstance);
  };

  const handleCropperReset = () => {
    resetCropper(crop.cropInstance);
  };

  const handleCropperSubmit = () => {
    setCropper(crop.cropInstance).then((file: any) => {
      const tmpFileList = JSON.parse(JSON.stringify(myFileList));
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result;
        crop.cropVisible = false;
        destroyCropper(crop.cropInstance);
        if (file.name) {
          tmpFileList.pop();
          const originImgData = {
            url,
            name: file.name,
            uid: new Date().valueOf(),
          };
          tmpFileList.push(originImgData);
          setMyFileList([...tmpFileList]);
          props.change && props.change(originImgData);
          props.onUpdate && props.onUpdate(tmpFileList);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemove = (file: UploadFile) => {
    const timer = setTimeout(() => {
      const tmpFileList = myFileList.filter(item => {
        return item.status !== 'removed';
      });
      props.change && props.change(file);
      props.onUpdate && props.onUpdate(tmpFileList);
      clearTimeout(timer);
    }, 0);
    return true;
  };

  return (
    <>
      <Upload
        action=""
        listType="picture-card"
        fileList={myFileList}
        onPreview={handlePreview}
        customRequest={handleUpload}
        onRemove={handleRemove}
        beforeUpload={(file: RcFile) => beforeUpload(file, size)}
        {...restProps}
      >
        {fileList.length >= limit ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewData.visible}
        title={previewData.title}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewData.url} />
      </Modal>

      <Modal
        centered
        title="裁剪图片"
        width="1000px"
        footer={[
          <Button key="bottom1" onClick={handleCropperCancel}>
            取消
          </Button>,
          <Button
            key="bottom2"
            type="primary"
            danger
            onClick={handleCropperReset}
          >
            重置
          </Button>,
          <Button key="bottom3" type="primary" onClick={handleCropperSubmit}>
            确定
          </Button>,
        ]}
        visible={crop.cropVisible}
        onCancel={handleCropperCancel}
      >
        <div ref={cropWrap} className="crop-wrap">
          <img ref={cropImg} />
        </div>
      </Modal>
    </>
  );
};

export default UploadImage;
