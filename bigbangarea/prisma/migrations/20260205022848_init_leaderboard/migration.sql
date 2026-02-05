-- CreateTable
CREATE TABLE "HighScore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "githubUrl" TEXT NOT NULL,
    "money" REAL NOT NULL,
    "agentCount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "HighScore_money_idx" ON "HighScore"("money" DESC);
