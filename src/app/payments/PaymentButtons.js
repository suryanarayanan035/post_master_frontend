'use client';

import { PaymentsAPI } from '@APIs/PaymentsAPI';
import { extractErrorMessage } from '@lib/utils';
import { Button } from '@/components/ui/button';

export function PaymentButtons({ plans }) {
  const createOrder = async ({ id: planID, name, amount }) => {
    const {
      error,
      data: { order_id_in_payment_gateway: orderID },
    } = await new PaymentsAPI().createOrder(planID);
    if (error) {
      // eslint-disable-next-line no-undef, no-alert
      alert(extractErrorMessage(error));
      return;
    }
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY_ID,
      amount,
      name: `BUY PLAN ${name}`,
      order_id: orderID,
      callback_url: process.env.NEXT_PUBLIC_RAZORPAY_CALLBACK_URL,
    };
    // eslint-disable-next-line no-undef
    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="flex flex-col gap-2">
      {plans.map(({ id, name, price }) => (
        <Button
          onClick={() => {
            createOrder({ id, name, amount: price });
          }}
          key={id}
        >
          {' '}
          Buy {name}{' '}
        </Button>
      ))}
    </div>
  );
}

export default PaymentButtons;
