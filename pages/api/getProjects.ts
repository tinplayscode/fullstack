import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../common/lib/prisma-client";
import { Role } from "@prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const user = await prisma.user.update({
  //   where: {
  //     id: "6188975447267fbe9948fd99",
  //   },
  //   data: {
  //     role: Role.ADMIN,
  //   },
  // });

  // delete project
  const projects = await prisma.project.findMany({});

  res.status(200).json({
    success: true,
    data: projects,
  });
};
