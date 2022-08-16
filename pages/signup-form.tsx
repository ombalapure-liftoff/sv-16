import { useRouter } from "next/router";
import { useRef } from "react";
import Navbar from "../components/Navbar";

const SignUpPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  /**
   * Singup a user
   * @params FormEvent Object
   * @return void
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRef.current || !nameRef.current || !passwordRef.current) {
      return;
    }

    console.log(
      emailRef.current!.value,
      nameRef.current!.value,
      passwordRef.current.value
    );

    const user = {
      email: emailRef.current!.value,
      name: nameRef.current!.value,
      password: passwordRef.current.value,
    };

    if (window !== null) {
      localStorage.setItem("postit_user", JSON.stringify(user));
      router.replace("/");
    }

    formRef.current?.reset();
    if (window !== null || window !== undefined) {
      window.location.reload();
    }
  };
  return (
    <div>
      <Navbar />
      <div className="p-5 space-y-12 flex flex-col justify-between items-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 border-2 p-5 rounded-lg shadow-lg"
          ref={formRef}
        >
          <div className="flex">
            <input
              id="name"
              type="text"
              className="border-2 rounded focus:bg-slate-200 w-96 px-4 py-2"
              ref={nameRef}
              placeholder="Enter a name"
            />
          </div>
          <div className="flex">
            <input
              id="email"
              type="email"
              className="border-2 rounded focus:bg-slate-200 w-96 px-4 py-2"
              ref={emailRef}
              placeholder="Enter an email address"
            />
          </div>
          <div className="flex">
            <input
              id="password"
              type="password"
              className="border-2 rounded focus:bg-slate-200 w-96 px-4 py-2"
              ref={passwordRef}
              placeholder="Enter a password"
            />
          </div>
          <button
            type="submit"
            className="border-2 rounded-lg bg-green-900 text-white px-4 py-2 w-96 hover:bg-green-700"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
