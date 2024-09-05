import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/payment')({
  component: () => <div>Hello /payment!</div>
});
