'use client';
import BrewReviews from '@/components/brew-reviews/reviews';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { googleSignInPopup } from '@/config/firebase';
import { useUser } from '@/context/UserContext';
import { createReview, getReviewsByBizID } from '@/hooks/firebase/review';
import type { BrewReview } from '@/types/brew';
import React from 'react';
import { toast } from 'sonner';
import SelectRatingStars from './select-rating';
import Image from 'next/image';
import { UserRoundCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { poppinsFont } from '@/styles/fonts';
import ReviewRatingDistributions from './rating-distributions';
import { ratingToExpression } from '@/lib/brew/rating';
import { Separator } from '@/components/ui/separator';

interface Props {
  bizID: string;
  bizName: string;
}

const BrewBizReviews: React.FC<Props> = ({ bizID, bizName }) => {
  const [reviews, setReviews] = React.useState<BrewReview[]>([]);
  const [reviewInput, setReviewInput] = React.useState('');
  const [reviewRating, setReviewRating] = React.useState<number | null>(null);

  const refreshReviews = (): void => {
    getReviewsByBizID(bizID)
      .then((data) => {
        setReviews(data);
      })
      .catch((e) => {
        console.log('error fetching reviews', e);
      });
  };

  React.useEffect(
    () => {
      refreshReviews();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { user } = useUser();

  const [isSubmittingReview, setIsSubmittingReview] = React.useState(false);

  const createReviewSubmit = (): void => {
    if (isSubmittingReview) {
      return;
    }
    setIsSubmittingReview(true);
    if (!user) {
      googleSignInPopup();
      return;
    }
    if (reviewInput === '') {
      toast.error('Cannot submit empty review!');
      return;
    }
    if (!reviewRating) {
      toast.error('Please select your review rating!');
      return;
    }
    createReview(user.uid, bizID, reviewInput, 5)
      .then(() => {
        toast.success('Review submitted! We thank you for your contribution.');
        refreshReviews();
      })
      .catch((e) => {
        toast.error('Failed to submit review');
      })
      .finally(() => {
        setIsSubmittingReview(false);
      });
  };

  const renderUser = (): React.ReactNode => {
    if (!user) {
      return (
        <div className="font-semibold">
          How was your experience with {bizName}?
        </div>
      );
    }
    return (
      <>
        <Image
          src={user.photoURL ?? '/logo.png'}
          alt="user avt"
          width={1024}
          height={1024}
          priority
          className="w-[50px] h-auto aspect-square object-cover rounded-full"
        />
        <div className="flex flex-col text-primary-light-foreground">
          <span className={cn('font-semibold', poppinsFont.className)}>
            {user.displayName}
          </span>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center text-sm gap-1 text-primary-light-foreground/50">
              <UserRoundCheck size={15} /> 0
            </div>
            {/* <div className="flex items-center text-sm gap-1 text-primary-light-foreground/50">
              <Icons.emptyStar size={16} /> 0
            </div> */}
          </div>
        </div>
      </>
    );
  };
  return (
    <div>
      <div className="grid w-full gap-1.5">
        <div className="p-4 rounded-sm flex flex-col gap-2 bg-primary-light/20 drop-shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center flex-none gap-2">
              {renderUser()}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <SelectRatingStars
                  initialRating={reviewRating ?? 0}
                  onChange={(rating) => {
                    setReviewRating(rating);
                  }}
                />
                <div className="text-sm text-foreground/80">
                  {reviewRating === null
                    ? 'Select your rating'
                    : ratingToExpression(reviewRating)}
                </div>
              </div>
              <div className="font-medium text-sm">
                Start your review of{' '}
                <span className="font-semibold">{bizName}</span>
              </div>
            </div>
          </div>
          {reviewRating && (
            <>
              <Separator className="w-full" />
              <div className="flex flex-col gap-2">
                <Textarea
                  value={reviewInput}
                  onChange={(e) => {
                    setReviewInput(e.target.value);
                  }}
                  placeholder="Type your review here."
                  id="review"
                  className="border-none max-h-[30vh]"
                />
                <Button
                  size={'sm'}
                  variant={'secondary'}
                  className="w-fit"
                  onClick={() => {
                    createReviewSubmit();
                  }}
                >
                  Submit my review
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="my-4">
          <ReviewRatingDistributions reviews={reviews} />
        </div>
      </div>
      <div>
        <BrewReviews bizName={bizName} reviews={reviews} />
      </div>
    </div>
  );
};

export default BrewBizReviews;
