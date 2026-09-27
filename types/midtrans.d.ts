export { }

declare global {
  interface MidtransSnapResult {
    order_id?: string
    transaction_status?: string
    payment_type?: string
    gross_amount?: string
    transaction_id?: string
  }

  interface MidtransSnapOptions {
    onSuccess?: (result: MidtransSnapResult) => void
    onPending?: (result: MidtransSnapResult) => void
    onError?: (result: MidtransSnapResult) => void
    onClose?: () => void
  }

  interface MidtransSnap {
    pay: (
      token: string,
      options?: MidtransSnapOptions
    ) => void
  }

  interface Window {
    snap: MidtransSnap
  }
}