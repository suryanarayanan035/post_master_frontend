'use client';

import Image from 'next/image';
import PlanCards from '@components/PlanCards';
import { redirect } from 'next/navigation';
import axios from 'axios';
import { HOME_PAGE_CARDS, PLAN_CARDS } from '@/app/siteData';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';

const heroImageStyles = {
  background: 'url("/hero_image.jpg")',
  width: '100%',
  height: '300px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};
export default function Home() {
  const onClickCreateAccount = (accountType) => {
    axios.get(
      `http://localhost:8000/external_app/authorize?account_type=${accountType}`,
      {
        headers: {
          Authorization: 'Token 6cfcc719bec30fe22cb52fbc7d69ca21e2f70695abe6f0b12b7ef9b28732cfe2',
        },
      },
    );
  };
  return (
    <div className="m-auto grid w-70 auto-cols-fr">
      <div className="mb-4 text-lg font-medium">
        <div style={heroImageStyles} />
        <h3 className="my-2 text-center text-4xl uppercase">POST MASTER</h3>
        Welcome to
        {' '}
        <b>Post master</b>
        ! Managing multiple social media accounts
        can be overwhelming, but with our platform, you can schedule and manage
        posts across multiple platforms seamlessly. Whether you're a content
        creator, brand, or business, Post Master makes it easy to stay
        consistent and grow your online presence.
      </div>
      <h3 className="mb-1 text-4xl font-bold">Our features</h3>
      <div className="flex gap-2 bg-white">
        {HOME_PAGE_CARDS.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <Image
                className="mx-auto text-center"
                src={card.imageURL}
                alt={card.alt}
                width={150}
                height={150}
              />
              <CardTitle className="text-center">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="font-medium">
              {card.description}
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <h3 className="my-4 text-4xl font-bold">Get Started</h3>
        <PlanCards cards={PLAN_CARDS} onClickCTA={onClickCreateAccount} />
      </div>
    </div>
  );
}
