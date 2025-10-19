"use client";

import React, { useRef, useState, useEffect } from "react";
import Socials from "./socials";

function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const RATE_LIMIT_DELAY = 60000;
  const STORAGE_KEY = "contact_form_last_submit";

  useEffect(() => {
    const storedTime = localStorage.getItem(STORAGE_KEY);
    if (storedTime) {
      const timeSinceLastSubmit = Date.now() - parseInt(storedTime);
      if (timeSinceLastSubmit < RATE_LIMIT_DELAY) {
        const remainingTime = RATE_LIMIT_DELAY - timeSinceLastSubmit;
        setCooldownTime(Math.ceil(remainingTime / 1000));
        setLastSubmitTime(parseInt(storedTime));
      }
    }
  }, []);

  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => {
        setCooldownTime(cooldownTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  const isRateLimited = () => {
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    return timeSinceLastSubmit < RATE_LIMIT_DELAY;
  };

  const validateInputs = () => {
    if (!form.current) {
      return false;
    }

    const userName = form.current.user_name.value.trim();
    const userEmail = form.current.user_email.value.trim();
    const message = form.current.message.value.trim();

    if (!userName || !userEmail || !message) {
      alert("All fields are required.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userEmail)) {
      alert("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  interface EmailFormElements extends HTMLFormControlsCollection {
    user_name: HTMLInputElement;
    user_email: HTMLInputElement;
    message: HTMLTextAreaElement;
  }

  interface EmailForm extends HTMLFormElement {
    elements: EmailFormElements;
  }

  const sendEmail = async (e: React.FormEvent<EmailForm>) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    if (isRateLimited()) {
      alert(`Please wait ${cooldownTime} seconds before submitting again.`);
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form.current!);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Email sent successfully!");
        form.current?.reset();
        const now = Date.now();
        setLastSubmitTime(now);
        localStorage.setItem(STORAGE_KEY, now.toString());
        setCooldownTime(Math.ceil(RATE_LIMIT_DELAY / 1000));
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 sm:mt-8 w-full xl:float-right xl:w-[35%]">
      <p id="contact" className="font-bold leading-none mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl tracking-tight">
        Contact
      </p>
      <form ref={form} onSubmit={sendEmail} className="flex flex-col max-w-full sm:max-w-[500px] pb-8 sm:pb-12 w-full">
        <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORM_PUBLIC_KEY} />
        <label className="mb-1 sm:mb-2 mr-2 text-sm sm:text-base whitespace-nowrap">Name</label>
        <input
          type="text"
          name="user_name"
          className="border border-gray-300 flex-1 p-2 sm:p-3 mb-3 sm:mb-4 mr-0 sm:mr-2 text-sm sm:text-base text-black transition-colors focus:border-blue-500 focus:outline-none bg-white rounded"
        />
        <label className="mb-1 sm:mb-2 mr-2 text-sm sm:text-base whitespace-nowrap">Email</label>
        <input
          type="email"
          name="user_email"
          className="border border-gray-300 flex-1 p-2 sm:p-3 mb-3 sm:mb-4 mr-0 sm:mr-2 text-sm sm:text-base text-black transition-colors focus:border-blue-500 focus:outline-none bg-white rounded"
        />
        <label className="mb-1 sm:mb-2 mr-2 text-sm sm:text-base whitespace-nowrap">Message</label>
        <textarea
          name="message"
          className="border border-gray-300 flex-1 flex-basis-100 p-2 sm:p-3 mb-3 sm:mb-4 mr-0 sm:mr-2 min-h-[80px] sm:min-h-[100px] resize-none text-sm sm:text-base text-black transition-colors focus:border-blue-500 focus:outline-none bg-white rounded"
        />
        <input
          type="submit"
          value={isSubmitting ? "Sending..." : cooldownTime > 0 ? `Wait ${cooldownTime}s` : "Send"}
          disabled={isSubmitting || cooldownTime > 0}
          className={`cursor-pointer p-2 sm:p-3 rounded text-sm sm:text-base text-white transition-colors w-full sm:w-[120px] ${
            isSubmitting || cooldownTime > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#007a8e] hover:bg-[#009999]"
          }`}
        />
      </form>
      <Socials />
    </div>
  );
}

export default Contact;
