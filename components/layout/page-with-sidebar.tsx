// Reimplementação do arquivo page-with-sidebar.tsx

export default function PageWithSidebar() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        {/* Conteúdo principal */}
      </main>
    </div>
  );
}
