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
        const posts = await prisma.post.findMany({
          include: { author: true },

        });

        res.json({ success: true, posts });
        break;

      case "POST":
        const { title, text } = req.body;

        // next-auth check if user is signIn
        const session = await getSession({ req });

        console.log(session);
        if (session.role != Role.ADMIN) {
          res.status(401).json({
            message: "Unauthorized",
          });
          return;
        }

        const post = await prisma.post.create({
          data: {
            title,
            text,
            authorId: session.userId as string,
          }
        });

        res.status(200).json({
          success: true,
          post
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

};
