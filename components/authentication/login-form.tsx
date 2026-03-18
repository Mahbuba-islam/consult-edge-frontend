// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { useForm } from "@tanstack/react-form";
// import { Button } from "../ui/button";
// import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
// import { Input } from "../ui/input";
// import * as z from "zod";
// import { toast } from "sonner";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// // ⭐ Zod schema (ADMIN added)
// const formSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   role: z.enum(["STUDENT", "TUTOR", "ADMIN"]),
// });

// export function SignInForm({ ...props }: React.ComponentProps<typeof Card>) {
//   const router = useRouter();

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//       role: "STUDENT",
//     },

//     validators: {
//       onSubmit: formSchema,
//     },

//     onSubmit: async ({ value }) => {
//       const loadingId = toast.loading("Signing in...");

//       try {
//         const { data, error } = await authClient.signIn.email({
//           email: value.email,
//           password: value.password,
//         });

//         if (error) {
//           toast.error(error.message, { id: loadingId });
//           return;
//         }

//         toast.success("Sign In successfully", { id: loadingId });

//         // ⭐ Role-based redirect
//         if (value.role === "ADMIN") {
//           router.push("/dashboard");
//         } else {
//           router.push("/");
//         }
//       } catch (err) {
//         toast.error("Something went wrong", { id: loadingId });
//       }
//     },
//   });

//   return (
//     <Card {...props}>
//       <CardHeader>
//         <CardTitle>Sign In</CardTitle>
//         <CardDescription>
//           Enter your credentials to access your account
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form
//           id="login-form"
//           onSubmit={(e) => {
//             e.preventDefault();
//             form.handleSubmit();
//           }}
//         >
//           <FieldGroup>

//             {/* Email */}
//             <form.Field name="email">
//               {(field) => {
//                 const isInvalid =
//                   field.state.meta.isTouched && !field.state.meta.isValid;

//                 return (
//                   <Field data-invalid={isInvalid}>
//                     <FieldLabel htmlFor={field.name}>Email</FieldLabel>

//                     <Input
//                       type="text"
//                       id={field.name}
//                       value={field.state.value}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       aria-invalid={isInvalid}
//                     />

//                     {isInvalid && (
//                       <FieldError errors={field.state.meta.errors} />
//                     )}
//                   </Field>
//                 );
//               }}
//             </form.Field>

//             {/* Password */}
//             <form.Field name="password">
//               {(field) => {
//                 const isInvalid =
//                   field.state.meta.isTouched && !field.state.meta.isValid;

//                 return (
//                   <Field data-invalid={isInvalid}>
//                     <FieldLabel htmlFor={field.name}>Password</FieldLabel>

//                     <Input
//                       type="password"
//                       id={field.name}
//                       value={field.state.value}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       aria-invalid={isInvalid}
//                     />

//                     {isInvalid && (
//                       <FieldError errors={field.state.meta.errors} />
//                     )}
//                   </Field>
//                 );
//               }}
//             </form.Field>

//             {/* Hidden Role Field */}
//             <form.Field name="role">
//               {(field) => (
//                 <input type="hidden" value={field.state.value} readOnly />
//               )}
//             </form.Field>

//           </FieldGroup>
//         </form>
//       </CardContent>

//       <CardFooter className="flex flex-col gap-3">

//         {/* Student Login */}
//         <Button
//           className="w-full font-semibold text-white bg-linear-to-r from-purple-600 to-pink-500"
//           onClick={() => {
//             form.setFieldValue("role", "STUDENT");
//             form.handleSubmit();
//           }}
//         >
//           Login as Student
//         </Button>

//         {/* Tutor Login */}
//         <Button
//           className="w-full font-semibold text-white bg-linear-to-r from-pink-500 to-purple-600"
//           onClick={() => {
//             form.setFieldValue("role", "TUTOR");
//             form.handleSubmit();
//           }}
//         >
//           Login as Tutor
//         </Button>

//         {/* Admin Login */}
//         <Button
//           className="w-full font-semibold text-white bg-gradient-to-r from-red-500 to-purple-700"
//           onClick={() => {
//             form.setFieldValue("role", "ADMIN");
//             form.handleSubmit();
//           }}
//         >
//           Login as Admin
//         </Button>

//       </CardFooter>

//       <div className="text-center mt-4 space-y-1">
//         <p className="text-sm text-gray-600">
//           Don’t have an account?
//           <Link
//             href="/signup"
//             className="ml-1 font-semibold text-purple-600 hover:text-purple-700 underline"
//           >
//             Create one
//           </Link>
//         </p>

//         <Link
//           href="/"
//           className="text-sm text-gray-500 hover:text-gray-700 underline"
//         >
//           ← Back to Home
//         </Link>
//       </div>
//     </Card>
//   );
// }



"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signInAction } from "@/src/app/actions/auth.action";

// Zod schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["STUDENT", "TUTOR", "ADMIN"]),
});

export function SignInForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "STUDENT",
    },

    validators: {
      onSubmit: formSchema,
    },

    onSubmit: async ({ value }) => {
      const loadingId = toast.loading("Signing in...");

      try {
        // ⭐ Server Action Login
        const { data, error } = await signInAction({
          email: value.email,
          password: value.password,
        });

        if (error) {
          toast.error(error.message, { id: loadingId });
          return;
        }

        toast.success("Signed in successfully", { id: loadingId });

        // ⭐ Role-based redirect
        if (value.role === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }

      } catch (err) {
        toast.error("Something went wrong", { id: loadingId });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>

            {/* Email */}
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                    <Input
                      type="text"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                    <Input
                      type="password"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Hidden Role */}
            <form.Field name="role">
              {(field) => (
                <input type="hidden" value={field.state.value} readOnly />
              )}
            </form.Field>

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">

        {/* Student Login */}
        <Button
          className="w-full font-semibold text-white bg-linear-to-r from-purple-600 to-pink-500"
          onClick={() => {
            form.setFieldValue("role", "STUDENT");
            form.handleSubmit();
          }}
        >
          Login as Student
        </Button>

        {/* Tutor Login */}
        <Button
          className="w-full font-semibold text-white bg-linear-to-r from-pink-500 to-purple-600"
          onClick={() => {
            form.setFieldValue("role", "TUTOR");
            form.handleSubmit();
          }}
        >
          Login as Tutor
        </Button>

        {/* Admin Login */}
        <Button
          className="w-full font-semibold text-white bg-gradient-to-r from-red-500 to-purple-700"
          onClick={() => {
            form.setFieldValue("role", "ADMIN");
            form.handleSubmit();
          }}
        >
          Login as Admin
        </Button>

      </CardFooter>

      <div className="text-center mt-4 space-y-1">
        <p className="text-sm text-gray-600">
          Don’t have an account?
          <Link
            href="/signup"
            className="ml-1 font-semibold text-purple-600 hover:text-purple-700 underline"
          >
            Create one
          </Link>
        </p>

        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          ← Back to Home
        </Link>
      </div>
    </Card>
  );
}