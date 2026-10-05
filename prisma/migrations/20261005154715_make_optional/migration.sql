-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Call" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "smallDesc" TEXT,
    "fullDesc" TEXT,
    "dueDate" TEXT,
    "priority" TEXT,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Call" ("createdAt", "dueDate", "fullDesc", "id", "priority", "smallDesc", "tags", "title") SELECT "createdAt", "dueDate", "fullDesc", "id", "priority", "smallDesc", "tags", "title" FROM "Call";
DROP TABLE "Call";
ALTER TABLE "new_Call" RENAME TO "Call";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
