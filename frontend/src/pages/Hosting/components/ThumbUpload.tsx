import { Divider, Flex, Upload } from 'antd';
import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { FullWidthItem } from '../../../components/ListingForm/ListingForm';
import { UploadChangeParam } from 'antd/es/upload';

const ThumbUpload = ({ thumbFiles }: { thumbFiles: UploadChangeParam }) => {
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
        <Upload listType='picture-card' fileList={thumbFiles?.fileList} beforeUpload={() => false}>
          <Flex gap={'middle'} align='center' vertical>
            <PlusOutlined />
            Upload
          </Flex>
        </Upload>
      </FullWidthItem>
    </>
  );
};

export default ThumbUpload;
