import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return <div style={{ color: 'red', padding: '2rem' }}>Something went wrong: {error.message}</div>;
}

export default ErrorFallback;
