import React, { useEffect, useMemo } from 'react';
import ListingForm from '../../components/ListingForm/ListingForm';
import { useNavigate, useParams } from 'react-router-dom';
import apiReq from '../../utils/apiReq';
import { useGlobalComponents } from '../../context/GlobalComponentsContext/GlobalComponentsContext';
import { UploadFile } from 'antd';
import { Listing, ListingCreateForm, ListingCreateRequest } from '../../types/listing';
import { useHosted } from '../../context/HostedContext/HostedContext';
import { useForm } from 'antd/es/form/Form';
import { nanoid } from 'nanoid';

const getFormData: (listing: Listing | undefined) => ListingCreateForm | undefined = (listing) => {
  if (!listing) {
    return undefined;
  }
  const { metadata, title, address, price, thumbnail } = listing;
  return {
    propertyType: metadata.propertyType,
    numBathrooms: metadata.numBathrooms,
    bedrooms: metadata.bedrooms,
    amenities: metadata.amenities,
    thumbs: {
      file: {
        uid: '[IMAGE]' + nanoid(),
        name: 'image',
      },
      fileList: [thumbnail, ...metadata.otherPictures].map((url) => ({
        uid: '[IMAGE]' + nanoid(),
        name: 'image',
        thumbUrl: url,
      })),
    },
    title,
    city: address.city,
    street: address.street,
    price,
  };
};
const ListingEdit = () => {
  const { id = '' } = useParams();
  const { notify } = useGlobalComponents();
  const { listingsMy, getOneListing, reloadHosted } = useHosted();
  const [form] = useForm<ListingCreateForm>();
  const nav2 = useNavigate();
  const listing = useMemo(() => getFormData(getOneListing(id)), [listingsMy, id]);
  useEffect(() => {
    listing && form.setFieldsValue(listing);
  }, [listing]);

  const getListingData = async () => {
    const { title, city, street, amenities, bedrooms, numBathrooms, price, propertyType, thumbs } = form.getFieldsValue();
    const thumbUrls = thumbs.fileList.map((file: UploadFile) => file.thumbUrl as string);
    const requestBody: ListingCreateRequest = {
      title,
      address: {
        city,
        street,
      },
      thumbnail: thumbUrls[0] || '',
      price,
      metadata: {
        propertyType,
        numBathrooms,
        bedrooms,
        amenities,
        otherPictures: thumbUrls.slice(1),
      },
    };
    try {
      await apiReq.put(`/listings/${id}`, requestBody);
      notify.success('Listing updated successfully!');
      reloadHosted();
      nav2('/listing/hosted');
    } catch (err) {
      notify.error(err as string);
    }
  };

  return (
    <ListingForm
      form={form}
      handleFinish={getListingData}
    />
  );
};

export default ListingEdit;
