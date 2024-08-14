import { json, type LoaderFunctionArgs, TypedResponse } from "@remix-run/node";
import invariant from "tiny-invariant";
import { ContactRecord, getContact } from "~/data";
import { Form, useLoaderData } from "@remix-run/react";

interface LoaderData {
  contact: ContactRecord;
}

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

export default function EditContact() {
  const { contact } = useLoaderData<LoaderData>();

  return (
    <Form key={contact.id} id="contact-form" method="post">
      <p>
        <span>Name</span>
        <input
          defaultValue={contact.first}
          name="first"
          type="text"
          placeholder="First"
        />
        <input
          defaultValue={contact.last}
          name="last"
          type="text"
          placeholder="Last"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          defaultValue={contact.twitter}
          name="twitter"
          type="text"
          placeholder="@jack"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          defaultValue={contact.avatar}
          name="avatar"
          type="text"
          placeholder="https://example.com/avatar.jpg"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea defaultValue={contact.notes} name="notes" rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
