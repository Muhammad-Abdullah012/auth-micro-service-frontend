const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 dark:bg-gray-900 gap-4">
      {children}
    </div>
  );
};

export default ProfileLayout;
