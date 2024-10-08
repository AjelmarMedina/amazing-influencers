"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

import { useSignUp } from "@clerk/nextjs";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, CheckCircleIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { nanoid } from "nanoid";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export default function Page() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}

const registerFormSchema = z.object({
  firstName: z.string().min(2, "First name is too short").max(64, "First name is too long"),
  lastName: z.string().min(2, "Last name is too short").max(64, "Last name is too long"),
  companyName: z.string().min(2, "Company name is too short").max(128, "Company name is too long"),
  email: z.string().email().min(2, "Email is too short").max(128, "Email is too long"),
  password: z.string().min(8, "Password must be at least 8 characters long").max(128, "Password is too long"),
  isTermsChecked: z.boolean({required_error: ""}),
})

const verificationFormSchema = z.object({
  code: z.string().min(6, {
    message: "Enter your verification code",
  }),
})

function RegisterForm() {
  const {isLoaded, signUp, setActive} = useSignUp();
  const [submitted, setSubmitted] = useState(false)
  const [verifying, setVerifying] = useState(false);
  const [userInfo, setUserInfo] = useState<z.infer<typeof registerFormSchema>>();
  const isPaidRegistration = getCookie("isPaidRegistration") ?? false; // Reloading page causes to require payment
  const [paymentComplete, setPaymentComplete] = useState(isPaidRegistration);
  const [clerkError, setClerkError] = useState("");

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      password: "",
      isTermsChecked: false,
    },
  })

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // ✅ This will be type-safe and validated.
    setClerkError("");
    
    if (!paymentComplete) return setClerkError("Please process payment...")
    setSubmitted(true)
    setUserInfo(values);
    handleSignUp(values);
  }

  async function handleSignUp(userInfo: z.infer<typeof registerFormSchema>) {

    if (!isLoaded) return;

    const emailAddress = userInfo?.email.trimEnd();
    const password = userInfo?.password.trimEnd();
    const firstName = userInfo?.firstName.trimEnd();
    const lastName = userInfo?.lastName.trimEnd();
  
    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });
  
      // send the email.
      await signUp.prepareEmailAddressVerification({strategy: "email_code"});
  
      // change the UI to our pending section.
      setVerifying(true);
    } catch (err: any) {
      setSubmitted(false);
      setClerkError(err.errors[0].message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-stretch space-y-8 bg-white p-5 rounded-xl w-full max-w-lg">
        <div className="grid grid-cols-2 gap-x-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="John Co." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {paymentComplete 
          ? (
            <div className="flex flex-row">
              <CheckCircle2 className="text-primary mr-2" /> Payment Processed
            </div>
          ) : (
            <PaymentButtons />
          )
        }

        <FormField
          control={form.control}
          name="isTermsChecked"
          render={({ field }) => (
            <FormItem className="space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>
                I accept the <Link href={"/"} target="_blank" className="text-primary hover:underline">Terms of Service</Link>
              </FormLabel>
            </FormItem>
          )}
        />
        {/* CAPTCHA Widget */}
        <div id="clerk-captcha" className="m-0"></div>

        {clerkError && (
          <FormLabel className="text-red-500">
            {clerkError}
          </FormLabel>
        )}

        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={submitted}>
          Submit
          {submitted &&
            <Loader2Icon className="ml-2 animate-spin"/>
          }
        </Button>
        <p className="text-center">
          Already have an account? <Link href={"/login"} className="text-primary hover:underline">Login</Link>
        </p>
      </form>
      <VerificationDialog />
    </Form>
  )

  function PaymentButtons() {

    const paypalCreateOrder = async () => {
      const user_id = nanoid();
      const order_price = 5.0; // USD

      // prepare request
      const apiUrl = "/api/paypal/createorder";
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          order_price
        }),
      };

      try {
        const response = await fetch(apiUrl, requestData)
        if (!response.ok) throw new Error();
        toast({title: "Order Created"});
        const order_id = (await response.json()).data;
        return order_id;
      } catch (err) {
        toast({title: "Error on Order Creation", variant: "destructive"})
        return;
      }
    }

    const paypalCaptureOrder = async (orderID: any) => {
      // prepare request
      const apiUrl = "/api/paypal/captureorder";
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID
        }),
      };

      try {
        const response = await fetch(apiUrl, requestData)
        if (response.ok) toast({title: "Payment Successful"})
      } catch (err) {
        toast({title: "Error on Payment", variant: "destructive"})
      }
    }

    return (
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
          currency: 'USD',
          intent: 'capture'
        }}
      >
        <PayPalButtons
          style={{
            color: 'gold',
            shape: 'rect',
            label: 'pay',
            height: 40
          }}
          createOrder={async (data, actions) => {
            const order_id = await paypalCreateOrder()
            return order_id + "";
          }}
          onApprove={async (data, actions) => {
            await paypalCaptureOrder(data.orderID);
            setPaymentComplete(true);
            setCookie("isPaidRegistration", "true");
            return;
          }}
        />
      </PayPalScriptProvider>
    )
  }

  function VerificationDialog() {
    const router = useRouter();
    const [submitEnabled, setSubmitEnabled] = useState(false);
  
    const verificationForm = useForm<z.infer<typeof verificationFormSchema>>({
      resolver: zodResolver(verificationFormSchema),
      defaultValues: {
      },
    })
  
    function onSubmit(values: z.infer<typeof verificationFormSchema>) {
      setSubmitEnabled(true);
      handleVerify(values.code);
    }

    async function handleVerify(code: string) {

      if (!isLoaded) return;

      // Prepare user info
      const emailAddress = userInfo?.email;
      const company = userInfo?.companyName;
      const firstName = userInfo?.firstName;
      const lastName = userInfo?.lastName;

      // Prepare POST request
      const apiUrl = "/api/users/create";
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress,
          company,
          firstName,
          lastName,
        }),
      };
    
      try {
        // Create user on Clerk API
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code,
        });
        // Create user on database
        const response = await fetch(apiUrl, requestData); 

        // Error on signup
        if (completeSignUp.status !== "complete") return console.log(JSON.stringify(completeSignUp, null, 2));
        // Error on POST
        if (!response.ok) throw new Error(`POST Error: ${response.status} - ${response.statusText}` );
    
        await setActive({session: completeSignUp.createdSessionId});
        deleteCookie("isPaidRegistration") // avoids creating free accounts from already paid users
        router.push("/dashboard");
      } catch (err) {
        console.log("Error:", JSON.stringify(err, null, 2));
      }
    }
  
    return (
      <Dialog open={verifying}>
        <DialogContent 
          hideCloseButton
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Verify your Email Address</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            To finish signing up, a verification code will be sent to your email address. Open your email inbox and copy the code to paste it in the field below.
          </DialogDescription>
          <Form {...verificationForm}>
            <form onSubmit={verificationForm.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={verificationForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-row justify-center">
                    <FormControl className="">
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={submitEnabled}>
                Submit
                {submitEnabled &&
                  <Loader2Icon className="ml-2 animate-spin"/>
                }
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  
  }

}
