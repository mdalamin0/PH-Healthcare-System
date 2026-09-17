import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const GoogleLoginComponent = () => {
  const {mutate: googleLogin} = useGoogleOAuth();
  const router = useRouter();

    const handleGoogleSuccess = (credentialResponse: {
      credential?: string;
    }) => {
      const idToken = credentialResponse.credential;
      if(!idToken){
        toast.error("Google OAuth Failed.")
        return;
      }
  
      googleLogin({idToken}, {
        onSuccess: () => {
          toast.success("Logged in successfully.")
          router.push("/")
        },
        onError: (err) => {
          toast.error(err.message || "Google OAuth Failed. Please try again.")
        }
      })
    };
  
    const handleGoogleError = () => {
      toast.error("Google OAuth Failed.");
    };
  return (
    <GoogleLogin
      text="continue_with"
      shape="pill"
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    ></GoogleLogin>
  );
};

export default GoogleLoginComponent;