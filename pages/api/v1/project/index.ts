import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "common/lib/prisma-client";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, body } = req;

    switch (method) {
      case "GET": {
        const { id } = req.query;

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

      case "POST": {
        const {
          name,
          description,
          money,
          categoryId,
          thumbnailUrl,
          bankNumber,
          bankName,
        }: {
          name: string;
          description: string;
          money: string;
          categoryId: string;
          thumbnailUrl: string;
          bankNumber: string;
          bankName: string;
        } = body;

        // next-auth check if user is signIn
        const session = await getSession({ req });

        if (!session) {
          res.status(401).json({
            message: "Unauthorized",
          });
          return;
        }

        if (!name || !description || !money || !categoryId) {
          throw new Error("Missing required fields");
        }

        //bank number must be more than 10 digit
        if (bankNumber.length < 10) {
          throw new Error("Bank number must be more than 10 digit");
        }

        const project = await prisma.project.create({
          data: {
            name: name as string,
            description: description as string,
            money: parseInt(money as string),
            ownerId: session.id as string,
            categoryId: categoryId as string,
            thumbnailUrl: (thumbnailUrl as string) || "",
            bankNumber: bankNumber as string,
            bankName: bankName as string,
          },
        });

        res.status(200).json({
          success: true,
          project,
        });
        break;
      }

      case "DELETE": {
        const { id } = body;

        if (!id) {
          throw new Error("No id provided");
        }

        console.log(id);

        const project = await prisma.project.delete({
          where: { id: id as string },
        });

        res.status(200).json({
          success: true,
          project,
        });
      }
      default:
        throw new Error("Wrong method");
    }
  } catch (err) {
    //send error 500
    res.status(200).json({
      success: false,
      message: err.message,
    });
  }

  // const { name, description, ownerId } = req.query;
};
