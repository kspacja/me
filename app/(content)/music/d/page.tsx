'use client';

import { createResource } from "lib/actions/createResource";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <>
    <button type="submit" disabled={pending}>Submit</button> 
    {pending && <span>Submitting...</span>}
    </>
  )
}


export default function Page() {
  const [state, formAction] = useActionState(createResource, { message: '' })

  return (
    <form action={formAction}>
      <textarea style={{ width: '100%', height: 300 }} name="content">

      </textarea>
      <SubmitBtn />
    </form>
  )
}
