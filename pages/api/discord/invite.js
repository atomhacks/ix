export default async function handler(req, res) {
  if (req.method != "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  return res.redirect([200], "https://discord.gg/yj5Q5mPtzC");
}
