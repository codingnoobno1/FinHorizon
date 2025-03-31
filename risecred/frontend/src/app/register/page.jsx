import RegisterForm from "@/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* 🔹 Header Section */}
      <header className="w-full bg-blue-600 py-4 text-center text-white text-2xl font-semibold shadow-md">
        Welcome to Our Platform 🚀
      </header>

      {/* 🔹 Register Form */}
      <div className="mt-8 w-full max-w-lg px-6">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
