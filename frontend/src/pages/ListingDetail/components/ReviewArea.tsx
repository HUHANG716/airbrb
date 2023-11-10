import { Button, Card, Flex, Form, Modal, Rate, Space } from 'antd';
import React, { useState } from 'react';
import { Title } from '../ListingDetail';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import TextArea from 'antd/es/input/TextArea';
import { Review } from '../../../types/listing';
import apiReq from '../../../utils/apiReq';

import { Booking } from '../../../types/booking';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { useGlobalComponents } from '../../../context/GlobalComponentsContext/GlobalComponentsContext';
import { useHosted } from '../../Hosted/context/HostedContext';

type Props = {
  reviews: Review[];
  currentBookingMyAccepted?: Booking | undefined;
};
const ReviewLeaving = styled(TextArea)``;
const ReviewArea = ({ reviews, currentBookingMyAccepted }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { reloadHosted } = useHosted();
  const [form] = useForm();
  const { notify } = useGlobalComponents();
  const toCloseModal = () => setIsModalOpen(false);
  const toOpenModal = () => setIsModalOpen(true);

  const handleOK = async () => {
    const { rate, review } = form.getFieldsValue();

    if (!currentBookingMyAccepted) return;
    const { listingId, id: bookingId, owner } = currentBookingMyAccepted;
    const requestBody: {
      review: Review;
    } = {
      review: {
        from: owner,
        rating: rate,
        comment: review,
      },
    };
    try {
      await apiReq.put(`/listings/${listingId}/review/${bookingId}`, requestBody);
      notify.success('Review submitted successfully!');
      reloadHosted();
    } catch (err) {
      notify.error(err as string);
    }

    toCloseModal();
  };

  return (
    <Flex vertical>
      <Flex justify='space-between'>
        <Modal
          destroyOnClose
          title='Leave a review'
          open={isModalOpen}
          onCancel={toCloseModal}
          onOk={handleOK}>
          <Flex
            vertical
            gap={'small'}>
            <Form form={form}>
              <FormItem
                noStyle
                name={'rate'}>
                <Rate />
              </FormItem>
              <FormItem
                noStyle
                name={'review'}>
                <ReviewLeaving
                  style={{
                    resize: 'none',
                  }}
                  rows={5}
                  maxLength={250}
                  showCount
                  placeholder='Leave your review'
                />
              </FormItem>
            </Form>
          </Flex>
        </Modal>
        <Title>Reviews</Title>
        {/* If there is a accepted booking and I have not reviewed */}
        {currentBookingMyAccepted && <Button onClick={toOpenModal}>Leave a review</Button>}
      </Flex>
      {reviews?.map(({ from, comment, rating }) => {
        return (
          <Card key={nanoid()}>
            <Space direction='vertical'>
              <Space>
                {`From: ${from}`}{' '}
                <Rate
                  disabled
                  defaultValue={rating}></Rate>
              </Space>
              {comment}
            </Space>
          </Card>
        );
      })}
    </Flex>
  );
};

export default ReviewArea;
