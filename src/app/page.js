import Image from 'next/image';
import { extractErrorMessage } from '@lib/utils';
import { PlansAPI } from '@APIs/PlansAPI';
import { HOME_PAGE_CARDS } from '@/app/siteData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HomePagePlanCards from './HomePagePlanCards';

const heroImageStyles = {
  background: 'url("/hero_image.jpg")',
  width: '100%',
  height: '300px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};
export default async function Home() {
  const response = await new PlansAPI().getPlans();
  let { data: plans } = response;
  const { error } = response;
  if (error) {
    // eslint-disable-next-line no-console
    console.error(extractErrorMessage(error));
    plans = [];
  }
  plans = plans.map((plan) => ({
    ...plan,
    description: plan.description.split('\n'),
  }));
  return (
    <div className="m-auto grid w-70 auto-cols-fr">
      <div className="mb-4 text-lg font-medium">
        <div style={heroImageStyles} />
        <h3 className="my-2 text-center text-4xl uppercase">POST MASTER</h3>
        Welcome to <b>Post master</b>! Managing multiple social media accounts
        can be overwhelming, but with our platform, you can schedule and manage
        posts across multiple platforms seamlessly. Whether you&apos;re a
        content creator, brand, or business, Post Master makes it easy to stay
        consistent and grow your online presence.
      </div>
      <h3 className="mb-1 text-4xl font-bold">Our features</h3>
      <div className="flex gap-2 bg-white">
        {HOME_PAGE_CARDS.map((card) => (
          // TODO:use proepr key below
          <Card key={card.title}>
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
        <HomePagePlanCards plans={plans} />
      </div>
    </div>
  );
}
