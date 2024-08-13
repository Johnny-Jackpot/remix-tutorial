import {
  Form,
  Link,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  Outlet,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, TypedResponse } from "@remix-run/node";
import { json } from "@remix-run/node";
import { ContactRecord, getContacts } from "./data";
import appStylesHref from "./app.css?url";
import { ContactName } from "~/components/contact-name";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

interface LoaderData {
  contacts: ContactRecord[];
}

export const loader = async (): Promise<TypedResponse<LoaderData>> => {
  const contacts = await getContacts();
  return json({ contacts });
};

export default function App() {
  const { contacts } = useLoaderData<LoaderData>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {(contacts as ContactRecord[]).length ? (
              <ul>
                {contacts.map((contact: ContactRecord) => (
                  <li key={contact.id}>
                    <Link to={`contacts/${contact.id}`}>
                      <ContactName contact={contact} />
                      {contact.favorite ? <span>★</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
