

export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-500">
      { children }
    </div>
  );
}