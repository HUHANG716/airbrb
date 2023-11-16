import { Divider, Flex, FormInstance, Upload } from 'antd';
import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { FullWidthItem } from '../ListingForm';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { getBase64 } from '../../../utils/utils';
import { nanoid } from 'nanoid';

const ThumbUpload = ({ thumbFiles, form }: { thumbFiles?: UploadChangeParam; form: FormInstance }) => {
  const handleUpload = (file: File) => {
    console.log(file);

    getBase64(file as File).then((res) => {
      console.log(form.getFieldValue('thumbs')?.fileList);

      form.setFieldsValue({
        thumbs: {
          fileList: [
            ...(form.getFieldValue('thumbs')?.fileList || []).filter((file: UploadFile) => file.uid.startsWith('[IMAGE]')),
            {
              uid: '[IMAGE]' + nanoid(),
              url: res,
              thumbUrl: res,
            },
          ],
        },
      });
    });
    return false;
  };
  return (
    <>
      <Divider>Pictures of your property</Divider>
      <FullWidthItem
        required
        rules={[
          () => ({
            validator: (_, value) => {
              if (value?.fileList.length > 0) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Please upload at least one picture!'));
            },
          }),
        ]}
        name='thumbs'
        label='Images of your property'>
        <Upload
          listType='picture-card'
          fileList={thumbFiles?.fileList || []}
          beforeUpload={handleUpload}>
          <Flex
            gap={'middle'}
            align='center'
            vertical>
            <PlusOutlined />
            Upload
          </Flex>
        </Upload>
      </FullWidthItem>
    </>
  );
};

export default ThumbUpload;
