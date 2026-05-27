"use client";
import Image from "next/image";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormErrors {
  email?: string;
  password?: string;
  captcha?: string;
  general?: string;
}

export default function LoginPage() {
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (email: string, password: string): FormErrors => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!captchaToken) {
      newErrors.captcha = "Please complete the captcha verification";
    }

    return newErrors;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear specific field error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormData): Promise<void> => {
    setIsLoading(true);
    // console.log(isLoading)
    setErrors({});
    setShowSuccess(false);

    const email = e.get("email") as string;
    const password = e.get("password") as string;

    // Validate form
    const validationErrors = validateForm(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          captchaToken,
        }),
      });

      if (res.ok) {
        console.log("Login successful");
        setShowSuccess(true);
        // Reset form after success
        setFormData({ email: "", password: "" });
        setCaptchaToken("");
        // setIsLoading(false);

      } else {
        const errorData = await res.json();
        setErrors({
          general:
            errorData.message || "Login failed. Please check your credentials.",

        });
        setIsLoading(false);

      }
    } catch (error) {
      console.log(error)
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
      // setIsLoading(false);


    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  } as const;

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: { duration: 0.3 },
    },
  } as const;

  return (
    <div className="bg-gradient-to-br from-[#2C2C2C] via-[#3D3D3D] to-[#1A1A1A] w-screen h-screen flex justify-center items-center flex-col">
      <motion.div
        className="relative md:w-[25%] bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Image
            className="drop-shadow-2xl"
            src="/logo.png"
            width={300}
            height={350}
            alt="Company Logo"
            style={{
              filter: "drop-shadow(0 10px 30px rgba(127, 100, 86, 0.3))",
            }}
          />
        </motion.div>

        {/* Decorative Corner Elements */}
        <motion.div
          className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#7F6456]/40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        <motion.div
          className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#7F6456]/40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#7F6456]/40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#7F6456]/40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
      </motion.div>

      <motion.form
        className="p-4 md:w-[25%]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-medium"
              >
                Magic link sent successfully! 🎉
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm mt-1"
              >
                Check your email to continue
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* General Error Message */}
        <AnimatePresence>
          {errors.general && (
            <motion.div
              className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm"
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {errors.general}
            </motion.div>
          )}
        </AnimatePresence>
        {!showSuccess && (
          <>
            <motion.div className="group mb-6" variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-[#D4C4B0] font-medium mb-2 transition-colors duration-300 group-focus-within:text-[#7F6456]"
              >
                Email
              </label>
              <motion.input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full bg-transparent border-b-2 pb-3 text-white text-lg placeholder:text-white/50 focus:outline-none transition-all duration-300 ${errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-white/30 focus:border-[#7F6456]"
                  }`}
                placeholder="Enter your email"
                disabled={isLoading}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    className="mt-1 text-red-400 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div className="group mb-6" variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-[#D4C4B0] font-medium mb-2 transition-colors duration-300 group-focus-within:text-[#7F6456]"
              >
                Password
              </label>
              <motion.input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`w-full bg-transparent border-b-2 pb-3 text-white text-lg placeholder:text-white/50 focus:outline-none transition-all duration-300 ${errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-white/30 focus:border-[#7F6456]"
                  }`}
                placeholder="Enter your password"
                disabled={isLoading}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    className="mt-1 text-red-400 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="flex justify-center mt-6"
              variants={itemVariants}
            >
              <HCaptcha
                sitekey={"5b709758-01c8-42cc-b5c6-ac0a15eadb74"}
                theme="dark"
                onVerify={(token) => {
                  setCaptchaToken(token);
                  if (errors.captcha) {
                    setErrors((prev) => ({ ...prev, captcha: undefined }));
                  }
                }}
                onExpire={() => {
                  setCaptchaToken("");
                }}
                onError={() => {
                  setCaptchaToken("");
                  setErrors((prev) => ({
                    ...prev,
                    captcha: "Captcha verification failed",
                  }));
                }}
              />
            </motion.div>

            <AnimatePresence>
              {errors.captcha && (
                <motion.p
                  className="mt-2 text-red-400 text-sm text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.captcha}
                </motion.p>
              )}
            </AnimatePresence>

            {isLoading ? (
              <motion.button
                disabled={isLoading}
                className="px-6 py-3 mt-8 w-full bg-[#7F6456]/20 backdrop-blur-xl border border-[#7F6456]/30 rounded-lg text-amber-100 font-semibold hover:bg-[#7F6456]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-100 mr-2"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  Signing In...
                </motion.div>
              </motion.button>
            ) : (
              <motion.button
                formAction={handleSubmit}
                disabled={isLoading}
                className="px-6 py-3 mt-8 w-full bg-[#7F6456]/20 backdrop-blur-xl border border-[#7F6456]/30 rounded-lg text-amber-100 font-semibold hover:bg-[#7F6456]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Login
                </motion.span>
              </motion.button>
            )}
          </>
        )}
        {/* <div>
          isLoading {isLoading ? "true" : "false"}
        </div> */}
      </motion.form>
    </div>
  );
}
