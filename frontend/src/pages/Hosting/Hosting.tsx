import React from 'react';
import { ListingCreateForm, ListingCreateRequest, NewListingResponse } from '../../types/listing';
import apiReq from '../../utils/apiReq';
import { useGlobalComponents } from '../../context/GlobalComponentsContext/GlobalComponentsContext';
import { useNavigate } from 'react-router-dom';
import ListingForm from '../../components/ListingForm/ListingForm';
import { useForm } from 'antd/es/form/Form';
import { UploadFile } from 'antd';
import { useHosted } from '../../context/HostedContext/HostedContext';

const Hosting = () => {
  const { notify } = useGlobalComponents();
  const { reloadHosted } = useHosted();
  const [form] = useForm<ListingCreateForm>();
  const nav2 = useNavigate();

  const handleFinish = async () => {
    const { title, city, street, amenities, bedrooms, numBathrooms, price, propertyType, thumbs } = form.getFieldsValue();
    const thumbUrls = thumbs.fileList.map((file: UploadFile) => file.thumbUrl as string);
    const requestBody: ListingCreateRequest = {
      title,
      thumbnail: thumbUrls[0] || '',
      price,
      address: {
        city,
        street,
      },
      metadata: {
        propertyType,
        numBathrooms,
        bedrooms,
        amenities,
        otherPictures: thumbUrls.slice(1),
      },
    };

    try {
      const res = await apiReq.post<NewListingResponse>('/listings/new', requestBody);
      notify.success('Listing created successfully!');

      reloadHosted();
      nav2('/listing/hosted');
    } catch (err) {
      notify.error(err as string);
    }
  };

  return (
    <ListingForm
      handleFinish={handleFinish}
      form={form}></ListingForm>
  );
};

export default Hosting;
