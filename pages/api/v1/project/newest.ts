import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "common/lib/prisma-client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    console.log(method);

    switch (method) {
      case "GET":
        const projects = await prisma.project.findMany({
          include: { owner: true, Category: true },
          orderBy: { id: "desc" },
          take: 10,
        });

        res.json({ success: true, projects });
        break;

      default:
        throw new Error("Wrong method");
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
