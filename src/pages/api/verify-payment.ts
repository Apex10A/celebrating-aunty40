import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { transaction_id, tx_ref } = req.body;

  try {
    // Verify the transaction with Flutterwave
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
        }
      }
    );

    const data = await response.json();

    // Verify that the transaction was successful and matches our records
    if (
      data.status === 'success' &&
      data.data.tx_ref === tx_ref &&
      data.data.status === 'successful'
    ) {
      // Store the transaction in your database here
      // await prisma.Gift.create({
      //   data: {
      //     transactionId: transaction_id,
      //     amount: data.data.amount,
      //     currency: data.data.currency,
      //     customerEmail: data.data.customer.email,
      //     customerName: data.data.customer.name,
      //     status: 'success',
      //   }
      // });

      return res.status(200).json({
        status: 'success',
        message: 'Payment verified successfully'
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid transaction'
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error verifying payment'
    });
  }
} 