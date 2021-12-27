
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
                const users = await prisma.user.findMany({
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        name: true,
                        image: true,
                    },
                });

                res.json({ success: true, users });
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
