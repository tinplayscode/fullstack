
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "common/lib/prisma-client";
import { getSession } from "next-auth/react";
import { Role } from "@prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { method } = req;
        console.log(method);

        switch (method) {
            case "PUT":
                const { id, role } = req.body;

                if (!id) {
                    throw new Error("No id provided");
                }

                const session = await getSession({ req });

                if (!session.id) {
                    throw new Error("Unauthorized");
                }

                if (!role) {
                    throw new Error("No role provided");
                }

                const user = await prisma.user.findFirst({
                    where: { id: id as string },
                });

                if (!user) {
                    throw new Error("User not found");
                }

                if (session.role !== Role.ADMIN) {
                    throw new Error("You are not admin");
                }

                //update user role 
                await prisma.user.update({
                    where: { id: id as string },
                    data: {
                        role: role as Role,
                    },
                });

                res.status(200).json({
                    success: true,
                    message: "User role updated",
                });

            default:
                throw new Error("Wrong method");
        }
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
