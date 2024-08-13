import { ContactRecord } from "~/data";
import { FunctionComponent } from "react";

export const ContactName: FunctionComponent<{
  contact: ContactRecord;
}> = ({ contact }) => {
  return contact.first || contact.last ? (
    <>
      {contact.first} {contact.last}
    </>
  ) : (
    <i>No Name</i>
  );
};
