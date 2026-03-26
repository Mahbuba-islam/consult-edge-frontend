"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { resendVerificationAction } from "@/src/app/(commonLayout)/(authRouteGroup)/verifyEmail/_action";

interface VerifyEmailFormProps {
  email?: string;
}

const VerifyEmailForm = ({ email }: VerifyEmailFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (email: string) => resendVerificationAction(email),
  });

  const handleResend = async () => {
    if (!email) {
      setServerError("Email is missing");
      return;
    }

    setServerError(null);
    setSuccessMessage(null);

    const result = await mutateAsync(email);

    if (!result.success) {
      setServerError(result.message);
      return;
    }

    setSuccessMessage(result.message);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          We sent a verification link to <strong>{email}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Button
          className="w-full"
          onClick={handleResend}
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Resend Verification Email"}
        </Button>
      </CardContent>

      <CardFooter className="justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Already verified?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Log In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default VerifyEmailForm;