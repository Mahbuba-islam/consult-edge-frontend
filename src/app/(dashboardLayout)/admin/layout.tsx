export default function AdminDashboardLayout({
  children,
  sidebar,
  navbar,
  content,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
  navbar: React.ReactNode
  content: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 border-r bg-white">
        {sidebar}
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="h-16 border-b bg-white">
          {navbar}
        </header>

        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          {content || children}
        </main>
      </div>
    </div>
  );
}