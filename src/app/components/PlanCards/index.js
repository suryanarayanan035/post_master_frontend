'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function PlanCard(props) {
  const {
    name,
    price,
    description,
    buttonText,
    className,
    onClickCTA,
    id: planID,
  } = props;
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-center">
          {name}
          <p className="inline text-blue-700">{price}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <ul>
            {description.map((feature) => (
              <li key={feature}>
                <p className="inline pl-4 text-blue-500">&#10004;</p>
                {feature}
              </li>
            ))}
          </ul>
          <div className="my-4 text-center">
            <Button
              onClick={() => {
                onClickCTA({ planID });
              }}
            >
              {buttonText}
            </Button>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
export default function PlanCards(props) {
  const { plans, onClickCTA } = props;
  return (
    <div className="flex">
      {plans.map((plan) => (
        <PlanCard
          {...plan}
          buttonText={`BUY ${plan.name}`}
          key={plan.id}
          className="grow"
          onClickCTA={onClickCTA}
        />
      ))}
    </div>
  );
}
