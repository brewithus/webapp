import { firebaseDB } from '@/config/firebase';
import type { YelpBiz, YelpBizDetails } from '@/types/yelp';

import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { type UseQueryResult, useQuery } from 'react-query';
import { findYelpBizDetails } from '../yelp/find-biz';

export const saveBiz = async (biz: YelpBiz | YelpBizDetails): Promise<void> => {
  const docRef = doc(firebaseDB, 'businesses', biz.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await setDoc(
      docRef,
      { ...biz, updated: serverTimestamp() },
      { merge: true },
    );
  } else {
    await setDoc(docRef, { ...biz, updated: serverTimestamp() });
  }
};

export const getBiz = async (id: string): Promise<YelpBizDetails | null> => {
  try {
    const docRef = doc(firebaseDB, 'businesses', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data()?.hours) {
      return docSnap.data() as YelpBizDetails;
    }
    const bizData = await findYelpBizDetails(id);

    await saveBiz(bizData);

    return (await getDoc(docRef)).data() as YelpBizDetails;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const useBizInfo = (
  id: string,
): UseQueryResult<YelpBizDetails, Error> => {
  return useQuery(
    ['biz', id],
    async () => {
      return await getBiz(id);
    },
    {
      enabled: !!id,
    },
  );
};
