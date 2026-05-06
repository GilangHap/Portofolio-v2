export default function PublicLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden px-10 lg:px-20">
        <div className="space-y-4">
          <div className="h-20 w-48 bg-surface rounded animate-pulse" />
          <div className="h-28 w-full max-w-3xl bg-surface rounded animate-pulse" />
          <div className="h-28 w-full max-w-2xl bg-surface rounded animate-pulse" />
        </div>
      </section>

      {/* About Skeleton */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-24 bg-surface rounded animate-pulse mb-4" />
          <div className="h-10 w-72 bg-surface rounded animate-pulse mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-4 w-full bg-surface rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-surface rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-surface rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-36 bg-surface border border-border rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
