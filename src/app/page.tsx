export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <main className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          React Principles
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          Next.js starter template with production-ready patterns.
        </p>
        <a
          href="https://reactprinciples.dev"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-300"
        >
          Learn More
        </a>
      </main>
    </div>
  );
}
