// import { PaperAirplaneIcon } from "@heroicons/react/solid";
import Heading from '@components/Heading';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <div className="mt-1 flex justify-between px-4">
      <div className="flex">
        {/*     <PaperAirplaneIcon className="size-6 rotate-325" /> */}
        <Heading>Post Master</Heading>
      </div>
      <div className="actions flex gap-2">
        <Button variant="outline">Post Master Pro</Button>
        <Button>Login</Button>
      </div>
    </div>
  );
}
