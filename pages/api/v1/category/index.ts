import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "common/lib/prisma-client";
import { getSession } from "next-auth/react";
import { Role } from "@prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    console.log(method);

    switch (method) {
      case "GET":
        const categories = await prisma.category.findMany({
          include: {
            projects: true,
          },
        });

        res.json({ success: true, categories });
        break;

      case "POST":
        const { name, description } = req.body;

        // next-auth check if user is signIn
        const session = await getSession({ req });

        console.log(session);
        if (session.role != Role.ADMIN) {
          res.status(401).json({
            message: "Unauthorized",
          });
          return;
        }

        const category = await prisma.category.create({
          data: {
            name: name as string,
            description: description as string,
          },
        });

        res.status(200).json({
          success: true,
          category,
        });
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

  // const { name, description, ownerId } = req.query;
};
