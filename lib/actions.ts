'use server';

import {z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentTimecode, getUserId } from './utils';


export type State = {
    errors?: {
        name?: string[];
        period?: string[];
    }
    message: string | null;
}

const TreatFormSchema = z.object({
    id: z.number(),
    user_id: z.string(),
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      }).trim().min(1, { message: "Name is required" }),
    period: z.coerce.number().gt(0, {message: 'number more than 0'}),
    startOn: z.number()
})

const CreateTreat = TreatFormSchema.omit({id: true, user_id: true, startOn: true});
//const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createTreat(prevState: State, formData: FormData) {
    const userId = await getUserId();

    const validatedFields = CreateTreat.safeParse({
        name: formData.get('name'),
        period: formData.get('period'),
     });
 
     if (!validatedFields.success) {
         return {
             errors: validatedFields.error.flatten().fieldErrors,
             message: 'bad fields, didn\'t create',
         }
     }
 
     const { name, period } = validatedFields.data;
     const startOn = getCurrentTimecode();
 
     try {
        await sql`
        INSERT INTO treats(user_id, name, period, start_on)
        VALUES (${userId}, ${name}, ${period}, ${Number(startOn)})
        `;
    }
     catch (e) {
         return {
             message: 'DB Error - failed to Create Invoice'
         }        
     }
 
     revalidatePath('/');
     redirect('/');
 }
