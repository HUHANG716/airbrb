// import React, { useState, useRef } from 'react';
// import { Id } from '../../../types/global';
// import { Button, Dropdown, MenuProps, DatePicker } from 'antd';
// import apiReq from '../../../utils/apiReq';
// import { useGlobalComponents } from '../../../context/GlobalComponentsContext/GlobalComponentsContext';
// import { useHosted } from '../../../pages/Hosted/context/HostedContext';
// import { RiArrowDropDownLine } from 'react-icons/ri';
// import styled from 'styled-components';
// import { flexCenter } from '../../../styles/FlexStyle';
// import { Availability } from '../../../types/listing';

// type Props = {
//   id: Id;
// };
// const Available = styled(Button)`
//   ${flexCenter}
//   font-size: 1rem;
//   align-items: center;
// `;

// const PublishButton = ({ id }: Props) => {
//   const [open, setOpen] = useState(false);
//   const { notify } = useGlobalComponents();
//   const { getOneListing, reloadHosted } = useHosted();
//   const availability = getOneListing(id)?.availability;
//   const [items, setItems] = useState<MenuProps['items'] | []>(
//     availability?.map((date) => ({
//       key: date.from,
//       label: `${date.from} - ${date.to}`,
//     })) || []
//   );
//   const dateRef = useRef<Availability>();

//   const handleMenuClick: MenuProps['onClick'] = (e) => {
//     if (e.key === '3') {
//       setOpen(false);
//     }
//   };
//   const handleOpenChange = (flag: boolean) => {
//     setOpen(flag);
//   };
//   const handleChange = (_: unknown, dateString: [string, string]) => {
//     dateRef.current = {
//       from: dateString[0],
//       to: dateString[1],
//     };
//   };

//   // eslint-disable-next-line
//   const handleSubmit = async () => {
//     console.log(getOneListing(id));
//     try {
//       await apiReq.put(`/listings/publish/${id}`, {
//         availability: [...(availability || []), dateRef.current],
//       });
//       reloadHosted();
//       notify.success('Listing published');
//     } catch (err) {
//       notify.error(err as string);
//     }
//   };

//   const itemsAll: MenuProps['items'] = [
//     ...(items || []),
//     {
//       key: 'all',
//       label: (
//         <>
//           <DatePicker.RangePicker format={'DD/MM/YYYY'} onChange={handleChange} />
//           <Button shape='circle'>+</Button>
//         </>
//       ),
//     },
//     {
//       key: 'all',
//       label: (
//         <Button
//           onClick={() => {
//             setItems([
//               ...(items || []),
//               {
//                 key: 'all',
//                 label: (
//                   <>
//                     <DatePicker.RangePicker format={'DD/MM/YYYY'} onChange={handleChange} />
//                     <Button shape='circle'>+</Button>
//                   </>
//                 ),
//               },
//             ]);
//           }}
//           shape='circle'>
//           +
//         </Button>
//       ),
//     },
//   ];

//   // eslint-disable-next-line

//   return (
//     <Dropdown onOpenChange={handleOpenChange} open={open} menu={{ items: itemsAll, onClick: handleMenuClick }} trigger={['click']}>
//       <Available>
//         Manage Available <RiArrowDropDownLine size={28} />
//       </Available>
//     </Dropdown>
//   );
// };

// export default PublishButton;
