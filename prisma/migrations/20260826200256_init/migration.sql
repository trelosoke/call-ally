-- CreateTable
CREATE TABLE "Call" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "smallDesc" TEXT NOT NULL,
    "fullDesc" TEXT NOT NULL,
    "dueDate" TEXT NOT NULL,
    "priority" TEXT,
    "tags" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
