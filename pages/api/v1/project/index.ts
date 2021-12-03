import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "common/lib/prisma-client";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { method } = req;

		switch (method) {
			case "GET":
				break;

			case "POST":
				const { name, description } = req.query;

				// next-auth check if user is signIn
				const session = await getSession({ req });

				if (!session) {
					res.status(401).json({
						message: "Unauthorized",
					});
					return;
				}

				const project = await prisma.project.create({
					data: {
						name: name as string,
						description: description as string,
						money: 100000,
						ownerId: session.id as string,
					},
				});

				res.status(200).json({
					success: true,
					project,
				});
				break;

			default:
				throw new Error("Wrong method");
		}
	} catch (err) {
		console.log(err);
	}

	// const { name, description, ownerId } = req.query;
};
