import { Button, Flex, Spinner, useToast } from "@sanity/ui";
import { useCallback, useState } from "react";
import { useClient, useFormValue, NumberInputProps } from "sanity";

export function ISBN(props: NumberInputProps) {
  const client = useClient({ apiVersion: "2023-04-01" });
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const { value } = props;
  const documentId = useFormValue(["_id"]);

  const handleFetch = useCallback(async () => {
    if (!value) return;
    setLoading(true);
    const response = await fetch(`https://openlibrary.org/isbn/${value}.json`);

    try {
      const result = await response.json();
      const { title } = result;
      await client
        .patch(documentId as string)
        .set({
          title: title
        })
        .commit();
      toast.push({ status: "success", title: `Populated ${title}` });
    } catch {
      console.log(response);
      if (response.status === 404) {
        toast.push({ status: "error", title: "No book found for that ISBN" });
      } else {
        toast.push({ status: "error", title: "An unknown error occurred" });
      }
    }

    // Call your external API using the current field value

    setLoading(false);

    // onChange(set(value));
  }, [value, documentId, toast, client]);
  return (
    <Flex gap={3} align="center">
      {props.renderDefault(props)}
      <Button
        icon={loading && <Spinner style={{ paddingTop: 5 }} />}
        mode="ghost"
        text="Fetch & Populate"
        onClick={handleFetch}
        disabled={loading}
      />
    </Flex>
  );
}
