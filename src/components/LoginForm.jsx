import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { miscActions } from "@/store/main";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().trim().email({
    message: "Email invalid.",
  }),
  password: z
    .string()
    .regex(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
      ),
      {
        message:
          "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
      }
    )
    .max(30, {
      message: "Password cannot be more than 30 characters.",
    })
    .min(6, {
      message: "Password must be of 6 or more characters.",
    }),
});

// Forgot Password Form Component
function ForgotPasswordForm({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [stage, setStage] = useState(1);

  const formSchema = z
    .object({
      email: z.string().trim().email({
        message: "Email invalid.",
      }),
      otp: z.string(),
      newPassword: z
        .string()
        .regex(
          new RegExp(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
          ),
          {
            message:
              "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
          }
        )
        .max(30, {
          message: "Password cannot be more than 30 characters.",
        })
        .min(6, {
          message: "Password must be of 6 or more characters.",
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Function to handle OTP sending
  const handleSendOTP = async () => {
    try {
      const email = form.getValues("email");
      if (!email) return;

      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/send-otp`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setOtpSent(true);

        setOtpCooldown(30);
        const interval = setInterval(() => {
          setOtpCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setMsg("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(values) {
    try {
      setLoading(true);
      const payload = {
        email: values.email,
        otp: values.otp,
        newPassword: values.newPassword,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/changepass`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (res.ok) {
        setMsg("Password changed successfully!");
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else if (res.status == 400) {
        setMsg("Invalid OTP or email address.");
      } else if (res.status == 404) {
        setMsg("User not found with this email.");
      } else if (res.status == 500) {
        setMsg("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
      setMsg("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#1a1a1a] rounded-2xl p-8 w-[500px] border-2 border-[#333] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-white mb-6">
          Reset Password
        </h2>

        {success ? (
          <div className="text-green-400 p-4 bg-green-950/30 rounded-lg border border-green-700 mb-4">
            {msg}
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white flex items-center space-x-2">
                      <Mail className="text-gray-400" size={18} />
                      <span>Email</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="JohnDoe123@gmail.com"
                          {...field}
                          className="bg-[#2a2a2a] border-[#444] text-white focus:ring-2 focus:ring-blue-600 pl-10"
                        />
                        <Mail
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Enter your registered email address
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-white">OTP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter 6-digit OTP"
                          {...field}
                          className="bg-[#2a2a2a] border-[#444] text-white focus:ring-2 focus:ring-blue-600"
                          disabled={!otpSent}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={
                    !form.getValues("email") || otpCooldown > 0 || loading
                  }
                  className="mt-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                >
                  {otpCooldown > 0 ? `Resend in ${otpCooldown}s` : "Send OTP"}
                </Button>
              </div>

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white flex items-center space-x-2">
                      <Lock className="text-gray-400" size={18} />
                      <span>New Password</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="New Password"
                          {...field}
                          className="bg-[#2a2a2a] border-[#444] text-white focus:ring-2 focus:ring-blue-600 pl-10 pr-10"
                          disabled={!otpSent}
                        />
                        <Lock
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Create a new secure password
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white flex items-center space-x-2">
                      <Lock className="text-gray-400" size={18} />
                      <span>Confirm Password</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          {...field}
                          className="bg-[#2a2a2a] border-[#444] text-white focus:ring-2 focus:ring-blue-600 pl-10"
                          disabled={!otpSent}
                        />
                        <Lock
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      Confirm your new password
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                  disabled={
                    loading ||
                    !otpSent ||
                    !form.getValues("otp") ||
                    !form.getValues("newPassword") ||
                    !form.getValues("confirmPassword")
                  }
                >
                  {loading ? "Processing..." : "Reset Password"}
                </Button>
                {msg && !success && (
                  <p className="text-red-400 text-sm flex items-center">
                    {msg}
                  </p>
                )}
              </div>
            </form>
          </Form>
        )}
      </div>
    </motion.div>
  );
}

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);

      if (res.ok) {
        setMsg(null);
        const content = await res.json();
        const token = {
          token: content.token,
          expiry: content.expiry,
          role: content.role,
          email: content.email,
        };
        localStorage.setItem("token", JSON.stringify(token));

        dispatch(miscActions.setEmail(content.email));
        dispatch(miscActions.setLogin(true));
        dispatch(miscActions.setToken(token));

        if (content.role === "admin") {
          navigate("/admin");
        } else if (content.role === "dev") {
          navigate("/dev");
        } else {
          navigate("/");
        }
      } else if (res.status == 400) {
        setMsg("Invalid details.");
      } else if (res.status == 500) {
        setMsg("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
      setMsg("Network error. Please try again.");
    }
  }

  return (
    <>
      {showForgotPassword && (
        <ForgotPasswordForm onClose={() => setShowForgotPassword(false)} />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-[#1a1a1a] rounded-2xl p-8 w-[500px] border-2 border-[#333] shadow-2xl ${
          showForgotPassword ? "blur-sm" : ""
        }`}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex items-center space-x-2">
                    <Mail className="text-gray-400" size={18} />
                    <span>Email</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="JohnDoe123@gmail.com"
                        {...field}
                        className="bg-[#2a2a2a] border-[#444] text-white focus:ring-2 focus:ring-blue-600 pl-10"
                      />
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Enter your registered Email Id.
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex items-center space-x-2">
                    <Lock className="text-gray-400" size={18} />
                    <span>Password</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Password"
                        {...field}
                        className="bg-[#2a2a2a] border-[#444] text-white focus:ring-2 focus:ring-blue-600 pl-10 pr-10"
                      />
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Enter your password
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-6">
                <Button
                  type="submit"
                  className="bg-white text-black hover:bg-gray-200 transition-colors duration-300"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Submit"}
                </Button>
                {msg && (
                  <p className="text-red-400 text-sm flex items-center">
                    {msg}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-blue-400 hover:text-blue-300 text-sm self-start transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        </Form>
      </motion.div>
    </>
  );
}
