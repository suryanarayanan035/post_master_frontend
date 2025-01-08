import { PlansAPI } from '@APIs/PlansAPI';
import { PaymentButtons } from './PaymentButtons';

export default async function PaymentsPage() {
  const { data: plans } = await new PlansAPI().getPlans();
  return (
    <div>
      <script src="https://checkout.razorpay.com/v1/checkout.js" />
      <PaymentButtons plans={plans} />;
    </div>
  );
}
