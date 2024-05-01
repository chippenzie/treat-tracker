// import Form from '@/app/ui/invoices/create-form';
// import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';
import Form from "@/app/ui/treats/treat-form"; 

export default async function Page() {
 
  return (
    <main>
        <Form />
    </main>
  );
}


/*
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
*/