import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../common/lib/prisma-client";
import { Role } from "@prisma/client";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //get id from getSession
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const id = session.id;

  const user = await prisma.user.update({
    where: {
      id: id.toString(),
    },
    data: {
      role: Role.ADMIN,
    },
  });

  // delete project
  // const projects = await prisma.project.findMany({});

  res.status(200).json({
    success: true,
    // data: projects,
    user,
  });
};
