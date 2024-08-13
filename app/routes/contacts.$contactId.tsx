import { FunctionComponent } from "react";
import { ContactRecord } from "~/data";
import { Form } from "@remix-run/react";
import { ContactName } from "~/components/contact-name";

export default function Contact() {
  const contact = {
    first: "Your",
    last: "Name",
    avatar:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    twitter: "therock",
    notes: "Some notes",
    favorite: true,
    id: "3443574534534543",
    createdAt: new Date().toDateString(),
  } satisfies ContactRecord;

  return (
    <div id="contact">
      <div>
        <img
          src={contact.avatar}
          key={contact.avatar}
          alt={`${contact.first} ${contact.last} avatar`}
        />
      </div>
      <div>
        <h1>
          <ContactName contact={contact} />
          <Favorite contact={contact} />
        </h1>

        {contact.twitter ? (
          <p>
            <a href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const res = confirm(
                "Please confirm you want to delete this record."
              );
              if (!res) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, "favorite">;
}> = ({ contact }) => {
  const favorite = contact.favorite;

  return (
    <Form method="post">
      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
};
