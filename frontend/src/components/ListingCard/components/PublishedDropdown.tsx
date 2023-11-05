import React, { useState } from 'react';
import { Popover } from 'antd';
import { useHosted } from '../../../pages/Hosted/context/HostedContext';

import ToPublishView from './ToPublishView';
import ToUnpublishView from './ToUnpublishView';
import { useListingCard } from '../ListingCard';
import styled from 'styled-components';

const NoAvailableDates = styled.div`
  cursor: default;
  color: #ff4d4f;
`;
const PublishedDropdown = () => {
  const { id, viewer } = useListingCard();
  const [open, setOpen] = useState(false);
  const { getOneListing } = useHosted();
  const availability = getOneListing(id)?.availability;
  const isAvailable = Boolean(availability?.length);
  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  const triggerResult: Record<
    string,
    () => {
      text: React.ReactNode;
      popover: React.ReactNode;
    }
  > = {
    common: () => ({
      text: isAvailable ? 'View Available Dates' : <NoAvailableDates>No Available Dates</NoAvailableDates>,
      popover: isAvailable && <ToUnpublishView closePopover={() => setOpen(false)} availability={availability} />,
    }),
    owner: () => ({
      text: isAvailable ? 'Available' : 'Publish',
      popover: isAvailable ? <ToUnpublishView closePopover={() => setOpen(false)} availability={availability} /> : <ToPublishView />,
    }),
  };
  const { popover, text } = triggerResult[viewer]();
  return (
    <Popover destroyTooltipOnHide onOpenChange={handleOpenChange} open={open} content={popover} trigger={['click']}>
      {text}
    </Popover>
  );
};

export default PublishedDropdown;
