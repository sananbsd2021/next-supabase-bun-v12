"use client";
import { useState } from "react";

export default function Fetch() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    // This will prevent page refresh
    e.preventDefault();

    // replace this with your own unique endpoint URL
    fetch("/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email, message: message, name: name }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setSubmitted(true);
        } else {
          setError(res.message);
        }
      })
      .catch((error) => setError(error.toString()));
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (submitted) {
    return <p>We've received your message, thank you for contacting us!</p>;
  }

  return (
    <form onSubmit={submit}>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-3 block text-base font-medium text-black"
        >
          Name :
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 
        text-base font-medium text-gray-700 outline-none focus:border-purple-500
         focus:shadow-md"
          required
        />

        <label
          htmlFor="email"
          className="mb-3 block text-base font-medium text-black"
        >
          Email :
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 
        text-base font-medium text-gray-700 outline-none focus:border-purple-500
         focus:shadow-md"
          required
        />

        <label
          htmlFor="message"
          className="mb-3 block text-base font-medium text-black"
        >
          Message :
        </label>
        <textarea
          id="message"
          value={message}
          className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 
        text-base font-medium text-gray-700 outline-none focus:border-purple-500
         focus:shadow-md"
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="hover:shadow-form rounded-md bg-purple-500 py-3 px-8 text-base font-semibold text-white outline-none">
          Submit
        </button>
      </div>
    </form>
  );
}
