import { prisma } from "../lib/prisma.js";

// Delete old AuthSessions (older than 1 hour)
export const cleanupAuthSessions = async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const result = await prisma.authSession.deleteMany({
    where: {
      created_at: { lt: oneHourAgo }
    }
  });

  console.log(`✅ Cleanup: Deleted ${result.count} old auth sessions`);
  return result.count;
};

// Run every hour
export const startCleanupJob = () => {
  // Run immediately on startup
  cleanupAuthSessions();

  // Then run every hour
  setInterval(() => {
    cleanupAuthSessions();
  }, 60 * 60 * 1000); // 1 hour

  console.log("🔄 Cleanup job started (runs every hour)");
};