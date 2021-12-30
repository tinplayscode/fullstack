import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "common/lib/prisma-client";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, body } = req;
    const { id } = req.query;

    switch (method) {
      case "GET": {
        if (!id) {
          throw new Error("No id provided");
        }

        const project = await prisma.project.findFirst({
          where: { id: id as string },
        });

        if (!project) {
          throw new Error("Project not found");
        }

        res.status(200).json({
          project,
        });

        break;
      }
      default: {
        throw new Error("Method not allowed");
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
