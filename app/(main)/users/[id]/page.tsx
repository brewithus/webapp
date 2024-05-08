'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/context/UserContext';
import { formatDistanceToNowStrict } from 'date-fns';
import {
  getReviewCategories,
  getReviewsWithBiz,
  useUserReviews,
} from '@/hooks/firebase/review';
import { useUserQuery } from '@/hooks/firebase/user';
import { cn } from '@/lib/utils';
import { poppinsFont } from '@/styles/fonts';
import { type ReviewWithBiz } from '@/types/brew';
import { type NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DisplayReviewStars from '../../_components/stars';
import { Button, buttonVariants } from '@/components/ui/button';
import ShareOnTwitter from '@/components/share-able/twitter';
import { sortReviews } from '@/lib/brew/reviews';
import Link from 'next/link';
import { googleSignOut } from '@/config/firebase';

interface PageProps {
  /**
   * The parameters passed to the page, including the id of the store.
   */
  params: {
    id: string;
  };
}

const Page: NextPage<PageProps> = ({ params }: PageProps): JSX.Element => {
  const { user: myUser, isLoaded } = useUser();
  const router = useRouter();

  const { data: reviews, isLoading: isLoadingReviews } = useUserReviews(
    params.id ?? '',
  );
  const { data: user, isLoading: isLoadingUser } = useUserQuery(params.id);

  const [reviewsWithBiz, setReviewWithBiz] = useState<ReviewWithBiz[]>([]);

  useEffect(() => {
    if (reviews) {
      getReviewsWithBiz(reviews)
        .then((data) => {
          setReviewWithBiz(data);
        })
        .catch((e) => {});
    }
  }, [reviews]);

  if (!isLoaded) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-[1024px] flex-col gap-4 p-6">
          <Skeleton className="h-24 w-full bg-black/50" />
          <Skeleton className="h-24 w-full bg-black/50" />
          <Skeleton className="h-24 w-full bg-black/50" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Skeleton className="h-[150px] w-[150px] bg-foreground/50" />;
  }

  return (
    <div className="flex  w-full items-center justify-center p-6">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex flex-none flex-col gap-3">
          {isLoadingUser ? (
            <Skeleton className="h-[150px] w-[150px] bg-foreground/50" />
          ) : (
            <>
              <div className="flex flex-col items-center gap-2 rounded-md border-0 p-4 md:border-2">
                <Image
                  src={user.photoURL ?? '/icon.png'}
                  alt="user avt"
                  width={1024}
                  height={1024}
                  className="aspect-square h-auto max-w-[150px] rounded-full border object-cover"
                />
                <div className={cn('text-xl font-bold', poppinsFont.className)}>
                  {user.displayName}
                </div>
              </div>
              {myUser?.uid === user.uid && (
                <div
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                  )}
                  onClick={() => {
                    googleSignOut();
                    router.push('/');
                  }}
                >
                  Logout
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex w-full flex-col gap-3">
          <Section title={`Review Distribution (${reviews?.length})`}>
            {isLoadingReviews || !reviews ? (
              <Skeleton className="h-12 w-full bg-foreground/50" />
            ) : (
              <div className="w-full rounded-md border p-4">
                {reviews.length === 0 ? (
                  <span className="font-medium">No review yet</span>
                ) : (
                  <div className="flex flex-col gap-2">
                    {getReviewCategories(reviewsWithBiz).map(
                      (category, index) => (
                        <div key={index} className="text-sm text-foreground/70">
                          {category.title} ({category.count})
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            )}
          </Section>
          <Section title="Recent Reviews">
            {isLoadingReviews || !reviews ? (
              <Skeleton className="h-12 w-full bg-foreground/50" />
            ) : (
              <div className="flex flex-col gap-3">
                {sortReviews(reviewsWithBiz).map((review, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 rounded-md border p-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <Link
                        href={`/business/${review.bizID}`}
                        className="items flex flex-none gap-2"
                      >
                        <Image
                          src={review.biz.image_url ?? '/icon.png'}
                          alt="biz img"
                          width={1024}
                          height={1024}
                          priority
                          className="aspect-square h-auto w-[50px] rounded-sm object-cover"
                        />
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold">
                            {review.biz.name}
                          </span>
                          <span className="text-sm font-medium text-foreground/80">
                            {review.biz.location.city},{' '}
                            {review.biz.location.state}
                          </span>
                        </div>
                      </Link>
                      <div className="text-sm font-medium">
                        {formatDistanceToNowStrict(
                          review.updated ?? review.created,
                          { addSuffix: true },
                        )}
                      </div>
                    </div>
                    <DisplayReviewStars
                      rating={review.rating}
                      className="text-primary"
                    />
                    <div className="border-l-2 pl-2 text-sm font-medium text-foreground/80">
                      {review.content}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <a href={`/business/${review.bizID}`}>
                        <Button variant={'secondary'} size={'sm'}>
                          Visit this business
                        </Button>
                      </a>
                      <ShareOnTwitter
                        url={`https://brewith.us/business/${review.bizID}#review_${review.id}`}
                        text={`Checkout this review for ${review.biz.name}!`}
                        className={cn(
                          buttonVariants({ variant: 'outline', size: 'sm' }),
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Page;

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className }) => {
  return (
    <div className="my-2 flex w-full flex-col gap-2">
      <div
        className={cn(
          'text-xl font-semibold capitalize',
          poppinsFont.className,
        )}
      >
        {title}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};
