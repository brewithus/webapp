import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { rubikFont } from '@/styles/fonts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

interface Review {
  id: number;
  user: string;
  location: string;
  review: string;
  date: string; // Added date as a string
  rating: number;
}

const TestimonialsSection: React.FC = () => {
  // Sample testimonials data
  const testimonials: Review[] = [
    {
      id: 1,
      user: 'Alex Johnson',
      review:
        'Finding my favorite coffee spot has never been easier! The recommendations are spot on.',
      location: 'New York, NY',
      date: '2023-01-15',
      rating: 5,
    },
    {
      id: 2,
      user: 'Maria Garcia',
      review:
        "I love the variety of options and the detailed reviews. I've discovered so many new places.",
      location: 'Los Angeles, CA',
      date: '2024-02-27',
      rating: 4.5,
    },
    {
      id: 3,
      user: 'David Smith',
      review:
        'The user interface is so easy to navigate, and I appreciate the personalized recommendations.',
      location: 'Chicago, IL',
      date: '2024-01-01',
      rating: 3.5,
    },
    {
      id: 4,
      user: 'John Doe',
      review:
        'This app has revolutionized the way I find coffee shops! Absolutely love it!',
      location: 'Toronto, ON',
      date: '2023-10-25',
      rating: 5,
    },
    {
      id: 5,
      user: 'Ethan Wong',
      review:
        'Phenomenal recommendations! Found my all-time favorite spot through this app.',
      location: 'Miami, FL',
      date: '2023-03-18',
      rating: 4,
    },
    {
      id: 6,
      user: 'Isabella Singh',
      review:
        'Every coffee lover needs this app. The curated lists are a lifesaver.',
      location: 'Tokyo, JP',
      date: '2023-07-26',
      rating: 5,
    },
  ];

  return (
    <section className="justify-center rounded-lg px-4 py-12 md:px-8">
      <h2
        className={`mb-4 py-2 text-center text-5xl font-bold ${rubikFont.className}`}
      >
        See What Our Users Say
      </h2>
      <div className="px-12">
        <Carousel>
          <CarouselContent className="items-center">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ReviewCard review={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;

interface ReviewCardProps {
  review: Review;
}
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card className="max-w-xs border-2 bg-secondary/50 p-2 sm:max-w-full">
      <CardHeader>
        <CardTitle>{review.user}</CardTitle>
        <StarRating rating={review.rating} />

        <CardDescription>{review.location}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-6">
        <p className="text-muted-foreground">{review.review}</p>
      </CardContent>
      <CardFooter className="flex justify-end ">
        <p className="text-sm text-primary">Posted on {review.date}</p>
      </CardFooter>
    </Card>
  );
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => {
        const roundedRating = Math.round(rating * 2) / 2; // Round to nearest half
        if (index + 1 <= roundedRating) {
          // Full star
          return <span key={index}>⭐</span>;
        } else if (index < roundedRating) {
          // Half star
          return <span key={index}>⭐</span>; // Replace with half-star icon if available
        } else {
          // Empty star
          return <span key={index}>☆</span>;
        }
      })}
    </div>
  );
};
