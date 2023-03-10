// Returns info of CURRENTLY LOGGED IN user
// There will probably be routes for getting info of other users

import { getUser } from "../../../lib/server";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const user = await getUser(req);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  return res.status(200).json(user);
}
