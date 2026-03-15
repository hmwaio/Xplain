import { prisma } from "../../lib/prisma.js";


/* Cleanup Unverified Users */
export const cleanupUnverifiedUsers = async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const result = await prisma.user.deleteMany({
    where: {
      created_at: {
        lt: oneHourAgo,
      },
    },
  });
  return { deletedCount: result.count };
};
