import { Login } from "@/features/auth/login";

export const LoginPage = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      <div
        style={{ backgroundImage: "url(/src/shared/assets/bg.jpeg)" }}
        className=" bg-cover relative hidden lg:block"
      >
        <div className="absolute w-full h-full bg-[#00335d75]"></div>
      </div>
      <div
        className="flex  bg-white justify-center items-center"
        style={{
          backgroundImage: "url(/src/shared/assets/loginBg.avif)",
          backgroundSize: "cover",
        }}
      >
        <Login />
      </div>
    </div>
  );
};
