import { sql } from '@vercel/postgres';
import { getUserId } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';

export async function fetchUserTreats() {
  noStore();
  const userId = await getUserId();

  try {
    const data = await sql`
      SELECT t.*, count(tl.treat_id) as treatcount 
      FROM treats t left join treatlog tl on t.id = tl.treat_id
      WHERE t.user_id = ${userId}
      GROUP BY t.id`;
      console.log('!!!');
      console.log(data.rows)
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the users treats.');
  }


}


/*
export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    notFound();
    throw new Error(`Failed to fetch invoice. ${error}`);
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
*/