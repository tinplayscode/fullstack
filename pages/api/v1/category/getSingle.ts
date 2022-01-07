
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
                const { id } = req.query;

                const category = await prisma.category.findFirst({
                    where: { id: id as string },
                    include: {
                        projects: {
                            include: {
                                owner: true,
                            },
                        },
                    },
                });

                res.json({ success: true, category });
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
