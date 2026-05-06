export default function ProjectDetailLoading() {
  return (
    <article className="pb-24 bg-background min-h-screen animate-pulse">
      {/* Hero Header Skeleton */}
      <header className="relative pt-32 pb-20 border-b border-border bg-surface/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-32 bg-surface rounded mb-8" />
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-6 w-8 bg-surface rounded" />
            <div className="h-px w-12 bg-surface" />
          </div>
          <div className="h-14 w-3/4 bg-surface rounded mb-6" />
          <div className="h-6 w-2/3 bg-surface rounded" />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">
        {/* Overview Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-3">
              <div className="h-8 w-48 bg-surface rounded" />
              <div className="h-4 w-full bg-surface rounded" />
              <div className="h-4 w-5/6 bg-surface rounded" />
            </div>
            <div className="space-y-3">
              <div className="h-8 w-36 bg-surface rounded" />
              <div className="h-4 w-full bg-surface rounded" />
              <div className="h-4 w-4/6 bg-surface rounded" />
            </div>
          </div>
          <div className="bg-surface border border-border p-6 rounded-lg h-fit space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-16 bg-background rounded" />
                <div className="h-4 w-24 bg-background rounded" />
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Skeleton */}
        <section>
          <div className="h-10 w-48 bg-surface rounded mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-surface border border-border p-6 rounded-lg h-40" />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
