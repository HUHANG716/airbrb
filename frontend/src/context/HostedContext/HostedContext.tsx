import React, { createContext, useState, useContext, useEffect } from 'react';
import { Listing, ListingSlim } from '../../types/listing';
import { useGlobalComponents } from '../GlobalComponentsContext/GlobalComponentsContext';
import apiReq from '../../utils/apiReq';
import { useUser } from '../UserContext/UserContext';
import { Id } from '../../types/global';
import { isEquivalent, sortByAlphabet } from '../../utils/utils';

interface HostedContextType {
  listings: Listing[];
  listingsMy: Listing[];
  listingsPublished: Listing[];
  listingDel: (listingId: Id) => void;
  reloadHosted: () => void;
  getOneListing: (listingId: Id) => Listing | undefined;
}

const HostedContext = createContext<HostedContextType>({
  listings: [],
  listingsMy: [],
  listingsPublished: [],
  listingDel: () => {
    // init
  },
  reloadHosted: () => {
    // init
  },
  getOneListing: () => {
    // init
    return undefined;
  },
});

const useHosted = () => useContext(HostedContext);

const HostedProvider = ({ children }: { children: React.ReactNode }) => {
  const { notify } = useGlobalComponents();
  const { userInfo } = useUser();
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingsMy, setListingsMy] = useState<Listing[]>([]);
  const [listingsPublished, setListingsPublished] = useState<Listing[]>([]);
  const getListingsThin = async (): Promise<ListingSlim[]> => {
    let res: ListingSlim[] = [];
    const response = await apiReq.get<{ listings: ListingSlim[] }>('/listings');
    res = response.data.listings;
    return res;
  };

  const getListingsDetails = async (listingsThin: ListingSlim[]): Promise<Listing[]> => {
    let res: Listing[] = [];
    try {
      const responses = await Promise.all(listingsThin.map((listing) => apiReq.get<{ listing: Listing }>(`/listings/${listing.id}`)));
      res = responses.map((response, index) => ({
        ...response.data.listing,
        id: (listingsThin[index] as Listing).id,
      }));

      res = sortByAlphabet(res, (listing) => listing.title);
    } catch (err) {
      notify.error(err as string);
    }
    return res;
  };
  const listingDel = async (listingId: Id) => {
    try {
      await apiReq.delete(`/listings/${listingId}`);
      getHosted();
      notify.success('Listing deleted successfully!');
    } catch (err) {
      notify.error(err as string);
    }
  };
  const getHosted = async () => {
    try {
      const listingsThin = await getListingsThin();
      const detailedListings = await getListingsDetails(listingsThin);
      setListings(detailedListings);
      setListingsMy(detailedListings.filter((listing) => listing.owner === userInfo?.email));
      setListingsPublished(detailedListings.filter((listing) => listing.published));
    } catch (err) {
      notify.error(err as string);
    }
  };
  const getOneListing = (listingId: Id) => {
    return listings.find((listing) => isEquivalent(listing.id, listingId));
  };

  useEffect(() => {
    getHosted();
  }, [userInfo]);

  const ctx: HostedContextType = {
    listings,
    listingsMy,
    listingsPublished,
    listingDel,
    reloadHosted: getHosted,
    getOneListing,
  };

  return <HostedContext.Provider value={ctx}>{children}</HostedContext.Provider>;
};
export { HostedProvider, useHosted };
