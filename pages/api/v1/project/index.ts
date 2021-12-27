import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "common/lib/prisma-client";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { method, body } = req;

		switch (method) {
			case "GET":


				break;

			case "POST":
				const { projectName, description, money } = req.body;

				// next-auth check if user is signIn
				const session = await getSession({ req });

				if (!session) {
					res.status(401).json({
						message: "Unauthorized",
					});
					return;
				}

				if(!projectName || !description || !money) {
					 throw new Error("Missing fields");
				}

				const project = await prisma.project.create({
					data: {
						name: projectName as string,
						description: description as string,
						money: parseInt(money as string),
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

		//send error 500
		res.status(500).json({
			message: err.message,
		});
	}

	// const { name, description, ownerId } = req.query;
};
