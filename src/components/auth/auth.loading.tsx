import { LoaderIcon } from 'lucide-react';


const AuthLoading = ({lavel = "Verifying Account"} : {lavel?: string}) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex items-center gap-3">
        <LoaderIcon className="size-8 animate-spin" />
        <span className='text-xl'>{lavel}</span>
      </div>
    </div>
  );
};

export default AuthLoading;