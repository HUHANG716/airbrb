import React, { useState } from 'react';
import { Popover } from 'antd';
import { useHosted } from '../../../context/HostedContext/HostedContext';
import ToPublishView from './ToPublishView';
import ToUnpublishView from './ToUnpublishView';
import { useListingCard } from '../ListingCard';
import { ResponsiveTextPure } from '../../../styles/GlobalStyle';
import { handleEnter } from '../../../utils/utils';

const PublishedDropdown = () => {
  const { id } = useListingCard();
  const [open, setOpen] = useState(false);
  const { getOneListing } = useHosted();
  const availability = getOneListing(id)?.availability;
  const isAvailable = Boolean(availability?.length);
  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };
  // eslint-disable-next-line
  const Content = () => {
    let res;
    isAvailable &&
      (res = (
        <ToUnpublishView
          closePopover={() => setOpen(false)}
          availability={availability}
        />
      ));
    !isAvailable && (res = <ToPublishView />);
    return res;
  };
  return (
    <Popover
      onOpenChange={handleOpenChange}
      open={open}
      content={Content}
      trigger={['click']}>
      <ResponsiveTextPure
        role='button'
        tabIndex={0}
        onKeyDown={(e) => handleEnter(e, () => setOpen(true))}>
        {isAvailable ? 'View Available' : 'Publish'}
      </ResponsiveTextPure>
    </Popover>
  );
};

export default PublishedDropdown;
