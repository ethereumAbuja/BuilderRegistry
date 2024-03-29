import { NextApiRequest, NextApiResponse } from "next";
import { deleteBounty, findBounty, updateBounty } from "~~/services/db/bounty";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { bountyId } = req.query;
      const bounty = await findBounty(bountyId as string);
      if (bounty.exist === false) return res.status(404).json({ message: "Bounty not found." });
      return res.status(200).json(bounty);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST ") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  if (req.method == "PATCH") {
    try {
      const { bountyId } = req.query;
      const { title, deadline, skills, details, resources } = req.body;
      console.log(`EDIT /bounties/${bountyId}`, bountyId);
      const bounty = await findBounty(bountyId as string);
      if (bounty.exist === false) return res.status(404).json({ message: "Bounty not found." });
      await updateBounty(bountyId as string, title, deadline, skills, details, resources);
      return res.status(200).end();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method == "DELETE") {
    try {
      const { bountyId } = req.query;
      console.log(`DELETE /bounties/${bountyId}`, bountyId);
      const bounty = await findBounty(bountyId as string);
      if (bounty.exist === false) return res.status(404).json({ message: "Bounty not found." });
      await deleteBounty(bountyId as string);
      return res.status(200).end();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
