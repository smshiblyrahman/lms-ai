export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Sanity App SDK Testing</h1>
        <p className="text-muted-foreground mb-8">
          Test the realtime capabilities of the Sanity App SDK
        </p>

        <div className="grid gap-4">
          <a
            href="/notes"
            className="border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">📝 Notes Demo</h2>
            <p className="text-muted-foreground">
              View and test realtime note updates
            </p>
          </a>

          <a
            href="/studio"
            className="border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">🎨 Studio</h2>
            <p className="text-muted-foreground">
              Create and edit content in Sanity Studio
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
