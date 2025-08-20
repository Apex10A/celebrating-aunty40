import { useRouter } from "next/router";
import React from "react";

export default function code() {
  const router = useRouter();
  const invitationCode = router.query.code;

  return <div>[{invitationCode}]</div>;
}
