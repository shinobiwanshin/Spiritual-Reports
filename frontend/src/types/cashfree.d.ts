declare module "@cashfreepayments/cashfree-js" {
  export interface Cashfree {
    checkout: (options: {
      paymentSessionId: string;
      returnUrl?: string;
      redirectTarget?: "_self" | "_blank" | "_top" | "_modal" | HTMLElement;
    }) => Promise<void>;
  }

  export function load(options: {
    mode: "sandbox" | "production" | string;
  }): Promise<Cashfree>;
}
