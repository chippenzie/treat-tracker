'use server';

import {z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

export type State = {
    errors?: {
        id?: string[];
        user_id?: string[];
        name?: string[];
        period?: string[];
        startOn?: string[];
    }
    message: string | null;
}

const TreatFormSchema = z.object({
    id: z.number(),
    user_id: z.string(),
    name: z.string(),
    period: z.number(),
    startOn: z.number()
})

const CreateTreat = TreatFormSchema.omit({id: true, user_id: true});
//const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createTreat(prevState: State, formData: FormData) {




    
    //const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = TreatFormSchema.safeParse({
        name: formData.get('treatname'),
        period: formData.get('treatperiod'),
    });

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'bad fields, didn\'t create'
        }
    }
    

    /*
    const { name, period } = validatedFields.data;

    try {
        await sql`
        INSERT INTO treats(user_id, name, period, start_on)
        VALUES (${userId}, ${name}, ${period}, ${startOn})
        `;
    }
    catch (e) {
        return {
            message: 'DB Error - failed to Create Invoice'
        }        
    }

    */
    revalidatePath('/');
    redirect('/bruh');
}

/*
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'bad fields, didn\'t create'
        }
    }

    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });
    const amountInCents = amount * 100;
    try {
        await sql`
            UPDATE invoices SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
        `;
    }
    catch (e) {
        return {
            message: 'DB Error - failed to Update Invoice'
        }        
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) { 
    //throw new Error('farts!'); 
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    }
    catch (e) {
        return {
            message: 'DB Error - failed to Create Invoice'
        }        
    }
}
*/