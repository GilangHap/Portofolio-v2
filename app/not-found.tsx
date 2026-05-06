import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-black text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">
          Page Not Found
        </h2>
        <p className="text-text-secondary max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-black font-bold rounded hover:bg-primary-muted transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
