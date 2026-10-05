import AuthGuard from '@/components/auth/auth.guard';
import { ReactNode } from 'react';

const layout = ({children}: {children: ReactNode}) => {
  return (
    <AuthGuard> {children}
    </AuthGuard>
  );
};

export default layout;