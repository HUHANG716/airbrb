import React, { createContext, useState, useContext, useEffect } from 'react';

import { Listing, ListingSlim } from '../../../types/listing';
import { useGlobalComponents } from '../../../context/GlobalComponentsContext/GlobalComponentsContext';
import apiReq from '../../../utils/apiReq';
import { useUser } from '../../../context/UserContext/UserContext';
import { Id } from '../../../types/global';
import { isEquivalent } from '../../../utils/utils';

interface HostedContextType {
  listings: Listing[];
  listingsMy: Listing[];
  listingDel: (listingId: Id) => void;
  reloadHosted: () => void;
  getOneListing: (listingId: Id) => Listing | undefined;
}

const HostedContext = createContext<HostedContextType>({
  listings: [],
  listingsMy: [],
  listingDel: () => {
    // not initialized
  },
  reloadHosted: () => {
    // not initialized
  },
  getOneListing: () => {
    // not initialized
    return undefined;
  },
});

const useHosted = () => useContext(HostedContext);

const HostedProvider = ({ children }: { children: React.ReactNode }) => {
  const { notify } = useGlobalComponents();
  const { userInfo } = useUser();
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingsMy, setListingsMy] = useState<Listing[]>([]);

  const getListingsThin = async (): Promise<ListingSlim[]> => {
    let res: ListingSlim[] = [];
    try {
      const response = await apiReq.get<{ listings: ListingSlim[] }>('/listings');
      res = response.data.listings;
    } catch (err) {
      notify.error(err as string);
    }
    return res;
  };

  const getListingsDetails = async (listingsThin: ListingSlim[]): Promise<Listing[]> => {
    let res: Listing[] = [];
    try {
      const responses = await Promise.all(listingsThin.map((listing) => apiReq.get<{ listing: Listing }>(`/listings/${listing.id}`)));
      res = responses.map((response, index) => ({
        ...response.data.listing,
        id: listingsThin[index].id,
      }));
    } catch (err) {
      notify.error(err as string);
    }
    return res;
  };
  const listingDel = async (listingId: Id) => {
    try {
      await apiReq.delete(`/listings/${listingId}`);
      getHosted();
    } catch (err) {
      notify.error(err as string);
    }
  };
  const getHosted = async () => {
    try {
      const listingsThin = await getListingsThin();
      const detailedListings = await getListingsDetails(listingsThin);
      console.log(detailedListings);

      setListings(detailedListings);
      setListingsMy(detailedListings.filter((listing) => listing.owner === userInfo?.email));
    } catch (err) {
      notify.error(err as string);
    }
  };
  const getOneListing = (listingId: Id) => {
    return listingsMy.find((listing) => isEquivalent(listing.id, listingId));
  };
  useEffect(() => {
    userInfo && getHosted();
  }, [userInfo]);

  const ctx: HostedContextType = {
    listings,
    listingsMy,
    listingDel,
    reloadHosted: getHosted,
    getOneListing,
  };

  return <HostedContext.Provider value={ctx}>{children}</HostedContext.Provider>;
};
export { HostedProvider, useHosted };
