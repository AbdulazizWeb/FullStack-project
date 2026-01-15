import { Login } from "@/features/auth/login";
import bg from "@/shared/assets/bg.jpeg";
import bgRight from "@/shared/assets/loginBg.avif";

export const LoginPage = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className=" bg-cover relative hidden lg:block"
      >
        <div className="absolute w-full h-full bg-[#00335d75]"></div>
      </div>
      <div
        className="flex  bg-white justify-center items-center"
        style={{
          backgroundImage: `url(${bgRight})`,
          backgroundSize: "cover",
        }}
      >
        <Login />
      </div>
    </div>
  );
};
