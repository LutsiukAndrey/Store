export default function AuthLoyout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("");
  return (
    <div className="flex items-center justify-center h-full ">{children}</div>
  );
}
