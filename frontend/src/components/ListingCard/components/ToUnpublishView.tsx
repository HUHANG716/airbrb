import React from 'react';
import { Availability } from '../../../types/listing';
import { Button, Flex, Typography } from 'antd';
import styled from 'styled-components';
import apiReq from '../../../utils/apiReq';

import { useGlobalComponents } from '../../../context/GlobalComponentsContext/GlobalComponentsContext';
import { useHosted } from '../../../context/HostedContext/HostedContext';
import { useListingCard } from '../ListingCard';
import { nanoid } from 'nanoid';

type Props = {
  availability: Availability[] | undefined;
  closePopover: () => void;
};
const Item = styled(Typography.Text)`
  cursor: default;
`;
const UnpublishButton = styled(Button)`
  width: 6rem;
`;
const ToUnpublishView = ({ availability, closePopover }: Props) => {
  const { notify } = useGlobalComponents();
  const { reloadHosted } = useHosted();
  const { id, viewer } = useListingCard();
  const handleUnpublish = async () => {
    try {
      apiReq.put(`/listings/unpublish/${id}`);
      notify.success('Listing unpublished');
      reloadHosted();
      closePopover();
    } catch (err) {
      notify.error(err as string);
    }
  };
  return (
    <Flex
      vertical
      gap={'middle'}
      align='center'>
      {availability?.map(({ start, end }) => {
        return (
          <Item key={nanoid()}>
            {start} - {end}
          </Item>
        );
      })}
      {!availability?.length && <Item>No available dates</Item>}
      {viewer === 'owner' && (
        <UnpublishButton
          onClick={handleUnpublish}
          size='small'
          type='primary'
          danger>
          Unpublish
        </UnpublishButton>
      )}
    </Flex>
  );
};

export default ToUnpublishView;
