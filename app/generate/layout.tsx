export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="workspace-height">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-full">
        {children}
      </div>
    </div>
  );
}
