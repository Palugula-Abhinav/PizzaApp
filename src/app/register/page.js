"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [creatingUser, setCreatingUser] = useState(false);
  let [errorOccured, setErrorOccuered] = useState(false);
  const { push } = useRouter();
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setCreatingUser(true);
    let response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await response.json();
    if (res.status == "success") {
      setCreatingUser(false);
      setErrorOccuered(false);
      push("/login");
    } else {
      setErrorOccuered(true);
      setCreatingUser(false);
    }
    console.log(res);
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      <form
        className="flex flex-col items-center gap-2 max-w-sm mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          onChange={async (ev) => {
            await setEmail(ev.target.value);
          }}
          required={true}
          disabled={creatingUser}
          placeholder="Email"
          className="bg-gray-100 px-4 py-2 box-border rounded-md disabled:bg-gray-600 focus:border focus:border-1 focus:border-sky-500 focus:outline-none invalid:border invalid:border-1 invalid:border-red-500 invalid:outline-none w-full "
        />
        <input
          type="password"
          name="password"
          disabled={creatingUser}
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
          placeholder="Password"
          className="bg-gray-100 px-4 py-2 box-border disabled:bg-gray-600 rounded-md focus:border focus:border-1 focus:border-sky-500 focus:outline-none w-full"
        />
        <button
          type="submit"
          className="bg-primary w-full text-white rounded-md py-2 hover:bg-red-500"
          disabled={creatingUser}
        >
          Register
        </button>
        <p className="text-center w-full text-gray-500 font-medium my-3">
          or login with provider
        </p>
        <button
          type="button"
          onClick={() => {
            signIn("google");
          }}
          className="bg-gray-100  w-full rounded-md py-2 hover:bg-gray-200 transition-colors flex items-center justify-center gap-4"
        >
          <Image src={"/google.svg"} width={37} height={37}></Image>
          Login with google
        </button>
        <button
          type="button"
          onClick={() => {
            signIn("facebook");
          }}
          className="bg-gray-100  w-full rounded-md py-2 hover:bg-gray-200 transition-colors flex items-center justify-center gap-4"
        >
          <Image src={"/facebook.svg"} width={37} height={37}></Image>
          Login with facebook
        </button>
        {errorOccured ? (
          <p className="text-gray-600-600">
            Existing Account?{" "}
            <Link href="/login" className="underline">
              Login here &raquo;
            </Link>
          </p>
        ) : (
          <></>
        )}
      </form>
    </section>
  );
};
