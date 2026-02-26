declare module "@cashfreepayments/cashfree-js" {
  export interface Cashfree {
    checkout: (options: {
      paymentSessionId: string;
      returnUrl?: string;
    }) => Promise<void>;
  }

  export function load(options: {
    mode: "sandbox" | "production" | string;
  }): Promise<Cashfree>;
}
